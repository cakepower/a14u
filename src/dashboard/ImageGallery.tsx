import React, { useState } from 'react';

interface ImageCard {
  file: string;
  title: string;
  platform: string;
  color: string;
  url: string;
  keywords: string[];
}

const IMAGE_DATA: ImageCard[] = [
  // ── 무신사 ──────────────────────────────────────────────────
  {
    file: 'musinsa_3046_1.jpg',
    title: 'Spring 2026 "SUGAR DROP"',
    platform: '무신사',
    color: '#3b82f6',
    url: 'https://global.musinsa.com/us/exhibition/3046',
    keywords: ['Spring 2026', 'SUGAR DROP', 'soft mist', 'boho grunge'],
  },
  {
    file: 'musinsa_3046_2.jpg',
    title: 'Spring 2026 "SUGAR DROP"',
    platform: '무신사',
    color: '#3b82f6',
    url: 'https://global.musinsa.com/us/exhibition/3046',
    keywords: ['Spring 2026', 'SUGAR DROP', 'soft mist', 'boho grunge'],
  },
  {
    file: 'musinsa_3039_1.jpg',
    title: 'Grad & School: Brand Highlights',
    platform: '무신사',
    color: '#3b82f6',
    url: 'https://global.musinsa.com/us/exhibition/3039',
    keywords: ['Grad & School Highlights', 'K-Celeb Look', 'New Season'],
  },
  {
    file: 'musinsa_3039_2.jpg',
    title: 'Grad & School: Brand Highlights',
    platform: '무신사',
    color: '#3b82f6',
    url: 'https://global.musinsa.com/us/exhibition/3039',
    keywords: ['Grad & School Highlights', 'K-Celeb Look', 'New Season'],
  },
  {
    file: 'musinsa_3030_1.jpg',
    title: "Women's Week: Elevate Your Style",
    platform: '무신사',
    color: '#3b82f6',
    url: 'https://global.musinsa.com/us/exhibition/3030',
    keywords: ["Women's Week", 'New Season', 'Essential Line Drop'],
  },
  {
    file: 'musinsa_3030_2.jpg',
    title: "Women's Week: Elevate Your Style",
    platform: '무신사',
    color: '#3b82f6',
    url: 'https://global.musinsa.com/us/exhibition/3030',
    keywords: ["Women's Week", 'New Season', 'Essential Line Drop'],
  },
  // ── 29CM ────────────────────────────────────────────────────
  {
    file: '29cm_onebrand_1.jpg',
    title: '[29 패션위크] 원브랜드데이',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/campaign/2026/03/29-fashion-week#one-brand-day',
    keywords: ['패션위크', '봄의 온도', '봄', '봄 컬렉션'],
  },
  {
    file: '29cm_umer_1.jpg',
    title: '[포커스] UMER',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/focus/2026/03/09/umer',
    keywords: ['UMER', '미니멀리즘', '디테일', '봄'],
  },
  {
    file: '29cm_umer_2.jpg',
    title: '[포커스] UMER',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/focus/2026/03/09/umer',
    keywords: ['UMER', '미니멀리즘', '디테일', '봄'],
  },
  {
    file: '29cm_umer_direct.jpg',
    title: '[포커스] UMER — 디렉트',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/focus/2026/03/09/umer',
    keywords: ['UMER', '부드럽지만 단단한', '색감'],
  },
  {
    file: '29cm_highlight_1.jpg',
    title: '[하이라이트] 3rd Drop',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/highlight/2026/03/09/3rd?cache=true',
    keywords: ['봄', '신상품', '디테일', '봄 스페셜'],
  },
  {
    file: '29cm_highlight_2.jpg',
    title: '[하이라이트] 3rd Drop',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/highlight/2026/03/09/3rd?cache=true',
    keywords: ['봄', '신상품', '디테일', '봄 스페셜'],
  },
  {
    file: '29cm_matinkim_1.jpg',
    title: '[브랜드 이벤트] MATIN KIM',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/brand-event/2026/03/09/matinkim?cache=true',
    keywords: ['MATIN KIM', '봄 컬렉션', '스타일링', '리치'],
  },
  {
    file: '29cm_matinkim_2.jpg',
    title: '[브랜드 이벤트] MATIN KIM',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/brand-event/2026/03/09/matinkim?cache=true',
    keywords: ['MATIN KIM', '봄 컬렉션', '스타일링', '리치'],
  },
  {
    file: '29cm_springouter_1.jpg',
    title: '[스타일 레시피] 봄 아우터',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/29-style-recipe/2026/03/springouter?cache=true',
    keywords: ['봄 아우터', '아우터', '레이어드', '봄맞이'],
  },
  {
    file: '29cm_springouter_2.jpg',
    title: '[스타일 레시피] 봄 아우터',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr/content/29-style-recipe/2026/03/springouter?cache=true',
    keywords: ['봄 아우터', '아우터', '레이어드', '봄맞이'],
  },
  {
    file: '29cm_bluebrick_direct.jpg',
    title: 'BLUE BRICK',
    platform: '29CM',
    color: '#f59e0b',
    url: 'https://www.29cm.co.kr',
    keywords: ['BLUE BRICK', '색감', '리치', '봄'],
  },
];

export default function ImageGallery() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div>
      <p style={{
        fontSize: '11px', fontWeight: 700, color: '#475569',
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px',
      }}>
        Campaign Visuals
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '10px',
      }}>
        {IMAGE_DATA.map((img, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <a
              key={img.file}
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                display: 'block',
                borderRadius: '10px',
                overflow: 'hidden',
                aspectRatio: '3 / 4',
                textDecoration: 'none',
                border: `1px solid ${isHovered ? img.color + '60' : 'rgba(255,255,255,0.08)'}`,
                transition: 'border-color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Image */}
              <img
                src={`/a14u/cards_news/${img.file}`}
                alt={img.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              />

              {/* Platform badge (always visible) */}
              <span style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                fontSize: '10px',
                fontWeight: 700,
                background: img.color,
                color: 'white',
                padding: '2px 7px',
                borderRadius: '4px',
                letterSpacing: '0.04em',
              }}>
                {img.platform}
              </span>

              {/* Hover overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '12px',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.22s ease, transform 0.22s ease',
              }}>
                {/* Title */}
                <p style={{
                  margin: '0 0 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'white',
                  lineHeight: 1.3,
                }}>
                  {img.title}
                </p>

                {/* Keyword pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {img.keywords.map(kw => (
                    <span
                      key={kw}
                      style={{
                        fontSize: '10px',
                        padding: '2px 7px',
                        borderRadius: '12px',
                        background: `${img.color}30`,
                        color: img.color,
                        border: `1px solid ${img.color}50`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
