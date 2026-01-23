// src/components/PortfolioSection.tsx
import React from "react";
import type { DummyPost } from "./newsTypes";
import { cardBase, placeholderCardStyle, sectionSubStyle, sectionTitleStyle, MoreLink } from "./newsUi";

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
        {items.slice(0, 3).map((p, idx) => (
          <article key={p.id} style={{ ...cardBase, padding: 14, background: "rgba(2,6,23,0.50)" }}>
            <div style={placeholderCardStyle(400 + idx)} />
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

            <div style={{ marginTop: 8, fontSize: 16, fontWeight: 850, lineHeight: 1.25 }}>{p.title}</div>
            <div style={{ marginTop: 8, opacity: 0.88, fontSize: 13, lineHeight: 1.55 }}>{p.dek}</div>

            <div style={{ marginTop: 12 }}>
              <MoreLink label="Open case →" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
