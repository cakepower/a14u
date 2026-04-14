# Trends UI — shadcn Redesign Spec
**Date:** 2026-04-14  
**Scope:** Internal UI elements of Trends/airbnb.tsx, Trends/Fashion.tsx, Trends/Furniture.tsx, Trends/Photo.tsx

---

## Goal

Replace hand-rolled UI primitives in the four Trends components with shadcn equivalents and switch typography to Pretendard. Vertical layout and per-component color themes are preserved.

---

## Typography

- Install Pretendard via `@fontsource/pretendard` (npm)
- Add `@import "@fontsource/pretendard/400.css"` etc. to `src/index.css`
- Set `font-family: 'Pretendard', ...` as the base for all four components (replace `font-sans`, `font-serif`, inline style fonts)
- Heading weights: 600–700. Body: 400. Captions/labels: 400 light.

---

## shadcn Components to Install

| Component | Used in |
|-----------|---------|
| `tabs` | airbnb.tsx, Furniture.tsx (internal tab navigation) |
| `card` | All four — content cards |
| `badge` | All four — keyword tags, source labels, stat chips |
| `button` | All four — lightbox close, CTA links |

Install command: `npx shadcn@latest add tabs card badge button`

---

## Per-Component Changes

### airbnb.tsx (white bg, dashboard style)

- **Tabs** (`listings/market/problems/offers/viral/toprooms/events/pricing`): replace custom `<button>` tab row with shadcn `<Tabs>/<TabsList>/<TabsTrigger>/<TabsContent>`
- **Listing cards**: wrap in `<Card><CardHeader><CardContent>`. Rating/type → `<Badge variant="secondary">`. Tag chips → `<Badge variant="outline">`. CTA links → `<Button variant="outline" size="sm">` (as `<a>` target=_blank)
- **Problem matrix rows**: each row in `<Card>`. Urgency/WTP scores → colored `<Badge>`. Flag emojis stay.
- **Stat blocks**: `<Card>` with value in `CardHeader`, description in `CardContent`

### Fashion.tsx (white bg, editorial style)

- **Vogue grid cards**: `<Card>` with image on top, `<CardHeader>` for title, `<CardContent>` for summary + badges
- **Elle horizontal items**: `<Card className="flex-row">` layout preserved, `<Badge variant="secondary">` for pink tags
- **Cosmo masonry items**: `<Card>` with `CardContent`, amber `<Badge>` for keywords
- **Trend keywords list**: `<Badge variant="outline">` for each keyword label
- **Lightbox close button**: `<Button variant="ghost" size="icon">`

### Furniture.tsx (white bg, dashboard style)

- **Tabs** (`trends/market/problems/opportunities`): replace custom tab UI with shadcn `<Tabs>`
- **Trend rank cards**: `<Card>` with rank number in `<CardHeader>`, description + signal in `<CardContent>`. Demand score → `<Badge>`. Tags → `<Badge variant="outline">`
- **Market stat boxes**: `<Card>` for TAM/SAM/SOM and each stat chip
- **Problem matrix**: same pattern as airbnb problem cards
- **Opportunity cards**: `<Card>` with action list inside `<CardContent>`

### Photo.tsx (black bg, cinematic style)

- **Visual keywords**: `<Badge variant="outline" className="border-zinc-700 text-zinc-400">` (dark-themed)
- **Photographer credits list**: each entry in a minimal `<Card className="bg-transparent border-zinc-800">` or plain — keep list style, just use `<Badge>` for agency name
- **Lightbox close button**: `<Button variant="ghost" size="icon">` with white text

---

## What Does NOT Change

- Grid and column layouts (CSS Grid / Flexbox)
- Image aspect ratios and hover zoom effects
- Lightbox overlay structure
- Per-component background colors (white / black)
- Section heading styles (large font-serif headings in Fashion and Photo)
- Data and content (no content changes)

---

## Implementation Order

1. Install Pretendard + shadcn components
2. airbnb.tsx
3. Furniture.tsx
4. Fashion.tsx
5. Photo.tsx

Each component is independent — no shared state changes needed.
