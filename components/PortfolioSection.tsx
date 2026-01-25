// src/components/PortfolioSection.tsx
import React from "react";
import type { DummyPost } from "./newsTypes";
import { cardBase, placeholderCardStyle, sectionSubStyle, sectionTitleStyle, MoreLink } from "./newsUi";

const SITE_ORIGIN = "https://www.cakepower.net";

function postUrl(slug?: string) {
  if (!slug) return "";
  return `${SITE_ORIGIN}/post/${slug}/`;
}

export default function PortfolioSection({ items }: { items: DummyPost[] }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <h2 style={sectionTitleStyle}>Portfolio</h2>
      <p style={sectionSubStyle}></p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {items.slice(0, 3).map((p, idx) => {
          const href = postUrl(p.slug);
          return (
            <article key={p.id} style={{ ...cardBase, padding: 14, background: "rgba(2,6,23,0.50)" }}>
              {p.thumb ? (
                <a href={href} style={{ display: "block", marginBottom: 10 }}>
                  <img
                    src={p.thumb}
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 160,
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
                <div style={{ ...placeholderCardStyle(400 + idx), marginBottom: 10 }} />
              )}
              <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
                {p.badge ? (
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
                ) : null}
                <div style={{ opacity: 0.78, fontSize: 12 }}>
                  {p.category} · {p.date}
                </div>
              </div>

              {href ? (
                <a
                  href={href}
                  style={{
                    display: "block",
                    marginTop: 8,
                    fontSize: 16,
                    fontWeight: 850,
                    lineHeight: 1.25,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {p.title}
                </a>
              ) : (
                <div style={{ marginTop: 8, fontSize: 16, fontWeight: 850, lineHeight: 1.25 }}>
                  {p.title}
                </div>
              )}
              <div style={{ marginTop: 8, opacity: 0.88, fontSize: 13, lineHeight: 1.55 }}>{p.dek}</div>

              <div style={{ marginTop: 12 }}>
                <MoreLink label="Open case →" href={href} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
