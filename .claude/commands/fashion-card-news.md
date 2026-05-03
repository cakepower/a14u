# Fashion Trend React Component Generator Skill (Supanova Edition)

---
name: fashion-card-news
description: 패션 트렌드 스크래핑 마크다운 문서를 프리미엄 카드뉴스 React 컴포넌트로 변환하는 스킬. 사용자가 "패션 카드뉴스 만들어줘", "트렌드 카드 만들어줘", "fashion card news 만들어줘", "Create fashion card news", "update Fashion.tsx", "fashion trend cards" 같은 요청을 할 때 반드시 이 스킬을 사용하세요.
---

## 0. Mandatory Tool Usage: Firecrawl MCP

1. **Map**: `mcp_firecrawl_firecrawl_map` on target URLs to discover latest article links.
2. **Scrape**: `mcp_firecrawl_firecrawl_scrape` with `formats: ["json"]` to extract structured data.

## 1. Analysis Targets

- **Vogue**: `https://www.vogue.com/fashion/trends`
- **Elle**: `https://www.elle.com/fashion/trend-reports/`
- **Cosmopolitan**: `https://www.cosmopolitan.com/style-beauty/fashion/`

## 2. Extraction Schema

- `season_title`: Current/upcoming season name.
- `executive_summary`: 2–3 sentences of core trend direction. **Korean.**
- `magazines`: Array — insights + 10–12 image URLs per source.
- `trend_keywords`: Cross-publication trends. **Korean descriptions.**
- `styling_tips`: Actionable advice. **Korean.**

## 3. Design System

### Archetype: Warm Editorial
- Background: `#F2F2ED` (warm linen cream)
- Accent: `#F5C800` (single warm amber — no other accent colors)
- Dark panel: `#0a0a0a` (not pure black)
- Typography: Pretendard (Korean) + font-serif italic (English display)

### Language Rules
- **Titles**: English (keep original publication titles)
- **All other text**: Natural Korean (`word-break: keep-all`, `leading-snug`)
- No "혁신적인", "원활한", "차세대" — use concrete, specific language

### Card Architecture: Double-Bezel
Every card uses nested bezel structure — not flat rectangles:
```tsx
// Outer shell
<div className="bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[18px] hover:scale-[1.02] active:scale-[0.98]"
  style={{ transition: `transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)` }}>
  // Inner core
  <div className="bg-white rounded-[13px] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
    {/* image + content + accent bar */}
    <div style={{ height: '2px', background: '#F5C800' }} />
  </div>
</div>
```

### Motion Standard
All transitions use spring physics — never `ease-out`, `linear`, or `ease-in-out`:
```ts
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';
// Usage: style={{ transition: `transform 0.45s ${SPRING}` }}
```

### Section Headers: Eyebrow + Title + Subtitle
```tsx
<div data-sr>
  <span className="block mb-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold w-fit"
    style={{ background: 'rgba(0,0,0,0.06)', color: '#888' }}>
    {/* eyebrow: "Runway Intelligence" | "Editor's Pick" | "Style Report" */}
  </span>
  <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight border-b border-slate-200 pb-4 flex items-center gap-3 mb-3">
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl {bg-color}">
      <{Icon} className="w-5 h-5 {text-color}" />
    </span>
    {Section Title}
  </h3>
  <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-8 sm:mb-12">
    {Publication} · {Korean subtitle} · {DATE}
  </p>
</div>
```

### Icons: Inline SVG (no lucide-react, no FontAwesome)
Define three Solar-style icons at top of file:

```tsx
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const IconLayers = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 8.5 12 4l10 4.5L12 13 2 8.5Z" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m2 13.5 10 4.5 10-4.5" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m2 18 10 4.5 10-4.5" />
  </svg>
);

const IconScissors = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="6" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M21 4 9 13.5M14 14.5l7 7M9 10.5 12 12" />
  </svg>
);

const IconStars = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9.5 2.5 11.1 7.4H16l-4 2.9 1.5 4.7-4-2.6-4 2.6 1.5-4.7-4-2.9h4.9L9.5 2.5Z" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M17.5 2.5v3M16 4h3" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M20.5 13v2.5M19.25 14.25h2.5" />
  </svg>
);
```

