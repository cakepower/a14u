# 오늘의집 가구·인테리어 트렌드 리서치 스킬 (Supanova Edition)

---
name: furniture-research
description: 오늘의집(ohou.se) 에서 최신 가구·인테리어 트렌드, 커뮤니티 댓글, 집들이 콘텐츠를 스크래핑하여 트렌드 분석 → 소비자 문제 도출 → TAM/SAM/SOM 시장 분석 → React 컴포넌트(Furniture.tsx) 생성까지 자동화하는 스킬. "오늘의집 트렌드 리서치 해줘", "가구 트렌드 분석 해줘", "Furniture.tsx 업데이트" 같은 요청 시 사용.
---

## 0-A. 병렬 에이전트 실행 아키텍처

스킬 전체를 **3개 페이즈**로 나누어 실행한다. 페이즈 내 에이전트는 병렬로, 페이즈 간 전환은 순차로.

```
PHASE 1 — 데이터 수집 (순차, 메인 에이전트 직접 실행)
  ├─ STEP 1: ohou.se 트렌드 검색 3개 병렬 (firecrawl_search)
  ├─ STEP 2: 아티클·집들이 5곳 스크래핑 (firecrawl_scrape × 5, 가능한 병렬)
  └─ STEP 3: docs/ohouse-trends-YYYY-MM-DD.md 저장
                        ↓
PHASE 2 — 분석 (2개 서브에이전트 병렬, run_in_background=true)
  ├─ Agent A │ STEP 4   → docs/analysis-problems-YYYY-MM-DD.md
  └─ Agent B │ STEP 4-M → docs/analysis-market-YYYY-MM-DD.md (TAM/SAM/SOM)
                        ↓ (2개 모두 완료 대기)
PHASE 3 — 생성 (메인 에이전트 직접)
  └─ STEP 5+6 → src/components/Trends/Furniture.tsx 생성/업데이트
                App.tsx 에 import 및 렌더 삽입
```

---

## 0-B. Firecrawl MCP 사전 확인 (필수)

Firecrawl MCP가 연결되어 있지 않으면 스크래핑이 불가능합니다.

```
확인 방법: /mcp 명령으로 firecrawl 상태 확인
연결 안 된 경우: /mcp 로 reconnect 후 재시도
```

Firecrawl 도구를 호출하기 전에 `ToolSearch`로 스키마를 로드하세요:

```
ToolSearch query: "select:mcp__firecrawl__firecrawl_search,mcp__firecrawl__firecrawl_scrape"
```

도구 호출이 실패하거나 응답이 없으면 — **즉시 중단하고 사용자에게 `/mcp` 로 Firecrawl을 reconnect하도록 안내하세요.** 절대 mock 데이터를 사용하지 마세요.

---

## 1. 실행 순서 개요

```
STEP 1 → ohou.se 트렌드 검색 (firecrawl_search × 3 병렬)
STEP 2 → advices 아티클 + 집들이(projects) 페이지 스크래핑 (5곳)
STEP 3 → 중간 저장: docs/ohouse-trends-YYYY-MM-DD.md
STEP 4 → 문제 분석: WTP + 긴급도 점수화 → docs/analysis-problems-YYYY-MM-DD.md
STEP 4-M → 시장 분석: TAM/SAM/SOM + 핵심 트렌드 + 기회 영역 → docs/analysis-market-YYYY-MM-DD.md
STEP 5 → Furniture.tsx 생성/업데이트 (Supanova 디자인 시스템 적용)
STEP 6 → App.tsx import 및 렌더 삽입 (AirbnbResearch 다음에)
```

---

## 2. STEP 1 — ohou.se 트렌드 검색

**병렬로 3개 검색 실행:**

```
Query 1: "오늘의집 가구 인테리어 트렌드 2026 site:ohou.se"
Query 2: "오늘의집 advices 인테리어트렌드2026"
Query 3: "오늘의집 신혼 인테리어 집들이 2026 커뮤니티"
```

`firecrawl_search` 파라미터:
```json
{
  "query": "...",
  "limit": 8,
  "location": "kr"
}
```

상위 결과에서 `/advices/` 및 `/projects/` 경로를 포함한 URL을 선별합니다.

---

## 3. STEP 2 — 콘텐츠 스크래핑

**오늘의집 SPA 특성상 반드시 아래 파라미터를 사용:**

```json
{
  "url": "https://ohou.se/advices/XXXXX",
  "formats": ["markdown", "links"],
  "waitFor": 6000,
  "proxy": "stealth",
  "location": { "country": "KR", "languages": ["ko"] }
}
```

