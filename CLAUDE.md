# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A14U is a React-based magazine/blog landing page with interactive 3D WebGL backgrounds. The project integrates with a backend API for content (daily tweets, topics, inspiration, portfolio) and falls back to demo data when APIs are unavailable.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start Vite dev server (localhost:5173/a14u)
npm run build      # Production build
npm run preview    # Preview production build
```

## Architecture

### Two-Layer Visual Structure

The app has two main visual layers, each with its own R3F Canvas:

1. **Hero Section** (`src/components/Hero.tsx`)
   - Full viewport 3D background with switchable themes
   - Theme selector at bottom allows switching between: SF Cylinder, SLines, Outlines, Dynamic (Plines)
   - `children` prop only renders when Plines/Dynamic theme is active

2. **News Section** (`src/News.tsx`)
   - Contains sticky R3F Canvas with orthographic camera as background
   - Gradient overlay on top of canvas
   - Content sections rendered as children: Featured, DailyTweet, Topics, Inspiration, Portfolio

### 3D Background Components

All backgrounds are in `src/components/`:

| Component | Description |
|-----------|-------------|
| `SF.tsx` | Rainbow particle cylinder with mouse repulsion. Uses custom GLSL shaders (CylinderShaderMaterial, ConnectionShaderMaterial, TriangleShaderMaterial). Particles rotate via shader, not mesh. |
| `Outlines.tsx` | Edge-detected particle silhouettes from images. Loads images from `/a14u/images.txt`, morphs between shapes. Includes masked horizontal background lines. |
| `Plines.tsx` | Dynamic particle lines with theme variations |
| `SLines.tsx` | Stylized line-based background |

### Mobile Responsiveness

- Breakpoint: `window.innerWidth <= 768`
- All 3D components adjust particle count, camera distance, and base sizes for mobile
- SF.tsx: 2500 particles (mobile) vs 8000 (desktop)
- Outlines.tsx: 1500 particles (mobile) vs 5000 (desktop)
- Background colors: `#363636` (mobile), `#020617` (desktop)

### Data Flow

`App.tsx` fetches from four API endpoints in parallel on mount, with demo data fallback:
- `/api/news/daily-tweets/` → DailyTweetSection
- `/api/news/topics/` → TopicsSection
- `/api/news/inspiration/` → InspirationSection
- `/api/news/portfolio/` → PortfolioSection

Uses `alive` flag pattern for cleanup to prevent state updates after unmount.

### Type Definitions

- `src/types.ts` - Core Slide type
- `src/components/newsTypes.ts` - DummyPost, TopicBlock, DailyTweetItem, PostFromDB, FeaturedConfig

### Build Configuration

- Base path: `/a14u` (assets served from this subpath)
- Path alias: `@/*` maps to `src/`
- Vendor chunk: react, react-dom, three, @react-three/fiber, @react-three/drei
- Tailwind CSS v4 via `@tailwindcss/vite` plugin

### Key Patterns

- Async data fetching with `alive` flag cleanup pattern
- Demo data fallback in `src/components/newsDummyData.ts`
- Inline styles used extensively (not Tailwind classes) in components
- Custom font: GmarketSans
