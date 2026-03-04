---
name: paper-review-card
description: literature review 문서를 10장짜리 인터랙티브 카드뉴스 React 컴포넌트로 변환하는 스킬. 사용자가 "논문요약 카드 만들어줘", "논문요약 카드 작성", "논문요약" 같은 요청을 할 때 반드시 이 스킬을 사용하세요. review-paper 스킬로 발행한 리뷰문서를 시각화할 때도 즉시 트리거하세요.
---

# 카드뉴스 생성 스킬

literature review 문서를 **10장짜리 인터랙티브 React 카드보고서**로 변환하는 스킬.

---

## 작업 흐름

### 1단계: 논문 핵심 파악

입력된 논문 초록(Abstract) 및 본문에서 다음을 추출하세요:

- **서지 정보**: 논문 제목, 저자, 발표 학회/저널, 연도
- **TL;DR (한 줄 요약)**: 이 논문이 기여한 가장 핵심적인 성과
- **문제 정의 (Problem)**: 기존 연구의 한계점과 해결하고자 하는 과제
- **해결책 (Method)**: 논문이 제안하는 핵심 방법론 (필요시 수식 포함)
- **실험 및 결과 (Result)**: 데이터셋, 베이스라인 비교, 주요 성능 지표
- **리뷰어 인사이트**: 이 논문이 갖는 실무적/학술적 의의와 한계점

### 2단계: 10장 자동 구성(논문 리뷰 최적화)

아래 공식으로 카드를 논리적 흐름에 따라 분배하세요:

| 카드 번호 | 유형 | 내용 |
| :--- | :--- | :--- |
| **1장** | 🎨 표지 | 논문 제목 (큰 글씨), 저자/학회/연도, 핵심 키워드 3개 |
| **2장** | 🔥 TL;DR | 이 논문의 가장 중요한 핵심 기여 한 줄 요약 |
| **3장** | ❓ 연구 배경 | 기존 연구의 한계점 (Why this problem?) |
| **4장** | 🎯 핵심 아이디어 | 논문이 제안하는 문제 해결의 접근법 |
| **5장** | 🧪 상세 방법론 | 알고리즘, 아키텍처, 또는 주요 수학적 모델링 |
| **6장** | 📊 실험 세팅 | 사용된 데이터셋, 평가지표, 베이스라인 모델 |
| **7장** | 📈 주요 결과 | 가장 두드러진 성능 향상 수치 및 결과 요약 |
| **8장** | ⚠️ 한계점 | 논문에서 언급된, 혹은 리뷰어가 파악한 한계(Limitations) |
| **9장** | 💡 인사이트 | 이 연구의 파급력, 실무 적용 가능성 및 총평 |
| **10장** | 👋 마무리 | 논문 링크(arXiv 등), 읽어볼 만한 후속 연구, 구독 CTA |

### 3단계: React 컴포넌트 생성

아래 **디자인 시스템**을 준수하여 `.tsx` 파일을 생성하세요.

---

## 🎨 디자인 시스템

### 컬러 팔레트 (학술적이고 신뢰감 있는 톤)

```javascript
const CARD_THEMES = [
  { bg: 'from-slate-800 to-gray-900',  accent: '#38BDF8', text: 'white' },   // 표지 (다크)
  { bg: 'from-blue-600 to-indigo-800', accent: '#FCD34D', text: 'white' },   // TL;DR (신뢰의 블루)
  { bg: 'from-gray-600 to-slate-700',  accent: '#FCA5A5', text: 'white' },   // 배경 (차분함)
  { bg: 'from-emerald-600 to-teal-800',accent: '#FEF08A', text: 'white' },   // 아이디어 (발견)
  { bg: 'from-violet-600 to-purple-800',accent: '#C4B5FD', text: 'white' },  // 방법론 (깊이)
  { bg: 'from-cyan-600 to-blue-800',   accent: '#A7F3D0', text: 'white' },   // 실험 (분석적)
  { bg: 'from-rose-600 to-red-800',    accent: '#FECACA', text: 'white' },   // 결과 (강조)
  { bg: 'from-amber-600 to-orange-800',accent: '#FDE68A', text: 'white' },   // 한계점 (주의)
  { bg: 'from-fuchsia-600 to-pink-800',accent: '#FBCFE8', text: 'white' },   // 인사이트 (창의적)
  { bg: 'from-slate-700 to-slate-900', accent: '#6EE7B7', text: 'white' },   // 마무리 (정돈)
];
```

### 카드 레이아웃 (9:16 세로형 고정, 모바일 최적화)

