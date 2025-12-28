// App.tsx
import React, { useEffect, useMemo, useState } from "react";
import Hero from './components/Hero';
import GeneratedImagesGallery from './components/GeneratedImageGallery';
import News from './components/News';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '70vh',
        backgroundColor: '#020617',
        color: 'white',
        padding: '40px 20;x',
        fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      }}
    >
      {/* 1) Hero: 100vh */}
      <Hero isMobile={isMobile}>
        {/* Hero 배경 위에 올라가는 갤러리 패널 */}
        <div
          style={{
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(2, 6, 23, 0.55)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
            overflow: 'hidden',
            maxHeight: '60vh',       // 화면 하단에서 과도하게 커지지 않도록
          }}
        >
          <GeneratedImagesGallery />
        </div>
      </Hero>
      {/* 2) Hero 아래로 “쌓이는” Main Sections */}
      <main>
        <News />
      </main>   
    </div>
  );
}

export default App;
