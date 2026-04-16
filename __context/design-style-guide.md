# Design Style Guide — Trends Component Design System

> 모든 Trends 컴포넌트(`Fashion.tsx`, `airbnb.tsx`, `Furniture.tsx`, `Photo.tsx` 등)와 리스팅 페이지에 적용되는 시각 규칙.
> 컴포넌트 생성 전 반드시 이 파일 전체를 Read하세요.

---

## 1. Color Palette

### Base Colors

| Role | Value | Tailwind | Usage |
|------|-------|----------|-------|
| Page Background | `#F2F2ED` | `style={{ background: '#F2F2ED' }}` | 페이지 배경 (inline style 필수) |
| Card Background | `#FFFFFF` | `bg-white` | 카드 표면 |
| Primary Text | `#111111` | `text-[#111111]` | 제목, 헤딩 |
| Secondary Text | `#444444` | `text-[#444444]` | 메타데이터, 보조 텍스트 |
| Accent | `#F5C800` | `style={{ background: '#F5C800' }}` | 카드 하단 3px 바, 강조 |
| Border | `slate-200` | `border-slate-200` | 구분선, 카드 테두리 |

### Semantic Color System

섹션 의미에 따라 아이콘 래퍼·아이콘 색상을 선택한다. **배지 배경은 항상 monotone** — pastel 색상 배경 금지.

| 역할 | 아이콘 래퍼 | 아이콘 색상 | 사용 맥락 |
|------|-----------|-----------|---------|
| Primary / Info | `bg-blue-500/10` | `text-blue-600` | 일반 정보, 트렌드 개요, 메인 섹션 |
| Warning / Problem | `bg-red-500/10` | `text-red-600` | 문제점, 리스크, 경고, 소비자 불만 |
| Success / Opportunity | `bg-green-500/10` | `text-green-600` | 기회 영역, 성공 지표, 긍정 신호 |
| Accent / Action | `bg-yellow-400/10` | `text-yellow-500` | 브랜드 강조, CTA, 액션 유도 |
| Editorial / Curation | `bg-purple-500/10` | `text-purple-600` | 에디터 픽, 큐레이션, 트렌드 리포트 |
| Market / Data | `bg-blue-500/10` | `text-blue-600` | 시장 분석, 통계, 수치 데이터 |
| Neutral | `bg-gray-500/10` | `text-gray-600` | 기타, 중립 정보 |

> 아이콘 래퍼의 `/10` 투명도는 배경에 색상이 드러나지 않을 정도로만 사용.

**예외**: `bw-photo-cards` (Photo.tsx)는 의도적 모노크롬 — 아이콘 래퍼 `bg-white/10`, 아이콘 색상 `text-zinc-300` 고정.

### Badge (배지) 규칙

배지는 **monotone**만 허용. `bg-blue-50`, `bg-red-100` 등 pastel 배경 사용 금지.

| 용도 | 배경 | 텍스트 | Tailwind |
|------|------|--------|----------|
| 일반 레이블 | `#111111` 5% | `#111111` | `bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full` |
| 강조 레이블 | `#111111` | `#FFFFFF` | `bg-[#111111] text-white text-xs font-medium px-2 py-0.5 rounded-full` |
| 보조 레이블 | `slate-100` | `slate-600` | `bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full` |

### 카드 배경 규칙

모든 카드 배경은 **흰색(`#FFFFFF`) 단일 적용** — 색상·그라데이션·반투명 배경 금지.

| 컴포넌트 | 카드 배경 | 패널/요약 배경 |
|---------|---------|-------------|
| 일반 카드 | `bg-white` | — |
| 하단 요약 패널 | — | `bg-white border border-slate-200 rounded-3xl` |
| 어두운 인사이트 패널 | — | `bg-slate-900 text-white rounded-2xl` |
| 태그·키워드 칩 | `bg-slate-100` | — |

### 색상 사용 원칙

- `#F2F2ED` 배경은 반드시 **inline style** 적용: `style={{ background: '#F2F2ED', overflowX: 'clip' }}`
- `#F5C800` 액센트 바는 카드 하단 `height: 3px`에만 사용 — 텍스트·배경 금지
- Semantic Color는 **아이콘 래퍼에만** — 카드·섹션 배경에 색상 금지
- **Pastel 금지**: `bg-blue-50`, `bg-red-100`, `bg-green-50` 등 pastel 계열 배경 일절 사용 금지

---

## 2. Typography

