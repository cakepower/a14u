# B&W Editorial Photo Card Generator Skill (with Firecrawl MCP)

---
name: bw-photo-cards
description: 흑백 에디토리얼 패션 사진을 스크래핑하여 인터랙티브 React 컴포넌트로 만드는 스킬. "흑백 포토 카드 만들어줘", "B&W 에디토리얼 카드", "Photo.tsx 업데이트해줘", "Create B&W photo cards", "update Photo.tsx", "B&W editorial cards" 같은 요청 시 사용. You are an expert Frontend Developer and Editorial Photography Analyst. Use **Firecrawl MCP** to gather real-time black-and-white editorial photography and generate a monochrome React (TSX) component.
---

## 0. Mandatory Tool Usage: Firecrawl MCP

To ensure high-quality, structured data, follow these steps:

1. **Map**: Use `mcp_firecrawl_firecrawl_map` on each target URL to discover the latest editorial/photography article links.

2. **Scrape**: Use `mcp_firecrawl_firecrawl_scrape` with `formats: ["json"]` on the discovered links to extract structured data (title, caption, image URLs, photographer, publication).

## 1. Analysis Targets

Execute Firecrawl operations on:

- **Magnum Photos**: `https://www.magnumphotos.com/arts-culture/`

- **Yanidel**: `https://yanidel.net/`

- **Reminders Photography Stronghold**: `https://reminders-project.org/en/`

- **Phil Penman**: 아래 시리즈 중 실행 날짜 기준으로 **1개를 랜덤 선택**하여 스크래핑

  | 시리즈 | URL |
  |--------|-----|
  | Features (기본) | `https://www.philpenman.com/features/` |
  | New York Pandemic | `https://www.philpenman.com/new-york-pandemic/` |
  | Team Sky Cycling | `https://www.philpenman.com/team-sky/` |
  | September 11 | `https://www.philpenman.com/september-11/` |
  | Celebrity | `https://www.philpenman.com/celebrity/` |
  | Atlantic City | `https://www.philpenman.com/atlantic-city/` |

  **선택 방법:** `(오늘 날짜의 주 번호) % 6` 인덱스로 순환. 예: 주차 0→Features, 1→Pandemic, 2→TeamSky, 3→Sep11, 4→Celebrity, 5→AtlanticCity.
  선택된 시리즈 이름을 컴포넌트의 Phil Penman 섹션 서브타이틀에 반영할 것.

## 2. Extraction Requirements (via Scrape JSON)

When calling `firecrawl_scrape`, request the following schema:

- `edition_title`: Current editorial series or issue name.

- `editorial_note`: 2–3 sentences on the visual mood and photographic direction.

- `sources`: An array containing insights and 8–10 high-resolution **black-and-white** image URLs per source. Prioritize monochrome street photography images.

- `visual_keywords`: Overlapping aesthetic themes across magazines (e.g., "chiaroscuro", "grain", "geometric shadow").

- `photographer_credits`: Notable photographers featured in the edition.

## 3. Output Format: React (TSX) Component

**Output file:** `src/components/Trends/Photo.tsx` (overwrite in place)

The default export must be `BWEditorialCards`:

```ts
// App.tsx import:
import BWEditorialCards from "./components/Trends/Photo";
```

Generate the component using **Tailwind CSS** with a strict **monochrome palette** (`black`, `white`, `gray-*`, `zinc-*` only — no color utilities).

**디자인 시스템 (`__context/design-style-guide.md` 기준):**

컴포넌트 생성 전 `__context/design-style-guide.md` 전체를 Read하세요.
단, 이 컴포넌트는 의도적 모노크롬 다크 테마입니다 — 배경 `bg-black`, 색상은 `gray-*`/`zinc-*`만 허용, 아이콘 래퍼는 `bg-white/10 text-zinc-300` 사용 (Semantic Color System 예외).

