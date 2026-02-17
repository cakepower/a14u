import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const FONT_URL = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';
const WORDS = ['', 'sadi', 'is', 'on'];
const PARTICLE_COUNT = 3000;
const MAX_CONNECTIONS = 2000;
const CONNECTION_DISTANCE = 0.8;
const CHANGE_INTERVAL = 5000; // 5 seconds per word cycle
const TRANSITION_DURATION = 1500; // 1.5 seconds for morphing

const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  attribute float pSize;
  attribute vec3 aRandom;
  attribute vec3 targetPosition;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Morph between current and target position
    vec3 pos = mix(position, targetPosition, uMorph);
    vec3 animatedPos = pos;
    
    // Friction-like "Stick-Slip" motion
    float t = uTime * (0.3 + aRandom.x * 0.2);
    float progress = floor(t * 5.0) / 5.0 + smoothstep(0.7, 1.0, fract(t * 5.0)) * 0.2;
    
    animatedPos.x += sin(progress * 10.0 + aRandom.y * 100.0) * 0.05;
    animatedPos.y += cos(progress * 8.0 + aRandom.z * 100.0) * 0.05;
    
    // High-frequency "Friction Vibration"
    float slip = smoothstep(0.7, 1.0, fract(t * 5.0));
    float vibration = sin(uTime * 120.0 + aRandom.x * 1000.0) * 0.008 * slip;
    animatedPos += vec3(vibration);

    vec4 mvPosition = modelViewMatrix * vec4(animatedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    float attenuation = 15.0 / -mvPosition.z;
    gl_PointSize = pSize * attenuation;
    
    vec3 baseColor = mix(vec3(0.0, 0.8, 1.0), vec3(0.4, 0.0, 1.0), (pos.x + 5.0) / 10.0);
    vec3 hotColor = vec3(1.0, 0.9, 0.5); 
    
    vColor = mix(baseColor, hotColor, slip * 0.8);
    vAlpha = (0.3 + 0.4 * slip) * mix(1.0, 0.8, uMorph);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    float glow = pow(1.0 - dist * 2.0, 2.0);
    gl_FragColor = vec4(vColor * 1.8, vAlpha * glow);
  }
`;

const lineVertexShader = `
  uniform float uTime;
  uniform float uMorph;
  attribute float aRandom;
  attribute vec3 targetPosition;
  varying float vAlpha;
  attribute float aAlpha;
  varying vec3 vColor;

  void main() {
    vec3 pos = mix(position, targetPosition, uMorph);
    vec3 animatedPos = pos;
    
    float t = uTime * (0.3 + aRandom * 0.2);
    float progress = floor(t * 5.0) / 5.0 + smoothstep(0.7, 1.0, fract(t * 5.0)) * 0.2;
    float slip = smoothstep(0.7, 1.0, fract(t * 5.0));
    
    animatedPos.x += sin(progress * 10.0 + aRandom * 50.0) * 0.05;
    animatedPos.y += cos(progress * 8.0 + aRandom * 40.0) * 0.05;
    
    vAlpha = aAlpha * (1.1 + slip * 0.5);
    vColor = mix(vec3(0.0, 1.0, 1.0), vec3(1.0, 1.0, 0.8), slip * 0.4);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(animatedPos, 1.0);
  }
`;

const lineFragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, vAlpha * 0.15);
  }
`;