| Element | Weight | Size | Color | Tailwind |
|---------|--------|------|-------|----------|
| Section Heading | Bold (700) | 2.5rem | `#111111` | `text-2xl sm:text-[32px] lg:text-[40px] font-bold text-[#111111]` |
| Card Title | Bold (700) | 1rem–1.1rem | `#111111` | `text-[1rem] font-bold leading-[1.5] text-[#111111]` |
| Label | Bold (700) | 0.8rem | `#111111` | `text-[0.8rem] font-bold` |
| Value | Regular (400) | 0.85rem | `#444444` | `text-[0.85rem] font-normal text-[#444444]` |
| Score | Bold (700) | 0.85rem | `#111111` | `text-[0.85rem] font-bold` |

- Font family: clean geometric sans-serif (Pretendard, Inter, DM Sans, or similar)
- Line height: 1.4–1.6 for card titles

---

## 3. Icon System

### 기본 원칙

- **라이브러리**: `lucide-react` 우선 — 이모지 아이콘 금지
- 동일한 의미에는 **항상 동일한 아이콘** 사용 (혼용 금지)
- 아이콘 단독 사용 금지 — 반드시 **텍스트 레이블과 함께** 사용 (접근성)

### 아이콘 래퍼 패턴

```tsx
// 섹션 타이틀 아이콘 (h2/h3 앞)
<span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10">
  <BarChart2 className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
</span>

// 탭 버튼 내 아이콘
<Home className="w-4 h-4" />

// 인라인 상태 아이콘
<span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-green-500/10">
  <CheckCircle2 className="w-5 h-5 text-green-600" />
</span>
```

### 크기 규칙

| 사용 위치 | 크기 | 클래스 |
|----------|------|--------|
| 인라인 텍스트 옆 | 16px | `w-4 h-4` |
| 탭 버튼 내부 | 16px | `w-4 h-4` |
| 카드 헤더 / 상태 | 20px | `w-5 h-5` |
| 섹션 타이틀 옆 (h2/h3) | 24px | `w-6 h-6` |
| 빈 상태(Empty state) | 48px | `w-12 h-12` |

### 래퍼 모양 기준

| 사용 위치 | 배경 모양 | 클래스 |
|----------|----------|--------|
| 섹션 타이틀 아이콘 | 둥근 사각형 | `rounded-lg` |
| 상태 뱃지 / 인라인 | 원형 | `rounded-full` |
| 빈 상태(Empty state) | 둥근 사각형 (크게) | `rounded-2xl` |

### 서비스 기능 아이콘 매핑

| 기능/섹션 | Lucide 아이콘 | 색상 |
|----------|-------------|------|
| 숙소 리뷰 / 홈 | `Home` | `text-blue-600` |
| 시장 분석 | `BarChart2` | `text-blue-600` |
| 문제 / 경고 | `AlertTriangle` | `text-red-600` |
| 오퍼 / 가격 | `Tag` | `text-blue-600` |
| 바이럴 / 액션 | `Zap` | `text-purple-600` |
| 인기룸 / 어워드 | `Award` | `text-yellow-500` |
| 트렌드 상승 | `TrendingUp` | `text-blue-600` |
| 기회 / 타겟 | `Crosshair` | `text-green-600` |
| 가격 / 금액 | `DollarSign` | `text-yellow-500` |
| 별점 | `Star` | `fill="#F5C800" strokeWidth={0}` |
| 트렌드 (패션) | `Layers` | `text-blue-600` |
| 편집 (패션) | `Scissors` | `text-purple-600` |
| 반짝임 | `Sparkles` | `text-amber-600` |
| 가구/홈 트렌드 | `Home` | `text-blue-600` |
| 경쟁/시장 | `BarChart2` | `text-blue-600` |
| B&W 사진 — Magnum | `Camera` | `text-zinc-300` (bg-white/10) |
| B&W 사진 — Yanidel | `Eye` | `text-zinc-300` (bg-white/10) |
| B&W 사진 — Reminders | `Globe` | `text-zinc-300` (bg-white/10) |
| B&W 사진 — Phil Penman | `Aperture` | `text-zinc-300` (bg-white/10) |

---

## 4. Card Component

### Structure (top to bottom)
1. **Thumbnail Image** — full-width, aspect ratio ~4:3, rounded top corners
2. **Card Body** (white, padding ~20px)
   - Title (bold, 2–3 lines)
   - Metadata rows (label + value, space-between)
   - Yellow accent bar (full card width, 3px height)

### Card Specs

```tsx
// 카드 wrapper
<div className="group cursor-pointer overflow-hidden rounded-[12px] bg-white hover:shadow-xl transition-shadow duration-300">
  {/* 썸네일 */}
  <div className="overflow-hidden h-48">
    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  {/* 바디 */}
  <div className="px-5 py-4">
    {/* 내용 */}
  </div>
  {/* 하단 액센트 바 */}
  <div style={{ height: '3px', background: '#F5C800' }} />
</div>
```

- Border radius: `12px` (카드), top-only for image
- No drop shadow by default (flat design)
- White background on body
- Bottom accent bar: `#F5C800`, full width, 3px — inline style 사용

