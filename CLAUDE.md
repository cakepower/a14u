# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A14U is a React-based magazine/blog landing page with interactive 3D WebGL backgrounds. The project integrates with a backend API for content (daily tweets, topics, inspiration, portfolio) and falls back to demo data when APIs are unavailable.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview production build
```

## Architecture

### Entry Point & Layout
- `index.tsx` - React root mount
- `App.tsx` - Main layout orchestrator; fetches data from `/api/news/*` endpoints with demo data fallback

### Two-Layer Visual Structure
1. **Hero Section** (`components/Hero.tsx`)
   - Full viewport 3D background via `components/SF.tsx`
   - SF.tsx contains a custom WebGL particle cylinder system using @react-three/fiber with GLSL shaders
   - Particles respond to mouse interaction with repulsion effects

2. **News Section** (`News.tsx`)
   - Contains `components/NewsBackground.tsx` - a separate R3F Canvas with orthographic camera
   - Foreground content sections: FeaturedSection, DailyTweetSection, TopicsSection, InspirationSection, PortfolioSection

### 3D Graphics (Three.js / React Three Fiber)
- Uses @react-three/fiber and @react-three/drei
- `SF.tsx` implements custom ShaderMaterial with:
  - CylinderShaderMaterial - rainbow-colored particle system
  - ConnectionShaderMaterial - animated line connections
  - TriangleShaderMaterial - ephemeral triangle overlays
- Mobile-responsive: adjusts particle count (2500 mobile vs 8000 desktop) and camera positioning

### Type Definitions
- `types.ts` - Core Slide type
- `components/newsTypes.ts` - DummyPost, TopicBlock, DailyTweetItem, PostFromDB, etc.

### API Endpoints (Backend Integration)
- `/api/news/daily-tweets/` - Daily tweet items
- `/api/news/topics/` - Topic blocks
- `/api/news/inspiration/` - Inspiration posts
- `/api/news/portfolio/` - Portfolio items
- `/api/generated-images` - Generated image gallery with pagination

### Styling
- Tailwind CSS v4 with custom config
- Custom font: GmarketSans
- Dark theme colors: `#020617` (desktop), `#363636` (mobile)
- Inline styles used extensively in components

## Key Patterns

- Mobile detection via `window.innerWidth <= 768` with resize listeners
- Async data fetching with `alive` flag cleanup pattern to prevent state updates after unmount
- Demo data fallback in `components/newsDummyData.ts`
- Path alias: `@/*` maps to project root
