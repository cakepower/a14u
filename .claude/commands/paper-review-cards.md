---
name: paper-review-cards
description: literature review 문서를 인터랙티브 카드뉴스 React 컴포넌트로 변환하는 스킬. 사용자가 "논문요약 카드 만들어줘", "논문요약 카드 작성", "카드뉴스로 만들어줘" 같은 요청을 할 때 반드시 이 스킬을 사용하세요. review-paper 스킬로 발행한 리뷰문서를 시각화할 때도 즉시 트리거하세요.
---

# 논문 리뷰 카드뉴스 생성 스킬

literature review 문서(멘탈 모델 분석, 논문 요약 등)를 **인터랙티브 React 카드뉴스**로 변환하는 스킬.

---

## 작업 흐름

### 1단계: 콘텐츠 파악 및 카드 구성

입력된 문서에서 핵심 구조를 파악하여 카드로 분배하세요:

| 카드 번호 | 유형 | 내용 |
|----------|------|------|
| 1장 | 🎨 표지 | 분석 제목, 날짜, 핵심 키워드 3~5개 |
| 2장~ | 🔥 핵심 콘텐츠 | 멘탈 모델 / 논문 요약 / 인사이트 각 1개씩 |
| 마지막 장 | 👋 마무리 | 참고 논문 목록, 클로징 |

카드 수는 콘텐츠 양에 맞게 유연하게 결정합니다 (최소 4장, 최대 12장).

### 2단계: React 컴포넌트 작성

아래 디자인 시스템에 맞춰 `.tsx` 코드를 작성하세요.

---

## 디자인 시스템

### 컬러 팔레트

```typescript
const THEMES = [
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
```

### 카드 크기 (isMobile + cardStyle 패턴 — 필수)

```tsx
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const onResize = () => setIsMobile(window.innerWidth <= 768);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);

const cardStyle = isMobile
  ? { width: '360px', height: '640px', flexShrink: 0 }
  : { width: 'min(1100px, 92vw)', height: '640px', flexShrink: 0 };
```

### 외부 컨테이너 (필수)

```tsx
<div style={{ width: 'min(1100px, 92vw)', margin: isMobile ? '24px auto 40px' : '34px auto 56px' }}>
  <div className="relative flex flex-col" style={cardStyle}>
    {/* 카드 콘텐츠 */}
  </div>
</div>
```

### 카드 구조

```
┌──────────────────────────────────────────┐
│ [섹션 라벨]              [N / TOTAL]     │ ← 상단 진행 바 + 네비게이션
├──────────────────────────────────────────┤
│  [이모지]                                │
│  [메인 제목]                             │
│                                          │
│  [본문] — 최소 100자 이상, 4~5줄         │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 🎯 임팩트 박스 (핵심 결론/인용문)   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [📄 Author (Year)] [📄 Author (Year)]   │ ← 논문 링크 버튼 (해당 카드 근거 논문)
├──────────────────────────────────────────┤
│  ← 이전   [● ● ○ ○ ○]   다음 →          │ ← 하단 네비게이션
└──────────────────────────────────────────┘
```

---

## React 컴포넌트 구현 가이드

### 필수 기능

```tsx
import { useState, useEffect, useRef } from 'react';

// 1. 상태
const [current, setCurrent] = useState(0);
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
const touchX = useRef<number | null>(null);

// 2. 키보드 + 리사이즈
useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
  };
  const onResize = () => setIsMobile(window.innerWidth <= 768);
  window.addEventListener('keydown', onKey);
  window.addEventListener('resize', onResize);
  return () => {
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
  };
}, []);

// 3. 카드 크기
const cardStyle = isMobile
  ? { width: '360px', height: '640px', flexShrink: 0 }
  : { width: 'min(1100px, 92vw)', height: '640px', flexShrink: 0 };

// 4. 상단 진행 바
<div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-10">
  <div className="h-full transition-all duration-500"
       style={{ width: `${((current + 1) / CARDS.length) * 100}%`, backgroundColor: accent }} />
</div>

// 5. 터치 스와이프
onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
onTouchEnd={(e) => {
  if (touchX.current === null) return;
  const d = touchX.current - e.changedTouches[0].clientX;
  if (Math.abs(d) > 50) d > 0 ? goNext() : goPrev();
  touchX.current = null;
}}

// 6. 도트 인디케이터
{CARDS.map((_, i) => (
  <button key={i} onClick={() => setCurrent(i)}
    className="rounded-full transition-all duration-300 flex-shrink-0"
    style={{
      width: i === current ? '16px' : '6px',
      height: '6px',
      backgroundColor: i === current ? accent : 'rgba(255,255,255,0.3)',
    }} />
))}
```