### Card States

| State | 동작 | Tailwind |
|-------|------|----------|
| Default | 그림자 없음 | `bg-white rounded-[12px]` |
| Hover | 썸네일 미세 줌 + 그림자 | `group-hover:scale-105 transition-transform duration-300` + `hover:shadow-xl` |
| Click target | 카드 전체 클릭 가능 | `cursor-pointer` |

---

## 5. Grid Layout

```tsx
// 카드 그리드
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// Section Heading 반응형
<h2 className="text-2xl sm:text-[32px] lg:text-[40px] font-bold text-[#111111] mb-10">
```

| Breakpoint | Columns | Tailwind |
|------------|---------|----------|
| Mobile (`< 640px`) | 1 | `grid-cols-1` |
| Tablet (`≥ 640px`) | 2 | `sm:grid-cols-2` |
| Desktop (`≥ 1024px`) | 4 | `lg:grid-cols-4` |

- No card is highlighted or featured — all cards equal weight
- Gap: ~24px (`gap-6`)

---

## 6. Spacing & Rhythm

| 위치 | 값 | Tailwind |
|------|-----|----------|
| Section heading → card grid | 40px | `mb-10` |
| Card body padding (horizontal) | 20px | `px-5` |
| Card body padding (vertical) | 16px | `py-4` |
| 행 간격 | 12px | `space-y-3` |
| 페이지 좌우 여백 | 24px (mobile) / 48px (desktop) | `px-6 lg:px-12` |

---

## 7. Component-Level Rules

### 섹션 타이틀 패턴

```tsx
// h2 — 탭 내 메인 섹션
<h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
  <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10">
    <BarChart2 className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
  </span>
  섹션 제목
</h2>
<p className="text-slate-500 text-xs sm:text-sm tracking-wide sm:tracking-widest uppercase mb-8 sm:mb-10 leading-relaxed">서브타이틀</p>
```

### 별점 패턴

```tsx
// Star 아이콘 — ⭐ 이모지 사용 금지
<Star className="w-4 h-4" fill="#F5C800" strokeWidth={0} />
```

### 하단 요약 패널

```tsx
<section className="mt-24 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
  <div className="grid md:grid-cols-2 gap-12">
    <div>{/* 키워드/인사이트 */}</div>
    <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-2xl">
      {/* 전략/액션 */}
    </div>
  </div>
</section>
```

### 히어로 섹션

```tsx
<header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
  <img className="absolute inset-0 w-full h-full object-cover opacity-70" />
  <div className="relative z-10 text-center px-4">
    <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">서브레이블 · DATE</p>
    <h1 className="text-white text-4xl sm:text-6xl md:text-9xl font-serif italic mb-4">제목</h1>
  </div>
</header>
```

### Lightbox (공통 패턴)

```tsx
const [lightbox, setLightbox] = React.useState<{ src: string; title: string; tag: string } | null>(null);

React.useEffect(() => {
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

{lightbox && (
  <div
    className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center cursor-zoom-out"
    onClick={() => setLightbox(null)}
  >
    <button className="absolute top-6 right-8 text-white text-4xl leading-none hover:opacity-70"
      onClick={() => setLightbox(null)}>×</button>
    <img src={lightbox.src} alt={lightbox.title}
      className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
      onClick={(e) => e.stopPropagation()} />
    <div className="mt-6 text-center">
      <p className="text-white font-serif text-xl">{lightbox.title}</p>
      <p className="text-slate-400 text-sm mt-1 tracking-widest uppercase">{lightbox.tag}</p>
    </div>
  </div>
)}
```

---

## 8. Tone & Style

- **Flat, editorial** — no gradients, no heavy shadows
- **Content-first** — imagery dominates, UI chrome is minimal
- **High contrast text** — black on white, no gray-on-gray
- Accent color (yellow) used sparingly — only for score/accent bar

---

## 9. Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| `#F2F2ED` 배경은 inline style로 | Tailwind `bg-` 클래스로 배경 지정 |
| 카드 하단 3px 노란 바 | 노란색을 배경·텍스트에 사용 |
| Monotone 배지 (`bg-[#111111]/5`) | Pastel 배지 (`bg-blue-50`, `bg-red-100`) |
| 모든 카드 `bg-white` 단일 배경 | 색상·그라데이션 카드 배경 |
| 아이콘 래퍼에만 색상 | 섹션·카드 배경에 색상 |
| 아이콘 + 텍스트 레이블 함께 | 아이콘 단독 배치 |
| `Star fill="#F5C800" strokeWidth={0}` | ⭐ 이모지 사용 |
| `overflowX: 'clip'` | `overflow-x: hidden` (scroll container 생성) |
| Card titles 2–3 lines, no truncation | Ellipsis로 잘라내기 |
