import React, { useState } from 'react';
import { useDashboardData } from './useDashboardData';
import ImageGallery from './ImageGallery';
import type { Platform, Insights } from './types';

// ─── Shared styles ───────────────────────────────────────────────

const card: React.CSSProperties = {
  background: '#0d1729',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '20px',
};

const sectionLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#475569',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '14px',
};

// ─── TabBar ──────────────────────────────────────────────────────

function TabBar({
  tabs, active, colors, onChange,
}: {
  tabs: string[];
  active: number;
  colors: string[];
  onChange: (i: number) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange(i)}
          style={{
            padding: '5px 14px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: active === i ? 600 : 400,
            background: active === i ? (colors[i] ?? '#6366f1') : 'rgba(255,255,255,0.06)',
            color: active === i ? 'white' : '#64748b',
            transition: 'all 0.15s',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── PlatformKPICard ─────────────────────────────────────────────

function PlatformKPICard({ platform }: { platform: Platform }) {
  const metrics = [
    { label: '트렌드 키워드', value: platform.trendKeywords.length },
    { label: '캠페인 링크',   value: platform.campaignLinks.length },
    { label: '브랜드',        value: platform.brands.length },
  ];
  return (
    <div style={{ ...card, borderTop: `3px solid ${platform.color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: platform.color, display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontSize: '15px', fontWeight: 700 }}>{platform.korName}</span>
        <span style={{ fontSize: '11px', color: '#475569', marginLeft: 'auto' }}>{platform.displayName}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
        {metrics.map(m => (
          <div key={m.label}>
            <div style={{ fontSize: '30px', fontWeight: 800, color: platform.color, lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KeywordSection ──────────────────────────────────────────────

function KeywordSection({ platforms }: { platforms: Platform[] }) {
  const [active, setActive] = useState(0);
  const tabs   = ['전체', ...platforms.map(p => p.korName)];
  const colors = ['#6366f1', ...platforms.map(p => p.color)];

  const keywords =
    active === 0
      ? platforms.flatMap(p => p.trendKeywords.map(k => ({ text: k, color: p.color })))
      : platforms[active - 1].trendKeywords.map(k => ({ text: k, color: platforms[active - 1].color }));

  return (
    <div style={card}>
      <p style={sectionLabel}>Trend Keywords</p>
      <TabBar tabs={tabs} active={active} colors={colors} onChange={setActive} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {keywords.length === 0
          ? <span style={{ color: '#475569', fontSize: '13px' }}>키워드 없음</span>
          : keywords.map((kw, i) => (
              <span
                key={`${kw.text}-${i}`}
                style={{
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  background: `${kw.color}1a`,
                  color: kw.color,
                  border: `1px solid ${kw.color}33`,
                }}
              >
                {kw.text}
              </span>
            ))
        }
      </div>
    </div>
  );
}

// ─── CampaignSection ─────────────────────────────────────────────

function CampaignSection({ platforms }: { platforms: Platform[] }) {
  const [active, setActive] = useState(0);
  const activePlatform = platforms[active];
  const links = activePlatform?.campaignLinks ?? [];

  return (
    <div style={card}>
      <p style={sectionLabel}>Campaign &amp; Content Links</p>
      <TabBar
        tabs={platforms.map(p => p.korName)}
        active={active}
        colors={platforms.map(p => p.color)}
        onChange={setActive}
      />
      {links.length === 0 ? (
        <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>등록된 링크 없음</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '8px',
                textDecoration: 'none',
                gap: '12px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = `${activePlatform.color}18`)}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
            >
              <span style={{ fontSize: '13px', color: '#e2e8f0', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {link.title}
              </span>
              <span style={{ fontSize: '12px', color: activePlatform.color, flexShrink: 0 }}>↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BrandSection ────────────────────────────────────────────────

function BrandSection({ platforms }: { platforms: Platform[] }) {
  const [active, setActive] = useState(0);
  const tabs   = ['전체', ...platforms.map(p => p.korName)];
  const colors = ['#6366f1', ...platforms.map(p => p.color)];

  const brands =
    active === 0
      ? platforms.flatMap(p => p.brands.map(b => ({ brand: b, color: p.color })))
      : platforms[active - 1].brands.map(b => ({ brand: b, color: platforms[active - 1].color }));

  return (
    <div style={card}>
      <p style={sectionLabel}>Brand Tracker</p>
      <TabBar tabs={tabs} active={active} colors={colors} onChange={setActive} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {brands.map(({ brand, color }, i) =>
          brand.url ? (
            <a
              key={i}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                background: `${color}18`,
                color,
                border: `1px solid ${color}30`,
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = `${color}30`)}
              onMouseLeave={e => (e.currentTarget.style.background = `${color}18`)}
            >
              {brand.name}
            </a>
          ) : (
            <span
              key={i}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                background: 'rgba(255,255,255,0.05)',
                color: '#94a3b8',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {brand.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}

// ─── InsightsPanel ───────────────────────────────────────────────

function InsightsPanel({ insights }: { insights: Insights }) {
  const sections = [
    { title: '3월 핵심 키워드',    items: insights.coreKeywords, color: '#a78bfa' },
    { title: '스타일 코어 트렌드', items: insights.styleTrends,  color: '#34d399' },
    { title: '아이템 트렌드',      items: insights.itemTrends,   color: '#60a5fa' },
    { title: '기타 이슈',          items: insights.otherIssues,  color: '#fb923c' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <p style={{ ...sectionLabel, marginBottom: 0 }}>종합 인사이트</p>
      {sections.map(({ title, items, color }) => (
        <div key={title} style={{ ...card, borderLeft: `3px solid ${color}`, padding: '16px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color, margin: '0 0 10px' }}>{title}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {items.length === 0
              ? <span style={{ fontSize: '12px', color: '#475569' }}>—</span>
              : items.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '12px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: `${color}15`,
                      color: '#cbd5e1',
                    }}
                  >
                    {item}
                  </span>
                ))
            }
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── DashboardContent (embeddable, no page shell) ────────────────

export function DashboardContent() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        트렌드 데이터 로딩 중…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#f87171', fontSize: '14px' }}>
        오류: {error ?? '데이터를 불러올 수 없습니다.'}
      </div>
    );
  }

  const { collectionDate, platforms, insights } = data;

  return (
    <div style={{ color: '#f1f5f9', fontFamily: "'system-ui', '-apple-system', 'BlinkMacSystemFont', sans-serif" }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Fashion Trend Intelligence
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>수집일</span>
          <span style={{
            fontSize: '13px', fontWeight: 600,
            background: 'rgba(255,255,255,0.06)',
            padding: '3px 10px', borderRadius: '6px',
          }}>
            {collectionDate}
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {platforms.map(p => <PlatformKPICard key={p.id} platform={p} />)}
      </div>

      {/* Image gallery — full width */}
      <div style={{
        background: '#0d1729',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
      }}>
        <ImageGallery />
      </div>

      {/* Two-column content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <KeywordSection platforms={platforms} />
          <CampaignSection platforms={platforms} />
          <BrandSection platforms={platforms} />
        </div>
        <div>
          <InsightsPanel insights={insights} />
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard (standalone full-page route) ───────────────────────

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#060d1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#64748b', fontSize: '14px' }}>데이터 로딩 중…</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ minHeight: '100vh', background: '#060d1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#f87171', fontSize: '14px' }}>오류: {error ?? '데이터를 불러올 수 없습니다.'}</span>
      </div>
    );
  }

  const { collectionDate, platforms, insights } = data;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060d1a',
      color: '#f1f5f9',
      fontFamily: "'system-ui', '-apple-system', 'BlinkMacSystemFont', sans-serif",
    }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(6,13,26,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a href="/a14u" style={{ fontSize: '13px', color: '#475569', textDecoration: 'none' }}>← Main</a>
          <span style={{ color: 'rgba(255,255,255,0.12)' }}>|</span>
          <h1 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>Fashion Trend Intelligence</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>수집일</span>
          <span style={{ fontSize: '13px', fontWeight: 600, background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: '6px' }}>
            {collectionDate}
          </span>
        </div>
      </header>
      <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {platforms.map(p => <PlatformKPICard key={p.id} platform={p} />)}
        </div>
        <div style={{
          background: '#0d1729',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          <ImageGallery />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <KeywordSection platforms={platforms} />
            <CampaignSection platforms={platforms} />
            <BrandSection platforms={platforms} />
          </div>
          <div style={{ position: 'sticky', top: '68px' }}>
            <InsightsPanel insights={insights} />
          </div>
        </div>
      </main>
    </div>
  );
}