Icon mapping:
- Vogue: `<IconLayers>` → `bg-blue-500/10 text-blue-600`
- Elle: `<IconScissors>` → `bg-purple-500/10 text-purple-600`
- Cosmopolitan: `<IconStars>` → `bg-amber-500/10 text-amber-600`

### Scroll Reveal Animation
Add `data-sr` to section header divs and grid containers. Inject CSS + IntersectionObserver in `useEffect`:

```tsx
React.useEffect(() => {
  const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
  window.addEventListener('keydown', handleKey);

  const container = containerRef.current;
  if (container) {
    const els = container.querySelectorAll<HTMLElement>('[data-sr]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('sr-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => { window.removeEventListener('keydown', handleKey); observer.disconnect(); };
  }
  return () => window.removeEventListener('keydown', handleKey);
}, []);
```

Include inside JSX return (before hero):
```tsx
<style>{`
  [data-sr] { opacity: 0; transform: translateY(1.5rem); transition: opacity 0.65s ${SPRING}, transform 0.65s ${SPRING}; }
  [data-sr].sr-visible { opacity: 1; transform: translateY(0); }
`}</style>
```

### Reusable TrendCard Component
Define once, use in all three sections:

```tsx
type CardItem = { title: string; summary: string; image: string; keywords: string[] };

const TrendCard = ({
  item, publication, onZoom, imageHeight = 'h-48',
}: {
  item: CardItem; publication: string; onZoom: () => void; imageHeight?: string;
}) => (
  <div
    className="group cursor-zoom-in bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[18px] hover:scale-[1.02] active:scale-[0.98]"
    style={{ transition: `transform 0.45s ${SPRING}` }}
    onClick={onZoom}
  >
    <div className="bg-white rounded-[13px] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
      <div className={`overflow-hidden ${imageHeight}`}>
        <img src={item.image} alt={item.title} loading="lazy" decoding="async"
          className="w-full h-full object-cover group-hover:scale-105"
          style={{ transition: `transform 0.45s ${SPRING}` }} />
      </div>
      <div className="px-5 py-4">
        <h4 className="text-[0.9rem] font-semibold leading-snug text-[#111] mb-2">{item.title}</h4>
        <p className="text-xs text-[#555] leading-relaxed mb-3" style={{ wordBreak: 'keep-all' }}>{item.summary}</p>
        <div className="flex flex-wrap gap-1">
          {item.keywords.map((kw) => (
            <span key={kw} className="bg-[#111]/5 text-[#333] text-[10px] font-medium px-2 py-0.5 rounded-full">{kw}</span>
          ))}
        </div>
      </div>
      <div style={{ height: '2px', background: '#F5C800' }} />
    </div>
  </div>
);
```

## 4. Output Format: React (TSX) Template

**Output file:** `src/components/Trends/Fashion.tsx` (overwrite in place)

Default export must remain `FashionTrendCards`.

### Full Component Structure

```tsx
import React from 'react';

type LightboxState = { src: string; title: string; publication: string } | null;

const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';

// [IconLayers, IconScissors, IconStars — inline SVG as above]

type CardItem = { title: string; summary: string; image: string; keywords: string[] };

// [TrendCard component as above]

// ── Data ──────────────────────────────────────────────────────────────────────
const vogueItems: CardItem[] = [ /* titles: English, summary: Korean */ ];
const elleItems: CardItem[]  = [ /* titles: English, summary: Korean */ ];
const cosmoItems: CardItem[] = [ /* titles: English, summary: Korean */ ];
const trendKeywords = [ { label: string, desc: string /* Korean */ } ];
const stylingTips = [ /* Korean strings */ ];

// ── Component ─────────────────────────────────────────────────────────────────
const FashionTrendCards: React.FC = () => {
  const [lightbox, setLightbox] = React.useState<LightboxState>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => { /* keyboard + scroll reveal */ }, []);

  return (
    <div ref={containerRef} className="min-h-screen text-slate-900 w-full max-w-full"
      style={{ background: '#F2F2ED', fontFamily: 'Pretendard, system-ui, -apple-system, sans-serif', overflowX: 'clip' }}>
      <style>{`[data-sr] { ... } [data-sr].sr-visible { ... }`}</style>

      {/* Hero: min-h-[80dvh], full-bleed image, italic serif title */}
      <header className="relative min-h-[80dvh] flex items-center justify-center overflow-hidden bg-black">
        ...
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Executive Summary — Korean quote, data-sr */}
        {/* Vogue section — eyebrow + h3 + subtitle + grid + wide card */}
        {/* Elle section   — eyebrow + h3 + subtitle + grid */}
        {/* Cosmo section  — eyebrow + h3 + subtitle + masonry columns */}
        {/* Intelligence section — Double-Bezel wrapper, 2-col grid */}
      </main>

      <footer>Generated {DATE} · Fashion Trend Intelligence · Firecrawl MCP</footer>

      {/* Lightbox overlay */}
    </div>
  );
};

export default FashionTrendCards;
```

