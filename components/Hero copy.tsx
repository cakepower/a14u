// Hero.tsx
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { SoftShadows } from "@react-three/drei";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

function Sphere({ position = [0, 0, 0], ...props }: any) {
  const ref = useRef<any>()
  const factor = useMemo(() => 0.5 + Math.random(), [])
  useFrame((state) => {
    const t = easeInOutCubic((1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2)
    ref.current.position.y = position[1] + t * 4
    ref.current.scale.y = 1 + t * 3
  })
  return (
    <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshLambertMaterial color="white" roughness={0} metalness={0.1} />
    </mesh>
  )
}

function Spheres({ number = 20 }: { number?: number }) {
  const ref = useRef<any>()
  const positions = useMemo(() => [...new Array(number)].map(() => [3 - Math.random() * 6, Math.random() * 4, 3 - Math.random() * 6]), [])
  useFrame((state) => (ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() / 2) * Math.PI))
  return (
    <group ref={ref}>
      {positions.map((pos: any, index: number) => (
        <Sphere key={index} position={pos} />
      ))}
    </group>
  )
}

function AnimatedBackground() {
  return (
    <>
      <SoftShadows size={25} focus={0} samples={10} />
      <fog attach="fog" args={["white", 0, 40]} />
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
      </directionalLight>
      <pointLight position={[-10, 0, -20]} color="white" intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={1} />
      <group position={[0, -3.5, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[4, 1, 1]} />
          <meshLambertMaterial />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial transparent opacity={0.4} />
        </mesh>
        <Spheres />
      </group>
    </>
  );
}

type HeroProps = {
  children?: React.ReactNode;
  isMobile?: boolean;
};

export default function Hero({ children, isMobile }: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '120vh' : '100vh',
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* WebGL 배경: 이벤트를 가로채지 않도록 pointerEvents none */}
      <Canvas
        shadows
        camera={{ position: [-5, 2, 10], fov: 60 }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
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
          justifyContent: 'flex-start',
          padding: '0 1.5rem',
        }}
      >
        {/* 상단(또는 중앙) 텍스트 영역 */}
        <div style={{ paddingTop: '18vh' }}>
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              marginBottom: '1rem',
            }}
          >
            Welcome to A14U Magazine
          </h1>
          <p
            style={{
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
            marginTop: '1rem', 
            paddingBottom: '4vh',
            maxHeight: '155vh',
            overflowY: 'hidden', }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
