// src/components/newsUi.tsx
import React from "react";

export function placeholderCardStyle(seed: number): React.CSSProperties {
  const hueA = (seed * 47) % 360;
  const hueB = (seed * 73) % 360;
  return {
    height: 150,
    borderRadius: 12,
    background: `linear-gradient(135deg, hsla(${hueA}, 85%, 55%, 0.45), hsla(${hueB}, 85%, 55%, 0.25))`,
    border: "1px solid rgba(255,255,255,0.10)",
  };
}

export function smallThumbStyle(seed: number): React.CSSProperties {
  const hueA = (seed * 41) % 360;
  const hueB = (seed * 67) % 360;
  return {
    height: 110,
    borderRadius: 12,
    background: `linear-gradient(135deg, hsla(${hueA}, 85%, 55%, 0.40), hsla(${hueB}, 85%, 55%, 0.18))`,
    border: "1px solid rgba(255,255,255,0.10)",
  };
}

export const sectionTitleStyle: React.CSSProperties = {
  fontSize: 20,
  margin: "0 0 10px",
  letterSpacing: "-0.2px",
};

export const sectionSubStyle: React.CSSProperties = {
  margin: "0 0 18px",
  opacity: 0.78,
  lineHeight: 1.55,
};

export const cardBase: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.02)",
  overflow: "hidden",
};

export function SectionDivider() {
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

export function MoreLink({
  label = "View all →",
  href,
  newTab = false,
}: {
  label?: string;
  href?: string;        // ✅ optional로 변경
  newTab?: boolean;
}) {
  const style = {
    opacity: 0.9,
    textDecoration: "underline",
    textUnderlineOffset: 3,
    cursor: "pointer",
    userSelect: "none" as const,
  };

  // href가 있으면 링크
  if (href) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noreferrer" : undefined}
        style={style}
      >
        {label}
      </a>
    );
  }

  // href가 없으면 (기존처럼) 그냥 텍스트
  return <span style={style}>{label}</span>;
}



export function SectionHeader({
  title,
  subtitle,
  showMore = true,
  moreLabel,
  moreHref,
}: {
  title: string;
  subtitle?: string;
  showMore?: boolean;
  moreLabel?: string;
  moreHref?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
      <div>
        <h2 style={sectionTitleStyle}>{title}</h2>
        {subtitle ? <p style={sectionSubStyle}>{subtitle}</p> : null}
      </div>
      {showMore ? <MoreLink label={moreLabel} href={moreHref} /> : null}
    </div>
  );
}
