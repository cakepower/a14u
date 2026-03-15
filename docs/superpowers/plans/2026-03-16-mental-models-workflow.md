# Mental Models Workflow Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 사용자가 주제를 입력하면 semantic-scholar에서 논문을 검색·선택하고, Claude가 분석해 전문가의 5가지 핵심 멘탈 모델을 마크다운 문서 + React 카드 컴포넌트로 생성하는 반자동 워크플로우를 실행한다.

**Architecture:** 새 코드 없음. semantic-scholar MCP(검색·상세조회) + in-context Claude 분석 + 기존 PaperReviewCards.tsx 스키마를 그대로 사용하는 신규 TSX 파일 생성의 3단계 파이프라인.

**Tech Stack:** semantic-scholar MCP (`search_papers`, `get_paper`), React + TypeScript (framer-motion), Tailwind CSS v4, 기존 `CardData` / `CardTheme` 타입

---

## 파일 구조

| 역할 | 경로 | 비고 |
|------|------|------|
| 생성: 멘탈 모델 문서 | `src/papers/MMDD-<topic-slug>-mental-models.md` | 실행 시 생성 |
| 생성: 카드 컴포넌트 | `src/components/<TopicSlug>MentalModelsCards.tsx` | 실행 시 생성 |
| 참조: 카드 스키마 | `src/components/PaperReviewCards.tsx` | 수정 없음 |
| 참조: 논문 예시 | `src/papers/review0305.md` | 수정 없음 |

---

## Chunk 1: SEARCH + SELECT + FETCH

### Task 1: 주제 검색 및 논문 목록 제시

**Files:**
- (없음 — MCP 호출만)

- [ ] **Step 1: semantic-scholar 검색 실행**

  MCP 호출:
  ```
  search_papers(query="<사용자 주제>", limit=15)
  ```

- [ ] **Step 2: 결과를 인용수 기준 내림차순으로 정렬 (in-context)**

  반환된 결과를 `citationCount` 필드 기준으로 내림차순 정렬. MCP 호출 추가 없음.

- [ ] **Step 3: 번호 목록으로 결과 표시**

  형식 (각 항목 한 줄):
  ```
  번호. 제목 (저자1 et al., 연도) — 인용 N회
       한 줄 요약: <초록 첫 문장 또는 핵심 한 문장>
  ```

  예시:
  ```
  1. Attention Is All You Need (Vaswani et al., 2017) — 인용 120,000회
     한 줄 요약: self-attention 메커니즘만으로 RNN 없이 NLP SOTA를 달성한 Transformer 아키텍처를 제안.

  2. BERT: Pre-training of Deep Bidirectional Transformers (Devlin et al., 2019) — 인용 80,000회
     한 줄 요약: 양방향 문맥을 사전학습한 언어 모델이 11개 NLP 과제에서 SOTA를 갱신.
  ```

  목록 출력 후: "분석에 포함할 논문 번호를 선택해주세요 (예: 1, 3, 5). 최소 5편 권장합니다."

---

### Task 2: 사용자 선택 논문 상세 조회

**Files:**
- (없음 — MCP 호출만)

- [ ] **Step 1: 선택된 각 논문에 대해 `get_paper` 호출 (1 req/sec)**

  **중요:** 각 `get_paper` 호출은 별도 MCP 호출로 순차 실행. 호출 사이에는 반드시 `Bash: sleep 1`을 실행한다. 병렬 호출 금지.

  ```
  get_paper(paper_id="<paperId 1>")
  # → Bash: sleep 1
  get_paper(paper_id="<paperId 2>")
  # → Bash: sleep 1
  ...
  ```

  수집 데이터: `title`, `authors`, `year`, `citationCount`, `abstract`
  - `abstract`가 null이면 해당 논문에 "초록 없음" 표시 후 분석 대상에서 제외
  - Step 2의 유효 논문 수는 **초록이 있는 논문만** 카운트

- [ ] **Step 2: 유효 논문 수 확인 (초록 있는 논문 기준)**

  초록이 있는 논문이 5편 미만이면:
  > "초록을 확인할 수 있는 논문이 현재 N편입니다. 최소 5편 권장합니다. 번호로 논문을 추가하시겠어요?"

  5편 이상이면 Task 3으로 진행.

---

## Chunk 2: ANALYZE + WRITE

### Task 3: Claude 분석 — 5가지 멘탈 모델 추출

**Files:**
- (없음 — in-context 분석)