- `formats: ["markdown", "links"]` — **링크와 이미지 URL 모두 수집하기 위해 필수**
- `waitFor: 6000` — SPA 렌더링 대기 (5000ms 이하 시 빈 결과 반환 위험)
- `onlyMainContent: false` — 이미지 태그 포함 전체 마크다운 필요

**스크래핑 대상 유형:**
| 유형 | URL 패턴 | 용도 |
|------|----------|------|
| 트렌드 아티클 | `ohou.se/advices/NNNNN` | 전문가 트렌드 해설 + 인테리어 사진 |
| 집들이 큐레이션 | `contents.ohou.se/projects/NNNNN` | 실제 집들이 사진 대량 수집 + 라이프스타일 |
| 커뮤니티 | `ohou.se/community/feed` | 실제 소비자 댓글·불만 수집 |

**이미지 URL 추출 방법:**
마크다운 결과에서 `![](https://prs.ohousecdn.com/...)` 와 `![](https://image.ohousecdn.com/...)` 패턴을 모두 수집한다.
고해상도용 URL suffix: `?w=720` 또는 `?w=960` 추가.

---

## 4. STEP 3 — 중간 저장: 트렌드 MD 파일

**파일 경로:** `docs/ohouse-trends-YYYY-MM-DD.md`

```markdown
# 오늘의 집 가구 인테리어 트렌드 리서치 — YYYY-MM-DD

> 수집 채널: Firecrawl MCP → ohou.se 실시간 스크래핑
> 검색어: ...
> 수집 페이지: N개

---

## 1. [아티클 제목]

- **URL**: https://ohou.se/advices/NNNNN
- **참여 지표**: 좋아요 N | 스크랩 N | 조회 N
- **작성자**: 작성자명
- **핵심 키워드**: `#태그1` `#태그2`

### 주요 내용
[핵심 내용 요약]

### 수집된 이미지 URL
- `https://prs.ohousecdn.com/...` (설명)
- ...

---

## 종합 인사이트
| 항목 | 내용 |
|------|------|
| 2026 핵심 키워드 | ... |
| 가장 많은 칭찬 | ... |
| 가장 많은 불만 | ... |
| 기회 포인트 | ... |
```

---

## 5. STEP 4 — 소비자 문제 분석

수집 데이터에서 소비자 문제 TOP 10을 도출합니다.

**점수화 기준:**

| 플래그 | 의미 |
|--------|------|
| `red`  | 커뮤니티·댓글에서 실제 불평 등장 |
| `grow` | 빠르게 커지는 니즈 |
| WTP    | 해결 시 기꺼이 돈 낼 의향 (1~10) |
| 긴급도 | 즉각 불쾌감 (1~10) |

데이터 타입:
```ts
type ProblemFlag = 'red' | 'grow';

type ConsumerProblem = {
  rank: number;
  problem: string;
  wtp: number;
  urgency: number;
  complaintCount: number;
  growth: '↑급증' | '→유지' | '↓감소';
  flags: ProblemFlag[];
  quote: string;
};
```

**출력 형식 (docs/analysis-problems-YYYY-MM-DD.md):**

```markdown
| # | 문제 | WTP | 긴급도 | 실제불평 횟수 | 성장 | 플래그 | 실제 인용 |
|---|------|:---:|:------:|:------------:|:----:|--------|----------|
| 1 | ... | 9 | 9 | 4회 | ↑급증 | red grow | "실제 발언" |

