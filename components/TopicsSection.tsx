// src/components/TopicsSection.tsx
import React from "react";
import type { TopicBlock } from "./newsTypes";
import { cardBase, SectionHeader } from "./newsUi";

const SITE_ORIGIN = "https://www.cakepower.net";

function postUrl(slug?: string) {
  if (!slug) return "";
  return `${SITE_ORIGIN}/post/${slug}/`;
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * topic.key 별 More 링크 매핑
 * (요구하신 4개 토픽 전용)
 */
const TOPIC_MORE_HREF: Record<string, string> = {
  play: "https://www.cakepower.net/category/About_insights/",
  vibe: "https://www.cakepower.net/category/About_the_game_design/",
  research: "https://www.cakepower.net/category/About_aesthetic/",
  read: "https://www.cakepower.net/category/About_the_meeting/",
};

export default function TopicsSection({ topics = [] }: { topics: TopicBlock[] }) {
  return (
    <div style={{ marginBottom: 42 }}>
      <SectionHeader title="Topics" subtitle="" showMore={false} />

      <div style={{ display: "grid", gap: 22 }}>
        {topics.map((topic) => {
          const visible = (topic.items ?? []).slice(0, 4);
          const moreHref = TOPIC_MORE_HREF[topic.key] || "";
          const showMore = (topic.items?.length ?? 0) > 4 && !!moreHref;

          return (
            <section
              key={topic.key}
              style={{ ...cardBase, padding: 16, background: "rgba(2,6,23,0.50)" }}
            >
              <SectionHeader
                title={topic.title}
                subtitle=""
                showMore={(topic.items?.length ?? 0) > 4 && !!topic.moreHref}
                moreLabel="More →"
                moreHref={topic.moreHref}
              />

              <div
                style={{
                  marginTop: 14,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 12,
                }}
              >
                {visible.map((p) => {
                  const href = postUrl(p.slug);
                  const dek = stripHtml(p.dek || "");
                  const date = p.date ?? new Date().toISOString().slice(0, 10);

                  return (
                    <article
                      key={p.id}
                      style={{ ...cardBase, padding: 14, background: "rgba(255,255,255,0.015)" }}
                    >
                      {p.thumb ? (
                        href ? (
                          <a
                            href={href}
                            style={{ display: "block", marginBottom: 10 }}
                            aria-label="Open topic post"
                          >
                            <img
                              src={p.thumb}
                              alt=""
                              loading="lazy"
                              style={{
                                width: "100%",
                                height: 140,
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
                          <img
                            src={p.thumb}
                            alt=""
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: 140,
                              objectFit: "cover",
                              objectPosition: "center top", // ✅ 상단 위주로 크롭
                              borderRadius: 12,
                              marginBottom: 10,
                              display: "block",
                            }}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )
                      ) : null}

                      <div style={{ marginTop: 2, opacity: 0.78, fontSize: 12 }}>
                        {p.category} · {date}
                      </div>

                      {href ? (
                        <a
                          href={href}
                          style={{
                            display: "block",
                            marginTop: 8,
                            fontSize: 15,
                            fontWeight: 750,
                            lineHeight: 1.3,
                            color: "inherit",
                            textDecoration: "none",
                          }}
                        >
                          {p.title}
                        </a>
                      ) : (
                        <div style={{ marginTop: 8, fontSize: 15, fontWeight: 750, lineHeight: 1.3 }}>
                          {p.title}
                        </div>
                      )}

                      {dek ? (
                        <div style={{ marginTop: 8, opacity: 0.88, fontSize: 13, lineHeight: 1.55 }}>
                          {dek}
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