섹션 아이콘 매핑:
- Magnum Photos: `Camera` → `bg-white/10 text-zinc-300`
- Yanidel: `Eye` → `bg-white/10 text-zinc-300`
- Reminders Photography Stronghold: `Globe` → `bg-white/10 text-zinc-300`
- Phil Penman: `Aperture` → `bg-white/10 text-zinc-300`

```tsx
import React from 'react';
import { Camera, Eye, Globe, Aperture } from 'lucide-react';

const BWEditorialCards: React.FC = () => {
  return (
    <div
      className="bg-black min-h-screen font-serif text-white w-full max-w-full"
      style={{ overflowX: 'clip' }}
    >

      {/* Hero */}
      <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="{{HERO_IMAGE_URL}}"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
          alt="Editorial Hero"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-zinc-400 tracking-[0.5em] uppercase text-sm mb-6">Editorial</p>
          <h1 className="text-white text-4xl sm:text-7xl md:text-[10rem] font-serif italic leading-none mb-4">
            {{EDITION_TITLE}}
          </h1>
          <p className="text-zinc-300 text-lg tracking-[0.2em] uppercase">Photography Review</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-24">

        {/* Editorial Note */}
        <section className="mb-32 max-w-2xl mx-auto text-center border-t border-b border-zinc-700 py-16">
          <p className="text-xl sm:text-2xl font-light leading-relaxed text-zinc-300 italic">
            "{{EDITORIAL_NOTE}}"
          </p>
        </section>

        {/* Source Grids */}
        <div className="space-y-40">

          {/* Magnum Photos — Full-bleed staggered grid */}
          <section>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2 text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <Camera className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
              </span>
              Magnum Photos
            </h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">Classic Street</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">{{MAGNUM_ITEMS}}</div>
          </section>

          {/* Yanidel — Large feature */}
          <section>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2 text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <Eye className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
              </span>
              Yanidel
            </h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">Paris Street Photography · Yannick Lebreton</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{{YANIDEL_ITEMS}}</div>
          </section>

          {/* Reminders Photography Stronghold — Masonry */}
          <section>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2 text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <Globe className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
              </span>
              Reminders Photography Stronghold
            </h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">Asian Documentary Street</p>
            <div className="columns-1 md:columns-3 gap-4 space-y-4">{{REMINDERS_ITEMS}}</div>
          </section>

          {/* Phil Penman — Full-bleed staggered grid */}
          <section>
            <h3 className="text-2xl sm:text-4xl font-serif mb-2 text-white flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/10">
                <Aperture className="w-6 h-6 text-zinc-300" strokeWidth={1.5} />
              </span>
              Phil Penman
            </h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs mb-12">{{PHILPENMAN_SERIES_TITLE}}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">{{PHILPENMAN_ITEMS}}</div>
          </section>

        </div>

        {/* Visual Keywords & Photographer Credits */}
        <section className="mt-40 grid md:grid-cols-2 gap-16 border-t border-zinc-800 pt-20">
          <div>
            <h4 className="text-xl font-serif mb-8 text-zinc-400 tracking-widest uppercase">Visual Language</h4>
            <div className="flex flex-wrap gap-3">{{KEYWORD_LIST}}</div>
          </div>
          <div>
            <h4 className="text-xl font-serif mb-8 text-zinc-400 tracking-widest uppercase">Photographers</h4>
            <ul className="space-y-3 text-zinc-300 font-light">{{PHOTOGRAPHER_LIST}}</ul>
          </div>
        </section>

      </main>

      <footer className="text-center py-12 text-zinc-600 text-xs tracking-widest uppercase border-t border-zinc-900">
        Generated {{DATE}} · B&W Editorial Intelligence
      </footer>

    </div>
  );
};

export default BWEditorialCards;
```

### Image Rendering Rule

All `<img>` tags **must** include `className="grayscale w-full h-full object-cover"` to enforce the monochrome aesthetic regardless of source image color.

## 4. Lightbox (Photo Popup)