## 우선순위 매트릭스
### 긴급도 높음 + WTP 높음 → 즉시 해결 가치
### 긴급도 보통 + WTP 높음 → 선점 기회
### 실제 별점 깎는 문제 → 리스크 관리
```

---

## 6. STEP 4-M — 시장 분석 (TAM/SAM/SOM)

오늘의집 가구 시장 분석을 위해 **추가 스크래핑** 실행:

```
firecrawl_search: "한국 홈퍼니싱 가구 시장 규모 2024 2025 통계"
firecrawl_search: "1인가구 홈인테리어 시장 통계청 엠브레인"
firecrawl_scrape: archisketch 블로그 (한샘·현대리바트 실적 공시 인용)
firecrawl_scrape: trendmonitor.co.kr (엠브레인 인테리어 소비 통계)
```

**TAM/SAM/SOM 산출 기준:**

| 구분 | 기준 | 참고 수치 (2026-04-13 기준) |
|------|------|---------------------------|
| TAM | 전체 홈리빙·가구 시장 | ₩20조 (KOSIS, 한국경제) |
| SAM | 온라인·2030·1-2인 가구 | ₩6조 (침투율 30% × TAM) |
| SOM | 오늘의집 플랫폼 진입 1-2년 | ₩20~50억 (MAU 10만 × 전환율 2.5% × 객단가 8만원) |

**핵심 통계 (업데이트 시마다 재확인):**
- 홈퍼니싱 구매 경험: 75.8% (엠브레인 n=1,000)
- 1인 가구: 전체 36.1%, 804만 가구 (통계청 2024)
- 셀프 인테리어 경험: 66.1%
- 오늘의집 매출: 2,879억 (2024)

---

## 7. STEP 5 — Furniture.tsx 생성/업데이트 (Supanova 디자인 시스템)

**출력 파일:** `src/components/Trends/Furniture.tsx` (덮어쓰기)

기본 export 이름: `FurnitureTrendCards`

```ts
// App.tsx import:
import FurnitureTrendCards from "./components/Trends/Furniture";
```

---

### 7-A. Supanova 디자인 시스템

#### 아키타입: Warm Editorial
- 배경: `#F2F2ED` (warm linen cream)
- 액센트: `#F5C800` (단일 warm amber — 다른 액센트 색상 사용 금지)
- 다크 패널: `#0a0a0a` (순수 검정 금지)
- 타이포: Pretendard (한국어) + font-serif italic (영문 디스플레이)
- 히어로: `min-h-[70dvh]` (절대 `h-[70vh]` 사용 금지 — iOS Safari 레이아웃 점프 방지)

#### 언어 규칙
- **탭 레이블**: 한국어
- **섹션 제목**: 한국어 (오늘의집 컨텍스트는 한국어가 기본)
- **모든 본문**: 자연스러운 한국어 (`word-break: keep-all`, `leading-snug`)
- 금지 표현: "혁신적인", "원활한", "차세대" — 구체적이고 직접적인 언어 사용

#### SPRING 상수 (필수)
```tsx
const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';
// 모든 transition은 이 값을 사용. ease-out, linear, ease-in-out 금지.
```

---

### 7-B. 인라인 SVG 아이콘 (lucide-react 금지)

파일 상단에 Solar 스타일 아이콘 5개를 정의합니다:

```tsx
const IconHome = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5Z" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      d="M9 21V12h6v9" />
  </svg>
);

const IconChart = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      d="M3 3v18h18" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      d="M7 16l4-5 4 3 4-6" />
  </svg>
);

const IconAlert = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      d="M12 3 2 20h20L12 3Z" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 10v4" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const IconTarget = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" />
  </svg>
);

const IconPin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      d="m15 4.5-1.5 1.5-5 .5L5 10l4 2-4 7.5 7.5-4 2 4 3.5-3.5.5-5 1.5-1.5L15 4.5Z" />
  </svg>
);
```

아이콘 색상 매핑:
- 트렌드 탭 (`IconHome`): `bg-blue-500/10 text-blue-600`
- 시장 분석 (`IconChart`): `bg-emerald-500/10 text-emerald-600`
- 소비자 문제 (`IconAlert`): `bg-red-500/10 text-red-600`
- 기회 영역 (`IconTarget`): `bg-amber-500/10 text-amber-600`
- 출처 카드 핀 (`IconPin`): `bg-slate-500/10 text-slate-500`

---

### 7-C. Eyebrow 헬퍼 컴포넌트

섹션 헤더 앞에 배치되는 pill 태그:

```tsx
const TINT_STYLES: Record<string, React.CSSProperties> = {
  neutral: { background: 'rgba(0,0,0,0.06)', color: '#888' },
  blue:    { background: 'rgba(59,130,246,0.08)', color: '#3b82f6' },
  red:     { background: 'rgba(239,68,68,0.08)', color: '#ef4444' },
  green:   { background: 'rgba(16,185,129,0.08)', color: '#10b981' },
  amber:   { background: 'rgba(245,200,0,0.12)', color: '#b45309' },
};

const Eyebrow = ({ label, tint = 'neutral' }: { label: string; tint?: keyof typeof TINT_STYLES }) => (
  <span
    className="block mb-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold w-fit"
    style={TINT_STYLES[tint]}
  >
    {label}
  </span>
);
```

---

### 7-D. 섹션 헤더 구조

```tsx
<div data-sr>
  <Eyebrow label="Trend Intelligence" tint="blue" />
  <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight border-b border-slate-200 pb-4 flex items-center gap-3 mb-3">
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10">
      <IconHome className="w-5 h-5 text-blue-600" />
    </span>
    2026 트렌드
  </h3>
  <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-8 sm:mb-12">
    오늘의집 · 인테리어 트렌드 리포트 · {DATE}
  </p>
</div>
```

---