```
┌─────────────────────────┐
│  [분야] Paper Review / 10│  ← 상단 네비게이션 바
├─────────────────────────┤
│                         │
│   [이모지 아이콘]        │
│                         │
│   [섹션 라벨 (예: METHOD)]│
│   [메인 제목]            │
│                         │
│   [본문 내용 및 수식]     │
│   (논리적 구조를 갖춘      │
│    상세한 설명, 4~5줄)    │
│                         │
│   [핵심 요약 박스]       │
│   (주요 지표/공식/결론)   │
│                         │
├─────────────────────────┤
│  ← 이전    다음 →        │  ← 하단 네비게이션
└─────────────────────────┘
└─────────────────────────┘
```

### 카드 타입별 구조 (세로형 9:16 비율에 최적화된 분량)

세로로 긴 카드 비율(세로형 팝업/모바일)을 사용하므로, 화면이 비어 보이지 않도록 각 항목의 텍스트 분량을 충분히 확보하고 줄바꿈(`\n`)을 적극적으로 활용해 수직 공간을 채우세요.

#### 표지 카드 (1장)
- 논문 제목: 시선을 끄는 큰 글씨 (줄바꿈 포함 2~3줄 이상 권장, 너무 길면 부제로 일부 이관)
- 부제: "First Author et al. | 발표 학회 및 저널 | 202X" (서지 정보 명시)
- 핵심 키워드: 이 연구를 관통하는 핵심 기술/분야 해시태그 3~5개 (넉넉하게 배치)
- 추가 정보: 하단에 작게 소요 시간이나 연구 분야 표시 (예: "⏱️ Read Time: 3 min | NLP")

#### 핵심 요약 & 본문 카드 (2~7장: TL;DR, 배경, 아이디어, 방법론, 실험, 결과)
- 섹션 라벨 뱃지: 예) "🔥 TL;DR", "🧪 PROPOSED METHOD", "📈 RESULT"
- 섹션 제목: 시선을 끄는 헤드라인 (2~3줄로 구성되도록 \n 사용)
- 상세 본문 (body): 최대 60자 제한 해제. 최소 100자~150자 내외로 기존 연구와의 차이점, 핵심 알고리즘 설계, 실험 세팅 등을 3~4줄 분량으로 충실히 작성. (수식이 필요한 경우 LaTeX 적극 활용)
- 임팩트 박스 (impact): 이 섹션에서 가장 중요한 핵심 공식(Equation), SOTA 달성 지표, 혹은 주요 기여도를 1~2문장으로 강조하여 작성 (공간을 채워주는 핵심 시각적 포인트).

#### 한계점 & 인사이트 카드 (8~9장)
- 라벨: "⚠️ Limitations (한계점)", "💡 리뷰어 인사이트"
- 타이틀: 해당 파트를 관통하는 핵심 평가나 주제 (2줄)
- 내용 리스트 (points): 단답형 키워드가 아닌, 상세한 설명과 근거가 포함된 완전한 문장(Full sentence)으로 3~4개 작성하여 세로 공간을 밀도 있게 채울 것. (예: 단순히 "메모리 부족"이 아니라, "Self-attention의 $O(N^2)$ 시간 복잡도로 인해 긴 문장 처리 시 메모리 병목이 발생함"처럼 구체적으로 작성)

#### 마무리 카드 (10장)
- 헤드라인: 리뷰를 갈무리하는 임팩트 있는 문장 (2~3줄)
- 본문 (body): 리뷰를 끝맺는 총평과 함께, 실제 논문을 읽어볼 것을 권장하거나 같이 읽어보면 좋은 후속 연구(Related Work)를 소개하는 내용을 3~4문장의 긴 단락으로 작성.

---

## React 컴포넌트 구현 가이드

### 필수 기능

```tsx
// 타입 정의
type CardTheme = { bg: string; accent: string; text: string };

type CardData =
  | { id: number; type: 'cover'; emoji: string; label: null; title: string; subtitle: string; keywords: string[]; theme: CardTheme }
  | { id: number; type: 'highlight' | 'news' | 'insight' | 'resource' | 'closing'; emoji: string; label: string; title: string; body: string; impact?: string; theme: CardTheme };

// 1. 카드 슬라이드 네비게이션
const [currentCard, setCurrentCard] = useState<number>(0);
const goNext = () => setCurrentCard(prev => Math.min(prev + 1, cards.length - 1));
const goPrev = () => setCurrentCard(prev => Math.max(prev - 1, 0));

// 2. 키보드 네비게이션
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };
  window.addEventListener('keydown', handleKey);
  return () => window.removeEventListener('keydown', handleKey);
}, []);

// 3. 진행 바 (상단)
<div style={{width: `${((currentCard + 1) / cards.length) * 100}%`}} />

// 4. 터치/스와이프 지원 (선택)
touchstart / touchend 이벤트로 스와이프 감지
```

### 카드 데이터 구조

