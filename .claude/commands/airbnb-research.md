# 영종도 에어비앤비 주간 리서치 스킬 (Firecrawl MCP)

---
name: airbnb-research
description: 매주 영종도 커플 숙소 시장을 리서치하여 리뷰 수집 → 문제 분석 → 오퍼 설계 → 바이럴 전략 → 상위 노출 룸 분석을 자동화하고, 결과를 MD 파일과 React 컴포넌트로 저장하는 스킬. "에어비앤비 리서치 해줘", "영종도 숙소 분석 해줘", "airbnb 리서치", "airbnb.tsx 업데이트" 같은 요청 시 사용.
---

## 0-A. 병렬 에이전트 실행 아키텍처

스킬 전체를 **3개 페이즈**로 나누어 실행한다. 페이즈 내 에이전트는 병렬로, 페이즈 간 전환은 순차로.

```
PHASE 1 — 데이터 수집 (순차, 메인 에이전트 직접 실행)
  ├─ STEP 1: 리스팅 검색 3개 병렬 (firecrawl_search)
  ├─ STEP 2: 룸 5곳 스크래핑 (firecrawl_scrape × 5, 가능한 병렬)
  └─ STEP 3: docs/airbnb-yeongjonge-YYYY-MM-DD.md 저장
                        ↓
PHASE 2 — 분석 (3개 서브에이전트 병렬, run_in_background=true)
  ├─ Agent A │ STEP 4   → docs/analysis-problems-YYYY-MM-DD.md
  ├─ Agent B │ STEP 4-M → docs/analysis-market-YYYY-MM-DD.md
  └─ Agent C │ STEP 7   → docs/analysis-toprooms-YYYY-MM-DD.md
                        ↓ (3개 모두 완료 대기)
PHASE 3 — 생성 (2개 서브에이전트 병렬, run_in_background=true)
  ├─ Agent D │ STEP 5+6 → docs/offers-viral-YYYY-MM-DD.md
  └─ Agent E │ STEP 8+9 → docs/session-YYYY-MM-DD.md
                             src/components/Trends/airbnb.tsx
```

### Phase 2 에이전트 실행 방법

Phase 1 완료 후 아래 3개를 **한 번에 호출**한다:

```
Agent(
  description: "문제 분석 — WTP/긴급도 매트릭스",
  run_in_background: true,
  prompt: """
    docs/airbnb-yeongjonge-YYYY-MM-DD.md 를 읽고 숙소 문제 TOP 10을 도출하라.
    각 문제에 WTP(1~10), 긴급도(1~10), complaintCount, growthRate, flags(🔴/🚀) 부여.
    결과를 docs/analysis-problems-YYYY-MM-DD.md 로 저장. (Write 도구 사용)
  """
)

Agent(
  description: "시장 분석 — TAM/SAM/SOM + 트렌드 + 기회",
  run_in_background: true,
  prompt: """
    docs/airbnb-yeongjonge-YYYY-MM-DD.md 를 읽고 시장 분석을 수행하라.
    TAM/SAM/SOM 추정, 핵심 트렌드 5개, 덜 공략된 기회 5개, 돈의 흐름 분석.
    결과를 docs/analysis-market-YYYY-MM-DD.md 로 저장. (Write 도구 사용)
  """
)

Agent(
  description: "인기룸 분석 — 노출 공식 역산",
  run_in_background: true,
  prompt: """
    docs/airbnb-yeongjonge-YYYY-MM-DD.md 의 상위 5개 룸을 분석하라.
    슈퍼호스트 여부, 즉시예약, 제목 키워드, 썸네일 전략, 노출 강점 역산.
    결과를 docs/analysis-toprooms-YYYY-MM-DD.md 로 저장. (Write 도구 사용)
  """
)
```

3개 에이전트 완료 알림이 오면 Phase 3로 진행.

### Phase 3 에이전트 실행 방법

```
Agent(
  description: "오퍼 5개 + 바이럴 훅 20개 설계",
  run_in_background: true,
  prompt: """
    docs/analysis-problems-YYYY-MM-DD.md 를 읽고
    고전환 오퍼 5개와 바이럴 훅 20개(SPICE 포함)를 설계하라.
    결과를 docs/offers-viral-YYYY-MM-DD.md 로 저장.
  """
)

Agent(
  description: "세션 MD + airbnb.tsx 생성",
  run_in_background: true,
  prompt: """
    아래 파일들을 모두 읽고 통합하라:
    - docs/airbnb-yeongjonge-YYYY-MM-DD.md
    - docs/analysis-problems-YYYY-MM-DD.md
    - docs/analysis-market-YYYY-MM-DD.md
    - docs/analysis-toprooms-YYYY-MM-DD.md
    docs/session-YYYY-MM-DD.md 저장 후
    src/components/Trends/airbnb.tsx 를 전면 업데이트하라.
    (기존 컴포넌트 구조 유지, 데이터만 교체)
  """
)
```

### 주의사항

- Phase 2 Agent E(세션+TSX)는 Phase 2 분석 파일을 모두 필요로 하므로 **반드시 Phase 2 완료 후** 실행
- 각 에이전트 프롬프트에는 **정확한 날짜(YYYY-MM-DD)** 를 치환하여 전달
- 에이전트가 Write 실패 시 메인 에이전트가 직접 저장

---

## 0. Firecrawl MCP 사전 확인 (필수)

**실행 전 반드시 확인:**

Firecrawl MCP가 연결되어 있지 않으면 스크래핑이 불가능합니다.

```
확인 방법: /mcp 명령으로 firecrawl 상태 확인
연결 안 된 경우: /mcp 로 reconnect 후 재시도
```