const ConnectingLines = ({
    pointsCurrent,
    pointsTarget,
    morphProgress
}: {
    pointsCurrent: THREE.Vector3[],
    pointsTarget: THREE.Vector3[],
    morphProgress: number
}) => {
    const lineRef = useRef<THREE.LineSegments>(null);
    const subsetCount = 250;

    const [linePositions, lineAlphas, lineRandoms, targetPositions] = useMemo(() => {
        return [
            new Float32Array(MAX_CONNECTIONS * 2 * 3),
            new Float32Array(MAX_CONNECTIONS * 2),
            new Float32Array(MAX_CONNECTIONS * 2),
            new Float32Array(MAX_CONNECTIONS * 2 * 3)
        ];
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMorph: { value: 0 }
    }), []);

    const scratchV1 = useMemo(() => new THREE.Vector3(), []);
    const scratchV2 = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        if (!lineRef.current) return;
        const time = state.clock.elapsedTime;
        uniforms.uTime.value = time;
        uniforms.uMorph.value = morphProgress;

        let connectionIdx = 0;
        const pLen = PARTICLE_COUNT;
        const subsetIndices: number[] = [];
        for (let i = 0; i < subsetCount; i++) {
            subsetIndices.push(Math.floor(i * (pLen / subsetCount)));
        }

        const geo = lineRef.current.geometry;
        const posAttr = geo.attributes.position;
        const targetAttr = geo.attributes.targetPosition;
        const alphaAttr = geo.attributes.aAlpha;
        const randAttr = geo.attributes.aRandom;

        const currentLen = pointsCurrent.length;
        const targetLen = pointsTarget.length;

        for (let i = 0; i < subsetCount && connectionIdx < MAX_CONNECTIONS; i++) {
            const idx1 = subsetIndices[i];
            const p1c = pointsCurrent[idx1 % currentLen];
            const p1t = pointsTarget[idx1 % targetLen];

            // Interpolated position for distance threshold calc (using scratch to avoid GC)
            scratchV1.copy(p1c).lerp(p1t, morphProgress);
            const rand1 = (i / subsetCount);

            for (let j = i + 1; j < subsetCount && connectionIdx < MAX_CONNECTIONS; j++) {
                const idx2 = subsetIndices[j];
                const p2c = pointsCurrent[idx2 % currentLen];
                const p2t = pointsTarget[idx2 % targetLen];
                scratchV2.copy(p2c).lerp(p2t, morphProgress);

                const dist = scratchV1.distanceTo(scratchV2);

                if (dist < CONNECTION_DISTANCE) {
                    const idx = connectionIdx * 2;

                    linePositions[idx * 3 + 0] = p1c.x;
                    linePositions[idx * 3 + 1] = p1c.y;
                    linePositions[idx * 3 + 2] = p1c.z;
                    linePositions[(idx + 1) * 3 + 0] = p2c.x;
                    linePositions[(idx + 1) * 3 + 1] = p2c.y;
                    linePositions[(idx + 1) * 3 + 2] = p2c.z;

                    targetPositions[idx * 3 + 0] = p1t.x;
                    targetPositions[idx * 3 + 1] = p1t.y;
                    targetPositions[idx * 3 + 2] = p1t.z;
                    targetPositions[(idx + 1) * 3 + 0] = p2t.x;
                    targetPositions[(idx + 1) * 3 + 1] = p2t.y;
                    targetPositions[(idx + 1) * 3 + 2] = p2t.z;

                    const alpha = 1.0 - (dist / CONNECTION_DISTANCE);
                    lineAlphas[idx] = alpha;
                    lineAlphas[idx + 1] = alpha;

                    lineRandoms[idx] = rand1;
                    lineRandoms[idx + 1] = (j / subsetCount);

                    connectionIdx++;
                }
            }
        }

        posAttr.needsUpdate = true;
        targetAttr.needsUpdate = true;
        alphaAttr.needsUpdate = true;
        randAttr.needsUpdate = true;
        geo.setDrawRange(0, connectionIdx * 2);
    });

    return (
        <lineSegments ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={MAX_CONNECTIONS * 2} array={linePositions} itemSize={3} />
                <bufferAttribute attach="attributes-targetPosition" count={MAX_CONNECTIONS * 2} array={targetPositions} itemSize={3} />
                <bufferAttribute attach="attributes-aAlpha" count={MAX_CONNECTIONS * 2} array={lineAlphas} itemSize={1} />
                <bufferAttribute attach="attributes-aRandom" count={MAX_CONNECTIONS * 2} array={lineRandoms} itemSize={1} />
            </bufferGeometry>
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={lineVertexShader}
                fragmentShader={lineFragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </lineSegments>
    );
};



