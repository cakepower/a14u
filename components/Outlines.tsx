import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * CONFIGURATION
 */
const PARTICLE_COUNT = 5000;
const DISPLAY_DURATION = 10.0;
const MORPH_DURATION = 1.5;
const BASE_URL = '/a14u';
const BASE_PARTICLE_SIZE = 55.0;

// Background Lines Configuration
const MASK_SIZE = 128;
const LINE_ROWS = 80;
const LINE_X_RANGE = 9;
const LINE_Y_MIN = -6;
const LINE_Y_MAX = 6;

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

  attribute float aIndex;
  attribute float aRandom;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vPulse;

  vec3 getPalette(float posX) {
      vec3 c1 = vec3(0.0, 1.0, 1.0);
      vec3 c2 = vec3(1.0, 0.0, 1.0);
      float t = smoothstep(-5.0, 5.0, posX);
      return mix(c1, c2, t);
  }

  void main() {
    float u = (aIndex + 0.5) / 3000.0;
    float vCur  = (uIndexCurrent + 0.5) / uTotalImages;
    float vNext = (uIndexNext + 0.5) / uTotalImages;

    vec4 dataStart = texture2D(uTex, vec2(u, vCur));
    vec4 dataEnd   = texture2D(uTex, vec2(u, vNext));

    float transition = smoothstep(0.0, 1.0, uMorph);
    vec3 pos = mix(dataStart.rgb, dataEnd.rgb, transition);
    pos.z += sin(uTime + pos.x * 2.0) * 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float pulseSpeed = 1.5 + aRandom * 2.0;
    vPulse = 0.3 + 0.7 * sin(uTime * pulseSpeed + aRandom * 6.28318);

    float sizePulse = 0.3 + 0.7 * vPulse;
    gl_PointSize = uBaseSize * sizePulse * (1.0 / -mvPosition.z);

    vColor = getPalette(pos.x);
    vAlpha = 0.7 + 0.3 * vPulse;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vPulse;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float coreBrightness = 0.5 + 0.5 * vPulse;
    vec3 coreGlow = mix(vColor, vec3(1.0), (0.5 - dist) * coreBrightness);

    float intensity = pow(1.0 - dist * 2.0, 1.0);
    float finalAlpha = vAlpha * intensity;

    gl_FragColor = vec4(coreGlow * (1.5 + vPulse * 0.5), finalAlpha);
  }
