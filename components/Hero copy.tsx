// Hero.tsx
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { SoftShadows } from "@react-three/drei";
import Plines from "./Plines";
import SF from "./SF";

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
  return <Plines />;
}

type HeroProps = {
  children?: React.ReactNode;
  isMobile?: boolean;
};

export default function Hero({ children, isMobile }: HeroProps) {
  const BackgroundComponent = useMemo(() => {
    return Math.random() > 0.5 ? <Plines /> : <SF />;
  }, []);
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
      {/* WebGL 배경: 상호작용을 위해 컨테이너 설정 */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {BackgroundComponent}
      </div>

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
          pointerEvents: 'none', // Allow background interaction
        }}
      >
        {/* 상단(또는 중앙) 텍스트 영역 */}
        <div style={{ paddingTop: isMobile ? '12vh' : '18vh' }}>
          <h1
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
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
            A14U는 인공지능이 결합된 사물과의 관계를 새로운 시각으로 바라봅니다.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', pointerEvents: 'auto' }}>
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
            overflowY: 'hidden',
            pointerEvents: 'auto', // Allow interaction in child gallery
          }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