- [ ] **Step 1: 분석 프롬프트 구성 및 실행 (in-context)**

  아래 구조로 Claude 자신이 분석 수행:

  ```
  [분석 지시]
  다음은 "<주제>" 분야의 논문 N편의 초록이다.
  이 분야 전문가들이 암묵적으로 공유하는 "핵심 멘탈 모델"을 5가지 추출하라.

  멘탈 모델 정의: 단순 사실이 아니라, 전문가들이 문제를 바라보는 사고 틀.
  예) "AI는 도구가 아니라 팀원이다", "신뢰는 calibration 문제다"

  **멘탈 모델이 아닌 것:** 단순 실험 결과나 통계적 사실(예: "정확도가 X% 향상됐다")은 멘탈 모델이 아니다. 전문가들이 문제를 어떻게 '바라보는지'를 나타내는 인식론적 틀이어야 한다.

  각 멘탈 모델은 반드시 아래 4가지를 포함할 것:
  1. Name/Label: 짧은 영어 구문 + 한국어 부제 (예: "Trust Calibration — 신뢰 보정")
  2. 핵심 주장: 1–2문장 (한국어)
  3. 근거 논문: 해당 모델을 지지하는 논문 1편 이상 인용 (Author et al., year)
  4. 실무 적용: 이 멘탈 모델이 의사결정이나 행동을 어떻게 바꾸는지 (한국어)

  [논문 초록들]
  ---
  Paper 1: <title> (Author et al., year)
  <abstract>
  ---
  Paper 2: ...
  ```

- [ ] **Step 2: 모델 수 확인**

  추출된 멘탈 모델이 4개 미만이면:
  > "선택된 논문에서 N개의 뚜렷한 멘탈 모델만 식별됐습니다. 논문을 추가하면 더 완성된 분석이 가능합니다. 추가하시겠어요?"

  4개 이상이면 Task 4로 진행.

---

### Task 4: 마크다운 문서 저장

**Files:**
- Create: `src/papers/MMDD-<topic-slug>-mental-models.md`

- [ ] **Step 1: 파일명 결정**

  날짜 형식: `MMDD` (실행일 기준, 예: `0316`)
  topic-slug: 주제를 영어 소문자 하이픈 연결 (예: `transformer-architecture`)
  최종 예시: `src/papers/0316-transformer-architecture-mental-models.md`

- [ ] **Step 2: 문서 작성 및 저장**

  아래 템플릿에 분석 결과를 채워 파일 저장.
  **개요 섹션 작성 지침:** 멘탈 모델 추출 결과가 아닌, 수집된 논문 메타데이터(분야, 연도 범위, 저자 분포, 연구 흐름)를 바탕으로 이 분야의 맥락을 2~3문장으로 서술한다.

  ```markdown
  # [주제명] 분야 전문가의 [N]가지 핵심 멘탈 모델
  > 분석 기반 논문: N편 | YYYY.MM.DD | semantic-scholar + Claude 분석

  ## 개요
  [이 분야의 맥락: 연구가 언제부터 활발해졌는지, 어떤 기관/연구자들이 주도하는지, 이번 분석에서 다룬 논문들의 연도·주제 범위.]

  ## 멘탈 모델 1: [English Label — 한국어 부제]
  **핵심 주장:** ...
  **근거 논문:** Author et al. (year) — "논문 제목"
  **실무 적용:** ...

  ## 멘탈 모델 2: [English Label — 한국어 부제]
  ...

  (멘탈 모델 3–5 동일 구조)

  ---

  ## 분석된 논문 목록
  | 제목 | 저자 | 연도 | 인용수 |
  |------|------|------|--------|
  | ...  | ...  | ...  | ...    |
  ```

- [ ] **Step 3: 저장 확인**

  파일 경로 출력: "문서 저장 완료: `src/papers/<filename>.md`"

- [ ] **Step 4: 커밋**

  ```bash
  git add src/papers/<filename>.md
  git commit -m "docs: add <topic> mental models analysis"
  ```

---

## Chunk 3: CARDS

### Task 5: React 카드 컴포넌트 생성

**Files:**
- Create: `src/components/<TopicSlug>MentalModelsCards.tsx`
- Reference: `src/components/PaperReviewCards.tsx` (스키마 참조 — 수정 없음)

**카드 스키마 참조** (`src/components/PaperReviewCards.tsx` 기준):
```typescript
type CardTheme = { bg: string; accent: string };  // text 필드 없음 주의

type CardData = {
  id: number;
  type: string;
  emoji: string;
  label: string | null;
  title: string;
  subtitle?: string;
  keywords?: string[];
  extra?: string;
  body?: string;
  impact?: string;
  theme: CardTheme;
};
```