`;

/**
 * SHADERS - Background Horizontal Lines (masked by foreground)
 */
const lineVertexShader = `
  varying vec2 vWorldPos;

  void main() {
    vWorldPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const lineFragmentShader = `
  uniform float uTime;
  uniform float uMorph;
  uniform sampler2D uMaskTex;
  uniform float uIndexCurrent;
  uniform float uIndexNext;
  uniform float uTotalImages;
  uniform float uImageAspect;

  varying vec2 vWorldPos;

  void main() {
    // World position -> mask UV
    float u = vWorldPos.x / (10.0 * uImageAspect) + 0.5;
    float v = 0.5 - vWorldPos.y / 10.0;

    // Outside image bounds -> draw line normally
    if (u >= 0.0 && u <= 1.0 && v >= 0.0 && v <= 1.0) {
      // Sample current and next mask
      float maskV_cur = (uIndexCurrent + v) / uTotalImages;
      float maskV_next = (uIndexNext + v) / uTotalImages;

      float maskCur = texture2D(uMaskTex, vec2(u, maskV_cur)).r;
      float maskNext = texture2D(uMaskTex, vec2(u, maskV_next)).r;

      float transition = smoothstep(0.0, 1.0, uMorph);
      float mask = mix(maskCur, maskNext, transition);

      // Foreground -> discard (no line inside the shape)
      if (mask > 0.5) discard;
    }

    // Background -> draw line
    vec3 color = vec3(0.25, 0.35, 0.6);
    float flicker = 0.8 + 0.2 * sin(uTime * 0.5 + vWorldPos.y * 3.0);
    float alpha = 0.6 * flicker;

    gl_FragColor = vec4(color, alpha);
  }
`;

// --- IMAGE PROCESSING ---
function processEdges(img: HTMLImageElement): {
    edgeData: { pos: THREE.Vector3, angle: number }[],
    binary: Uint8Array,
    width: number,
    height: number
} {
    const w = img.width;
    const h = img.height;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return { edgeData: [], binary: new Uint8Array(0), width: w, height: h };

    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, w, h).data;

    const gray = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
        gray[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
    }

    // 5x5 blur
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

    // Otsu's threshold
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

    // Sobel gradients (for contour angle)
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

    // Extract contour only
    const edgeData: { pos: THREE.Vector3, angle: number }[] = [];
    const aspect = w / h;
    const margin = Math.min(w, h) * 0.05;

    for (let y = 2; y < h - 2; y++) {
        for (let x = 2; x < w - 2; x++) {
            if (x < margin || x > w - margin || y < margin || y > h - margin) continue;

            const val = binary[y * w + x];
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

    return { edgeData, binary, width: w, height: h };
}

function generateShapeData(edgeData: { pos: THREE.Vector3, angle: number }[]): Float32Array {
    const arr = new Float32Array(PARTICLE_COUNT * 4);

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

// Downsample binary mask to fixed MASK_SIZE
function createMaskData(binary: Uint8Array, w: number, h: number): Float32Array {
    const mask = new Float32Array(MASK_SIZE * MASK_SIZE * 4);
    for (let my = 0; my < MASK_SIZE; my++) {
        for (let mx = 0; mx < MASK_SIZE; mx++) {
            const sx = Math.min(w - 1, Math.floor(mx / MASK_SIZE * w));
            const sy = Math.min(h - 1, Math.floor(my / MASK_SIZE * h));
            const val = binary[sy * w + sx];
            const idx = (my * MASK_SIZE + mx) * 4;
            mask[idx] = val;     // R = foreground mask
            mask[idx + 1] = 0;
            mask[idx + 2] = 0;
            mask[idx + 3] = 1;
        }
    }
    return mask;
}

// Background Horizontal Lines Component
const BackgroundLines = ({ maskTexture, uniforms, imageAspect }: {
    maskTexture: THREE.DataTexture;
    uniforms: any;
    imageAspect: number;
}) => {
    const lineUniforms = useMemo(() => ({
        uTime: uniforms.uTime,
        uMorph: uniforms.uMorph,
        uMaskTex: { value: maskTexture },
        uIndexCurrent: uniforms.uIndexCurrent,
        uIndexNext: uniforms.uIndexNext,
        uTotalImages: uniforms.uTotalImages,
        uImageAspect: { value: imageAspect }
    }), [maskTexture, uniforms, imageAspect]);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(LINE_ROWS * 2 * 3);

        for (let i = 0; i < LINE_ROWS; i++) {
            const y = LINE_Y_MIN + (LINE_Y_MAX - LINE_Y_MIN) * i / (LINE_ROWS - 1);
            // Start point
            positions[i * 6 + 0] = -LINE_X_RANGE;
            positions[i * 6 + 1] = y;
            positions[i * 6 + 2] = -0.01; // slightly behind particles
            // End point
            positions[i * 6 + 3] = LINE_X_RANGE;
            positions[i * 6 + 4] = y;
            positions[i * 6 + 5] = -0.01;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 100);
        return geo;
    }, []);

    return (
        <lineSegments geometry={geometry} frustumCulled={false}>
            <shaderMaterial
                uniforms={lineUniforms}
                vertexShader={lineVertexShader}
                fragmentShader={lineFragmentShader}
                transparent
                depthWrite={false}
            />
        </lineSegments>
    );
};

const OutlineParticles = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const [pointsGeo, setPointsGeo] = useState<THREE.BufferGeometry | null>(null);
    const [texture, setTexture] = useState<THREE.DataTexture | null>(null);
    const [maskTexture, setMaskTexture] = useState<THREE.DataTexture | null>(null);
    const [imageAspect, setImageAspect] = useState(1.0);
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
                const maskPixels: Float32Array[] = [];
                let firstAspect = 1.0;

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

                        const { edgeData, binary, width, height } = processEdges(img);
                        const shapeData = generateShapeData(edgeData);
                        imagePixels.push(shapeData);

                        const maskData = createMaskData(binary, width, height);
                        maskPixels.push(maskData);

                        if (firstAspect === 1.0 && width > 0 && height > 0) {
                            firstAspect = width / height;
                        }
                    } catch (e) {
                        // console.error("Failed:", filename);
                    }
                }

                if (imagePixels.length === 0) return;

                setTotalImages(imagePixels.length);
                setImageAspect(firstAspect);

                // Particle DataTexture
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

                // Mask DataTexture (all images stacked vertically)
                const combinedMask = new Float32Array(MASK_SIZE * MASK_SIZE * maskPixels.length * 4);
                for (let i = 0; i < maskPixels.length; i++) {
                    combinedMask.set(maskPixels[i], i * MASK_SIZE * MASK_SIZE * 4);
                }

                const mTex = new THREE.DataTexture(
                    combinedMask,
                    MASK_SIZE,
                    MASK_SIZE * maskPixels.length,
                    THREE.RGBAFormat,
                    THREE.FloatType
                );
                mTex.minFilter = THREE.LinearFilter;
                mTex.magFilter = THREE.LinearFilter;
                mTex.generateMipmaps = false;
                mTex.needsUpdate = true;
                setMaskTexture(mTex);

                // Points Geometry
                const geo = new THREE.BufferGeometry();
                const indices = new Float32Array(PARTICLE_COUNT);
                const randoms = new Float32Array(PARTICLE_COUNT);
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    indices[i] = i;
                    randoms[i] = Math.random();
                }
                geo.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1));
                geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
                const pos = new Float32Array(PARTICLE_COUNT * 3);
                geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
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
            {/* Background horizontal lines (masked by foreground) */}
            {maskTexture && (
                <BackgroundLines maskTexture={maskTexture} uniforms={uniforms} imageAspect={imageAspect} />
            )}

            {/* Pulsing particles on contour */}
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
