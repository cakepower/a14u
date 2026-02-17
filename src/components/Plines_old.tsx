import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const PARTICLE_COUNT = 2000;

// Shaders
const vertexShader = `
  uniform float uTime;
  uniform float uTheme;
  attribute float aSize;
  attribute vec3 aRandom;
  attribute float aFalling;
  varying vec3 vColor;

  void main() {
    vec3 color = vec3(0.0, 0.95, 1.0); // Default Neon Blue (Theme 0)
    
    // Explicit range checks for themes
    if (uTheme > 0.5 && uTheme < 1.5) { // Theme 1: Sunset
        color = mix(vec3(1.0, 0.4, 0.0), vec3(0.9, 0.0, 0.5), position.y * 0.2 + 0.5);
    } else if (uTheme > 1.5 && uTheme < 2.5) { // Theme 2: Aurora
        color = mix(vec3(0.0, 1.0, 0.5), vec3(0.5, 0.0, 1.0), sin(uTime + position.x * 0.5) * 0.5 + 0.5);
    } else if (uTheme > 2.5 && uTheme < 3.5) { // Theme 3: Cyber
        color = mix(vec3(1.0, 0.0, 0.8), vec3(0.0, 0.8, 1.0), aRandom.x);
    } else if (uTheme > 3.5 && uTheme < 4.5) { // Theme 4: Dynamic
        color = mix(vec3(0.1, 0.4, 1.0), vec3(1.0, 0.2, 0.2), aFalling);
    }
    
    vColor = color;
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    float pulsation = 1.0 + sin(uTime * 2.5 + aRandom.y * 20.0) * 0.8;
    gl_PointSize = aSize * (200.0 / -mvPosition.z) * pulsation;
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.9);
  }
`;

const ParticleAlphabet = ({ theme }: { theme: number }) => {
    const { mouse, camera } = useThree();
    const pointsRef = useRef<THREE.Points>(null);
    const [geo, setGeo] = useState<THREE.BufferGeometry | null>(null);

    // Stable particles data - remains constant once initialized
    const particles = useMemo(() => {
        return new Array(PARTICLE_COUNT).fill(0).map(() => ({
            basePos: new THREE.Vector3(),
            currPos: new THREE.Vector3(),
            vel: new THREE.Vector3(),
            isFalling: false,
            fallenTime: 0,
            size: 0,
            random: new THREE.Vector3()
        }));
    }, []);

    // Stable uniforms object - prevents material re-initialization
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uTheme: { value: theme }
    }), []);

    // Reactive update for uTheme when prop changes
    useEffect(() => {
        uniforms.uTheme.value = theme;
    }, [theme, uniforms]);

    // Load font and create geometry ONLY ONCE
    useEffect(() => {
        const loader = new FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
            const textGeo = new TextGeometry('sadi', {
                font: font,
                size: 5,
                depth: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 3
            });

            textGeo.center();

            const mesh = new THREE.Mesh(textGeo);
            const sampler = new MeshSurfaceSampler(mesh).build();

            const positions = new Float32Array(PARTICLE_COUNT * 3);
            const sizes = new Float32Array(PARTICLE_COUNT);
            const randoms = new Float32Array(PARTICLE_COUNT * 3);
            const fallings = new Float32Array(PARTICLE_COUNT);

            const tempPosition = new THREE.Vector3();
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                sampler.sample(tempPosition);

                particles[i].basePos.copy(tempPosition);
                particles[i].currPos.copy(tempPosition);
                particles[i].size = Math.random() * 0.6 + 0.3;
                particles[i].random.set(Math.random(), Math.random(), Math.random());

                positions[i * 3] = tempPosition.x;
                positions[i * 3 + 1] = tempPosition.y;
                positions[i * 3 + 2] = tempPosition.z;

                sizes[i] = particles[i].size;
                randoms[i * 3] = particles[i].random.x;
                randoms[i * 3 + 1] = particles[i].random.y;
                randoms[i * 3 + 2] = particles[i].random.z;
                fallings[i] = 0;
            }

            const bufferGeo = new THREE.BufferGeometry();
            bufferGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            bufferGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
            bufferGeo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
            bufferGeo.setAttribute('aFalling', new THREE.BufferAttribute(fallings, 1));

            setGeo(bufferGeo);
            textGeo.dispose();
        });
    }, [particles]);

    useFrame((state) => {
        if (!pointsRef.current || !geo) return;

        const time = state.clock.elapsedTime;
        uniforms.uTime.value = time;
        uniforms.uTheme.value = theme; // Ensure theme is always in sync with prop

        const posAttr = geo.attributes.position as THREE.BufferAttribute;
        const fallAttr = geo.attributes.aFalling as THREE.BufferAttribute;

        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const mouseWorld = camera.position.clone().add(dir.multiplyScalar(distance));

        const pickingMouse = mouseWorld.clone().sub(new THREE.Vector3(0, 2.5, 0));

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = particles[i];

            if (!p.isFalling) {
                const wave = Math.sin(time * 1.2 + p.basePos.y * 0.8) * 0.3;
                const jitterX = Math.sin(time * 1.5 + p.basePos.y * 2.0) * 0.03 * p.random.x;
                const jitterY = Math.cos(time * 1.2 + p.basePos.x * 2.0) * 0.03 * p.random.y;

                const animatedPos = p.basePos.clone();
                animatedPos.x += wave + jitterX;
                animatedPos.y += jitterY;

                if (animatedPos.distanceTo(pickingMouse) < 0.6) {
                    p.isFalling = true;
                    p.fallenTime = time;
                    p.vel.set(
                        (Math.random() - 0.5) * 0.1,
                        (Math.random() - 0.2) * 0.05,
                        (Math.random() - 0.5) * 0.1
                    );
                    fallAttr.setX(i, 1.0);
                } else {
                    p.currPos.copy(animatedPos);
                    fallAttr.setX(i, 0.0);
                }
            }

            if (p.isFalling) {
                const elapsedSinceFall = time - p.fallenTime;

                if (elapsedSinceFall < 5.0) {
                    p.vel.y -= 0.005;
                    p.currPos.add(p.vel);
                } else {
                    const wave = Math.sin(time * 1.2 + p.basePos.y * 0.8) * 0.3;
                    const targetPos = p.basePos.clone();
                    targetPos.x += wave;

                    p.currPos.lerp(targetPos, 0.05);

                    if (p.currPos.distanceTo(targetPos) < 0.01) {
                        p.isFalling = false;
                        p.vel.set(0, 0, 0);
                        fallAttr.setX(i, 0.0);
                    }
                }
            }

            posAttr.setXYZ(i, p.currPos.x, p.currPos.y, p.currPos.z);
        }

        posAttr.needsUpdate = true;
        fallAttr.needsUpdate = true;
    });

    if (!geo) return null;

    return (
        <points ref={pointsRef}>
            <primitive object={geo} attach="geometry" />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const PlinesScene = ({ theme }: { theme: number }) => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <color attach="background" args={['#020617']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            <group position={[0, 2.5, 0]}>
                <ParticleAlphabet theme={theme} />
            </group>
        </>
    );
};

const Plines = ({ theme }: { theme: number }) => {
    return (
        <div style={{ position: 'absolute', inset: 0, width: '100vw', height: '100%', overflow: 'hidden' }}>
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                style={{ width: '100%', height: '100%' }}
            >
                <PlinesScene theme={theme} />
            </Canvas>
        </div>
    );
};

export default Plines;