**10장 카드 매핑**:
| 카드 | type | 내용 |
|------|------|------|
| 1 | `'cover'` | 주제명, 논문 수, 날짜, 핵심 키워드 5개 |
| 2 | `'highlight'` | TL;DR — 가장 놀랍거나 반직관적인 멘탈 모델 |
| 3 | `'highlight'` | 멘탈 모델 1 |
| 4 | `'insight'` | 멘탈 모델 2 |
| 5 | `'highlight'` | 멘탈 모델 3 |
| 6 | `'insight'` | 멘탈 모델 4 |
| 7 | `'highlight'` | 멘탈 모델 5 |
| 8 | `'idea'` | 모델들 간 교차 주제 또는 긴장 관계 |
| 9 | `'result'` | 실무 적용 종합 |
| 10 | `'closing'` | 마무리 + 추가 읽을거리 |

- [ ] **Step 1: TopicSlug 결정**

  PascalCase 변환 (예: `transformer-architecture` → `TransformerArchitecture`)
  컴포넌트명: `<TopicSlug>MentalModelsCards`
  파일명: `src/components/<TopicSlug>MentalModelsCards.tsx`

- [ ] **Step 2: TSX 파일 작성**

  아래 구조로 파일 생성. `CARDS` 배열만 분석 결과로 채우고, 나머지 로직은 `PaperReviewCards.tsx`와 동일하게 복사:

  ```tsx
  import { useState, useEffect, useRef } from 'react';
  import { motion } from 'framer-motion';

  type CardTheme = { bg: string; accent: string };

  type CardData = {
    id: number;
    type: string;
    emoji: string;
    label: string | null;
    title: string;
    subtitle?: string;
    keywords?: string[];
    extra?: string;
    body?: string;
    impact?: string;
    theme: CardTheme;
  };

  const THEMES: CardTheme[] = [
    { bg: 'from-slate-800 to-gray-900',    accent: '#38BDF8' },
    { bg: 'from-blue-600 to-indigo-800',   accent: '#FCD34D' },
    { bg: 'from-gray-600 to-slate-700',    accent: '#FCA5A5' },
    { bg: 'from-emerald-600 to-teal-800',  accent: '#FEF08A' },
    { bg: 'from-violet-600 to-purple-800', accent: '#C4B5FD' },
    { bg: 'from-cyan-600 to-blue-800',     accent: '#A7F3D0' },
    { bg: 'from-rose-600 to-red-800',      accent: '#FECACA' },
    { bg: 'from-amber-600 to-orange-800',  accent: '#FDE68A' },
    { bg: 'from-fuchsia-600 to-pink-800',  accent: '#FBCFE8' },
    { bg: 'from-slate-700 to-slate-900',   accent: '#6EE7B7' },
  ];

  const CARDS: CardData[] = [
    // ── Card 1: Cover ──────────────────────────────────────────────
    {
      id: 1,
      type: 'cover',
      emoji: '<주제 관련 이모지>',
      label: null,
      title: '<주제명>\n멘탈 모델\n5가지',
      subtitle: '<N>편 논문 분석 | Mental Models | <YYYY.MM.DD>',
      keywords: ['<키워드1>', '<키워드2>', '<키워드3>', '<키워드4>', '<키워드5>'],
      extra: '⏱️ Read Time: 5 min  |  <관련 학문 분야>',
      theme: THEMES[0],
    },
    // ── Card 2: TL;DR ──────────────────────────────────────────────
    {
      id: 2,
      type: 'highlight',
      emoji: '🔥',
      label: 'TL;DR',
      title: '<가장 반직관적 멘탈 모델\n제목 3줄>',
      body: '<해당 멘탈 모델 상세 설명. 왜 놀라운지, 어떤 논문이 뒷받침하는지.>',
      impact: '🎯 핵심: <한 줄 임팩트>',
      theme: THEMES[1],
    },
    // ── Cards 3–7: 멘탈 모델 1–5 ───────────────────────────────────
    {
      id: 3,
      type: 'highlight',
      emoji: '<이모지>',
      label: 'MENTAL MODEL 1',
      title: '<English Label>\n—\n<한국어 부제>',
      body: '<핵심 주장>\n\n근거: <Author et al., year>',
      impact: '💡 실무 적용: <한 줄>',
      theme: THEMES[2],
    },
    // ── Card 4: 멘탈 모델 2 ────────────────────────────────────────
    {
      id: 4,
      type: 'insight',
      emoji: '<이모지>',
      label: 'MENTAL MODEL 2',
      title: '<English Label>\n—\n<한국어 부제>',
      body: '<핵심 주장>\n\n근거: <Author et al., year>',
      impact: '💡 실무 적용: <한 줄>',
      theme: THEMES[3],
    },
    // ── Card 5: 멘탈 모델 3 ────────────────────────────────────────
    {
      id: 5,
      type: 'highlight',
      emoji: '<이모지>',
      label: 'MENTAL MODEL 3',
      title: '<English Label>\n—\n<한국어 부제>',
      body: '<핵심 주장>\n\n근거: <Author et al., year>',
      impact: '💡 실무 적용: <한 줄>',
      theme: THEMES[4],
    },
    // ── Card 6: 멘탈 모델 4 ────────────────────────────────────────
    {
      id: 6,
      type: 'insight',
      emoji: '<이모지>',
      label: 'MENTAL MODEL 4',
      title: '<English Label>\n—\n<한국어 부제>',
      body: '<핵심 주장>\n\n근거: <Author et al., year>',
      impact: '💡 실무 적용: <한 줄>',
      theme: THEMES[5],
    },
    // ── Card 7: 멘탈 모델 5 ────────────────────────────────────────
    {
      id: 7,
      type: 'highlight',
      emoji: '<이모지>',
      label: 'MENTAL MODEL 5',
      title: '<English Label>\n—\n<한국어 부제>',
      body: '<핵심 주장>\n\n근거: <Author et al., year>',
      impact: '💡 실무 적용: <한 줄>',
      theme: THEMES[6],
    },
    // ── Card 8: 교차 주제 ───────────────────────────────────────────
    {
      id: 8,
      type: 'idea',
      emoji: '🔗',
      label: 'CROSS-CUTTING THEME',
      title: '<모델들 간\n공통 긴장 또는\n상위 패턴>',
      body: '<2–3문장 설명>',
      impact: '⚡ <한 줄 인사이트>',
      theme: THEMES[7],
    },
    // ── Card 9: 실무 종합 ───────────────────────────────────────────
    {
      id: 9,
      type: 'result',
      emoji: '🛠️',
      label: 'PRACTICAL TAKEAWAYS',
      title: '<이 분야에서\n일하는 사람이라면\n알아야 할 것>',
      body: '<3–4가지 실무 적용 불릿>',
      impact: '📌 <가장 중요한 한 가지>',
      theme: THEMES[8],
    },
    // ── Card 10: Closing ────────────────────────────────────────────
    {
      id: 10,
      type: 'closing',
      emoji: '📚',
      label: 'FURTHER READING',
      title: '<다음 단계\n또는 열린 질문>',
      body: '<추가로 읽을 논문 2–3편, 또는 이 분야의 미해결 질문>',
      theme: THEMES[9],
    },
  ];

  // ── 렌더 로직: PaperReviewCards.tsx에서 복사 ──────────────────────
  // 주의 1: export default function 이름을 <TopicSlug>MentalModelsCards로 변경
  // 주의 2: JSX 내 하드코딩된 섹션 제목 문자열(예: "AI-인간 협업 문헌 리뷰")을
  //         주제에 맞는 제목으로 반드시 교체
  // 주의 3: 파일 저장 전 모든 <placeholder> 문자열이 실제 값으로 대체됐는지 확인
  export default function <TopicSlug>MentalModelsCards() {
    // ... (PaperReviewCards.tsx의 useState, useEffect, 렌더 JSX 그대로 복사)
  }
  ```