### 카드 데이터 구조

```typescript
type CardTheme = { bg: string; accent: string };

type CardData = {
  id: number;
  type: 'cover' | 'content' | 'closing';
  emoji: string;
  label: string | null;
  title: string;
  subtitle?: string;        // cover 전용
  keywords?: string[];      // cover 전용
  extra?: string;           // cover 전용 (읽기 시간 등)
  body?: string;            // content / closing
  impact?: string;          // content — 임팩트 박스 텍스트
  refs?: PaperRef[];        // content — 해당 카드 근거 논문 링크 버튼
  papers?: PaperRef[];      // closing 전용 — 전체 참고 논문 목록
  theme: CardTheme;
};

type PaperRef = { label: string; url: string };
// label 예: "Moruzzi & Margarido (2024)", "Sternberg (2024)"
// url: semantic-scholar 논문 직접 링크 또는 검색 링크
```

### 카드 타입별 콘텐츠 가이드

#### 표지 카드 (cover)
- `title`: 분석 제목 (줄바꿈 `\n` 포함 2~3줄)
- `subtitle`: 분석 날짜, 논문 수, 분야
- `keywords`: 핵심 개념 3~5개
- `extra`: 읽기 시간, 분야 태그

#### 본문 카드 (content)
- `label`: 섹션 라벨 (예: "Mental Model 1", "TL;DR", "KEY FINDING")
- `title`: 핵심 주장 헤드라인 (2~3줄)
- `body`: 최소 100자 이상 상세 설명 (줄바꿈 활용)
- `impact`: 핵심 결론 또는 인용문 1~2문장 (임팩트 박스에 표시)
- `refs`: 이 카드 주장의 근거 논문 링크 버튼 목록 (1~3개)

#### 마무리 카드 (closing)
- `title`: 갈무리 헤드라인
- `body`: 총평 또는 다음 편 예고
- `papers`: 전체 참고 논문 목록 (closing 카드에서 모두 나열)

### 논문 링크 버튼 렌더링 (content 카드)

임팩트 박스 아래, 하단 네비게이션 위에 배치합니다.

```tsx
{card.refs && card.refs.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {card.refs.map((ref, i) => (
      <a
        key={i}
        href={ref.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold px-3 py-1 rounded-full transition-colors"
        style={{
          background: `${accent}22`,
          color: accent,
          border: `1px solid ${accent}55`,
        }}
      >
        📄 {ref.label}
      </a>
    ))}
  </div>
)}
```

closing 카드의 `papers` 목록도 동일한 버튼 스타일로 렌더링합니다.

---

## 출력 형식

- **파일 경로**: 사용자가 지정한 경로 (예: `src/components/News/PaperReviewCards.tsx`)
  - 지정이 없으면 기존 컴포넌트 위치 기준으로 작성
- **default export**: `export default function [ComponentName]`
- **props**: 없음 (모든 데이터 내부 하드코딩)
- **외부 의존성**: `react`만 (`framer-motion` 등 선택적으로 사용 가능)

---

## 작성 원칙

### ✅ 반드시 지킬 것

- 카드 크기는 반드시 `isMobile` state + `cardStyle` inline style로 지정
- 외부 컨테이너: `width: 'min(1100px, 92vw)'`, `margin: auto`
- 본문은 입력 문서의 내용만 기반으로 작성 (임의로 지어내지 말 것)
- 카드당 본문 최소 100자 이상 (너무 짧으면 카드가 비어 보임)
- `body` 텍스트는 `\n`으로 줄바꿈하여 수직 공간 충분히 채울 것
- 참고 논문 링크(`url`)는 semantic-scholar 등 실제 링크 사용

### ❌ 피할 것

- Tailwind `max-w-*`, `aspect-*`, `h-*` 등으로 카드 전체 크기를 지정하는 것
- 카드 수를 임의로 10장으로 고정하는 것 (콘텐츠에 맞게 유연하게)
- 짧은 단답형 본문 (각 카드는 충분한 정보 밀도를 가져야 함)