### 7-E. Double-Bezel 카드 아키텍처

모든 소스 카드는 이 구조를 사용합니다:

```tsx
// 출처 소스 카드
<div
  className="group bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[18px] hover:scale-[1.02] active:scale-[0.98]"
  style={{ transition: `transform 0.45s ${SPRING}` }}
>
  <div className="bg-white rounded-[13px] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
    {/* 커버 이미지 */}
    <div className="h-44 overflow-hidden">
      <img
        src={source.cover}
        alt={source.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105"
        style={{ transition: `transform 0.45s ${SPRING}` }}
      />
    </div>
    {/* 콘텐츠 */}
    <div className="px-5 py-4">
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[0.9rem] font-semibold leading-snug text-[#111] hover:text-blue-600 mb-2 block"
        style={{ wordBreak: 'keep-all', transition: `color 0.3s ${SPRING}` }}
      >
        {source.title}
      </a>
      <div className="flex flex-wrap gap-1 mt-3">
        {source.tags.map((tag) => (
          <span key={tag} className="bg-[#111]/5 text-[#333] text-[10px] font-medium px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
    {/* 액센트 바 */}
    <div style={{ height: '2px', background: '#F5C800' }} />
  </div>
</div>
```

Intelligence/분석 섹션 전체 래퍼:

```tsx
<section className="mt-24 sm:mt-40 bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[24px]" data-sr>
  <div className="bg-white rounded-[19px] p-8 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
    <div className="grid md:grid-cols-2 gap-12 sm:gap-20">
      {/* 왼쪽: 소비자 문제 목록 */}
      {/* 오른쪽: bg-[#0a0a0a] 다크 패널 — 기회 영역 */}
    </div>
  </div>
</section>
```

---

### 7-F. 스크롤 리빌 애니메이션

```tsx
const containerRef = React.useRef<HTMLDivElement>(null);

React.useEffect(() => {
  const container = containerRef.current;
  if (!container) return;
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
  return () => observer.disconnect();
}, []);
```

JSX return 최상단 (히어로 직전):

```tsx
<style>{`
  [data-sr] { opacity: 0; transform: translateY(1.5rem); transition: opacity 0.65s ${SPRING}, transform 0.65s ${SPRING}; }
  [data-sr].sr-visible { opacity: 1; transform: translateY(0); }
`}</style>
```

`data-sr`를 추가할 위치: 섹션 헤더 div, 소스 카드 그리드 컨테이너, 분석 섹션 전체 래퍼.

---

### 7-G. 소비자 문제 플래그 렌더링

```tsx
// flags 배열: ['red', 'grow'] — 이모지 사용 금지
const FLAG_STYLES: Record<string, { label: string; style: React.CSSProperties }> = {
  red:  { label: '실제불평', style: { background: 'rgba(239,68,68,0.1)', color: '#dc2626' } },
  grow: { label: '급성장',   style: { background: 'rgba(16,185,129,0.1)', color: '#059669' } },
};

// 렌더:
{problem.flags.map((f) => (
  <span
    key={f}
    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
    style={FLAG_STYLES[f].style}
  >
    {FLAG_STYLES[f].label}
  </span>
))}
```

---

### 7-H. 탭 구조 (shadcn Tabs 유지)

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
// Card, Button, lucide-react 임포트 금지

type TabKey = 'trends' | 'market' | 'problems' | 'opportunities';

// TabsTrigger 내부 — 텍스트만 사용, 이모지 금지
<TabsTrigger value="trends">트렌드</TabsTrigger>
<TabsTrigger value="market">시장 분석</TabsTrigger>
<TabsTrigger value="problems">소비자 문제</TabsTrigger>
<TabsTrigger value="opportunities">기회 영역</TabsTrigger>
```

---

### 7-I. 이미지 최적화

```tsx
// 모든 이미지에 필수
<img
  src={item.image}
  alt={item.title}
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover group-hover:scale-105"
  style={{ transition: `transform 0.45s ${SPRING}` }}
/>
```

- `prs.ohousecdn.com` 이미지: `?w=720` suffix 추가
- `image.ohousecdn.com` 이미지: `?w=720` suffix 추가
- 썸네일(`?w=144`)은 `?w=720`으로 교체

---

### 7-J. 컴포넌트 데이터 타입

```tsx
type ProblemFlag = 'red' | 'grow';

type SourceImage = {
  url: string;
  caption: string;
  trend: string;
};

type Source = {
  id: string;
  url: string;       // 원문 ohou.se URL
  title: string;
  author: string;
  likes: number;
  scraps: number;
  views: number;
  cover: string;
  badge: string;
  tags: string[];
  images: SourceImage[];
};

