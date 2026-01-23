// components/News.tsx
import React, { useMemo } from "react";

type DummyPost = {
  id: string;
  category: string;
  title: string;
  dek: string;
  date: string;
  badge?: string;
};

function placeholderCardStyle(seed: number): React.CSSProperties {
  const hueA = (seed * 47) % 360;
  const hueB = (seed * 73) % 360;
  return {
    height: 150,
    borderRadius: 12,
    background: `linear-gradient(135deg, hsla(${hueA}, 85%, 55%, 0.45), hsla(${hueB}, 85%, 55%, 0.25))`,
    border: "1px solid rgba(255,255,255,0.10)",
  };
}

function smallThumbStyle(seed: number): React.CSSProperties {
  const hueA = (seed * 41) % 360;
  const hueB = (seed * 67) % 360;
  return {
    height: 110,
    borderRadius: 12,
    background: `linear-gradient(135deg, hsla(${hueA}, 85%, 55%, 0.40), hsla(${hueB}, 85%, 55%, 0.18))`,
    border: "1px solid rgba(255,255,255,0.10)",
  };
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 20,
  margin: "0 0 10px",
  letterSpacing: "-0.2px",
};

const sectionSubStyle: React.CSSProperties = {
  margin: "0 0 18px",
  opacity: 0.75,
  lineHeight: 1.55,
};

const cardBase: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.02)",
  overflow: "hidden",
};

function SectionDivider() {
  return (
    <div
      style={{
        height: 1,
        background: "rgba(255,255,255,0.08)",
        margin: "46px 0",
      }}
    />
  );
}

