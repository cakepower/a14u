// src/components/newsDummyData.ts
import type { DummyPost, TopicBlock, DailyTweetItem  } from "./newsTypes";

const today = new Date().toISOString().slice(0, 10);

export function createNewsDemoData(): {
  featuredLead: DummyPost;
  picks: DummyPost[];
  dailyTweets: string[];
  dailyTweetsItems: DailyTweetItem[];
  topics: TopicBlock[];
  inspiration: DummyPost[];
  latest: DummyPost[];
  portfolio: DummyPost[];
} {
  const featuredLead: DummyPost = {
    id: "lead-1",
    category: "Dr. CK's Pick",
    title: "Aesthetic Intelligence: 감각은 어떻게 ‘지식’이 되는가",
    dek: "매거진 톤은 ‘최신 나열’이 아니라 ‘편집된 블록’에서 나온다. Hero 아래 첫 섹션은 대표 리드 1개로 방향을 고정하고, 이어지는 카드로 탐색 동선을 제공한다.",
    date: "2025-12-27",
    badge: "Editor’s Lead",
  };

  const picks: DummyPost[] = [
    {
      id: "pick-1",
      category: "Research Projects",
      title: "Inclusive Futures 연구 노트 #12",
      dek: "리서치 프로젝트를 홈에서 ‘연재’처럼 묶어 보여주면 브랜드 신뢰가 올라간다.",
      date: "2025-12-25",
      badge: "Pick",
    },
    {
      id: "pick-2",
      category: "Reading Design",
      title: "Design Reading: 문제정의가 곧 해답이 되는 순간",
      dek: "요약(덱) 1~2줄만 있어도 피드가 아니라 매거진처럼 보인다.",
      date: "2025-12-24",
      badge: "Pick",
    },
    {
      id: "pick-3",
      category: "Vibe Coding w AI",
      title: "Vite + Django 통합 시 ‘스크롤 컨텍스트’ 설계",
      dek: "Hero는 100vh, 아래는 body 스크롤. 내부 스크롤 중첩은 최소화한다.",
      date: "2025-12-23",
      badge: "Pick",
    },
    {
      id: "pick-4",
      category: "Playing with AI",
      title: "프롬프트 실험: ‘비주얼 에세이’로 만드는 갤러리",
      dek: "생성 이미지를 ‘작품’이 아니라 ‘컬렉션/에세이’로 다루면 톤이 정돈된다.",
      date: "2025-12-22",
      badge: "Pick",
    },
  ];

  const dailyTweets = [
    "오늘의 메모: 매거진은 ‘정렬’이 아니라 ‘편집’이다.",
    "Hero는 인상, Main은 체류. 둘의 역할을 분리하자.",
    "카드의 덱(요약문) 2줄이 UX를 바꾼다.",
    "섹션 간 리듬(여백)이 곧 품질이다.",
    "토픽 블록은 ‘더보기’ 동선이 핵심.",
  ];

  const dailyTweetsItems: DailyTweetItem[] = [
    {
      id: "dt-demo-1",
      text: "오늘의 메모: 매거진은 ‘정렬’이 아니라 ‘편집’이다.",
      date: today,
      thumb: "",      // 데모에 이미지가 없으면 빈 문자열/undefined
      slug: "",
    },
    {
      id: "dt-demo-2",
      text: "Hero는 인상, 본문은 리듬. 둘 다 설계다.",
      date: today,
    },
    // ...
  ];

  const cats = [
    "Daily Tweet",
    "CV_Portfolio",
    "Dr. CK's Pick",
    "Inspiration",
    "Reading Design",
    "Vibe Coding w AI",
    "Research Projects",
    "Playing with AI",
  ];

  const latest: DummyPost[] = Array.from({ length: 12 }).map((_, i) => ({
    id: `latest-${i + 1}`,
    category: cats[i % cats.length],
    title: `Latest Story #${i + 1}: Magazine layout experiment`,
    dek: "그리드 시스템은 ‘균일함’보다 ‘변주’에서 매거진 느낌이 난다. 섹션마다 카드 크기/밀도를 다르게 설계하자.",
    date: `2025-12-${(20 + (i % 7)).toString().padStart(2, "0")}`,
  }));

  const makeTopic = (category: string, seedBase: number): DummyPost[] =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: `${category}-item-${i + 1}`,
      category,
      title: `${category}: Story #${i + 1}`,
      dek: "토픽 블록은 4~6개만 노출하고 ‘더보기’로 이동시키면 홈이 과밀해지지 않는다.",
      date: `2025-12-${(12 + ((seedBase + i) % 10)).toString().padStart(2, "0")}`,
    }));

  const topics: TopicBlock[] = [
    { key: "play", title: "Playing with AI", items: makeTopic("Playing with AI", 10) },
    { key: "vibe", title: "Vibe Coding w AI", items: makeTopic("Vibe Coding w AI", 20) },
    { key: "research", title: "Research Projects", items: makeTopic("Research Projects", 30) },
    { key: "read", title: "Reading", items: makeTopic("Reading", 40) },
  ];

  const inspiration: DummyPost[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `insp-${i + 1}`,
    category: "Inspiration",
    title: `Inspiration: Visual Note #${i + 1}`,
    dek: "모자이크 섹션은 카드 스팬 변주로 ‘편집된 느낌’을 강화한다.",
    date: `2025-12-${(1 + (i % 9)).toString().padStart(2, "0")}`,
  }));

  const portfolio: DummyPost[] = [
    {
      id: "pf-1",
      category: "CV_Portfolio",
      title: "Aesthetic Intelligence Research Institute — Overview",
      dek: "리서치 방향, 프레임워크, 핵심 프로젝트를 요약한 대표 페이지.",
      date: "2025-11-10",
      badge: "Pinned",
    },
    {
      id: "pf-2",
      category: "CV_Portfolio",
      title: "Design Concerto — Travel Narrative System",
      dek: "경험 디자인을 ‘연주’로 은유화한 서사 구조와 비주얼 시스템.",
      date: "2025-10-18",
      badge: "Pinned",
    },
    {
      id: "pf-3",
      category: "CV_Portfolio",
      title: "AI + Design Education — Curriculum Kit",
      dek: "교육 모듈 설계, 과제 구조, 평가 프레임워크.",
      date: "2025-09-02",
      badge: "Pinned",
    },
    {
      id: "pf-4",
      category: "CV_Portfolio",
      title: "Web3D Hero Prototype — Interaction Study",
      dek: "몰입형 랜딩과 스크롤 기반 매거진 레이아웃의 연결 전략.",
      date: "2025-08-21",
      badge: "Pinned",
    },
    {
      id: "pf-5",
      category: "CV_Portfolio",
      title: "Coffee Education Platform — Piubarista",
      dek: "학습자 여정 중심의 콘텐츠 구조 및 운영 설계.",
      date: "2025-07-07",
      badge: "Pinned",
    },
    {
      id: "pf-6",
      category: "CV_Portfolio",
      title: "Inclusive Futures — Prototype Archive",
      dek: "프로토타입, 리서치 노트, 방법론을 아카이빙한 케이스북.",
      date: "2025-06-12",
      badge: "Pinned",
    },
  ];

  return { featuredLead, picks, dailyTweets, dailyTweetsItems, topics, inspiration, latest, portfolio };
}
