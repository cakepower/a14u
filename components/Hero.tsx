import React, { useRef, useMemo, useState } from 'react';
import Plines from "./Plines";
import SF from "./SF";
import SLines from "./SLines";
import Outlines from "./Outlines";

type HeroProps = {
  children?: React.ReactNode;
  isMobile?: boolean;
};

export default function Hero({ children, isMobile }: HeroProps) {
  const [backgroundType, setBackgroundType] = useState<'SF' | 'Plines' | 'SLines' | 'Outlines'>('Plines');
  const [plinesTheme, setPlinesTheme] = useState(0);



  const themes = [
    { name: 'SF Cylinder', color: 'linear-gradient(135deg, #00f2ff, #0066ff)' },
    { name: 'SLines', color: 'linear-gradient(135deg, #7c3aed, #22d3ee)' },
    { name: 'Outlines', color: 'linear-gradient(135deg, #00f2ff, #7c3aed)' },
    { name: 'Original', color: '#00f2ff' },
    { name: 'Sunset', color: '#ff6600' },
    { name: 'Aurora', color: '#00ff80' },
    { name: 'Cyber', color: '#ff00cc' },
    { name: 'Dynamic', color: '#ff3333' }
  ];

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
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {backgroundType === 'SF' ? (
          <SF />
        ) : backgroundType === 'SLines' ? (
          <SLines />
        ) : backgroundType === 'Outlines' ? (
          <Outlines />
        ) : (
          <Plines theme={plinesTheme} />
        )}
      </div>

      {/* 테마 스위처 UI (Hero 섹션 상단 또는 하단에 배치) */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? '10vh' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '10px 18px',
        borderRadius: '50px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 10,
        pointerEvents: 'auto'
      }}>
        {themes.map((t, i) => {
          const isActive =
            (i === 0 && backgroundType === 'SF') ||
            (i === 1 && backgroundType === 'SLines') ||
            (i === 2 && backgroundType === 'Outlines') ||
            (i > 2 && backgroundType === 'Plines' && plinesTheme === i - 3);
          return (
            <button
              key={i}
              onClick={() => {
                if (i === 0) {
                  setBackgroundType('SF');
                } else if (i === 1) {
                  setBackgroundType('SLines');
                } else if (i === 2) {
                  setBackgroundType('Outlines');
                } else {
                  setBackgroundType('Plines');
                  setPlinesTheme(i - 3);
                }
              }}
              style={{
                padding: '6px 14px',
                backgroundColor: isActive ? (i > 2 ? t.color : undefined) : 'rgba(255, 255, 255, 0.05)',
                backgroundImage: isActive && i <= 2 ? t.color : undefined,
                color: isActive ? '#000' : '#fff',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '700',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 0 15px rgba(255,255,255,0.2)' : 'none'
              }}
            >
              {t.name}
            </button>
          );
        })}
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
            A14U Magazine
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

        {/* 하단 오버레이 슬롯: 갤러리 같은 콘텐츠를 Hero 위에 “텍스트처럼” 얹기  
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
        )} */}
      </div>
    </section >
  );
}