- [ ] **Step 3: 파일 저장 확인**

  파일 경로 출력: "카드 컴포넌트 저장 완료: `src/components/<TopicSlug>MentalModelsCards.tsx`"

- [ ] **Step 4: 커밋**

  ```bash
  git add src/components/<TopicSlug>MentalModelsCards.tsx
  git commit -m "feat: add <topic> mental models card component"
  ```

- [ ] **Step 5: 통합 안내**

  사용자에게 수동 임포트 방법 안내:
  ```tsx
  // App.tsx 또는 원하는 위치에 추가
  import <TopicSlug>MentalModelsCards from './components/<TopicSlug>MentalModelsCards';

  // JSX에서 사용
  <<TopicSlug>MentalModelsCards />
  ```

---

## 실행 체크리스트 요약

```
[ ] 1. search_papers("<주제>", limit=15) 호출 → 인용수 정렬 → 번호 목록 출력
[ ] 2. 사용자 선택 입력 → 선택 논문 get_paper() 순차 호출 (1 req/sec)
[ ] 3. 초록 수집 → 초록 있는 논문 5편 미만이면 추가 요청
[ ] 4. in-context 분석 → 5가지 멘탈 모델 추출
[ ] 5. 모델 수 4 미만이면 추가 논문 요청
[ ] 6. src/papers/MMDD-<slug>-mental-models.md 저장 + 커밋
[ ] 7. src/components/<TopicSlug>MentalModelsCards.tsx 생성 + 커밋
[ ] 8. 통합 임포트 방법 사용자 안내
```