Every image must open a fullscreen lightbox on click. Implement using React state — **no external libraries**.

```tsx
// State (add at top of component)
const [lightbox, setLightbox] = React.useState<{ src: string; title: string; photographer: string } | null>(null);

// Lightbox overlay (add just before closing </div> of root)
{lightbox && (
  <div
    className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center cursor-zoom-out"
    onClick={() => setLightbox(null)}
  >
    <button
      className="absolute top-6 right-8 text-zinc-400 hover:text-white text-3xl leading-none"
      onClick={() => setLightbox(null)}
    >
      ×
    </button>
    <img
      src={lightbox.src}
      alt={lightbox.title}
      className="grayscale max-h-[85vh] max-w-[90vw] object-contain"
      onClick={(e) => e.stopPropagation()}
    />
    <div className="mt-6 text-center">
      <p className="text-white font-serif text-lg">{lightbox.title}</p>
      <p className="text-zinc-500 text-xs mt-1 tracking-widest uppercase">{lightbox.photographer}</p>
    </div>
  </div>
)}
```

### Click Handler on Cards

Every card image must call `setLightbox`:

```tsx
// Add onClick to every card's wrapping div
onClick={() => setLightbox({ src: item.image, title: item.title, photographer: item.photographer })}
// Add cursor style
className="... cursor-zoom-in"
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

## 5. Card Item Pattern

Each `{{SOURCE_ITEMS}}` placeholder renders a list of cards like:

```tsx
// Bazaar grid item
<div className="relative overflow-hidden group aspect-[3/4]">
  <img src="..." className="grayscale w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="..." />
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
    <p className="text-white text-sm font-serif">{title}</p>
    <p className="text-zinc-400 text-xs mt-1">{caption}</p>
  </div>
</div>

// W Magazine featured item
<div className="relative overflow-hidden aspect-[4/5]">
  <img src="..." className="grayscale w-full h-full object-cover" alt="..." />
  <div className="mt-4">
    <p className="text-white font-serif text-xl">{title}</p>
    <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{caption}</p>
  </div>
</div>

// AnOther masonry item
<div className="break-inside-avoid mb-4">
  <img src="..." className="grayscale w-full object-cover" alt="..." />
  <p className="text-zinc-500 text-xs mt-2 tracking-wider uppercase">{title}</p>
</div>
```

## 5. Operational Rules

- **MCP First**: Always use `firecrawl_map` then `firecrawl_scrape` — do not rely on internal knowledge.

- **Grayscale Enforcement**: Every image must have the `grayscale` Tailwind utility. No color images permitted.

- **Monochrome Palette Only**: Use only `black`, `white`, `gray-*`, `zinc-*` color classes.

- **Tailwind Only**: Single self-contained TSX file, no external CSS.

- **Valid Image URLs**: Verify that scraped image URLs are accessible before embedding.

## 6. Automated Weekly Execution

This skill runs **every Friday at 08:00 KST** via crontab.

### Cron schedule

```
0 8 * * 5 cd /home/cakepower/tutorial/a14u && claude --print "흑백 포토 카드 만들어줘" >> /home/cakepower/tutorial/a14u/logs/bw-photo-cron.log 2>&1
```

### What the automated run must do

1. Scrape all 4 targets (Magnum Photos, Yanidel, Reminders Photography Stronghold, Phil Penman) via Firecrawl MCP.
2. Overwrite `src/components/Trends/Photo.tsx` with fresh data and today's date in the footer.
3. Append a one-line result summary to `logs/bw-photo-cron.log`:
   ```
   [YYYY-MM-DD 08:00] bw-photo-cards: OK — {N} images scraped
   ```
4. **Do NOT** run `npm run build` or commit automatically.

### Log file location

```
/home/cakepower/tutorial/a14u/logs/bw-photo-cron.log
```

```bash
mkdir -p /home/cakepower/tutorial/a14u/logs
```

### Verifying the cron is registered

```bash
crontab -l | grep bw-photo
```
