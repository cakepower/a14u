# Fashion Trend React Component Generator Skill (with Firecrawl MCP)

---
name: fashion-card-news
description: 패션 트렌드 스크래핑 마크다운 문서를 인터랙티브 카드뉴스 React 컴포넌트로 변환하는 스킬. 사용자가 "패션 카드뉴스 만들어줘", "트렌드 카드 만들어줘", "fashion card news 만들어줘", "Create fashion card news", "update Fashion.tsx", "fashion trend cards" 같은 요청을 할 때 반드시 이 스킬을 사용하세요. You are an expert Frontend Developer and Fashion Analyst. You MUST use the **Firecrawl MCP** tools to gather real-time fashion intelligence and generate a high-end React (TSX) component.
---

## 0. Mandatory Tool Usage: Firecrawl MCP

To ensure high-quality, structured data, follow these steps using MCP:

1.  **Map**: Use `mcp_firecrawl_firecrawl_map` on the target URLs to discover the latest article links.

2.  **Scrape**: Use `mcp_firecrawl_firecrawl_scrape` with `formats: ["json"]` on the discovered links to extract structured data (title, summary, images, keywords).

## 1. Analysis Targets

Execute Firecrawl operations on:

- **Vogue**: `https://www.vogue.com/fashion/trends`

- **Elle**: `https://www.elle.com/fashion/trend-reports/`

- **Cosmopolitan**: `https://www.cosmopolitan.com/style-beauty/fashion/`

## 2. Extraction Requirements (via Scrape JSON)

When calling `firecrawl_scrape`, request the following schema:

- `season_title`: Current/Upcoming season name.

- `executive_summary`: 2-3 sentences of core trend direction.

- `magazines`: An array containing insights and 10-12 high-resolution image URLs for each source.

- `trend_keywords`: Overlapping trends across magazines.

- `styling_tips`: Actionable advice based on findings.

## 3. Output Format: React (TSX) Template

**Output file:** `src/components/Trends/Fashion.tsx` (overwrite in place)

The default export must remain `FashionTrendCards` so the existing `App.tsx` import keeps working:

```ts
// App.tsx already has:
import FashionTrendCards from "./components/Trends/Fashion";
```

Generate the component using **Tailwind CSS** and fill the placeholders with scraped data.

**디자인 시스템 (`__context/design-style-guide.md` 기준):**

컴포넌트 생성 전 `__context/design-style-guide.md` 전체를 Read하세요.

섹션별 아이콘 매핑:
- Vogue: `Layers` → `bg-blue-500/10 text-blue-600`
- Elle: `Scissors` → `bg-purple-500/10 text-purple-600`
- Cosmopolitan: `Sparkles` → `bg-yellow-400/10 text-yellow-500`

```tsx
import React from 'react';
import { Layers, Scissors, Sparkles } from 'lucide-react';

const FashionTrendReport: React.FC = () => {
  return (
    <div
      className="min-h-screen text-slate-900 w-full max-w-full"
      style={{ background: '#F2F2ED', fontFamily: 'Pretendard, system-ui, -apple-system, sans-serif', overflowX: 'clip' }}
    >

      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="{{HERO_IMAGE_URL}}"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          alt="Fashion Hero"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">Fashion Intelligence · {{TODAY_DATE}}</p>
          <h1 className="text-white text-4xl sm:text-6xl md:text-9xl font-serif italic mb-4">{{SEASON_TITLE}}</h1>
          <p className="text-white text-xl tracking-[0.3em] uppercase opacity-80">Trend Intelligence Report</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Executive Summary */}
        <section className="mb-24 text-center max-w-3xl mx-auto">
          <p className="text-xl sm:text-3xl font-light leading-relaxed italic text-slate-700">"{{EXECUTIVE_SUMMARY}}"</p>
        </section>

        {/* Dynamic Magazine Grids */}
        <div className="space-y-32 sm:space-y-40">

          {/* Vogue (Grid) */}
          <section>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10">
                <Layers className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
              </span>
              Vogue Insights
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide sm:tracking-widest uppercase mb-8 sm:mb-10 leading-relaxed">Vogue · 시즌 트렌드 · {{TODAY_DATE}}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* 각 카드: bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow */}
              {/* 카드 하단: <div style={{ height: '3px', background: '#F5C800' }} /> */}
              {{VOGUE_ITEMS}}
            </div>
          </section>

          {/* Elle (Featured) */}
          <section>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500/10">
                <Scissors className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
              </span>
              Elle Edit
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide sm:tracking-widest uppercase mb-8 sm:mb-10 leading-relaxed">Elle · 에디터 픽 · {{TODAY_DATE}}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {{ELLE_ITEMS}}
            </div>
          </section>

          {/* Cosmo (Masonry) */}
          <section>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-amber-500/10">
                <Sparkles className="w-6 h-6 text-amber-600" strokeWidth={1.5} />
              </span>
              Cosmopolitan Style
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide sm:tracking-widest uppercase mb-8 sm:mb-10 leading-relaxed">Cosmopolitan · 스타일 리포트 · {{TODAY_DATE}}</p>
            <div className="columns-1 md:columns-3 gap-6 space-y-6">{{COSMO_ITEMS}}</div>
          </section>

        </div>

        {/* Intelligence & Styling */}
        <section className="mt-24 sm:mt-40 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12 sm:gap-20">
            <div>
              <h4 className="text-xl sm:text-2xl font-semibold mb-6 flex flex-wrap items-center gap-2">Trend Keywords</h4>
              <div className="space-y-4">{{KEYWORD_LIST}}</div>
            </div>
            <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-2xl">
              <h4 className="text-xl sm:text-2xl font-semibold mb-6">Styling Advice</h4>
              <ul className="space-y-6 font-light">{{STYLING_LIST}}</ul>
            </div>
          </div>
        </section>

      </main>

      <footer className="text-center py-12 text-slate-400 text-xs tracking-widest uppercase border-t border-slate-200">
        Generated {{TODAY_DATE}} · Fashion Trend Intelligence · Firecrawl MCP
      </footer>

    </div>
  );
};

export default FashionTrendReport;
```

