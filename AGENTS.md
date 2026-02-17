# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite + React + TypeScript frontend.
- App entry points: `index.html`, `index.tsx`, `App.tsx`
- Feature/UI code: `components/` (sections, sliders, icons, news UI)
- Shared hooks/types: `hooks/`, `types.ts`
- Static assets: `public/images/`, `public/fonts/`
- Styling: `index.css`, `style.css`, `tailwind.config.js`
- Build output: `dist/` (generated; do not hand-edit)

Note: there are historical `copy`/`_old` files in the repo; prefer editing active files referenced by `App.tsx`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local Vite dev server.
- `npm run build`: create production bundle in `dist/`.
- `npm run preview`: serve the built bundle locally.
- `npm run build:css`: compile/minify Tailwind CSS into `dist/styles.css`.
- `npm run watch:css`: watch and rebuild Tailwind CSS during UI work.

Before opening a PR, run at least `npm run build` to catch type/bundle issues.

## Coding Style & Naming Conventions
- Use TypeScript/TSX with 2-space indentation and semantically named props/state.
- Components: `PascalCase` filenames and exports (for example, `HeroSlider.tsx`).
- Hooks: `camelCase` with `use` prefix (for example, `useMockBlogData.ts`).
- Keep UI components presentational where possible; colocate small helper types near usage or in `types.ts`.
- Follow existing Tailwind/CSS patterns; avoid introducing a second styling approach.

## Testing Guidelines
No automated test framework is currently configured. Until one is added:
- Validate changes via `npm run dev` and `npm run build`.
- Manually check key flows: hero/slider rendering, news sections, responsive layouts.
- If adding tests, use `*.test.ts(x)` naming and place near the related module.

## Commit & Pull Request Guidelines
Git history is mixed (short English/Korean messages, many UI-focused updates). Going forward:
- Write imperative, scoped commits: `feat(hero): refine outline background contrast`.
- Keep commits focused; avoid bundling unrelated refactors.
- PRs should include: summary, changed files/areas, manual verification steps, and screenshots/GIFs for UI changes.
- Link related issues/tasks when available.

## Security & Configuration Tips
- Keep secrets in `.env.local` only (for example `GEMINI_API_KEY`); never commit env files.
- Review static assets for licensing and size before adding to `public/`.