function MoreLink({ label = "View all →" }: { label?: string }) {
  return (
    <div style={{ marginTop: 12 }}>
      <span
        style={{
          opacity: 0.9,
          textDecoration: "underline",
          textUnderlineOffset: 3,
          cursor: "pointer",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function News() {
  // Featured
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

  // Latest grid
  const latest: DummyPost[] = useMemo(() => {
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
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `latest-${i + 1}`,
      category: cats[i % cats.length],
      title: `Latest Story #${i + 1}: Magazine layout experiment`,
      dek:
        "그리드 시스템은 ‘균일함’보다 ‘변주’에서 매거진 느낌이 난다. 섹션마다 카드 크기/밀도를 다르게 설계하자.",
      date: `2025-12-${(20 + (i % 7)).toString().padStart(2, "0")}`,
    }));
  }, []);

  // Topic Blocks (4)
  const topics = useMemo(() => {
    const makeTopic = (category: string, seedBase: number) =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: `${category}-item-${i + 1}`,
        category,
        title: `${category}: Story #${i + 1}`,
        dek:
          "토픽 블록은 4~6개만 노출하고 ‘더보기’로 이동시키면 홈이 과밀해지지 않는다.",
        date: `2025-12-${(12 + ((seedBase + i) % 10)).toString().padStart(2, "0")}`,
      }));

    return [
      { key: "vibe", title: "Vibe Coding w AI", items: makeTopic("Vibe Coding w AI", 10) },
      { key: "play", title: "Playing with AI", items: makeTopic("Playing with AI", 20) },
      { key: "read", title: "Reading Design", items: makeTopic("Reading Design", 30) },
      { key: "research", title: "Research Projects", items: makeTopic("Research Projects", 40) },
    ];
  }, []);

  // Inspiration mosaic
  const inspiration = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: `insp-${i + 1}`,
      category: "Inspiration",
      title: `Inspiration: Visual Note #${i + 1}`,
      dek: "모자이크 섹션은 카드 스팬 변주로 ‘편집된 느낌’을 강화한다.",
      date: `2025-12-${(1 + (i % 9)).toString().padStart(2, "0")}`,
    }));
  }, []);

  // Portfolio pinned
  const portfolio = useMemo(() => {
    return [
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
    ] as DummyPost[];
  }, []);

  return (
    <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {/* FEATURED */}
      <div style={{ marginBottom: 42 }}>
        <h2 style={sectionTitleStyle}>Featured</h2>
        <p style={sectionSubStyle}>
          Hero 아래 첫 블록은 “대표 리드 1개 + 보조 카드”로 편집 방향을 고정합니다.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
          {/* Lead */}
          <article style={{ ...cardBase, padding: 16 }}>
            <div style={placeholderCardStyle(1)} />
            <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
              {featuredLead.badge && (
                <span
                  style={{
                    fontSize: 12,
                    padding: "4px 8px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "rgba(255,255,255,0.03)",
                    opacity: 0.95,
                  }}
                >
                  {featuredLead.badge}
                </span>
              )}
              <div style={{ opacity: 0.8, fontSize: 13 }}>
                {featuredLead.category} · {featuredLead.date}
              </div>
            </div>

            <h3 style={{ margin: "10px 0 8px", fontSize: 20, lineHeight: 1.25 }}>
              {featuredLead.title}
            </h3>
            <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.6 }}>{featuredLead.dek}</p>
            <MoreLink label="Read →" />
          </article>

          {/* Picks */}
          <div style={{ display: "grid", gap: 12 }}>
            {picks.map((p, idx) => (
              <article key={p.id} style={{ ...cardBase, padding: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12 }}>
                  <div style={smallThumbStyle(idx + 2)} />
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {p.badge && (
                        <span
                          style={{
                            fontSize: 11,
                            padding: "3px 7px",
                            borderRadius: 999,
                            border: "1px solid rgba(255,255,255,0.14)",
                            background: "rgba(255,255,255,0.03)",
                            opacity: 0.95,
                          }}
                        >
                          {p.badge}
                        </span>
                      )}
                      <div style={{ opacity: 0.75, fontSize: 12 }}>
                        {p.category} · {p.date}
                      </div>
                    </div>

                    <div style={{ marginTop: 6, fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>
                      {p.title}
                    </div>
                    <div style={{ marginTop: 8, opacity: 0.85, fontSize: 13, lineHeight: 1.55 }}>
                      {p.dek}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* DAILY TWEET STRIP */}
      <div style={{ marginBottom: 42 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h2 style={sectionTitleStyle}>Daily Tweet</h2>
            <p style={sectionSubStyle}>
              짧은 문장을 스트립으로 넣으면 홈의 리듬이 살아나고 피드 느낌이 약해집니다.
            </p>
          </div>
          <MoreLink />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {dailyTweets.map((t, i) => (
            <div key={i} style={{ ...cardBase, padding: 14 }}>
              <div style={{ opacity: 0.9, lineHeight: 1.6 }}>{t}</div>
              <div style={{ marginTop: 10, opacity: 0.6, fontSize: 12 }}>
                Daily Tweet · 2025-12-27
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* TOPIC BLOCKS (4) */}
      <div style={{ marginBottom: 42 }}>
        <h2 style={sectionTitleStyle}>Topics</h2>
        <p style={sectionSubStyle}>
          토픽 블록은 “고정된 탐색 경로”를 제공합니다. 각 블록은 4~6개만 노출하고 더보기로 확장하는 것이 매거진 운영에 유리합니다.
        </p>

        <div style={{ display: "grid", gap: 22 }}>
          {topics.map((topic, tIdx) => (
            <section key={topic.key} style={{ ...cardBase, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, letterSpacing: "-0.2px" }}>{topic.title}</h3>
                  <div style={{ marginTop: 6, opacity: 0.7, fontSize: 13 }}>
                    최신 6개 기준 더미 토픽 블록
                  </div>
                </div>
                <MoreLink />
              </div>

              <div
                style={{
                  marginTop: 14,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 12,
                }}
              >
                {topic.items.slice(0, 6).map((p, i) => (
                  <article key={p.id} style={{ ...cardBase, background: "rgba(255,255,255,0.015)" }}>
                    <div style={{ padding: 14 }}>
                      <div style={smallThumbStyle(100 + tIdx * 20 + i)} />
                      <div style={{ marginTop: 10, opacity: 0.75, fontSize: 12 }}>
                        {p.category} · {p.date}
                      </div>
                      <div style={{ marginTop: 8, fontSize: 15, fontWeight: 750, lineHeight: 1.3 }}>
                        {p.title}
                      </div>
                      <div style={{ marginTop: 8, opacity: 0.85, fontSize: 13, lineHeight: 1.55 }}>
                        {p.dek}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* INSPIRATION MOSAIC */}
      <div style={{ marginBottom: 42 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h2 style={sectionTitleStyle}>Inspiration</h2>
            <p style={sectionSubStyle}>
              모자이크 그리드는 카드 스팬 변주로 “편집된 레이아웃”을 만듭니다. 이 섹션만 스타일을 달리하면 전체가 매거진처럼 보이기 시작합니다.
            </p>
          </div>
          <MoreLink />
        </div>

        {/* Mosaic grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 12,
          }}
        >
          {inspiration.map((p, i) => {
            // 스팬 패턴(대략적인 모자이크)
            const spans = [
              { c: 6, r: 2 },
              { c: 6, r: 1 },
              { c: 4, r: 1 },
              { c: 4, r: 1 },
              { c: 4, r: 1 },
              { c: 5, r: 1 },
              { c: 7, r: 1 },
              { c: 4, r: 1 },
              { c: 4, r: 1 },
              { c: 4, r: 1 },
            ];
            const s = spans[i % spans.length];

            return (
              <article
                key={p.id}
                style={{
                  ...cardBase,
                  gridColumn: `span ${s.c}`,
                  gridRow: `span ${s.r}`,
                  padding: 14,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div style={{ ...placeholderCardStyle(200 + i), height: s.r === 2 ? 220 : 150 }} />
                <div style={{ marginTop: 10, opacity: 0.75, fontSize: 12 }}>
                  {p.category} · {p.date}
                </div>
                <div style={{ marginTop: 8, fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>
                  {p.title}
                </div>
                <div style={{ marginTop: 8, opacity: 0.85, fontSize: 13, lineHeight: 1.55 }}>
                  {p.dek}
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ marginTop: 10, opacity: 0.6, fontSize: 12 }}>
          Tip: 모바일에서는 모자이크가 깨질 수 있으니, 실제 적용 시 “단일 컬럼 스택”으로 폴백하는 것을 권장합니다.
        </div>
      </div>

      <SectionDivider />

      {/* LATEST GRID */}
      <div style={{ marginBottom: 42 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h2 style={sectionTitleStyle}>Latest</h2>
            <p style={sectionSubStyle}>
              최신 그리드는 홈의 “체력”입니다. 카드에 카테고리/날짜/요약을 넣어 피드가 아니라 매거진 톤을 유지합니다.
            </p>
          </div>
          <MoreLink />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {latest.map((p, idx) => (
            <article key={p.id} style={cardBase}>
              <div style={{ padding: 14 }}>
                <div style={smallThumbStyle(300 + idx)} />
                <div style={{ marginTop: 10, opacity: 0.75, fontSize: 12 }}>
                  {p.category} · {p.date}
                </div>
                <div style={{ marginTop: 8, fontSize: 15, fontWeight: 750, lineHeight: 1.3 }}>
                  {p.title}
                </div>
                <div style={{ marginTop: 8, opacity: 0.85, fontSize: 13, lineHeight: 1.55 }}>
                  {p.dek}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* PORTFOLIO PINNED */}
      <div style={{ marginBottom: 10 }}>
        <h2 style={sectionTitleStyle}>Portfolio</h2>
        <p style={sectionSubStyle}>
          홈 하단의 “고정 포트폴리오”는 방문자에게 정체성과 신뢰를 빠르게 제공합니다. 최신순이 아니라 ‘대표 작업’ 중심으로 유지하는 것이 좋습니다.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 12,
          }}
        >
          {portfolio.map((p, idx) => (
            <article key={p.id} style={{ ...cardBase, padding: 14 }}>
              <div style={placeholderCardStyle(400 + idx)} />
              <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
                {p.badge && (
                  <span
                    style={{
                      fontSize: 11,
                      padding: "3px 7px",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.14)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    {p.badge}
                  </span>
                )}
                <div style={{ opacity: 0.75, fontSize: 12 }}>
                  {p.category} · {p.date}
                </div>
              </div>

              <div style={{ marginTop: 8, fontSize: 16, fontWeight: 850, lineHeight: 1.25 }}>
                {p.title}
              </div>
              <div style={{ marginTop: 8, opacity: 0.85, fontSize: 13, lineHeight: 1.55 }}>
                {p.dek}
              </div>
              <MoreLink label="Open case →" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