## 4. Lightbox (Photo Popup)

Every image must open a fullscreen lightbox on click. Implement using React state — **no external libraries**.

```tsx
// State type (add at top of component)
type LightboxState = { src: string; title: string; publication: string } | null;
const [lightbox, setLightbox] = React.useState<LightboxState>(null);

// Lightbox overlay (add just before closing </div> of root)
{lightbox && (
  <div
    className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center cursor-zoom-out"
    onClick={() => setLightbox(null)}
  >
    <button
      className="absolute top-6 right-8 text-slate-400 hover:text-white text-4xl leading-none transition-colors"
      onClick={() => setLightbox(null)}
    >
      ×
    </button>
    <img
      src={lightbox.src}
      alt={lightbox.title}
      className="max-h-[85vh] max-w-[90vw] object-contain"
      onClick={(e) => e.stopPropagation()}
    />
    <div className="mt-6 text-center">
      <p className="text-white font-serif text-lg">{lightbox.title}</p>
      <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">{lightbox.publication}</p>
    </div>
  </div>
)}
```

### Keyboard Support

Add `useEffect` for ESC key close:

```tsx
React.useEffect(() => {
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);
```

### Click Handler on Cards

Every card image must call `setLightbox`:

```tsx
// Add onClick to every card's wrapping div
onClick={() => setLightbox({ src: item.image, title: item.title, publication: 'Vogue' })}
// Add cursor style
className="... cursor-zoom-in"
```

## 5. Operational Rules

- **MCP First**: Do not rely on internal knowledge; always use `firecrawl_map` and `firecrawl_scrape` for accuracy.

- **Visual Integrity**: Ensure image URLs are valid and displayed in high resolution.

- **Tailwind Only**: The output must be a single, self-contained TSX file using Tailwind CSS classes.

## 5. Automated Weekly Execution

This skill is scheduled to run **every Tuesday at 07:00 KST** via crontab.

### Cron schedule

```
0 7 * * 2 cd /home/cakepower/tutorial/a14u && claude --print "패션 카드 뉴스 만들어줘" >> /home/cakepower/tutorial/a14u/logs/fashion-cron.log 2>&1
```

### What the automated run must do

1. Scrape all 3 targets (Vogue, Elle, Cosmopolitan) with Firecrawl MCP — same as interactive mode.
2. Overwrite `src/components/Trends/Fashion.tsx` with fresh data and today's date in the footer.
3. Append a one-line result summary to `logs/fashion-cron.log`:
   ```
   [YYYY-MM-DD 07:00] fashion-card-news: OK — {N} articles scraped
   ```
4. **Do NOT** run `npm run build` or commit automatically — leave that to the developer.

### Log file location

```
/home/cakepower/tutorial/a14u/logs/fashion-cron.log
```

Create the directory if it does not exist:

```bash
mkdir -p /home/cakepower/tutorial/a14u/logs
```

### Verifying the cron is registered

```bash
crontab -l | grep fashion
```