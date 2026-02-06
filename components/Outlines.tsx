import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * CONFIGURATION
 */
const PARTICLE_COUNT = 3000; // Increased for better definition
const DISPLAY_DURATION = 10.0;
const MORPH_DURATION = 1.5;
const BASE_URL = '/a14u';
const BASE_PARTICLE_SIZE = 25.0; // Base size for pulsing particles

// Outward Streaks Configuration
const STREAK_COUNT = 300; // Number of outward lines
const STREAK_LENGTH = 2.5; // Length of each streak
const STREAK_WIDTH = 0.15; // Thickness of streaks

/**
 * SHADERS - Pulsing Particles
 */
const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  uniform sampler2D uTex;
  uniform float uIndexCurrent;
  uniform float uIndexNext;
  uniform float uTotalImages;
  uniform float uBaseSize;

  attribute float aIndex; // 0 to TOTAL_PARTICLES - 1
  attribute float aRandom; // Random phase for each particle

  varying vec3 vColor;
  varying float vAlpha;
  varying float vPulse;

  // Helper to get color based on position
  vec3 getPalette(float posX) {
      // Neon/Tech Palette
      vec3 c1 = vec3(0.0, 1.0, 1.0); // Cyan
      vec3 c2 = vec3(1.0, 0.0, 1.0); // Magenta
      vec3 c3 = vec3(1.0, 1.0, 0.0); // Yellow

      float t = smoothstep(-5.0, 5.0, posX);
      return mix(c1, c2, t);
  }

  void main() {
    // 1. Texture Lookup
    float u = (aIndex + 0.5) / 3000.0; // Hardcoded matches PARTICLE_COUNT
    float vCur  = (uIndexCurrent + 0.5) / uTotalImages;
    float vNext = (uIndexNext + 0.5) / uTotalImages;

    vec4 dataStart = texture2D(uTex, vec2(u, vCur));
    vec4 dataEnd   = texture2D(uTex, vec2(u, vNext));

    vec3 startPos = dataStart.rgb;
    vec3 endPos   = dataEnd.rgb;

    // 2. Morphing
    float transition = smoothstep(0.0, 1.0, uMorph);
    vec3 pos = mix(startPos, endPos, transition);

    // Add some noise/drift
    pos.z += sin(uTime + pos.x * 2.0) * 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // 3. Pulsing effect: each particle has its own phase
    float pulseSpeed = 1.5 + aRandom * 2.0; // Vary speed per particle
    vPulse = 0.3 + 0.7 * sin(uTime * pulseSpeed + aRandom * 6.28318);

    // Size pulsing: 0.3x to 1.0x of base size
    float sizePulse = 0.3 + 0.7 * vPulse;
    gl_PointSize = uBaseSize * sizePulse * (1.0 / -mvPosition.z);

    // 4. Color & Alpha
    vColor = getPalette(pos.x);

    // Brightness pulsing through alpha
    vAlpha = 0.4 + 0.6 * vPulse;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vPulse;

  void main() {
    // Circular particle shape
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Core glow effect - brighter center when pulse is high
    float coreBrightness = 0.5 + 0.5 * vPulse;
    vec3 coreGlow = mix(vColor, vec3(1.0), (0.5 - dist) * coreBrightness);

    // Soft edge falloff
    float intensity = pow(1.0 - dist * 2.0, 1.5);
    float finalAlpha = vAlpha * intensity;

    gl_FragColor = vec4(coreGlow * (1.0 + vPulse * 0.3), finalAlpha);
  }
`;

/**
 * SHADERS - Outward Streaks (thick lines as mesh quads)
 */
const streakVertexShader = `
  uniform float uTime;
  uniform float uMorph;
  uniform sampler2D uTex;
  uniform float uIndexCurrent;
  uniform float uIndexNext;
  uniform float uTotalImages;
  uniform float uStreakLength;
  uniform float uStreakWidth;

  attribute float aIndex; // Which particle this streak belongs to
  attribute float aVertex; // 0-5 for quad vertices (2 triangles)
  attribute float aRandom;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vEdgeDist; // Distance from center line for soft edges

  vec3 getPalette(float posX) {
      vec3 c1 = vec3(0.0, 1.0, 1.0); // Cyan
      vec3 c2 = vec3(1.0, 0.0, 1.0); // Magenta
      float t = smoothstep(-5.0, 5.0, posX);
      return mix(c1, c2, t);
  }

  void main() {
    // 1. Get particle position from texture
    float u = (aIndex + 0.5) / 3000.0;
    float vCur = (uIndexCurrent + 0.5) / uTotalImages;
    float vNext = (uIndexNext + 0.5) / uTotalImages;

    vec4 dataStart = texture2D(uTex, vec2(u, vCur));
    vec4 dataEnd = texture2D(uTex, vec2(u, vNext));

    float transition = smoothstep(0.0, 1.0, uMorph);
    vec3 particlePos = mix(dataStart.rgb, dataEnd.rgb, transition);

    // Add drift like particles
    particlePos.z += sin(uTime + particlePos.x * 2.0) * 0.1;

    // 2. Calculate outward direction (from center)
    vec2 outDir = normalize(particlePos.xy);
    if (length(particlePos.xy) < 0.01) {
      outDir = vec2(1.0, 0.0); // Default if at center
    }

    // Perpendicular direction for width
    vec2 perpDir = vec2(-outDir.y, outDir.x);

    // 3. Animated streak length
    float pulse = 0.7 + 0.8 * sin(uTime * 2.0 + aRandom * 6.28);
    float len = uStreakLength * pulse;
    float width = uStreakWidth;

    // 4. Build quad vertices
    // Quad: 2 triangles (0,1,2) and (2,1,3)
    // Vertex layout:
    //   0 --- 1  (start, left/right)
    //   |  \  |
    //   2 --- 3  (end, left/right)

    float vertexId = aVertex;
    float along = 0.0; // 0 = start, 1 = end
    float side = 0.0;  // -1 = left, +1 = right

    // Triangle 1: 0, 1, 2
    // Triangle 2: 2, 1, 3
    if (vertexId < 0.5) { along = 0.0; side = -1.0; }      // 0
    else if (vertexId < 1.5) { along = 0.0; side = 1.0; }  // 1
    else if (vertexId < 2.5) { along = 1.0; side = -1.0; } // 2
    else if (vertexId < 3.5) { along = 1.0; side = -1.0; } // 3 (same as 2 for tri 2)
    else if (vertexId < 4.5) { along = 0.0; side = 1.0; }  // 4 (same as 1 for tri 2)
    else { along = 1.0; side = 1.0; }                       // 5

    // Build position
    vec2 pos2D = particlePos.xy;
    pos2D += outDir * along * len;      // Extend outward
    pos2D += perpDir * side * width;    // Width offset

    vec3 pos = vec3(pos2D, particlePos.z);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    // 5. Color & Alpha
    vColor = getPalette(particlePos.x);

    // Fade out at the end of streak
    float fadeAlong = 1.0 - along * 0.7;
    vAlpha = 0.8 * fadeAlong * pulse;

    // For soft edges: pass raw side (-1 or +1), interpolation gives 0 at center
    vEdgeDist = side;
  }
`;

const streakFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vEdgeDist;

  void main() {
    // Soft edge falloff: abs(vEdgeDist) is 0 at center, 1 at edges
    float edgeFade = 1.0 - smoothstep(0.5, 1.0, abs(vEdgeDist));

    // Add glow effect
    vec3 glowColor = mix(vColor, vec3(1.0), 0.3);

    float finalAlpha = vAlpha * edgeFade;
    gl_FragColor = vec4(glowColor, finalAlpha);
  }
`;

// --- IMAGE PROCESSING ---
function processEdges(img: HTMLImageElement): { edgeData: { pos: THREE.Vector3, angle: number }[] } {
    const w = img.width;
    const h = img.height;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return { edgeData: [] };

    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, w, h).data;

    const gray = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
        gray[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
    }

    // Stronger blur (5x5) to remove internal texture details
    const blurred = new Float32Array(w * h);
    const getVal = (arr: Float32Array, x: number, y: number) => {
        if (x < 0 || x >= w || y < 0 || y >= h) return 0;
        return arr[y * w + x];
    };

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let sum = 0;
            let count = 0;
            for (let dy = -2; dy <= 2; dy++) {
                for (let dx = -2; dx <= 2; dx++) {
                    const nx = x + dx, ny = y + dy;
                    if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                        sum += gray[ny * w + nx];
                        count++;
                    }
                }
            }
            blurred[y * w + x] = sum / count;
        }
    }

    // Otsu's threshold for binary segmentation
    const histogram = new Array(256).fill(0);
    for (let i = 0; i < w * h; i++) {
        histogram[Math.min(255, Math.floor(blurred[i]))]++;
    }
    const total = w * h;
    let sumAll = 0;
    for (let i = 0; i < 256; i++) sumAll += i * histogram[i];

    let sumB = 0, wB = 0, maxVariance = 0, otsuThreshold = 128;
    for (let t = 0; t < 256; t++) {
        wB += histogram[t];
        if (wB === 0) continue;
        const wF = total - wB;
        if (wF === 0) break;
        sumB += t * histogram[t];
        const mB = sumB / wB;
        const mF = (sumAll - sumB) / wF;
        const variance = wB * wF * (mB - mF) * (mB - mF);
        if (variance > maxVariance) {
            maxVariance = variance;
            otsuThreshold = t;
        }
    }

    // Binary segmentation
    const binary = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
        binary[i] = blurred[i] > otsuThreshold ? 1 : 0;
    }

    // Compute Sobel gradients (for angle calculation)
    const gradients = new Float32Array(w * h * 2);
    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            const gx =
                -1 * getVal(blurred, x - 1, y - 1) + 1 * getVal(blurred, x + 1, y - 1) +
                -2 * getVal(blurred, x - 1, y) + 2 * getVal(blurred, x + 1, y) +
                -1 * getVal(blurred, x - 1, y + 1) + 1 * getVal(blurred, x + 1, y + 1);
            const gy =
                -1 * getVal(blurred, x - 1, y - 1) - 2 * getVal(blurred, x, y - 1) - 1 * getVal(blurred, x + 1, y - 1) +
                1 * getVal(blurred, x - 1, y + 1) + 2 * getVal(blurred, x, y + 1) + 1 * getVal(blurred, x + 1, y + 1);
            gradients[(y * w + x) * 2] = gx;
            gradients[(y * w + x) * 2 + 1] = gy;
        }
    }

    // Extract contour: foreground pixels adjacent to background
    const edgeData: { pos: THREE.Vector3, angle: number }[] = [];
    const aspect = w / h;
    const margin = Math.min(w, h) * 0.05;

    for (let y = 2; y < h - 2; y++) {
        for (let x = 2; x < w - 2; x++) {
            if (x < margin || x > w - margin || y < margin || y > h - margin) continue;

            const val = binary[y * w + x];
            // Check if this pixel is on the boundary (foreground with background neighbor)
            const hasOpposite =
                binary[(y - 1) * w + x] !== val ||
                binary[(y + 1) * w + x] !== val ||
                binary[y * w + x - 1] !== val ||
                binary[y * w + x + 1] !== val;

            if (hasOpposite) {
                const px = (x / w - 0.5) * 10 * aspect;
                const py = (0.5 - y / h) * 10;

                const gx = gradients[(y * w + x) * 2];
                const gy = gradients[(y * w + x) * 2 + 1];
                const angle = Math.atan2(gx, -gy);

                edgeData.push({
                    pos: new THREE.Vector3(px, py, 0),
                    angle: angle
                });
            }
        }
    }

    return { edgeData };
}