```typescript
const cards: CardData[] = [
  {
    id: 1,
    type: 'cover',
    emoji: '📄',
    label: null,
    title: 'Attention Is All You Need',
    subtitle: 'Vaswani et al. | NeurIPS 2017',
    keywords: ['Transformer', 'Self-Attention', 'NLP'],
    theme: CARD_THEMES[0],
  },
  {
    id: 5,
    type: 'method',
    emoji: '🧪',
    label: 'PROPOSED METHOD',
    title: 'Self-Attention 메커니즘',
    body: '기존 RNN의 순차적 연산 한계를 극복하기 위해 제안된 구조입니다.\n입력 시퀀스의 각 단어가 서로 얼마나 연관되어 있는지를 병렬로 계산합니다.\n핵심 연산인 Scaled Dot-Product Attention은 다음과 같이 정의됩니다.',
    impact: '$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$',
    theme: CARD_THEMES[4],
  },
  // ... 나머지 카드
];
```

### 스타일링 원칙

- **Tailwind 유틸리티 클래스만** 사용 (외부 CSS 및 인라인 style 크기 지정 금지)
- **반응형 카드 크기 설계**: 카드는 단독 페이지뿐만 아니라 모달/팝업 내부에서도 재사용될 수 있어야 합니다. 따라서 인라인으로 픽셀(px)을 강제 고정하지 말고, Tailwind의 반응형 접두사(`md:`, `lg:`)를 활용해 상황에 맞게 늘어날 수 있도록 작성하세요.
  - 모바일 기본: `w-full max-w-sm aspect-[4/5]` 등으로 적절한 최대 너비와 비율 유지
  - 데스크탑 확장: `lg:max-w-none lg:h-full` 등으로 부모 컨테이너 크기에 맞춰 꽉 차게 확장
- **외부 래퍼**: 부모 요소가 넘겨준 크기에 꽉 찰 수 있도록 `w-full h-full flex flex-col justify-center` 등을 사용합니다. 단독 페이지일 경우 `min-h-screen`을 적용합니다.
- 폰트: `font-black` (제목), `font-medium` (본문)
- 애니메이션: `transition-all duration-300` (카드 전환)
- 그라디언트 배경: `bg-gradient-to-br`

#### 반응형 크기 구현 예시

```tsx
// ✅ 올바른 방법 — Tailwind 반응형 클래스 활용 (재사용성 높음)
<div className={`relative w-full max-w-sm lg:max-w-none aspect-[4/5] lg:aspect-auto lg:h-full bg-gradient-to-br ${card.theme.bg} rounded-3xl overflow-hidden`}>
  {/* 카드 내용 */}
</div>

// ❌ 잘못된 방법 — 인라인 style로 크기를 강제 고정하여 데스크탑 팝업 등에서 확장이 불가능함
<div style={{ width: '360px', height: '640px', flexShrink: 0 }}
     className={`relative bg-gradient-to-br ...`}>
---

## 출력 형식

- **파일**: `/home/cakepower/tutorial/a14u/src/components/PaperReviewCards.tsx`
- **형식**: 단일 React 파일 (CSS 인라인, 외부 의존성 없음)
- **default export**: `export default PaperReviewCards`
- **props 없음**: 모든 데이터가 컴포넌트 내부에 하드코딩

---

## 작성 원칙

### ✅ 반드시 지킬 것
- 입력 소스 준수: 임의로 내용을 지어내지 말고, 반드시 지정된 경로의 파일(/home/cakepower/tutorial/a14u/src/papers/review0305.md) 내용만을 기반으로 구성할 것.
- 전문성 유지: 학술 용어는 원어(영어)를 괄호 안에 병기하여 정확도를 높일 것 (예: 소실 문제(Vanishing Gradient)).
- 수학/과학 수식 최적화: 복잡한 수식이나 알고리즘 설명 시 반드시 LaTeX($, $$)를 사용할 것.
- 풍부한 텍스트: 논문의 맥락을 이해할 수 있도록 카드당 80자 이상의 상세한 설명 포함 (너무 짧은 텍스트 지양).
- 임팩트 박스 활용: 실험 결과 수치나 핵심 인사이트를 박스 형태로 명확히 분리해 시각적으로 강조.

### ❌ 피할 것
- 일반 뉴스레터처럼 가볍고 감정적인 어투 사용.
- Tailwind w-, h-, aspect- 등의 반응형 유틸리티 클래스로 카드 전체 크기를 지정하는 것. (모달 등에서 깨질 수 있으므로, 카드 최상단 컨테이너 크기는 반드시 <div style={{ width: '360px', height: '640px', flexShrink: 0 }}> 와 같이 인라인 스타일로 고정할 것).
- 10장 미만 또는 초과 생성.
