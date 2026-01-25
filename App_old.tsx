// App.tsx
import React, { useEffect, useMemo, useState } from "react";
import Hero from './components/Hero';
import News from './News';
import GeneratedImagesGallery from './components/GeneratedImageGallery';
import FeaturedSection from "./components/FeaturedSection";
import DailyTweetSection from "./components/DailyTweetSection";
import TopicsSection from "./components/TopicsSection";
import InspirationSection from "./components/InspirationSection";
import LatestSection from "./components/LatestSection";
import PortfolioSection from "./components/PortfolioSection";
import SF from "./components/SF";
import { createNewsDemoData } from "./components/newsDummyData";
import { SectionDivider } from "./components/newsUi";
import type { DailyTweetItem } from "./components/newsTypes";
import type { TopicBlock } from "./components/newsTypes";

function App() {
  const demo = useMemo(() => createNewsDemoData(), []);
  const { featuredLead, picks, inspiration, latest, portfolio } = demo;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dailyTweets, setDailyTweets] = useState<DailyTweetItem[]>(demo.dailyTweetsItems ?? []);
  const [topics, setTopics] = useState<TopicBlock[]>(demo.topics);
  const [loadingTweets, setLoadingTweets] = useState(false);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/news/daily-tweets/?limit=12", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: { items: DailyTweetItem[] } = await res.json();

        if (!alive) return;
        setDailyTweets(data.items);
      } catch (e) {
        console.error("Daily tweets API failed. Using demo data.", e);
        // 실패 시 demo 유지(이미 demo로 초기화되어 있으니 굳이 set 안 해도 됨)
      }
    })();

    (async () => {
      try {
        // 2) Topics
        const res = await fetch("/api/news/topics/?limit=12", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Topics HTTP ${res.status}`);

        const data: { topics: TopicBlock[] } = await res.json();
        if (!alive) return;
        setTopics(data.topics);
      } catch (e) {
        console.error("Topics API failed. Using demo data.", e);
      }
    })();

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      alive = false;
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#020617',
        color: 'white',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflowX: "hidden"
      }}
    >
      {/* Global Background Layer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <SF />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <main style={{ marginTop: isMobile ? 2 : 5 }}>
          <News isMobile={isMobile}>
            <FeaturedSection lead={featuredLead} picks={picks} isMobile={isMobile} />
            <SectionDivider />

            <DailyTweetSection tweets={dailyTweets} />
            <SectionDivider />

            <TopicsSection topics={topics} />
            <SectionDivider />

            <InspirationSection isMobile={isMobile} items={inspiration} />
            <SectionDivider />

            <LatestSection items={latest} />
            <SectionDivider />

            <PortfolioSection items={portfolio} />
          </News>
        </main>
      </div>
    </div>
  );
}

export default App;
