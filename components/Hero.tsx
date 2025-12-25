// Hero.tsx
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef } from 'react';

function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const start = useRef(Date.now());

  useFrame(() => {
    const t = (Date.now() - start.current) / 1000;
    if (!meshRef.current) return;
    meshRef.current.rotation.z = t * 0.05;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = t;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[4, 128, 128]} />
      <shaderMaterial
        side={THREE.BackSide}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color('#050816') },
          uColor2: { value: new THREE.Color('#7c3aed') },
          uColor3: { value: new THREE.Color('#22d3ee') },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;

          float wave(vec2 p) {
            return sin(p.x * 4.0 + uTime * 0.8) * 0.2 +
                   sin(p.y * 6.0 - uTime * 1.2) * 0.2;
          }

          void main() {
            vec2 uv = vUv;
            float w = wave(uv);
            vec3 color = mix(uColor1, uColor2, uv.y + w);
            color = mix(color, uColor3, smoothstep(0.4, 0.9, uv.x + w));
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

type HeroProps = {
  children?: React.ReactNode;
};

export default function Hero({ children }: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* WebGL 배경: 이벤트를 가로채지 않도록 pointerEvents none */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.4} />
        <AnimatedBackground />
      </Canvas>

      {/* 오버레이 콘텐츠 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1120px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 1.5rem',
        }}
      >
        {/* 상단(또는 중앙) 텍스트 영역 */}
        <div style={{ paddingTop: '18vh' }}>
          <h1
            style={{
              fontFamily: 'GmarketSans, sans-serif',
              fontSize: '3rem',
              fontWeight: 800,
              marginBottom: '1rem',
            }}
          >
            Welcome to A14U Magazine
          </h1>
          <p
            style={{
              fontFamily: 'GmarketSans, sans-serif',
              fontSize: '1.1rem',
              maxWidth: '32rem',
              opacity: 0.9,
            }}
          >
            A14U Web Magazine 이 곧 12월호를 출간할 예정입니다.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => {
                window.location.href = 'https://www.cakepower.net/blog';
              }}
              style={{
                padding: '0.9rem 1.8rem',
                borderRadius: '999px',
                border: 'none',
                background: 'linear-gradient(135deg, #7c3aed, #22d3ee)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Go Back to Blog
            </button>
          </div>
        </div>

        {/* 하단 오버레이 슬롯: 갤러리 같은 콘텐츠를 Hero 위에 “텍스트처럼” 얹기 */}
        {children && (
          <div style={{ 
            marginTop: 'auto', 
            paddingBottom: '4vh',
            maxHeight: '55vh',
            overflowY: 'auto', }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
