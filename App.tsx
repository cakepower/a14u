// App.tsx
import React from 'react';
import Hero from './components/Hero';
import GeneratedImagesGallery from './components/GeneratedImageGallery';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#020617',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      }}
    >
      <Hero>
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
            maxHeight: '42vh',       // 화면 하단에서 과도하게 커지지 않도록
            overflowY: 'auto',       // 이미지가 많으면 내부 스크롤
          }}
        >
          <GeneratedImagesGallery />
        </div>
      </Hero>
    </div>
  );
}

export default App;
