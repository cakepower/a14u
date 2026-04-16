# 오늘의집 가구·인테리어 트렌드 리서치 스킬 (Firecrawl MCP)

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
STEP 4-M → 시장 분석: TAM/SAM/SOM + 핵심 트렌드 + 기회 영역 → docs/analysis-market-YYYY-MM-DD.md (추가 시장 데이터 스크래핑 필요)
STEP 5 → Furniture.tsx 생성/업데이트 (링크 보존 + 이미지 최대 수집)
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

| 기호 | 의미 |
|------|------|
| 🔴 | 커뮤니티·댓글에서 실제 불평 등장 |
| 🚀 | 빠르게 커지는 니즈 |
| WTP | 해결 시 기꺼이 돈 낼 의향 (1~10) |
| 긴급도 | 즉각 불쾌감 (1~10) |

**출력 형식 (docs/analysis-problems-YYYY-MM-DD.md):**

```markdown
| # | 문제 | WTP | 긴급도 | 실제불평 횟수 | 성장 | 신호 | 실제 인용 |
|---|------|:---:|:------:|:------------:|:----:|------|----------|
| 1 | ... | 9 | 9 | 4회 | ↑급증 | 🔴 🚀 | "실제 발언" |

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

## 7. STEP 5 — Furniture.tsx 생성/업데이트

**출력 파일:** `src/components/Trends/Furniture.tsx` (덮어쓰기)

기본 export 이름: `FurnitureTrendCards`

```ts
// App.tsx import:
import FurnitureTrendCards from "./components/Trends/Furniture";
```

### 핵심 원칙

**① 링크 보존 필수**

수집한 모든 ohou.se URL을 `sources` 배열로 보존하고, 컴포넌트에서 클릭 가능한 링크로 렌더링한다:

```tsx
const sources = [
  {
    id: 'advices-12252',
    url: 'https://ohou.se/advices/12252',   // ← 반드시 원문 URL 보존
    title: '...',
    author: '...',
    likes: N, scraps: N, views: N,
    cover: 'https://prs.ohousecdn.com/...',
    badge: '인테리어 전문가',
    tags: ['#태그'],
    images: [
      { url: 'https://prs.ohousecdn.com/...', caption: '설명', trend: '키워드' },
      // ← 스크래핑으로 수집된 이미지 URL 전부 포함
    ],
  },
  // ... 모든 출처 URL
];
```

**② 이미지 최대 수집**

각 소스 아티클의 모든 이미지를 `images` 배열에 담아 갤러리로 렌더링한다:
- `prs.ohousecdn.com` 이미지: `?w=720` suffix 추가
- `image.ohousecdn.com` 이미지: `?w=720` suffix 추가
- 썸네일 이미지(`?w=144`)는 `?w=720`으로 교체

**③ 탭 구조 (4탭)**

```tsx
type TabKey = 'trends' | 'market' | 'problems' | 'opportunities';
// 탭: <Home /> 2026 트렌드 / <BarChart2 /> 시장 분석 / <AlertTriangle /> 소비자 문제 / <Crosshair /> 기회 영역
```

**④ 트렌드 탭 렌더링 순서**

1. **출처 아티클 카드** — 3개 소스를 카드 형태로 링크와 함께 표시
2. **아티클별 이미지 갤러리** — 소스별로 구분, `aspect-square` 그리드 (5열)
3. **트렌드 인사이트** — 6개 트렌드 항목 (이미지 + 설명 + 수요 점수)

### 스타일 가이드 (`__context/design-style-guide.md` 기준)

컴포넌트 생성 전 `__context/design-style-guide.md` 전체를 Read하세요.

섹션별 아이콘 매핑:
- 트렌드 탭: `Home` → `bg-blue-500/10 text-blue-600`
- 시장 분석: `BarChart2` → `bg-blue-500/10 text-blue-600`
- 소비자 문제: `AlertTriangle` → `bg-red-500/10 text-red-600`
- 기회 영역: `Crosshair` → `bg-green-500/10 text-green-600`

Lucide import: `import { Home, BarChart2, AlertTriangle, Crosshair, Tag, TrendingUp } from 'lucide-react';`

갤러리: `aspect-square` 그리드 + hover 어두워지는 오버레이 + caption
푸터: 출처 URL 링크 나열

### 컴포넌트 데이터 타입

```tsx
type SourceImage = {
  url: string;
  caption: string;
  trend: string;  // 이미지가 속하는 트렌드 키워드
};

type Source = {
  id: string;
  url: string;       // 원문 ohou.se URL — 링크로 렌더링
  title: string;
  author: string;
  likes: number;
  scraps: number;
  views: number;
  cover: string;     // 대표 이미지
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

## 9. 알려진 이슈 및 해결책

| 이슈 | 원인 | 해결책 |
|------|------|--------|
| 스크래핑 결과 빈 마크다운 | SPA waitFor 부족 | `waitFor: 6000` 이상으로 설정 |
| 이미지 URL 없음 | `onlyMainContent: true` 기본값 | `formats: ["markdown", "links"]` 명시 |
| 커뮤니티 댓글 0개 | editorial 콘텐츠는 댓글 없음 | 커뮤니티 검색(/community/feed) 따로 스크래핑 |
| trendmonitor.co.kr 로그인 필요 | 유료 보고서 | 요약 페이지만 스크래핑, 공개 통계 인용으로 대체 |
| 서브에이전트 토큰 한도 초과 | "resets 11am (Asia/Seoul)" 메시지 | 메인 에이전트가 직접 분석 수행, MD 수동 저장 |

---

## 10. 파일 구조 요약

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

## 11. 재실행 시 업데이트 체크리스트

- [ ] 기존 `docs/ohouse-trends-*.md` 파일 날짜 확인 → 7일 이상 경과 시 재수집
- [ ] ohou.se `/advices/` 최신 글 검색 — 새 아티클 URL 교체
- [ ] `contents.ohou.se/projects/` 최신 집들이 집계 — 조회수 상위 1개 교체
- [ ] 시장 통계 수치 재확인 (분기별: 한샘·현대리바트 실적, 1인 가구 통계)
- [ ] `Furniture.tsx` sources 배열 → 새 URL·이미지로 전체 교체
- [ ] App.tsx에 `FurnitureTrendCards` import 및 렌더 삽입 확인

---

*작성일: 2026-04-13 | 도구: Claude Sonnet 4.6 + Firecrawl MCP | 참조: ohou.se, archisketch.com, trendmonitor.co.kr*
