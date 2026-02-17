// src/components/DailyTweetSection.tsx
import React from "react";
import { cardBase, SectionHeader } from "./newsUi";
import type { DailyTweetItem  } from "./newsTypes";

const SITE_ORIGIN = "https://www.cakepower.net";

function postUrl(slug?: string) {
  if (!slug) return "";
  // slug에 이미 URL 인코딩이 들어있을 수 있으니 그대로 사용
  return `${SITE_ORIGIN}/post/${slug}/`;
}

function stripHtml(input: string) {
  // 간단 방어용(정교한 파서는 서버에서 하는 게 더 좋음)
  return input.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export default function DailyTweetSection({ tweets = [] }: { tweets: DailyTweetItem[] }) {
  const visible = tweets.slice(0, 4);

  return (
    <div style={{ marginBottom: 42 }}>
      <SectionHeader
        title="Daily Tweet"
        subtitle=""
        showMore={tweets.length > 4}
        moreLabel="More →"
        moreHref="https://www.cakepower.net/category/daily_story/"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {visible.map((t) => {
          const href = postUrl(t.slug);
          const title = t.title || ""; 
          const text = stripHtml(t.text || "");
          const date = t.date ?? new Date().toISOString().slice(0, 10);

          return (
            <div
              key={t.id}
              style={{ ...cardBase, padding: 14, background: "rgba(2,6,23,0.48)" }}
            >
              {/* 이미지: 있을 때만 */}
              {t.thumb ? (
                href ? (
                  <a
                    href={href}
                    style={{ display: "block", marginBottom: 10 }}
                    aria-label="Open daily tweet post"
                  >
                    <img
                      src={t.thumb}
                      alt=""
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        objectPosition: "top center",
                        borderRadius: 12,
                        marginBottom: 10,
                        display: "block",
                      }}
                      onError={(e) => {
                        // 깨진 이미지면 숨김(카드 깨짐 방지)
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </a>
              ) : (
                  <img
                    src={t.thumb}
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      objectPosition: "top center",
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
              <div style={{ opacity: 0.92, lineHeight: 1.6, fontSize: 15, fontWeight: 700 }}>{title}</div>
              <div style={{ opacity: 0.92, lineHeight: 1.55, fontSize: 13 }}>{text}</div>

              <div style={{ marginTop: 10, opacity: 0.65, fontSize: 12 }}>
                Daily Tweet · {date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
