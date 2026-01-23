import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Proxy Cylinder for Raycasting and Interaction Detection
 */
const ProxyCylinder = ({ onHover, onClick, onPointerMove }: { onHover: (hovered: boolean) => void; onClick: () => void; onPointerMove: (point: THREE.Vector3) => void }) => {
    return (
        <mesh
            onPointerOver={() => {
                document.body.style.cursor = 'pointer';
                onHover(true);
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'auto';
                onHover(false);
            }}
            onPointerMove={(e) => {
                onPointerMove(e.point);
            }}
            onClick={onClick}
        >
            <cylinderGeometry args={[2.0, 2.0, 4, 32, 1, true]} />
            <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
    );
};

// Helper to create a text texture
const createTextTexture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    canvas.width = 1024;
    canvas.height = 512;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px monospace';
    ctx.textAlign = 'center';

    const textLines = [
        'SYSTEM_ENCRYPTED_DATA_010101',
        'A14U_CORE_PROTOCOL_ACTIVE',
        'NEURAL_NET_SYNAPSE_ESTABLISHED',
        'QUANTUM_BIT_STREAM_LOCK: SUCCESS',
        'VECTOR_FIELD_STABILIZED',
        'ALGORITHM_SENSITIVE_DATA_SCAN',
        'USER_INTERFACE_CONNECTED',
        'SF_PARTICLE_CYLINDER_v1.4'
    ];

    for (let i = 0; i < 20; i++) {
        const line = textLines[Math.floor(Math.random() * textLines.length)];
        const x = canvas.width / 2;
        const y = 50 + i * 45;
        ctx.fillText(line, x, y);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
};

const CylinderShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uExplosion: { value: 0 },
        uFloating: { value: 0 },
        uColor: { value: new THREE.Color('#00f2ff') },
        uTextTexture: { value: null as THREE.Texture | null },
        uTilt: { value: new THREE.Vector2(0, 0) },
        uMousePoint: { value: new THREE.Vector3(0, 0, -100) }, // Default far away
        uBaseSize: { value: 12.0 },
    },
    vertexShader: `
    uniform float uTime;
    uniform float uHover;
    uniform float uExplosion;
    uniform float uFloating;
    uniform vec2 uTilt;
    uniform vec3 uMousePoint;
    attribute vec4 aData; // [radius, phi, y, speed]
    varying float vDistance;
    varying vec2 vUv;
    varying float vAlpha;
    varying vec3 vPos;
    varying float vLocalInteraction;
    uniform float uBaseSize;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      float radius = aData.x;
      float phi = aData.y + uTime * 0.1; // Add rotation directly to phi
      float y = aData.z;
      float speed = aData.w;
      
      // Calculate base position with rotation already applied
      vec3 rotatedBasePos = vec3(cos(phi) * radius, y, sin(phi) * radius);
      float wave = sin(y * 2.0 + uTime * 2.0) * 0.1 * (1.0 - uHover * 0.5);
      float hoverEffect = uHover * 0.4;
      vec3 explodeDir = normalize(vec3(cos(phi), (random(vec2(phi, y)) - 0.5) * 2.0, sin(phi)));
      float explosionDist = uExplosion * (5.0 + random(vec2(y, phi)) * 5.0);
      vec3 jitter = vec3(
        sin(uTime * 0.5 + phi) * 0.2,
        cos(uTime * 0.4 + y) * 0.2,
        sin(uTime * 0.6 + speed) * 0.2
      ) * uFloating;

      vec3 pos = rotatedBasePos;
      pos += normalize(rotatedBasePos) * wave;
      pos += normalize(rotatedBasePos) * hoverEffect;

      // Constrained Repulsion: push away from mouse but preserve cylinder form
      vec3 mouseToParticle = pos - uMousePoint;
      float distToMouse = length(mouseToParticle);
      float repulsionRange = 2.2; 
      
      // Front-side mask to focus interaction on the visible half
      float frontMask = smoothstep(-0.4, 0.4, pos.z); 
      float localInteraction = smoothstep(repulsionRange, 0.0, distToMouse) * uHover * frontMask;
      
      vec3 pushDir = normalize(mouseToParticle);
      // Limit Z-projection to prevent "popping out" towards the camera
      pushDir.z *= 0.2; 
      // Reinforce radial structure: mix repulsion with an outward radial push
      pushDir = normalize(mix(pushDir, normalize(vec3(pos.x, 0.0, pos.z)), 0.4));
      
      pos += pushDir * localInteraction * 1.5;

      pos += explodeDir * explosionDist;
      pos += jitter;
      pos.xz += uTilt * y * 0.5 * (1.0 - uExplosion);

      vPos = pos;
      vLocalInteraction = localInteraction; // Pass to fragment

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      // Responsive Point Size: Adjust for device pixel density & proximity
      gl_PointSize = (uBaseSize + uHover * 6.0 + localInteraction * 15.0) * (1.0 / -mvPosition.z); 
      
      vDistance = length(pos);
      vUv = vec2(phi / (2.0 * 3.14159), (y + 2.0) / 4.0);
      // Boost base alpha for mobile visibility
      vAlpha = (0.85 + uHover * 0.15) * (1.0 - uExplosion * 0.5); 
    }
  `,
    fragmentShader: `
    uniform vec3 uColor;
    uniform sampler2D uTextTexture;
    uniform float uHover;
    uniform float uExplosion;
    varying float vDistance;
    varying vec2 vUv;
    varying float vAlpha;
    varying vec3 vPos;
    varying float vLocalInteraction;

    // Helper for rainbow color mapping
    vec3 getRainbowColor(float z) {
      float t = mod(z * 0.5 + 0.5, 1.0); // Normalize z to [0, 1] range roughly
      vec3 c1 = vec3(1.0, 0.0, 0.0); // Red
      vec3 c2 = vec3(1.0, 0.5, 0.0); // Orange
      vec3 c3 = vec3(1.0, 1.0, 0.0); // Yellow
      vec3 c4 = vec3(0.0, 1.0, 0.0); // Green
      vec3 c5 = vec3(0.0, 0.0, 1.0); // Blue
      vec3 c6 = vec3(0.5, 0.0, 0.5); // Purple
      
      float step = 1.0 / 5.0;
      if (t < step) return mix(c1, c2, t / step);
      if (t < 2.0 * step) return mix(c2, c3, (t - step) / step);
      if (t < 3.0 * step) return mix(c3, c4, (t - 2.0 * step) / step);
      if (t < 4.0 * step) return mix(c4, c5, (t - 3.0 * step) / step);
      return mix(c5, c6, (t - 4.0 * step) / step);
    }

    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      vec4 textSample = texture2D(uTextTexture, vUv);
      float textMask = textSample.r;
      
      vec3 rainbow = getRainbowColor(vPos.z);
      // Brighten the core by mixing with white based on distance from center
      vec3 coreGlow = mix(rainbow, vec3(1.0), (0.5 - dist) * 0.8 + vLocalInteraction * 0.5);
      vec3 finalColor = mix(coreGlow, vec3(1.0), textMask * 0.5 + uExplosion * 0.3);
      
      float intensity = pow(1.0 - dist * 2.0, 1.2); // Softer but broader glow for visibility
      float finalAlpha = vAlpha * (0.85 + textMask * 0.15) * intensity;
      gl_FragColor = vec4(finalColor * (1.3 + vLocalInteraction * 0.5), finalAlpha); 
    }
  `,
};

const ConnectionShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uExplosion: { value: 0 },
        uFloating: { value: 0 },
        uColor: { value: new THREE.Color('#00f2ff') },
        uTilt: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
    uniform float uTime;
    uniform float uHover;
    uniform float uExplosion;
    uniform float uFloating;
    uniform vec2 uTilt;
    attribute vec4 aData;
    varying float vAlpha;
    varying vec3 vPos;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      float radius = aData.x;
      float phi = aData.y + uTime * 0.1; // Rotate line points as well
      float y = aData.z;
      float speed = aData.w;
      
      vec3 basePos = vec3(cos(phi) * radius, y, sin(phi) * radius);
      float wave = sin(y * 2.0 + uTime * 2.0) * 0.1 * (1.0 - uHover * 0.5);
      float hoverEffect = uHover * 0.4;
      vec3 explodeDir = normalize(vec3(cos(phi), (random(vec2(phi, y)) - 0.5) * 2.0, sin(phi)));
      float explosionDist = uExplosion * (5.0 + random(vec2(y, phi)) * 5.0);
      vec3 jitter = vec3(
        sin(uTime * 0.5 + phi) * 0.2,
        cos(uTime * 0.4 + y) * 0.2,
        sin(uTime * 0.6 + speed) * 0.2
      ) * uFloating;

      vec3 pos = basePos;
      pos += normalize(basePos) * wave;
      pos += normalize(basePos) * hoverEffect;
      pos += explodeDir * explosionDist;
      pos += jitter;
      pos.xz += uTilt * y * 0.5 * (1.0 - uExplosion);

      vPos = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      vAlpha = (1.0 - uExplosion * 0.8) * 0.2;
    }
  `,
    fragmentShader: `
    varying float vAlpha;
    varying vec3 vPos;
    uniform float uTime;

    vec3 getRainbowColor(float z) {
      float t = mod(z * 0.5 + 0.5, 1.0);
      vec3 c1 = vec3(1.0, 0.0, 0.0);
      vec3 c2 = vec3(1.0, 0.5, 0.0);
      vec3 c3 = vec3(1.0, 1.0, 0.0);
      vec3 c4 = vec3(0.0, 1.0, 0.0);
      vec3 c5 = vec3(0.0, 0.0, 1.0);
      vec3 c6 = vec3(0.5, 0.0, 0.5);
      
      float step = 1.0 / 5.0;
      if (t < step) return mix(c1, c2, t / step);
      if (t < 2.0 * step) return mix(c2, c3, (t - step) / step);
      if (t < 3.0 * step) return mix(c3, c4, (t - 2.0 * step) / step);
      if (t < 4.0 * step) return mix(c4, c5, (t - 3.0 * step) / step);
      return mix(c5, c6, (t - 4.0 * step) / step);
    }

    void main() {
      vec3 rainbow = getRainbowColor(vPos.z);
      // Breathing/Fading effect based on time and position
      float fade = 0.5 + 0.5 * sin(uTime * 2.0 + vPos.x * 2.0 + vPos.y * 2.0);
      gl_FragColor = vec4(rainbow, vAlpha * fade);
    }
  `,
};

const Satellites = ({ count = 3 }) => {
    const meshRef = useRef<THREE.Group>(null);
    const sats = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            radius: 2.5 + Math.random() * 1.5,
            speed: (Math.random() - 0.5) * 0.5,
            offset: Math.random() * Math.PI * 2,
            y: (Math.random() - 0.5) * 3,
            size: 0.05 + Math.random() * 0.05
        }));
    }, [count]);

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime();
            meshRef.current.children.forEach((child, i) => {
                const s = sats[i];
                const angle = t * s.speed + s.offset;
                child.position.set(
                    Math.cos(angle) * s.radius,
                    s.y + Math.sin(t * 0.5) * 0.2,
                    Math.sin(angle) * s.radius
                );
            });
        }
    });

    return (
        <group ref={meshRef}>
            {sats.map((s, i) => (
                <mesh key={i}>
                    <sphereGeometry args={[s.size, 16, 16]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
                </mesh>
            ))}
        </group>
    );
};

const Connections = ({ particleData, count = 200, uniforms }: { particleData: Float32Array; count?: number; uniforms: any }) => {
    const lineRef = useRef<THREE.LineSegments>(null);

    const [lineGeometryData] = useMemo(() => {
        const data = new Float32Array(count * 2 * 4); // 2 points per line, 4 floats per point (aData)
        const particleCount = particleData.length / 4;

        for (let i = 0; i < count; i++) {
            const idx1 = Math.floor(Math.random() * particleCount);
            // Connect to a nearby particle in the data array for "cluster" look
            const idx2 = (idx1 + 1 + Math.floor(Math.random() * 20)) % particleCount;

            for (let j = 0; j < 4; j++) {
                data[i * 8 + j] = particleData[idx1 * 4 + j];
                data[i * 8 + 4 + j] = particleData[idx2 * 4 + j];
            }
        }
        return [data];
    }, [particleData, count]);

    useFrame(() => {
        if (lineRef.current) {
            const mat = lineRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = uniforms.uTime.value;
            mat.uniforms.uHover.value = uniforms.uHover.value;
            mat.uniforms.uExplosion.value = uniforms.uExplosion.value;
            mat.uniforms.uFloating.value = uniforms.uFloating.value;
            mat.uniforms.uTilt.value.copy(uniforms.uTilt.value);
        }
    });

    return (
        <lineSegments ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count * 2}
                    array={new Float32Array(count * 2 * 3)}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aData"
                    count={count * 2}
                    array={lineGeometryData}
                    itemSize={4}
                />
            </bufferGeometry>
            <shaderMaterial
                args={[ConnectionShaderMaterial]}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </lineSegments>
    );
};

type SceneState = 'READY' | 'EXPLODING' | 'FLOATING' | 'RETURNING';

const SFScene = () => {
    const [sceneState, setSceneState] = useState<SceneState>('READY');
    const [isHovered, setIsHovered] = useState(false);

    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const stateStartTime = useRef(0);
    const textTexture = useMemo(() => createTextTexture(), []);
    const mousePointRef = useRef(new THREE.Vector3(0, 0, -100));

    const { size } = useThree();
    const isMobile = size.width < 768;

    // Adaptive Density: Lower count on mobile to prevent Context Lost
    const particleCount = useMemo(() => isMobile ? 2500 : 8000, [isMobile]);

    const [positions, particleData] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const data = new Float32Array(particleCount * 4);

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 4;
            const radius = 1.5;
            pos[i * 3 + 0] = Math.cos(theta) * radius;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = Math.sin(theta) * radius;
            data[i * 4 + 0] = radius;
            data[i * 4 + 1] = theta;
            data[i * 4 + 2] = y;
            data[i * 4 + 3] = Math.random();
        }
        return [pos, data];
    }, [particleCount]);

    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const mouse = state.mouse;

        if (pointsRef.current) {
            // REMOVED pointsRef.current.rotation.y += 0.005; 
            // Rotation is now handled inside the Shader (Vertex Shader) for interaction accuracy
        }

        if (materialRef.current) {
            const uniforms = materialRef.current.uniforms;
            uniforms.uTime.value = t;
            uniforms.uTextTexture.value = textTexture;
            // Dramatically increase mobile size (from 15.0/30.0 -> 25.0/45.0)
            uniforms.uBaseSize.value = isMobile ? 45.0 : 25.0;

            // Updated Global Tracking logic with tighter mapping
            // Map normalized mouse (-1 to 1) to the cylinder's actual interaction zone
            // Updated Global Tracking logic with shader-based rotation alignment
            // Since mesh is static and shader rotates, mouse.x/y maps 1:1 with the cylinder's front surface
            const targetX = mouse.x * (isMobile ? 2.5 : 4.0);
            const targetY = mouse.y * (isMobile ? 3.5 : 2.5);
            mousePointRef.current.set(targetX, targetY, 1.5); // Bring point close to the visual surface
            uniforms.uMousePoint.value.lerp(mousePointRef.current, 0.15);

            const targetHover = sceneState === 'READY' ? 1.0 : 0.0;
            uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, 0.08);

            if (sceneState === 'EXPLODING') {
                uniforms.uExplosion.value = THREE.MathUtils.lerp(uniforms.uExplosion.value, 1.0, 0.05);
                uniforms.uFloating.value = THREE.MathUtils.lerp(uniforms.uFloating.value, 1.0, 0.05);
                if (uniforms.uExplosion.value > 0.98) {
                    setSceneState('FLOATING');
                    stateStartTime.current = t;
                }
            } else if (sceneState === 'FLOATING') {
                // Auto return after 6 seconds
                if (t - stateStartTime.current > 6) {
                    setSceneState('RETURNING');
                }
            } else if (sceneState === 'RETURNING') {
                uniforms.uExplosion.value = THREE.MathUtils.lerp(uniforms.uExplosion.value, 0.0, 0.03);
                uniforms.uFloating.value = THREE.MathUtils.lerp(uniforms.uFloating.value, 0.0, 0.03);
                if (uniforms.uExplosion.value < 0.02) setSceneState('READY');
            }

            if (isHovered && sceneState === 'READY') {
                uniforms.uTilt.value.x = THREE.MathUtils.lerp(uniforms.uTilt.value.x, mouse.x * 0.4, 0.05);
                uniforms.uTilt.value.y = THREE.MathUtils.lerp(uniforms.uTilt.value.y, mouse.y * 0.4, 0.05);
            } else {
                uniforms.uTilt.value.x = THREE.MathUtils.lerp(uniforms.uTilt.value.x, 0, 0.05);
                uniforms.uTilt.value.y = THREE.MathUtils.lerp(uniforms.uTilt.value.y, 0, 0.05);
            }
        }
    });

    const currentUniforms = materialRef.current?.uniforms;

    const handleHover = (hovered: boolean) => {
        setIsHovered(hovered);
    };

    const handleClick = () => {
        if (sceneState === 'READY') {
            setSceneState('EXPLODING');
        } else if (sceneState === 'FLOATING') {
            setSceneState('RETURNING');
        }
    };

    const handlePointerMove = (point: THREE.Vector3) => {
        mousePointRef.current.copy(point);
    };

    // Dynamic Camera distance based on Aspect Ratio (Ultra-Close for Mobile)
    const aspect = size.width / size.height;
    // Bring camera even closer for mobile to make cylinder feel massive
    const cameraDistance = isMobile ? Math.min(11, 7 / aspect) : 8;

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, cameraDistance]} fov={50} />
            <color attach="background" args={['#020617']} />
            <group scale={isMobile ? [1.1, 1.56, 1.1] : [1, 1, 1]}>
                <ProxyCylinder onHover={handleHover} onClick={handleClick} onPointerMove={handlePointerMove} />

                <points ref={pointsRef}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
                        <bufferAttribute attach="attributes-aData" count={particleCount} array={particleData} itemSize={4} />
                    </bufferGeometry>
                    <shaderMaterial
                        ref={materialRef}
                        args={[CylinderShaderMaterial]}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
                <Satellites count={isMobile ? 4 : 8} />
                {currentUniforms && <Connections particleData={particleData} count={isMobile ? 150 : 300} uniforms={currentUniforms} />}
            </group>

            <OrbitControls enablePan={false} enableZoom={false} makeDefault />

        </>
    );
};

const SF = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, width: '100vw', height: '100%', overflow: 'hidden' }}>
            <Canvas
                shadows
                gl={{ antialias: true }}
                dpr={[1, 2]}
                style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
            >
                <SFScene />
            </Canvas>
        </div>
    );
};

export default SF;