const OutlineParticles = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const [allWordPoints, setAllWordPoints] = useState<THREE.Vector3[][]>([]);
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
    const [wordIndex, setWordIndex] = useState(0);
    const [morphProgress, setMorphProgress] = useState(0);
    const lastChangeTime = useRef(-1);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMorph: { value: 0 }
    }), []);

    useEffect(() => {
        const loader = new FontLoader();
        loader.load(FONT_URL, (font) => {
            const wordData: THREE.Vector3[][] = WORDS.map(text => {
                const shapes = font.generateShapes(text, 4);
                const points: THREE.Vector3[] = [];
                shapes.forEach(shape => {
                    const mainPoints = shape.getSpacedPoints(Math.floor(PARTICLE_COUNT / shapes.length / 2));
                    points.push(...mainPoints.map(p => new THREE.Vector3(p.x, p.y, 0)));
                    shape.holes.forEach(hole => {
                        const holePoints = hole.getSpacedPoints(Math.floor(PARTICLE_COUNT / shapes.length / 4));
                        points.push(...holePoints.map(p => new THREE.Vector3(p.x, p.y, 0)));
                    });
                });
                if (points.length === 0) {
                    points.push(new THREE.Vector3(0, 0, 0));
                }
                // Center the points
                const box = new THREE.Box3().setFromPoints(points);
                const center = new THREE.Vector3();
                box.getCenter(center);
                points.forEach(p => p.sub(center));
                return points;
            });
            setAllWordPoints(wordData);

            // Pre-calculate buffers for first word ('sadi')
            const posArr = new Float32Array(PARTICLE_COUNT * 3);
            const targetArr = new Float32Array(PARTICLE_COUNT * 3);
            const pSizes = new Float32Array(PARTICLE_COUNT);
            const randoms = new Float32Array(PARTICLE_COUNT * 3);

            const p1s = wordData[0];
            const p2s = wordData[1 % wordData.length];

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const p1 = p1s[i % p1s.length];
                const p2 = p2s[i % p2s.length];
                posArr[i * 3 + 0] = p1.x; posArr[i * 3 + 1] = p1.y; posArr[i * 3 + 2] = p1.z;
                targetArr[i * 3 + 0] = p2.x; targetArr[i * 3 + 1] = p2.y; targetArr[i * 3 + 2] = p2.z;
                pSizes[i] = Math.random() * 4.0 + 1.2;
                randoms[i * 3 + 0] = Math.random();
                randoms[i * 3 + 1] = Math.random();
                randoms[i * 3 + 2] = Math.random();
            }

            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
            geo.setAttribute('targetPosition', new THREE.BufferAttribute(targetArr, 3));
            geo.setAttribute('pSize', new THREE.BufferAttribute(pSizes, 1));
            geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

            setGeometry(geo);
        });
    }, []);

    useFrame((state) => {
        if (allWordPoints.length === 0 || !geometry) return;

        const now = state.clock.elapsedTime * 1000;
        if (lastChangeTime.current === -1) {
            lastChangeTime.current = now;
        }

        const timeSinceChange = now - lastChangeTime.current;
        const nextWordIndex = (wordIndex + 1) % WORDS.length;

        // Morph logic: last 2 seconds of cycle
        if (timeSinceChange > CHANGE_INTERVAL - TRANSITION_DURATION) {
            const progress = (timeSinceChange - (CHANGE_INTERVAL - TRANSITION_DURATION)) / TRANSITION_DURATION;
            const easedProgress = 1.0 - Math.pow(1.0 - progress, 3); // Ease out cubic
            setMorphProgress(Math.min(easedProgress, 1.0));

            if (timeSinceChange >= CHANGE_INTERVAL) {
                setWordIndex(nextWordIndex);
                setMorphProgress(0);
                lastChangeTime.current = now;
            }
        } else {
            setMorphProgress(0);
        }

        // Update Shader Uniforms
        uniforms.uTime.value = state.clock.elapsedTime;
        uniforms.uMorph.value = morphProgress;

        // Update Geometry Buffers (Performance optimized)
        const currentPoints = allWordPoints[wordIndex];
        const nextPoints = allWordPoints[nextWordIndex];

        const posAttr = geometry.attributes.position;
        const targetAttr = geometry.attributes.targetPosition;
        const posArr = posAttr.array as Float32Array;
        const targetArr = targetAttr.array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p1 = currentPoints[i % currentPoints.length];
            const p2 = nextPoints[i % nextPoints.length];
            posArr[i * 3 + 0] = p1.x; posArr[i * 3 + 1] = p1.y; posArr[i * 3 + 2] = p1.z;
            targetArr[i * 3 + 0] = p2.x; targetArr[i * 3 + 1] = p2.y; targetArr[i * 3 + 2] = p2.z;
        }

        posAttr.needsUpdate = true;
        targetAttr.needsUpdate = true;
    });

    if (allWordPoints.length === 0 || !geometry) return null;

    const nextIdx = (wordIndex + 1) % WORDS.length;

    return (
        <group>
            <points ref={pointsRef} geometry={geometry}>
                <shaderMaterial
                    uniforms={uniforms}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <ConnectingLines
                pointsCurrent={allWordPoints[wordIndex]}
                pointsTarget={allWordPoints[nextIdx]}
                morphProgress={morphProgress}
            />
        </group>
    );
};

const SLinesScene = () => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.2} />
            <color attach="background" args={['#020617']} />
            <ambientLight intensity={0.5} />

            <group position={[0, 2.5, 0]}>
                <OutlineParticles />
            </group>
        </>
    );
};

const SLines = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, width: '100vw', height: '100%', overflow: 'hidden' }}>
            <Canvas
                gl={{ antialias: true }}
                dpr={[1, 2]}
                style={{ width: '100%', height: '100%' }}
            >
                <SLinesScene />
            </Canvas>
        </div>
    );
};

export default SLines;
