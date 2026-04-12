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

```tsx

import React from 'react';

const FashionTrendReport: React.FC = () => {

  return (

    <div className="bg-white min-h-screen font-sans text-slate-900">

      {/* Hero Section */}

      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">

        <img

          src="{{HERO_IMAGE_URL}}"

          className="absolute inset-0 w-full h-full object-cover opacity-70"

          alt="Fashion Hero"

        />

        <div className="relative z-10 text-center px-4">

          <h1 className="text-white text-6xl md:text-9xl font-serif italic mb-4">{{SEASON_TITLE}}</h1>

          <p className="text-white text-xl tracking-[0.3em] uppercase opacity-80">Trend Intelligence Report</p>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-6 py-24">

        {/* Executive Summary */}

        <section className="mb-32 text-center max-w-3xl mx-auto">

          <p className="text-3xl font-light leading-relaxed italic text-slate-700">"{{EXECUTIVE_SUMMARY}}"</p>

        </section>

        {/* Dynamic Magazine Grids */}

        <div className="space-y-40">

          {/* Vogue (Grid) */}

          <section>

            <h3 className="text-5xl font-serif mb-12 border-b pb-4">💎 Vogue Insights</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{{VOGUE_ITEMS}}</div>

          </section>

          {/* Elle (Featured) */}

          <section>

            <h3 className="text-5xl font-serif mb-12 border-b pb-4">👗 Elle Edit</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">{{ELLE_ITEMS}}</div>

          </section>

          {/* Cosmo (Masonry) */}

          <section>

            <h3 className="text-5xl font-serif mb-12 border-b pb-4">🌟 Cosmopolitan Style</h3>

            <div className="columns-1 md:columns-3 gap-6 space-y-6">{{COSMO_ITEMS}}</div>

          </section>

        </div>

        {/* Intelligence & Styling */}

        <section className="mt-40 grid md:grid-cols-2 gap-20 bg-slate-50 p-12 rounded-3xl">

          <div>

            <h4 className="text-2xl font-serif mb-8 underline">Trend Keywords</h4>

            <div className="space-y-4">{{KEYWORD_LIST}}</div>

          </div>

          <div className="bg-slate-900 text-white p-10 rounded-2xl">

            <h4 className="text-2xl font-serif mb-8 text-blue-400">Styling Advice</h4>

            <ul className="space-y-6 font-light">{{STYLING_LIST}}</ul>

          </div>

        </section>

      </main>

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