type TrendItem = {
  rank: number;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  signal: string;
  tags: string[];
  image: string;
  growthRate: string;
  demandScore: number;
};

type ConsumerProblem = {
  rank: number;
  problem: string;
  wtp: number;
  urgency: number;
  complaintCount: number;
  growth: '↑급증' | '→유지' | '↓감소';
  flags: ProblemFlag[];
  quote: string;
};
```

---

## 8. STEP 6 — App.tsx 업데이트

```tsx
// 1. import 추가 (AirbnbResearch import 다음 줄)
import FurnitureTrendCards from "./components/Trends/Furniture";

// 2. JSX 삽입 (<AirbnbResearch /> 바로 다음)
<AirbnbResearch />
<FurnitureTrendCards />
```

---

## 9. Pre-Flight 체크리스트

Furniture.tsx 출력 전 검증:

- [ ] `lucide-react` import 없음 — 인라인 SVG 아이콘만 사용
- [ ] 모든 카드가 Double-Bezel 아키텍처 사용
- [ ] 모든 transition이 `cubic-bezier(0.16, 1, 0.3, 1)` 사용 — ease-out 금지
- [ ] `[data-sr]` 태그가 섹션 헤더와 그리드 컨테이너에 적용됨
- [ ] 히어로에 `min-h-[70dvh]` 사용 (`h-[70vh]` 금지)
- [ ] 모든 이미지에 `loading="lazy" decoding="async"` 적용
- [ ] 플래그 배열이 `['red', 'grow']` 형식 (이모지 문자열 금지)
- [ ] 이모지 없음 — 탭 레이블, 섹션 헤더, WTP 레이블, 리스크 항목 전체
- [ ] 다크 패널이 `bg-[#0a0a0a]` 사용 (`bg-slate-900` 금지)
- [ ] 단일 액센트 색상 `#F5C800` — 경쟁 색상 없음
- [ ] 한국어 텍스트에 `word-break: keep-all` 적용
- [ ] `SPRING` 상수가 파일 상단에 정의됨
- [ ] ohou.se 원문 URL이 `sources` 배열에 보존되어 클릭 가능한 링크로 렌더링됨
- [ ] TypeScript 타입 오류 없음 (`npx tsc --noEmit` 통과)

---

## 10. 알려진 이슈 및 해결책

| 이슈 | 원인 | 해결책 |
|------|------|--------|
| 스크래핑 결과 빈 마크다운 | SPA waitFor 부족 | `waitFor: 6000` 이상으로 설정 |
| 이미지 URL 없음 | `onlyMainContent: true` 기본값 | `formats: ["markdown", "links"]` 명시 |
| 커뮤니티 댓글 0개 | editorial 콘텐츠는 댓글 없음 | 커뮤니티 검색(/community/feed) 따로 스크래핑 |
| trendmonitor.co.kr 로그인 필요 | 유료 보고서 | 요약 페이지만 스크래핑, 공개 통계 인용으로 대체 |
| 서브에이전트 토큰 한도 초과 | "resets 11am (Asia/Seoul)" 메시지 | 메인 에이전트가 직접 분석 수행, MD 수동 저장 |

---

## 11. 파일 구조 요약

```
docs/
  ohouse-trends-YYYY-MM-DD.md          # STEP 3: 원본 스크래핑 데이터
  analysis-problems-YYYY-MM-DD.md      # STEP 4: 소비자 문제 TOP 10
  analysis-market-YYYY-MM-DD.md        # STEP 4-M: TAM/SAM/SOM 시장 분석

src/components/Trends/
  Furniture.tsx                         # STEP 5: React 컴포넌트
  airbnb.tsx                            # (기존 — 변경 없음)
```

---

## 12. 재실행 시 업데이트 체크리스트

- [ ] 기존 `docs/ohouse-trends-*.md` 파일 날짜 확인 → 7일 이상 경과 시 재수집
- [ ] ohou.se `/advices/` 최신 글 검색 — 새 아티클 URL 교체
- [ ] `contents.ohou.se/projects/` 최신 집들이 집계 — 조회수 상위 1개 교체
- [ ] 시장 통계 수치 재확인 (분기별: 한샘·현대리바트 실적, 1인 가구 통계)
- [ ] `Furniture.tsx` sources 배열 → 새 URL·이미지로 전체 교체
- [ ] App.tsx에 `FurnitureTrendCards` import 및 렌더 삽입 확인

---

*작성일: 2026-04-24 | 도구: Claude Sonnet 4.6 + Firecrawl MCP | 참조: ohou.se, archisketch.com, trendmonitor.co.kr*
