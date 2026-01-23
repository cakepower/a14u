// src/components/TopicsSection.tsx
import React from "react";
import type { TopicBlock } from "./newsTypes";
import { cardBase, sectionSubStyle, sectionTitleStyle, smallThumbStyle, MoreLink } from "./newsUi";

export default function TopicsSection({ topics }: { topics: TopicBlock[] }) {
  return (
    <div style={{ marginBottom: 42 }}>
      <h2 style={sectionTitleStyle}>Topics</h2>
      <p style={sectionSubStyle}>
        
      </p>

      <div style={{ display: "grid", gap: 22 }}>
        {topics.map((topic, tIdx) => (
          <section key={topic.key} style={{ ...cardBase, padding: 16, background: "rgba(2,6,23,0.50)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, letterSpacing: "-0.2px" }}>{topic.title}</h3>
                <div style={{ marginTop: 6, opacity: 0.72, fontSize: 13 }}></div>
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
              {topic.items.slice(0, 4).map((p, i) => (
                <article key={p.id} style={{ ...cardBase, background: "rgba(255,255,255,0.015)" }}>
                  <div style={{ padding: 14 }}>
                    <div style={smallThumbStyle(100 + tIdx * 20 + i)} />
                    <div style={{ marginTop: 10, opacity: 0.78, fontSize: 12 }}>
                      {p.category} · {p.date}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 15, fontWeight: 750, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ marginTop: 8, opacity: 0.88, fontSize: 13, lineHeight: 1.55 }}>{p.dek}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