Firecrawl 도구를 호출하기 전에 `ToolSearch`로 스키마를 로드하세요:

```
ToolSearch query: "select:mcp__firecrawl__firecrawl_search,mcp__firecrawl__firecrawl_scrape,mcp__firecrawl__firecrawl_map"
```

도구 호출이 실패하거나 응답이 없으면 — **즉시 중단하고 사용자에게 `/mcp` 로 Firecrawl을 reconnect하도록 안내하세요.** 절대 mock 데이터를 사용하지 마세요.

---

## 1. 실행 순서 개요

```
STEP 1 → Airbnb 리스팅 검색 (firecrawl_search × 3 병렬)
STEP 2 → 상위 숙소 5곳 리뷰 스크래핑 (firecrawl_scrape × 5 순차)
STEP 3 → 중간 저장: docs/airbnb-yeongjonge-YYYY-MM-DD.md
STEP 4 → 문제 분석: 긴급도 + WTP 점수화
STEP 4-M → 시장 분석: TAM/SAM/SOM + 핵심 트렌드 5개 + 덜 공략된 기회 5개 + 돈의 흐름
STEP 5 → 고전환 오퍼 5개 설계
STEP 6 → 바이럴 콘텐츠 전략 (훅 20개 + SPICE 구조)
STEP 7 → Airbnb 상위 노출 룸 5개 분석 (노출 공식 역산)
STEP 8 → 전체 세션 MD 저장: docs/session-YYYY-MM-DD.md
STEP 9 → React 컴포넌트 생성: src/components/Trends/airbnb.tsx
```

---

## 2. STEP 1 — Airbnb 리스팅 검색

**병렬로 3개 검색 실행:**

```
Query 1: "영종도 커플 오션뷰 숙소 에어비앤비" site:airbnb.co.kr
Query 2: "인천 중구 2인 스테이 오션뷰 airbnb" site:airbnb.co.kr  
Query 3: "영종도 호캉스 커플 베스트 숙소 후기"
```

`firecrawl_search` 파라미터:
```json
{
  "query": "...",
  "limit": 8,
  "lang": "ko",
  "country": "kr"
}
```

상위 결과에서 `/rooms/` 경로를 포함한 URL 5개를 선별합니다.
커플 특화, 오션뷰, 2인 키워드가 포함된 리스팅을 우선합니다.

---

## 3. STEP 2 — 리뷰 스크래핑 (숙소 5곳)

각 숙소 URL에 대해 `firecrawl_scrape` 실행:

```json
{
  "url": "https://www.airbnb.co.kr/rooms/XXXXXXXXX",
  "formats": ["markdown"],
  "actions": [{"type": "wait", "milliseconds": 5000}],
  "proxy": "stealth",
  "headers": {
    "Accept-Language": "ko-KR,ko;q=0.9",
    "X-Forwarded-For": "211.36.140.1"
  }
}
```

**JSON 형식이 리뷰를 반환하지 않는 경우**: `formats: ["markdown"]`으로 전환하여 페이지 전체 텍스트에서 리뷰를 추출합니다. Airbnb는 SPA이므로 `waitFor: 5000`이 필수입니다.

각 숙소에서 추출할 정보:
- 숙소명, 평점, 후기 수, 유형, URL
- 실제 후기 텍스트 최소 5개 (별점 3~5점 혼합)
- 키워드 요약 (칭찬 / 불만 / 기대 초과 / 재방문 의향)

---

## 4. STEP 3 — 중간 저장: 리뷰 MD 파일

**파일 경로:** `docs/airbnb-yeongjonge-YYYY-MM-DD.md`

형식은 아래를 따릅니다:

```markdown
# 영종도 에어비앤비 커플 오션스테이 리뷰 — YYYY-MM-DD

> 검색어: 인천 / 영종도 / 중구 / 오션스테이 / 커플 / 2인

---

## 1. [숙소명]

- **URL**: https://www.airbnb.co.kr/rooms/XXXXXXXXX
- **평점**: ⭐X.XX | **후기 수**: N개 | **유형**: 아파트/원룸/투룸
- **태그**: #커플 #오션뷰 #...

### 리뷰

| 후기자 | 별점 | 내용 |
|--------|------|------|
| 이름   | ⭐5  | "후기 내용..." |
| ...    | ...  | ...           |

**키워드 요약:** 칭찬: `뷰`, `청결` / 불만: `방음`, `청소의무` / 기대 초과: `호스트 친절` / 재방문: O

---
```

**숙소 5곳 완료 후 즉시 파일을 저장합니다. (Write 도구 사용)**

마지막에 종합 인사이트 테이블 추가:

```markdown
## 종합 인사이트

| 항목 | 내용 |
|------|------|
| 평균 평점 | X.XX |
| 가장 많은 칭찬 | ... |
| 가장 많은 불만 | ... |
| 업계 공통 문제 | ... |
| 기회 포인트 | ... |
```

---

## 5. STEP 4 — 문제 분석

리뷰 MD를 바탕으로 숙소 문제 TOP 10을 도출합니다.

**점수화 기준:**

| 기호 | 의미 |
|------|------|
| 🔴 | 리뷰에서 실제 불평 등장 — `complaintCount`에 횟수 기록 |
| 🚀 | 빠르게 커지는 니즈 — `growthRate`에 "↑ 급증 / ↑ 증가 / → 유지" 기록 |
| 긴급도 | 투숙 중 즉각 불쾌감 (1~10) |
| WTP | **해결 시 기꺼이 돈 낼 의향 (1~10) — 이 점수 기준으로 정렬** |