### Intelligence Section Structure
Wrap the entire section in Double-Bezel too:
```tsx
<section className="mt-24 sm:mt-40 bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[24px]" data-sr>
  <div className="bg-white rounded-[19px] p-8 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
    <div className="grid md:grid-cols-2 gap-12 sm:gap-20">
      {/* Left: Trend Keywords with eyebrow tag */}
      {/* Right: bg-[#0a0a0a] dark panel, Styling Advice with eyebrow tag */}
    </div>
  </div>
</section>
```

## 5. Lightbox (Photo Popup)

No external libraries. React state only:

```tsx
type LightboxState = { src: string; title: string; publication: string } | null;
const [lightbox, setLightbox] = React.useState<LightboxState>(null);

// Overlay (add before closing </div> of root):
{lightbox && (
  <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center cursor-zoom-out"
    onClick={() => setLightbox(null)}>
    <button className="absolute top-6 right-8 text-slate-400 hover:text-white text-4xl leading-none"
      style={{ transition: `color 0.3s ${SPRING}` }}
      onClick={() => setLightbox(null)}>×</button>
    <img src={lightbox.src} alt={lightbox.title}
      className="max-h-[85vh] max-w-[90vw] object-contain"
      onClick={(e) => e.stopPropagation()} />
    <div className="mt-6 text-center px-4">
      <p className="text-white font-serif text-lg">{lightbox.title}</p>
      <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">{lightbox.publication}</p>
    </div>
  </div>
)}
```

## 6. Pre-Flight Checklist

Before outputting the component, verify:
- [ ] No `lucide-react` import — inline SVG icons only
- [ ] All card summaries in Korean (`word-break: keep-all`)
- [ ] All keyword descriptions in Korean
- [ ] All styling tips in Korean
- [ ] Executive summary in Korean
- [ ] Titles remain in English
- [ ] All cards use Double-Bezel architecture
- [ ] All transitions use `cubic-bezier(0.16, 1, 0.3, 1)` — no `ease-out`
- [ ] `data-sr` on section headers and grid containers
- [ ] `min-h-[80dvh]` on hero (not `h-[80vh]`)
- [ ] `loading="lazy" decoding="async"` on all images
- [ ] Icons visible on mobile (no `hidden sm:` on icon wrappers)
- [ ] Single accent color `#F5C800` — no competing colors
- [ ] `bg-[#0a0a0a]` dark panel (not `bg-slate-900`)

## 7. Operational Rules

- **MCP First**: Always use `firecrawl_map` + `firecrawl_scrape` for fresh data.
- **Tailwind Only**: Single self-contained TSX file, no external style sheets.
- **Images**: Use original scraped URLs. Never use Unsplash URLs.
- **No emojis** anywhere in the component.

## 8. Automated Weekly Execution

Scheduled every **Tuesday at 07:00 KST**:

```
0 7 * * 2 cd /home/cakepower/tutorial/a14u && claude --print "패션 카드 뉴스 만들어줘" >> /home/cakepower/tutorial/a14u/logs/fashion-cron.log 2>&1
```

Log format:
```
[YYYY-MM-DD 07:00] fashion-card-news: OK — {N} articles scraped
```

Log location: `/home/cakepower/tutorial/a14u/logs/fashion-cron.log`

Verify cron:
```bash
crontab -l | grep fashion
```
