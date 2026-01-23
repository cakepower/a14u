import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer"; // Intersection Observer 훅
import type { DummyPost, PostFromDB } from "./newsTypes";
import {
  cardBase,
  placeholderCardStyle,
  sectionSubStyle,
  sectionTitleStyle,
  smallThumbStyle,
  MoreLink,
} from "./newsUi";

const SITE_ORIGIN = "https://www.cakepower.net";

function postUrl(slug?: string) {
  if (!slug) return "";
  return `${SITE_ORIGIN}/post/${slug}/`;
}

export default function FeaturedSection({ isMobile = false }: { isMobile?: boolean }) {
// 1. 상태 타입 수정 (서버 응답 객체 구조와 일치시킴)
  // DummyPost 대신 PostFromDB를 사용하거나, 두 타입을 합친 형태를 사용합니다.
  const [content, setContent] = useState<{ lead: PostFromDB; picks: PostFromDB[] } | null>(null);
  const [loading, setLoading] = useState(false);

  console.log("2. 현재 렌더링 중인 데이터:", content);

  // 2. 뷰포트 감지 (섹션이 10% 정도 보이면 데이터 호출 시작)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 3. API 호출 로직
  useEffect(() => {
    if (!inView) return;

    let alive = true;
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        // 1. 빌드와 상관없는 외부 설정 파일(public/config.json)을 먼저 읽어옵니다.
        const configRes = await fetch("/media/a14u/config.json");
        console.log("Config Response:", configRes.status); // 이게 찍히는지 확인
        // 여기서 에러가 날 확률이 높습니다. 텍스트로 먼저 받아 확인해봅니다.
        const rawText = await configRes.text();
        console.log("2. rawText 내용:", rawText);

        // 텍스트를 JSON으로 파싱
        const config = JSON.parse(rawText);
        console.log("3. 파싱된 객체:", config);

        const params = new URLSearchParams({
          lead_id: config.featured.lead_id,
          pick_ids: config.featured.pick_ids
        });

        const url = `/api/news/featured/?${params.toString()}`;
        console.log("[FETCH] GET", url);

        const res = await fetch(url, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const result: { featuredLead: PostFromDB; picks: PostFromDB[] } = await res.json();

        console.log("1. 서버에서 온 생데이터:", result);

        if (alive) {
          // 서버 데이터 구조에 맞춰 매핑 (예시: data.featuredLead, data.picks)
          setContent({
            lead: result.featuredLead,
            picks: result.picks,
          });
        }
      } catch (e) {
        console.error("FeaturedSection API failed:", e);
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchFeatured();
    return () => { alive = false; };
  }, [inView]);

  const layout: React.CSSProperties = isMobile
    ? { display: "grid", gridTemplateColumns: "1fr", gap: 14 }
    : { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 };

  // 데이터가 없을 때 보여줄 간단한 로딩 뷰
  if (!content && loading) {
    return <div ref={ref} style={{ marginBottom: 42, padding: 20, textAlign: 'center', opacity: 0.5 }}>Loading Featured...</div>;
  }

  // 데이터가 로드되지 않았을 때 섹션 영역 확보 (Intersection Observer가 작동하기 위함)
  if (!content) return <div ref={ref} style={{ minHeight: "300px" }} />;

  const { lead, picks } = content;

  // 카드 전체를 클릭했을 때 이동하는 핸들러
  const handleCardClick = (slug?: string) => {
    const url = postUrl(slug);
    if (url) window.location.href = url;
  };

  return (
    <div ref={ref} style={{ marginBottom: 42 }}>
      <h2 style={sectionTitleStyle}>Featured</h2>
      <p style={sectionSubStyle}>
        2026년 1월 특집 기사
      </p>

      <div style={layout}>
        {/* Lead */}
        <article onClick={() => handleCardClick(lead.slug)} style={{ ...cardBase, padding: 16, background: "rgba(2,6,23,0.55)", cursor: "pointer" }}>
          <div 
            style={{ 
              ...placeholderCardStyle(1), 
              // 데이터에 이미지가 있으면 해당 이미지를 배경으로 사용, 없으면 기존 스타일 유지
              backgroundImage: lead.image ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(${lead.image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              overflow: 'hidden',
              height: isMobile ? "280px" : "380px",
              borderRadius: '12px',
            }} 
          >
            {/* 이미지가 없을 때만 placeholderCardStyle의 그라데이션이 보이게 됩니다 */}
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {lead.badge && (
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
                {lead.badge}
              </span>
            )}
            <div style={{ opacity: 0.82, fontSize: 13 }}>
              {lead.category} · {lead.date}
            </div>
          </div>

          <h3 style={{ margin: "14px 0 10px", fontSize: "24px", lineHeight: 1.25, fontWeight:800 }}>{lead.title}</h3>
          {/* 3. 본문 내용 더 많이 보여주기 */}
          <p 
            style={{ 
              margin: 0, 
              opacity: 0.9, 
              lineHeight: 1.7, 
              fontSize: "15px",
              // 글자수 제한 해제 또는 다중 행 노출 설정
              display: "-webkit-box",
              WebkitLineClamp: 4, // 기존보다 더 많은 줄 수(예: 4줄) 허용
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {lead.dek}
          </p>

          <div style={{ marginTop: 12 }}>
            <MoreLink label="상세보기 →" />
          </div>
        </article>

        {/* Picks */}
        <div style={{ display: "grid", gap: 12 }}>
          {picks.map((p, idx) => (
            <article key={p.id} onClick={() => handleCardClick(p.slug)} style={{ ...cardBase, padding: 14, cursor: 'pointer', background: "rgba(2,6,23,0.50)" }}>
              <div
                style={
                  isMobile
                    ? { display: "grid", gridTemplateColumns: "1fr", gap: 10 }
                    : { display: "grid", gridTemplateColumns: "120px 1fr", gap: 12 }
                }
              >
                {/* 2. Picks 섹션 이미지 보완 (반복문 내부) */}
                  <div 
                    style={{ 
                      ...smallThumbStyle(idx + 2), 
                      backgroundImage: p.image ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(${p.image})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} 
                  />

                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
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
                    <div style={{ opacity: 0.78, fontSize: 12 }}>
                      {p.category} · {p.date}
                    </div>
                  </div>

                  <div style={{ marginTop: 6, fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{p.title}</div>
                  <div style={{ marginTop: 8, opacity: 0.88, fontSize: 13, lineHeight: 1.55 }}>
                    <div
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,      // 보여줄 줄 수 설정 (4줄)
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis", // 말줄임표 처리
                      }}
                    >
                      {p.dek}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