**`complaintCount` 산출 방법:**
수집한 리뷰 전체에서 해당 문제와 관련된 키워드(예: "청소", "설거지", "쓰레기") 등장 횟수를 카운트합니다.
3개 이상이면 🔴 플래그를 부여합니다.

**`growthRate` 산출 방법:**
- 최근 60일 리뷰 vs 이전 60일 리뷰에서 해당 키워드 빈도 비교
- 또는 검색 트렌드/후기 날짜 분포로 판단
- `"↑ 급증"` (2배↑) / `"↑ 증가"` (1.3배↑) / `"→ 유지"` / `"↓ 감소"`

**출력 형식 (MD 저장용):**

```markdown
| # | 문제 | WTP | 긴급도 | 실제불평 | 성장 | 신호 |
|---|------|:---:|:------:|:--------:|:----:|------|
| 1 | ... | 9 | 9 | 14회 | ↑ 급증 | 🔴 🚀 |
...
```

*컴포넌트 데이터는 WTP 내림차순으로 정렬합니다.*

우선순위 매트릭스도 포함:
```
긴급도 높음 + WTP 높음 → 즉시 해결 가치
긴급도 보통 + WTP 높음 → 선점 기회
실제 별점 깎는 문제 → 리스크 관리 필요
```

---

## 6. STEP 5 — 고전환 오퍼 5개

긴급도 × WTP가 높은 상위 5개 문제에 대해 각각:

```markdown
### OFFER N — "[오퍼 이름]"
**문제: ...** (긴급 X / WTP X)

**🎯 이상적인 고객**
| 항목 | 정의 |
|------|------|
| 인구통계 | 나이, 직업, 여행 목적 |
| 심리 | "..." (내면의 말) |
| 핵심 욕구 | ... |

**💎 가치 제안**
헤드라인 + 2~3줄 설명

**💰 가격 전략**
| 티어 | 내용 | 가격 |
|------|------|------|

**🛡️ 보상 + 리스크 제거**
- 조건 → 보상

**🏆 경쟁사보다 나은 이유**
| | 에어비앤비 | 호텔 | 이 오퍼 |
|--|--|--|--|
```

---

## 7. STEP 6 — 바이럴 콘텐츠 전략

### 고전환 훅 20개

감정 유형별로 분류:
- 🔴 공포 (Fear) — 4개
- 💢 분노 (Outrage) — 4개
- 🧠 호기심 (Curiosity) — 4개
- 👑 지위 (Status) — 3개
- 💔 공감 (Empathy) — 3개
- ⚡ 반전 (Reframe) — 2개

### 감정 트리거 맵

```
감정 → 트리거 메시지 → 반응 행동 (저장/공유/클릭/댓글)
```

### SPICE 바이럴 구조

S(Stop) → P(Pain) → I(Insight) → C(Claim) → E(Engage) 형식으로 3개 예시 작성.

### 플랫폼별 전략

인스타그램 / 틱톡 / 네이버 블로그 / 카카오 오픈채팅 / 유튜브 쇼츠

### 콘텐츠 반복 캘린더

요일별 감정 유형 배분 (월~일)

---

## 8. STEP 7 — Airbnb 상위 노출 룸 5개 분석

STEP 1에서 수집한 검색 결과 최상단 5개 룸을 `firecrawl_scrape`로 상세 스크래핑합니다.
(STEP 2의 리뷰 스크래핑과 별도 — 이번에는 **노출 공식 역산**이 목적)

**각 룸에서 추출할 항목:**

```
- 검색 노출 순위 (1~5위)
- 숙소명 / 평점 / 후기 수 / 슈퍼호스트 여부
- 가격대 (평일 / 주말 / 성수기)
- 대표 이미지 수 / 썸네일 구도 (오션뷰 각도, 침실 강조 등)
- 제목 키워드 패턴 (예: "오션뷰", "커플", "기념일" 등)
- 예약 가능 여부 / 최소 숙박일 / 즉시 예약 여부
- 어메니티 키워드 (넷플릭스, 욕조, 루프탑 등)
- 호스트 응답률 / 응답 시간
- 최근 후기 날짜 (활성도 판단)
```

**노출 공식 역산 분석 (각 룸):**

```markdown
### 상위 노출 룸 N — [숙소명]

| 항목 | 내용 |
|------|------|
| 검색 순위 | N위 |
| 평점 / 후기 수 | X.XX / NNN개 |
| 슈퍼호스트 | O / X |
| 가격 | 평일 ₩XX만 / 주말 ₩XX만 |
| 제목 키워드 | "..." |
| 썸네일 전략 | ... (첫 사진 구도, 강조 요소) |
| 즉시예약 | O / X |
| 최소 숙박 | N박 |
| 핵심 어메니티 | 넷플릭스, 욕조, ... |
| 최근 후기 | YYYY-MM-DD |
| 노출 강점 추정 | 후기 수 × 슈퍼호스트 × 즉시예약 조합 등 |
```

**5개 룸 종합 후 공통 패턴 도출:**

```markdown
## 상위 노출 공통 패턴

| 패턴 | 비율 (5개 중) | 인사이트 |
|------|:------------:|---------|
| 슈퍼호스트 | N/5 | ... |
| 즉시예약 활성화 | N/5 | ... |
| 후기 100개 이상 | N/5 | ... |
| 오션뷰 키워드 제목 포함 | N/5 | ... |
| 평균 평점 4.9 이상 | N/5 | ... |

## 우리 룸에 즉시 적용 가능한 것
1. ...
2. ...
3. ...
```

---

## 9. STEP 8 — 전체 세션 MD 저장

