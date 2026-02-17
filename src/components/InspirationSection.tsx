import React from "react";
import type { DummyPost } from "./newsTypes";
import { cardBase, placeholderCardStyle, SectionHeader } from "./newsUi";

const SITE_ORIGIN = "https://www.cakepower.net";

function postUrl(slug?: string) {
  if (!slug) return "";
  return `${SITE_ORIGIN}/post/${slug}/`;
}

export default function InspirationSection({
  items,
  isMobile = false,
}: {
  items: DummyPost[];
  isMobile?: boolean;
}) {
  // 모바일: 단순 그리드 (1열 또는 2열)
  if (isMobile) {
    return (
      <div style={{ marginBottom: 42 }}>
        <SectionHeader
          title="Inspiration"
          subtitle=""
          moreHref="https://www.cakepower.net/category/About_sensory_attunement/"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr", // 필요하면 2열로: "repeat(2, 1fr)"
            gap: 12,
          }}
        >
          {items.map((p, i) => {
            const href = postUrl(p.slug);
            return (
              <article key={p.id} style={{ ...cardBase, padding: 14, background: "rgba(2,6,23,0.48)" }}>
                {p.thumb ? (
                  <a href={href} style={{ display: "block", marginBottom: 10 }}>
                    <img
                      src={p.thumb}
                      alt=""
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: 170,
                        objectFit: "cover",
                        borderRadius: 12,
                        display: "block",
                      }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </a>
                ) : (
                  <div style={{ ...placeholderCardStyle(200 + i), height: 170, marginBottom: 10 }} />
                )}
                <div style={{ marginTop: 10, opacity: 0.78, fontSize: 12 }}>
                  {p.category} · {p.date}
                </div>
                {href ? (
                  <a
                    href={href}
                    style={{
                      display: "block",
                      marginTop: 8,
                      fontSize: 15,
                      fontWeight: 800,
                      lineHeight: 1.25,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {p.title}
                  </a>
                ) : (
                  <div style={{ marginTop: 8, fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>
                    {p.title}
                  </div>
                )}
                <div style={{ marginTop: 8, opacity: 0.88, fontSize: 13, lineHeight: 1.55 }}>{p.dek}</div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // 데스크톱: 기존 모자이크 유지
  return (
    <div style={{ marginBottom: 42 }}>
      <SectionHeader title="Inspiration" subtitle="" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 12 }}>
        {items.slice(0, 3).map((p, i) => {
          const spans = [
            { c: 6, r: 1 }, // 첫 번째 아이템: 절반 차지
            { c: 3, r: 1 }, // 두 번째 아이템: 1/4 차지
            { c: 3, r: 1 }, // 세 번째 아이템: 1/4 차지
          ];
          const s = spans[i % spans.length];
          const href = postUrl(p.slug);

          return (
            <article
              key={p.id}
              style={{
                ...cardBase,
                gridColumn: `span ${s.c}`,
                gridRow: `span ${s.r}`,
                padding: 14,
                background: "rgba(2,6,23,0.48)",
              }}
            >
              {p.thumb ? (
                <a href={href} style={{ display: "block", marginBottom: 10 }}>
                  <img
                    src={p.thumb}
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: s.r === 2 ? 220 : 150,
                      objectFit: "cover",
                      borderRadius: 12,
                      display: "block",
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </a>
              ) : (
                <div
                  style={{
                    ...placeholderCardStyle(200 + i),
                    height: s.r === 2 ? 220 : 150,
                    marginBottom: 10,
                  }}
                />
              )}
              <div style={{ marginTop: 10, opacity: 0.78, fontSize: 12 }}>
                {p.category} · {p.date}
              </div>
              {href ? (
                <a
                  href={href}
                  style={{
                    display: "block",
                    marginTop: 8,
                    fontSize: 15,
                    fontWeight: 800,
                    lineHeight: 1.25,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {p.title}
                </a>
              ) : (
                <div style={{ marginTop: 8, fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>
                  {p.title}
                </div>
              )}
              <div style={{ marginTop: 8, opacity: 0.88, fontSize: 13, lineHeight: 1.55 }}>{p.dek}</div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