function generateShapeData(edgeData: { pos: THREE.Vector3, angle: number }[]): Float32Array {
    const arr = new Float32Array(PARTICLE_COUNT * 4); // RGBA (x, y, z, angle)

    if (edgeData.length === 0) {
        edgeData.push({ pos: new THREE.Vector3(), angle: 0 });
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = Math.floor(Math.random() * edgeData.length);
        const p = edgeData[idx];

        arr[i * 4 + 0] = p.pos.x;
        arr[i * 4 + 1] = p.pos.y;
        arr[i * 4 + 2] = p.pos.z;
        arr[i * 4 + 3] = p.angle;
    }

    return arr;
}

// Outward Streaks Component
const OutwardStreaks = ({ texture, uniforms }: { texture: THREE.DataTexture; uniforms: any }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    const streakUniforms = useMemo(() => ({
        uTime: uniforms.uTime,
        uMorph: uniforms.uMorph,
        uTex: { value: texture },
        uIndexCurrent: uniforms.uIndexCurrent,
        uIndexNext: uniforms.uIndexNext,
        uTotalImages: uniforms.uTotalImages,
        uStreakLength: { value: STREAK_LENGTH },
        uStreakWidth: { value: STREAK_WIDTH }
    }), [texture, uniforms]);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();

        // 6 vertices per streak (2 triangles forming a quad)
        const vertexCount = STREAK_COUNT * 6;

        const indices = new Float32Array(vertexCount);
        const vertices = new Float32Array(vertexCount); // Which vertex in quad (0-5)
        const randoms = new Float32Array(vertexCount);

        for (let i = 0; i < STREAK_COUNT; i++) {
            const particleIdx = Math.floor(Math.random() * PARTICLE_COUNT);
            const randomPhase = Math.random();

            for (let v = 0; v < 6; v++) {
                const idx = i * 6 + v;
                indices[idx] = particleIdx;
                vertices[idx] = v;
                randoms[idx] = randomPhase;
            }
        }

        geo.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1));
        geo.setAttribute('aVertex', new THREE.BufferAttribute(vertices, 1));
        geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

        // Dummy position
        const pos = new Float32Array(vertexCount * 3);
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

        geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100);

        return geo;
    }, []);

    return (
        <mesh ref={meshRef} geometry={geometry} frustumCulled={false}>
            <shaderMaterial
                uniforms={streakUniforms}
                vertexShader={streakVertexShader}
                fragmentShader={streakFragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const OutlineParticles = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const [pointsGeo, setPointsGeo] = useState<THREE.BufferGeometry | null>(null);
    const [texture, setTexture] = useState<THREE.DataTexture | null>(null);
    const [totalImages, setTotalImages] = useState(0);

    const cycleState = useRef({
        index: 0,
        nextIndex: 0,
        timer: 0,
        morphProgress: 0,
        isMorphing: false
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uTex: { value: null },
        uIndexCurrent: { value: 0.0 },
        uIndexNext: { value: 0.0 },
        uTotalImages: { value: 1.0 },
        uBaseSize: { value: BASE_PARTICLE_SIZE }
    }), []);

    useEffect(() => {
        const timestamp = Date.now();
        fetch(`${BASE_URL}/images.txt?t=${timestamp}`)
            .then(res => res.text())
            .then(async text => {
                const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                if (lines.length === 0) return;

                const imagePixels: Float32Array[] = [];

                for (const filename of lines) {
                    const url = `${BASE_URL}/images/${filename}`;
                    try {
                        const img = new Image();
                        img.src = url;
                        img.crossOrigin = "Anonymous";
                        await new Promise((resolve, reject) => {
                            img.onload = resolve;
                            img.onerror = reject;
                        });

                        const { edgeData } = processEdges(img);
                        const shapeData = generateShapeData(edgeData);
                        imagePixels.push(shapeData);
                    } catch (e) {
                        // console.error("Failed:", filename);
                    }
                }

                if (imagePixels.length === 0) return;

                setTotalImages(imagePixels.length);

                // Texture
                const combinedData = new Float32Array(PARTICLE_COUNT * imagePixels.length * 4);
                for (let i = 0; i < imagePixels.length; i++) {
                    combinedData.set(imagePixels[i], i * PARTICLE_COUNT * 4);
                }

                const tex = new THREE.DataTexture(
                    combinedData,
                    PARTICLE_COUNT,
                    imagePixels.length,
                    THREE.RGBAFormat,
                    THREE.FloatType
                );
                tex.minFilter = THREE.NearestFilter;
                tex.magFilter = THREE.NearestFilter;
                tex.generateMipmaps = false;
                tex.needsUpdate = true;

                setTexture(tex);
                uniforms.uTex.value = tex;
                uniforms.uTotalImages.value = imagePixels.length;

                // Geometry (Points - Pulsing Particles)
                // 1 vertex per particle
                const geo = new THREE.BufferGeometry();

                const indices = new Float32Array(PARTICLE_COUNT);
                const randoms = new Float32Array(PARTICLE_COUNT);

                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    indices[i] = i;
                    randoms[i] = Math.random(); // Random phase for pulsing
                }

                geo.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1));
                geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

                // Dummy position for bounding box
                const pos = new Float32Array(PARTICLE_COUNT * 3);
                geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

                // CRITICAL FIX: Manually set bounding sphere so it doesn't get culled
                geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100);

                setPointsGeo(geo);

                cycleState.current.index = 0;
                cycleState.current.nextIndex = (1 % imagePixels.length);
                uniforms.uIndexCurrent.value = 0;
                uniforms.uIndexNext.value = cycleState.current.nextIndex;
            });
    }, []);

    useFrame((state, delta) => {
        uniforms.uTime.value = state.clock.elapsedTime;

        if (!texture || !pointsGeo) return;

        const s = cycleState.current;

        if (s.isMorphing) {
            s.morphProgress += delta / MORPH_DURATION;

            if (s.morphProgress >= 1.0) {
                s.morphProgress = 1.0;
                uniforms.uMorph.value = 1.0;

                s.index = s.nextIndex;
                s.nextIndex = (s.index + 1) % totalImages;

                uniforms.uIndexCurrent.value = s.index;
                uniforms.uIndexNext.value = s.nextIndex;

                s.morphProgress = 0.0;
                uniforms.uMorph.value = 0.0;

                s.isMorphing = false;
                s.timer = 0;
            } else {
                uniforms.uMorph.value = s.morphProgress;
            }
        } else {
            s.timer += delta;
            if (s.timer >= DISPLAY_DURATION) {
                s.isMorphing = true;
            }
        }
    });

    if (!pointsGeo) return null;

    return (
        <group>
            {/* Pulsing particles */}
            <points ref={pointsRef} geometry={pointsGeo} frustumCulled={false}>
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Outward streaks from particles */}
            {texture && (
                <OutwardStreaks texture={texture} uniforms={uniforms} />
            )}
        </group>
    );
};

const OutlinesScene = () => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
            <color attach="background" args={['#020617']} />
            <ambientLight intensity={0.5} />

            <group position={[0, 0, 0]}>
                <OutlineParticles />
            </group>
        </>
    );
};

const Outlines = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, width: '100vw', height: '100%', overflow: 'hidden' }}>
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ width: '100%', height: '100%' }}
            >
                <OutlinesScene />
            </Canvas>
        </div>
    );
};

export default Outlines;