**파일 경로:** `docs/session-YYYY-MM-DD.md`

```markdown
# 세션 기록 — YYYY-MM-DD

> 주제: 영종도 에어비앤비 리뷰 수집 → 문제 분석 → 오퍼 설계 → 바이럴 전략 → 상위 노출 룸 분석

---

## Q1. 영종도 에어비앤비 리뷰 수집
[수집 숙소 테이블 + 참조 파일 경로]

## Q2. 숙소 문제 분석 및 점수화
[문제 매트릭스 전체]

## Q3. 고전환 오퍼 5개
[오퍼 1~5 전체]

## Q4. 바이럴 콘텐츠 전략
[훅 20개 + 감정 트리거 + SPICE + 캘린더]

## Q5. Airbnb 상위 노출 룸 5개 분석
[노출 순위별 룸 분석 전체 + 공통 패턴 + 우리 룸 적용 액션]

---
*생성일: YYYY-MM-DD | 도구: Claude + Firecrawl MCP | 데이터: airbnb.co.kr 실시간 스크래핑*
```

**Write 도구로 즉시 저장합니다.**

---

## 10. STEP 9 — React 컴포넌트 생성

**출력 파일:** `src/components/Trends/airbnb.tsx` (덮어쓰기)

기본 export 이름: `AirbnbResearch`

```ts
// App.tsx import:
import AirbnbResearch from "./components/Trends/airbnb";
```

### Fashion.tsx 스타일 지침

`Fashion.tsx`와 동일한 시각적 언어를 사용합니다:

- **배경**: `bg-white min-h-screen font-sans text-slate-900`
- **히어로**: 검은 배경 + 오션뷰 이미지 오버레이 + 세리프 이탤릭 대형 제목
- **카드**: `rounded-xl`, hover shadow, `group-hover:scale-105` 이미지 줌
- **섹션 제목**: `text-5xl font-serif mb-2 border-b pb-4`
- **배지**: 각 섹션별 색상 — 문제: `bg-red-100 text-red-700`, 오퍼: `bg-blue-100 text-blue-700`, 바이럴: `bg-purple-100 text-purple-700`
- **하단**: 키워드 태그 + 스타일링 팁 박스 (`bg-slate-50 p-12 rounded-3xl`)
- **라이트박스**: ESC + 클릭 닫기 (외부 라이브러리 없음)

### 컴포넌트 섹션 구조

