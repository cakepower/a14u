// src/components/LatestSection.tsx
import React from "react";
import type { DummyPost } from "./newsTypes";
import { cardBase, SectionHeader, smallThumbStyle } from "./newsUi";

export default function LatestSection({ items }: { items: DummyPost[] }) {
  return (
    <div style={{ marginBottom: 42 }}>
      <SectionHeader
        title="Latest"
        subtitle=""
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {items.slice(0, 4).map((p, idx) => (
          <article key={p.id} style={{ ...cardBase, background: "rgba(2,6,23,0.48)" }}>
            <div style={{ padding: 14 }}>
              <div style={smallThumbStyle(300 + idx)} />
              <div style={{ marginTop: 10, opacity: 0.78, fontSize: 12 }}>
                {p.category} · {p.date}
              </div>
              <div style={{ marginTop: 8, fontSize: 15, fontWeight: 750, lineHeight: 1.3 }}>{p.title}</div>
              <div style={{ marginTop: 8, opacity: 0.88, fontSize: 13, lineHeight: 1.55 }}>{p.dek}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