```tsx
import React from 'react';

type LightboxState = { src: string; title: string; tag: string } | null;

// ── 데이터 ──────────────────────────────────────────────
const listings = [
  {
    name: "숙소명",
    rating: 4.97,
    reviewCount: 243,
    type: "아파트 투룸",
    url: "https://www.airbnb.co.kr/rooms/...",
    image: "https://...",  // 숙소 대표 이미지 URL
    tags: ["#커플데이트", "#오션뷰"],
    summary: "2~3문장 숙소 특징 요약",
    topComplaint: "가장 많은 불만 키워드",
    topPraise: "가장 많은 칭찬 키워드",
  },
  // ... 5곳
];

const problemMatrix = [
  {
    rank: 1,
    problem: "체크아웃 청소 의무 과다",
    urgency: 9,
    wtp: 9,
    complaintCount: 14,      // 리뷰에서 실제 불평 등장 횟수
    growthRate: "↑ 급증",    // "↑ 급증" | "↑ 증가" | "→ 유지" | "↓ 감소"
    flags: ["🔴", "🚀"],
    quote: "\"청소비 내고 나서 설거지까지 해야 함\"",
  },
  // ... 10개 — complaintCount: 리뷰 텍스트에서 해당 불만 키워드 등장 횟수 카운트
  //            growthRate: 최근 3개월 리뷰 vs 이전 3개월 비교 (또는 검색 트렌드 기반)
];

const offers = [
  {
    title: "No-Chore Checkout",
    problem: "체크아웃 청소 의무 과다",
    urgency: 9,
    wtp: 9,
    headline: "청소는 우리가, 마지막 아침은 당신이",
    description: "퇴실 전 설거지, 분리수거, 수건 정리 일절 필요 없음.",
    tiers: [
      { name: "기본", desc: "청소비 포함", price: "예약 시 포함" },
      { name: "노-초어", desc: "청소 의무 면제 + 1h 레이트 체크아웃", price: "+₩15,000" },
      { name: "프리미엄", desc: "노-초어 + 2h 레이트 + 조식", price: "+₩39,000" },
    ],
    guarantee: "퇴실 후 추가 청구 없음 보장",
    tags: ["#NoChore", "#레이트체크아웃"],
  },
  // ... 5개
];

const viralHooks = [
  { emotion: "공포", text: "영종도 에어비앤비 예약 전, 이것 하나만 확인하세요.", color: "red" },
  { emotion: "분노", text: "청소비 4만원 내고, 퇴실 전 쓰레기 분리수거까지 해야 합니다.", color: "orange" },
  // ... 20개
];

const topRooms = [
  {
    rank: 1,
    name: "숙소명",
    url: "https://www.airbnb.co.kr/rooms/XXXXXXXXX",
    image: "https://...",
    rating: 4.99,
    reviewCount: 312,
    isSuperhost: true,
    priceWeekday: "₩12만",
    priceWeekend: "₩18만",
    titleKeywords: ["오션뷰", "커플", "기념일"],
    instantBook: true,
    minNights: 1,
    amenities: ["넷플릭스", "욕조", "조식"],
    hostResponseRate: "100%",
    hostResponseTime: "1시간 이내",
    lastReviewDate: "2026-04-10",
    thumbnailStrategy: "일출 오션뷰 와이드샷, 침실 중앙 구도",
    rankingStrength: "슈퍼호스트 + 즉시예약 + 후기 300+ 조합",
  },
  // ... 5개 — STEP 7 스크래핑 결과로 채움
];

const topRoomsPatterns = [
  { pattern: "슈퍼호스트", count: 0, total: 5, insight: "" },
  { pattern: "즉시예약 활성화", count: 0, total: 5, insight: "" },
  { pattern: "후기 100개 이상", count: 0, total: 5, insight: "" },
  { pattern: "오션뷰 키워드 제목 포함", count: 0, total: 5, insight: "" },
  { pattern: "평균 평점 4.9 이상", count: 0, total: 5, insight: "" },
  { pattern: "최소 숙박 1박", count: 0, total: 5, insight: "" },
  // ... 스크래핑 결과 기반으로 채움
];

const topRoomsActions = [
  "우리 룸에 즉시 적용 가능한 액션 1",
  // ... 3~5개
];

const marketAnalysis = {
  tam: {
    label: "TAM — 전체 시장",
    value: "₩X,XXX억",
    description: "국내 전체 숙박 시장 규모 (커플 여행 포함)",
    note: "스크래핑 및 공개 통계로 채움",
  },
  sam: {
    label: "SAM — 유효 시장",
    value: "₩XXX억",
    description: "인천/영종도 권역 에어비앤비·단기 렌탈 커플 숙박 시장",
    note: "지역 필터 + 커플/2인 기준",
  },
  som: {
    label: "SOM — 획득 가능 시장",
    value: "₩XX억",
    description: "커플 전용 큐레이션 채널로 현실적으로 공략 가능한 규모",
    note: "초기 3년 목표 기준",
  },
  trends: [
    {
      rank: 1,
      title: "트렌드 제목",
      description: "수요를 만드는 핵심 트렌드 설명",
      signal: "실제 데이터 신호 (예: 검색량 증가율, 리뷰 키워드 빈도 등)",
      color: "blue",
    },
    // ... 총 5개 — 스크래핑 결과 기반으로 채움
  ],
  opportunities: [
    {
      rank: 1,
      title: "기회 제목",
      description: "아직 덜 공략된 기회 설명",
      evidence: "왜 아직 공백인지 (경쟁자 부재, 검색 결과 미충족 등)",
      potential: "예상 수익/전환 포텐셜",
      color: "emerald",
    },
    // ... 총 5개
  ],
  moneyFlows: [
    {
      area: "이미 돈이 흐르는 영역",
      proof: "근거 (예약 대기, 반복 예약, 후기 수)",
      size: "규모 (예: 주말 평균 객단가)",
      trend: "up" as "up" | "stable" | "down",
    },
    // ... 복수 항목
  ],
};

// ── 컴포넌트 ──────────────────────────────────────────────
const AirbnbResearch: React.FC = () => {
  const [lightbox, setLightbox] = React.useState<LightboxState>(null);
  const [activeTab, setActiveTab] = React.useState<'listings' | 'market' | 'problems' | 'offers' | 'viral' | 'toprooms'>('listings');

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="{{HERO_IMAGE — 오션뷰 숙소 대표 이미지}}"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="영종도 오션뷰"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">영종도 커플 호캉스 · {TODAY_DATE}</p>
          <h1 className="text-white text-6xl md:text-9xl font-serif italic mb-4">Market Report</h1>
          <p className="text-white text-xl tracking-[0.3em] uppercase opacity-80">Airbnb Intelligence</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto py-3">
          {[
            { key: 'listings', label: '🏠 숙소 리뷰' },
            { key: 'market', label: '📊 시장 분석' },
            { key: 'problems', label: '🔴 문제 분석' },
            { key: 'offers', label: '💎 고전환 오퍼' },
            { key: 'viral', label: '⚡ 바이럴 전략' },
            { key: 'toprooms', label: '🏆 인기룸 분석' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* ── TAB: 숙소 리뷰 ── */}
        {activeTab === 'listings' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🏠 영종도 커플 오션스테이</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">Airbnb 실시간 리뷰 수집 · {TODAY_DATE}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {listings.map((item, i) => (
                <div
                  key={i}
                  className="group cursor-zoom-in overflow-hidden rounded-xl bg-slate-50 hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setLightbox({ src: item.image, title: item.name, tag: item.tags[0] })}
                >
                  <div className="overflow-hidden h-48">
                    <img src={item.image} alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-500 font-bold">⭐{item.rating}</span>
                      <span className="text-slate-400 text-xs">{item.reviewCount}개 후기</span>
                    </div>
                    <h4 className="font-serif text-lg mb-1 leading-snug">{item.name}</h4>
                    <p className="text-slate-500 text-xs mb-3">{item.type}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="text-xs text-slate-500 space-y-1">
                      <div>👍 {item.topPraise}</div>
                      <div>👎 {item.topComplaint}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TAB: 시장 분석 ── */}
        {activeTab === 'market' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">📊 시장 분석</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">TAM · SAM · SOM · 핵심 트렌드 · 공백 기회 · 돈의 흐름</p>

            {/* TAM / SAM / SOM */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {([
                { ...marketAnalysis.tam, bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400' },
                { ...marketAnalysis.sam, bg: 'bg-blue-700', text: 'text-white', sub: 'text-blue-200' },
                { ...marketAnalysis.som, bg: 'bg-emerald-600', text: 'text-white', sub: 'text-emerald-100' },
              ] as Array<typeof marketAnalysis.tam & { bg: string; text: string; sub: string }>).map((item, i) => (
                <div key={i} className={`rounded-2xl p-8 ${item.bg}`}>
                  <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 ${item.sub}`}>{item.label}</p>
                  <p className={`text-4xl font-serif font-bold mb-3 ${item.text}`}>{item.value}</p>
                  <p className={`text-sm leading-relaxed mb-2 ${item.text}`}>{item.description}</p>
                  <p className={`text-xs italic ${item.sub}`}>{item.note}</p>
                </div>
              ))}
            </div>

            {/* 수요를 만드는 핵심 트렌드 5개 */}
            <div className="mb-16">
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <span>🚀</span> 수요를 만드는 핵심 트렌드
              </h3>
              <div className="space-y-4">
                {marketAnalysis.trends.map((item, i) => {
                  const colorMap: Record<string, { border: string; badge: string; bg: string }> = {
                    blue: { border: 'border-blue-300', badge: 'bg-blue-100 text-blue-700', bg: 'bg-blue-50' },
                    purple: { border: 'border-purple-300', badge: 'bg-purple-100 text-purple-700', bg: 'bg-purple-50' },
                    orange: { border: 'border-orange-300', badge: 'bg-orange-100 text-orange-700', bg: 'bg-orange-50' },
                    pink: { border: 'border-pink-300', badge: 'bg-pink-100 text-pink-700', bg: 'bg-pink-50' },
                    teal: { border: 'border-teal-300', badge: 'bg-teal-100 text-teal-700', bg: 'bg-teal-50' },
                  };
                  const c = colorMap[item.color] ?? colorMap.blue;
                  return (
                    <div key={i} className={`flex gap-4 p-5 rounded-xl border-l-4 ${c.bg} ${c.border}`}>
                      <span className="text-2xl font-bold text-slate-300 w-8 flex-shrink-0 leading-none mt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-serif text-lg font-semibold">{item.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>트렌드</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-2">{item.description}</p>
                        <p className="text-xs text-slate-400 italic">📡 {item.signal}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 아직 덜 공략된 기회 5개 */}
            <div className="mb-16">
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <span>🎯</span> 아직 덜 공략된 기회
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {marketAnalysis.opportunities.map((item, i) => (
                  <div key={i} className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl font-bold text-emerald-200 leading-none">#{item.rank}</span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">공백 기회</span>
                    </div>
                    <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.description}</p>
                    <div className="space-y-1 text-xs">
                      <p className="text-slate-500">🔍 <span className="italic">{item.evidence}</span></p>
                      <p className="text-emerald-700 font-medium">💰 {item.potential}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 이미 돈이 흐르는 영역 */}
            <div>
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <span>💸</span> 이미 돈이 흐르는 영역
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="text-left p-4 rounded-tl-lg font-medium">영역</th>
                      <th className="text-left p-4 font-medium">근거</th>
                      <th className="text-left p-4 font-medium">규모</th>
                      <th className="text-left p-4 rounded-tr-lg font-medium">추세</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketAnalysis.moneyFlows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-4 font-medium">{row.area}</td>
                        <td className="p-4 text-slate-600">{row.proof}</td>
                        <td className="p-4 font-bold text-slate-800">{row.size}</td>
                        <td className="p-4">
                          {row.trend === 'up' && <span className="text-emerald-600 font-bold">↑ 상승</span>}
                          {row.trend === 'stable' && <span className="text-amber-600 font-bold">→ 유지</span>}
                          {row.trend === 'down' && <span className="text-red-500 font-bold">↓ 하락</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── TAB: 문제 분석 ── */}
        {activeTab === 'problems' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🔴 숙소 문제 매트릭스</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-6">WTP 점수 기준 정렬 · 실제 불평 횟수 · 성장 속도 표시</p>

            {/* 범례 */}
            <div className="flex flex-wrap gap-3 mb-10 text-xs">
              <span className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-full font-medium">
                🔴 실제 불평 — 리뷰에서 직접 언급된 문제
              </span>
              <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                🚀 빠르게 커지는 문제 — 최근 3개월 급증
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
                💰 WTP 바 — 해결 시 돈 낼 의향 (1–10)
              </span>
            </div>

            <div className="space-y-4">
              {problemMatrix.map((item, i) => {
                const isActualComplaint = item.flags.includes("🔴");
                const isFastGrowing = item.flags.includes("🚀");
                const score = item.urgency + item.wtp;
                const cardBg = isActualComplaint && isFastGrowing
                  ? 'bg-red-50 border border-red-200'
                  : isActualComplaint
                    ? 'bg-orange-50 border border-orange-100'
                    : isFastGrowing
                      ? 'bg-amber-50 border border-amber-100'
                      : 'bg-slate-50 border border-slate-100';

                return (
                  <div key={i} className={`rounded-xl p-5 transition-shadow hover:shadow-md ${cardBg}`}>
                    <div className="flex items-start gap-4">
                      {/* 순위 */}
                      <span className="text-2xl font-bold text-slate-300 w-8 flex-shrink-0 leading-none mt-1">
                        #{item.rank}
                      </span>

                      {/* 본문 */}
                      <div className="flex-1 min-w-0">
                        {/* 제목 + 배지 */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-serif text-lg">{item.problem}</h4>
                          {isActualComplaint && (
                            <span className="text-xs bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                              🔴 실제 불평 {item.complaintCount}회
                            </span>
                          )}
                          {isFastGrowing && (
                            <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                              🚀 {item.growthRate}
                            </span>
                          )}
                        </div>

                        {/* 인용 */}
                        <p className="text-slate-500 text-sm italic mb-3">{item.quote}</p>

                        {/* WTP 바 */}
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-slate-400 w-20">💰 WTP</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 10 }, (_, n) => (
                                <div
                                  key={n}
                                  className={`w-4 h-4 rounded-sm ${
                                    n < item.wtp
                                      ? item.wtp >= 8
                                        ? 'bg-emerald-500'
                                        : item.wtp >= 5
                                          ? 'bg-emerald-300'
                                          : 'bg-slate-300'
                                      : 'bg-slate-100 border border-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-emerald-600 ml-1">{item.wtp}/10</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 w-20">🔥 긴급도</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 10 }, (_, n) => (
                                <div
                                  key={n}
                                  className={`w-4 h-4 rounded-sm ${
                                    n < item.urgency
                                      ? item.urgency >= 8
                                        ? 'bg-red-500'
                                        : item.urgency >= 5
                                          ? 'bg-red-300'
                                          : 'bg-slate-300'
                                      : 'bg-slate-100 border border-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-red-600 ml-1">{item.urgency}/10</span>
                          </div>
                        </div>
                      </div>

                      {/* 종합 점수 원형 */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-1">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                          style={{ background: `hsl(${Math.max(0, 120 - score * 5)}, 70%, 45%)` }}
                        >
                          {score}
                        </div>
                        <span className="text-xs text-slate-400">/ 20</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── TAB: 고전환 오퍼 ── */}
        {activeTab === 'offers' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">💎 고전환 오퍼 설계</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">Top 5 문제 · 이상적 고객 정의 · 보장 포함</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offers.map((offer, i) => (
                <div key={i} className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-slate-900 text-white p-5">
                    <p className="text-slate-400 text-xs tracking-widest uppercase mb-1">OFFER {i + 1} · 긴급 {offer.urgency} / WTP {offer.wtp}</p>
                    <h4 className="font-serif text-2xl italic mb-1">{offer.title}</h4>
                    <p className="text-slate-300 text-sm">{offer.headline}</p>
                  </div>
                  <div className="p-5 space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{offer.description}</p>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">가격 티어</p>
                      <div className="space-y-2">
                        {offer.tiers.map((tier, j) => (
                          <div key={j} className="flex justify-between items-center text-sm">
                            <div>
                              <span className="font-medium">{tier.name}</span>
                              <span className="text-slate-500 ml-2">{tier.desc}</span>
                            </div>
                            <span className="font-bold text-blue-700">{tier.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <p className="text-xs text-emerald-700 font-medium">🛡️ {offer.guarantee}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {offer.tags.map((tag, j) => (
                        <span key={j} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TAB: 바이럴 전략 ── */}
        {activeTab === 'viral' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">⚡ 바이럴 콘텐츠 전략</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">고전환 훅 20개 · SPICE 구조 · 플랫폼별 전략</p>
            <div className="columns-1 md:columns-2 gap-6 space-y-4">
              {viralHooks.map((hook, i) => {
                const colorMap: Record<string, string> = {
                  red: 'bg-red-50 border-red-200 text-red-800',
                  orange: 'bg-orange-50 border-orange-200 text-orange-800',
                  purple: 'bg-purple-50 border-purple-200 text-purple-800',
                  blue: 'bg-blue-50 border-blue-200 text-blue-800',
                  pink: 'bg-pink-50 border-pink-200 text-pink-800',
                  amber: 'bg-amber-50 border-amber-200 text-amber-800',
                };
                return (
                  <div key={i} className={`break-inside-avoid p-4 rounded-xl border mb-4 ${colorMap[hook.color] || colorMap.blue}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold opacity-60 uppercase tracking-widest">#{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-xs font-medium opacity-70">{hook.emotion}</span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">"{hook.text}"</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── TAB: 인기룸 분석 ── */}
        {activeTab === 'toprooms' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🏆 Airbnb 상위 노출 룸 분석</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">검색 1–5위 룸 · 노출 공식 역산 · 즉시 적용 액션</p>

            {/* 룸 카드 5개 */}
            <div className="space-y-6 mb-16">
              {topRooms.map((room, i) => (
                <div
                  key={i}
                  className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* 썸네일 */}
                    <div
                      className="relative md:w-56 h-44 md:h-auto flex-shrink-0 cursor-zoom-in overflow-hidden bg-slate-100"
                      onClick={() => setLightbox({ src: room.image, title: room.name, tag: `#${room.rank}위 노출` })}
                    >
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        #{room.rank}위
                      </div>
                      {room.isSuperhost && (
                        <div className="absolute top-3 right-3 bg-amber-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                          슈퍼호스트
                        </div>
                      )}
                    </div>

                    {/* 정보 */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4 className="font-serif text-xl leading-snug">{room.name}</h4>
                          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                            <span className="text-amber-500 font-bold">⭐{room.rating}</span>
                            <span>{room.reviewCount}개 후기</span>
                            <span className="text-slate-300">|</span>
                            <span>최근 후기 {room.lastReviewDate}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-slate-400 mb-0.5">평일 / 주말</p>
                          <p className="font-bold text-slate-800">{room.priceWeekday} / {room.priceWeekend}</p>
                        </div>
                      </div>

                      {/* 제목 키워드 */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {room.titleKeywords.map((kw, j) => (
                          <span key={j} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                            {kw}
                          </span>
                        ))}
                        {room.instantBook && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                            ⚡ 즉시예약
                          </span>
                        )}
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          최소 {room.minNights}박
                        </span>
                      </div>

                      {/* 어메니티 */}
                      <p className="text-xs text-slate-500 mb-3">
                        {room.amenities.join(" · ")}
                      </p>

                      {/* 노출 강점 + 썸네일 전략 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-amber-50 rounded-lg p-3">
                          <p className="text-amber-700 font-bold mb-1">📸 썸네일 전략</p>
                          <p className="text-slate-600">{room.thumbnailStrategy}</p>
                        </div>
                        <div className="bg-emerald-50 rounded-lg p-3">
                          <p className="text-emerald-700 font-bold mb-1">🚀 노출 강점</p>
                          <p className="text-slate-600">{room.rankingStrength}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 공통 패턴 테이블 */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-6">📊 상위 노출 공통 패턴</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="text-left p-4 font-medium">패턴</th>
                      <th className="text-center p-4 font-medium">5개 중</th>
                      <th className="text-center p-4 font-medium">비율</th>
                      <th className="text-left p-4 font-medium">인사이트</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topRoomsPatterns.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-4 font-medium">{row.pattern}</td>
                        <td className="p-4 text-center">
                          <span className="font-bold text-slate-800">{row.count}</span>
                          <span className="text-slate-400">/{row.total}</span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${(row.count / row.total) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-500">{Math.round((row.count / row.total) * 100)}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 text-xs">{row.insight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 즉시 적용 액션 */}
            <div className="bg-slate-900 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-serif mb-6">⚡ 우리 룸에 즉시 적용 가능한 것</h3>
              <ol className="space-y-3">
                {topRoomsActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-slate-200 text-sm leading-relaxed">{action}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Bottom Summary */}
        <section className="mt-24 bg-slate-50 p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-serif mb-6 underline underline-offset-4">핵심 기회 키워드</h4>
              <div className="flex flex-wrap gap-2">
                {/* 스크래핑 결과에서 추출한 주요 키워드들 */}
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-serif mb-6 underline underline-offset-4">이번 주 액션 아이템</h4>
              <ul className="space-y-3 text-slate-600">
                {/* 분석 결과 기반 실행 항목들 */}
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white text-4xl leading-none hover:opacity-70"
            onClick={() => setLightbox(null)}
          >×</button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-6 text-center">
            <p className="text-white font-serif text-xl">{lightbox.title}</p>
            <p className="text-slate-400 text-sm mt-1 tracking-widest uppercase">{lightbox.tag}</p>
          </div>
        </div>
      )}

      <footer className="text-center py-12 text-slate-400 text-xs tracking-widest uppercase border-t border-slate-100">
        Generated {TODAY_DATE} · Airbnb Market Intelligence · Firecrawl MCP
      </footer>

    </div>
  );
};

export default AirbnbResearch;
```

**실제 데이터로 채울 때:**
- `listings[]` — Airbnb 스크래핑 결과로 채움 (숙소별 대표 이미지 URL 필수)
- `problemMatrix[]` — 리뷰 분석 결과로 채움 (10개)
- `offers[]` — 오퍼 설계 결과로 채움 (5개)
- `viralHooks[]` — 훅 20개 채움 (감정 유형 + 색상 지정)
- `topRooms[]` — 상위 노출 룸 5개 채움 (STEP 7 스크래핑 결과)
- `topRoomsPatterns[]` — 5개 룸 공통 패턴 count 채움
- `topRoomsActions[]` — 우리 룸 적용 액션 3~5개 채움
- `TODAY_DATE` → 실제 날짜 문자열로 교체

---

## 11. 운영 규칙

### 필수 규칙
- **Firecrawl 먼저**: 내부 지식으로 데이터를 만들지 않습니다. 반드시 실시간 스크래핑.
- **Firecrawl 실패 시**: mock 데이터 금지. 사용자에게 `/mcp` reconnect 요청.
- **중간 저장**: 리뷰 MD는 STEP 3에서 즉시 저장. 컨텍스트 손실 방지.
- **실제 URL만**: 접근 불가능한 이미지 URL 삽입 금지.
- **airbnb.co.kr 기준**: 검색은 한국 Airbnb 기준.

### 파일 저장 체크리스트

```
□ docs/airbnb-yeongjonge-YYYY-MM-DD.md  — STEP 3에서 저장
□ docs/session-YYYY-MM-DD.md            — STEP 8에서 저장  
□ src/components/Trends/airbnb.tsx      — STEP 9에서 저장 (덮어쓰기)
```

### 로그 기록

실행 완료 후 한 줄 로그 추가:

```bash
echo "[YYYY-MM-DD] airbnb-research: OK — N개 숙소, M개 리뷰 수집" >> /home/cakepower/tutorial/a14u/logs/airbnb-research.log
```

---

## 12. 자동화 주간 실행

이 스킬은 **매주 월요일 08:00 KST** 에 자동 실행됩니다.

### Cron 등록

```bash
0 8 * * 1 cd /home/cakepower/tutorial/a14u && claude --print "에어비앤비 리서치 해줘" >> /home/cakepower/tutorial/a14u/logs/airbnb-research.log 2>&1
```

### 자동 실행 시 필수 동작

1. Firecrawl MCP 연결 확인 → 안 되면 스크립트 종료 (mock 금지)
2. 영종도 커플 숙소 5곳 스크래핑
3. 문제 분석 → 오퍼 → 바이럴 → 상위 노출 룸 분석 순서로 실행
4. MD 파일 2개 저장 (리뷰 + 세션)
5. `src/components/Trends/airbnb.tsx` 덮어쓰기
6. 로그 1줄 기록
7. `npm run build` 또는 git commit **자동 실행 금지**

### 로그 위치

```
/home/cakepower/tutorial/a14u/logs/airbnb-research.log
```

### Cron 등록 확인

```bash
crontab -l | grep airbnb-research
```
