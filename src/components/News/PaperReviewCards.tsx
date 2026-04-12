import { useState, useEffect, useRef } from 'react';

type CardTheme = { bg: string; accent: string };
type PaperRef = { label: string; url: string };

type CardData = {
  id: number;
  type: 'cover' | 'content' | 'closing';
  emoji: string;
  label: string | null;
  title: string;
  subtitle?: string;
  keywords?: string[];
  extra?: string;
  body?: string;
  impact?: string;
  refs?: PaperRef[];
  papers?: PaperRef[];
  theme: CardTheme;
};

const THEMES: CardTheme[] = [
  { bg: 'from-slate-800 to-gray-900',    accent: '#38BDF8' },
  { bg: 'from-blue-600 to-indigo-800',   accent: '#FCD34D' },
  { bg: 'from-gray-600 to-slate-700',    accent: '#FCA5A5' },
  { bg: 'from-emerald-600 to-teal-800',  accent: '#FEF08A' },
  { bg: 'from-violet-600 to-purple-800', accent: '#C4B5FD' },
  { bg: 'from-slate-700 to-slate-900',   accent: '#6EE7B7' },
];

const CARDS: CardData[] = [
  {
    id: 1,
    type: 'cover',
    emoji: '🎨',
    label: null,
    title: 'Aesthetic\nIntelligence ×\nAI 협업',
    subtitle: '6편 논문 분석 | 전문가 멘탈 모델 5가지 | 2026.03.16',
    keywords: ['Aesthetic Agency', 'Co-creativity', 'Automation', 'Resonance', 'Critical Engagement'],
    extra: '⏱️ Read Time: 5 min  |  HCI · Design · Creativity Research',
    theme: THEMES[0],
  },
  {
    id: 2,
    type: 'content',
    emoji: '🎯',
    label: 'Mental Model 1',
    title: '미적 주체성은\n이진법이 아니다',
    body: '창작에서 "인간이 하느냐, AI가 하느냐"는 이진 선택이 아닌 연속 스펙트럼이다. 미적 주체성(aesthetic agency)은 과제·맥락·단계에 따라 실시간으로 인간과 AI 사이를 이동하며, 이를 설계(modulate)하는 것이 협업 디자인의 핵심 역량이다.\n\nHaase & Pokutta는 Digital Pen → AI Task Specialist → AI Assistant → AI Co-Creator의 4단계 협업 스펙트럼을 정의했다. 창작 프로젝트 기획 시 "AI를 쓸 것인가"가 아니라 "이 단계에서 미적 주체성을 얼마나 AI에 위임할 것인가"를 설계 변수로 다뤄야 한다.',
    impact: '🎯 단계별 주체성 지도(agency map)를 그리는 것이 협업 설계의 출발점이다',
    refs: [
      { label: 'Moruzzi & Margarido (2024)', url: 'https://www.semanticscholar.org/paper/d211c65840fb3b964c1dc7d1ce06c4aad530f0d7' },
      { label: 'Haase & Pokutta (2024)', url: 'https://www.semanticscholar.org/paper/1ea7f8af484c9a823648b988e1214d99daa0e288' },
    ],
    theme: THEMES[1],
  },
  {
    id: 3,
    type: 'content',
    emoji: '🔄',
    label: 'Mental Model 2',
    title: 'AI의 미적 생산은\n재조합이지\n창조가 아니다',
    body: '생성형 AI는 근본적으로 재조합 엔진이다. 기존 패턴을 정교하게 재배열할 수 있지만, 패러다임을 깨는 미적 혁신은 아직 인간의 고유 영역이다. AI가 만드는 "미적 새로움"은 조합적 신선함(combinatorial novelty)이지 개념적 돌파(conceptual breakthrough)가 아니다.\n\nAI에게 "새로운 미적 방향을 제시해달라"고 묻는 것은 비효율적이다. "이 방향을 다양하게 변주해달라"는 방식으로 역할을 재정의하면 가장 강력한 결과가 나온다.',
    impact: '💬 "Generative AI is replicative. It can recombine and re-sort ideas, but it is not clear that it will generate the kinds of paradigm-breaking ideas the world needs." — Sternberg (2024)',
    refs: [
      { label: 'Sternberg (2024)', url: 'https://www.semanticscholar.org/paper/e1456b0dae79cc595fd10c07bc64b2950719c510' },
      { label: 'Zhao & Sun (2024)', url: 'https://www.semanticscholar.org/paper/459f609239ad3ca9e5b45c49c4ec9e09888eae74' },
    ],
    theme: THEMES[2],
  },
  {
    id: 4,
    type: 'content',
    emoji: '💫',
    label: 'Mental Model 3',
    title: '감성 공명은\n진정성 없이도\n작동한다',
    body: 'AI는 진짜 감정 없이도 보편적 감성 기호(universal emotional symbols)를 정확히 배치함으로써 관객에게 실제 미적 공명을 이끌어낼 수 있다. "창작자의 진정성"과 "관객의 미적 경험"은 분리 가능한 변수다.\n\n이는 "예술은 진정성에서 나온다"는 전통적 관점을 실증적으로 흔든다. AI 생성 콘텐츠의 미적 효과를 진정성의 결여로 기각하기보다, 어떤 감성 기호가 공명을 유도하는지 데이터 기반으로 검증하는 접근이 브랜드·마케팅·UX 디자인에서 강력하게 작동한다.',
    impact: '🎯 미적 효과의 원천은 창작자의 내면이 아닐 수 있다 — Zhao & Sun (2024)',
    refs: [
      { label: 'Zhao & Sun (2024)', url: 'https://www.semanticscholar.org/paper/459f609239ad3ca9e5b45c49c4ec9e09888eae74' },
    ],
    theme: THEMES[3],
  },
  {
    id: 5,
    type: 'content',
    emoji: '⚖️',
    label: 'Mental Model 4',
    title: '자동화에는\n황금 비율이 있다',
    body: 'AI 자동화는 "많을수록 좋다"가 아니다. 자동화가 낮으면 효율 이득이 없고, 극단적으로 높으면 인간의 창의성 자극과 비판적 사고가 억제된다. Qiao et al.의 79명 대상 실험이 이를 증명했다.\n\n미적 품질과 창작 경험이 동시에 최대화되는 "Automation Sweet Spot"이 존재한다. 디자인 툴 도입 시 "가장 자동화된 옵션"이 아닌 "창작자의 참여도를 최적화하는 자동화 수준"을 기준으로 선택해야 하며, 사용자가 자동화 수준을 직접 조절할 수 있는 인터페이스 설계가 미적 결과 품질을 높인다.',
    impact: '📊 "Moderate levels of automation are most effective... extreme levels may be counterproductive." — Qiao et al. (2025)',
    refs: [
      { label: 'Qiao et al. (2025)', url: 'https://www.semanticscholar.org/paper/2de5462e938185f23bea6812661603dd4918a37c' },
    ],
    theme: THEMES[4],
  },
  {
    id: 6,
    type: 'closing',
    emoji: '🔑',
    label: 'Mental Model 5',
    title: '비판적 참여만이\nAI를 증강으로\n전환한다',
    body: 'AI가 인간의 미적 역량을 증강하느냐 잠식하느냐는 AI 자체의 능력보다 사용자의 참여 방식에 달렸다. 수동적 소비(passive use)는 창의적 퇴화로, 능동적 비판 평가(active critical evaluation)는 미적 역량 향상으로 이어진다.\n\nAI 협업 워크플로우 설계 시 "AI 출력을 그대로 수용하는 단계"를 제거하고, 매 단계마다 인간이 비판적으로 선택하고 재지시하는 체크포인트를 의무화해야 한다. 이 구조가 없으면 협업은 곧 위임이 된다.',
    papers: [
      { label: 'Rana et al. (2025)', url: 'https://www.semanticscholar.org/paper/cf60203109e8132b0a47700f2ca8046e0a17879e' },
      { label: 'Sternberg (2024)', url: 'https://www.semanticscholar.org/paper/e1456b0dae79cc595fd10c07bc64b2950719c510' },
      { label: 'Qiao et al. (2025)', url: 'https://www.semanticscholar.org/paper/2de5462e938185f23bea6812661603dd4918a37c' },
      { label: 'Zhao & Sun (2024)', url: 'https://www.semanticscholar.org/paper/459f609239ad3ca9e5b45c49c4ec9e09888eae74' },
      { label: 'Haase & Pokutta (2024)', url: 'https://www.semanticscholar.org/paper/1ea7f8af484c9a823648b988e1214d99daa0e288' },
      { label: 'Moruzzi & Margarido (2024)', url: 'https://www.semanticscholar.org/paper/d211c65840fb3b964c1dc7d1ce06c4aad530f0d7' },
    ],
    theme: THEMES[5],
  },
];

/* ── Sub-components ─────────────────────────────────────── */

function CoverContent({ card, accent }: { card: CardData; accent: string }) {
  return (
    <div className="flex flex-col h-full px-6 py-5">
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="text-5xl">{card.emoji}</div>
        <h1
          className="font-black text-white leading-tight whitespace-pre-line"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
        >
          {card.title}
        </h1>
        <p className="text-white/60 text-sm">{card.subtitle}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {card.keywords?.map(k => (
            <span
              key={k}
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>
      {card.extra && (
        <p className="text-white/30 text-xs mt-4">{card.extra}</p>
      )}
    </div>
  );
}

function ContentBody({ card, accent }: { card: CardData; accent: string }) {
  return (
    <div className="flex flex-col h-full px-6 py-4 overflow-hidden">
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div>
          <div className="text-3xl mb-3">{card.emoji}</div>
          <h2
            className="font-black text-white leading-tight whitespace-pre-line mb-4"
            style={{ fontSize: 'clamp(20px, 2.8vw, 32px)', lineHeight: 1.15 }}
          >
            {card.title}
          </h2>
          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
            {card.body}
          </p>
        </div>

        <div className="mt-3 space-y-2">
          {card.impact && (
            <div
              className="rounded-2xl px-4 py-3"
              style={{ background: `${accent}18`, border: `1px solid ${accent}44` }}
            >
              <p className="text-xs font-semibold leading-relaxed" style={{ color: accent }}>
                {card.impact}
              </p>
            </div>
          )}

          {card.refs && card.refs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {card.refs.map((ref, i) => (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1 rounded-full transition-opacity hover:opacity-80"
                  style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
                >
                  📄 {ref.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ClosingBody({ card, accent }: { card: CardData; accent: string }) {
  return (
    <div className="flex flex-col h-full px-6 py-4 overflow-hidden">
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div>
          <div className="text-3xl mb-3">{card.emoji}</div>
          <h2
            className="font-black text-white leading-tight whitespace-pre-line mb-4"
            style={{ fontSize: 'clamp(20px, 2.8vw, 32px)', lineHeight: 1.15 }}
          >
            {card.title}
          </h2>
          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
            {card.body}
          </p>
        </div>

        {card.papers && card.papers.length > 0 && (
          <div className="mt-3">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">
              참고 논문
            </p>
            <div className="flex flex-wrap gap-2">
              {card.papers.map((ref, i) => (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1 rounded-full transition-opacity hover:opacity-80"
                  style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}55` }}
                >
                  📄 {ref.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────── */

export default function PaperReviewCards() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const touchX = useRef<number | null>(null);

  const goNext = () => setCurrent(prev => Math.min(prev + 1, CARDS.length - 1));
  const goPrev = () => setCurrent(prev => Math.max(prev - 1, 0));

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

  const card = CARDS[current];
  const { bg, accent } = card.theme;
  const progress = ((current + 1) / CARDS.length) * 100;

  const cardStyle = isMobile
    ? { width: '360px', height: '640px', flexShrink: 0 }
    : { width: 'min(1100px, 92vw)', height: '640px', flexShrink: 0 };

  return (
    <div style={{ width: 'min(1100px, 92vw)', margin: isMobile ? '24px auto 40px' : '34px auto 56px' }}>
      {/* Card */}
      <div
        className={`relative bg-gradient-to-br ${bg} rounded-3xl overflow-hidden shadow-2xl flex flex-col`}
        style={cardStyle}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const d = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(d) > 50) d > 0 ? goNext() : goPrev();
          touchX.current = null;
        }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-10">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: accent }}
          />
        </div>

        {/* Top nav */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2 flex-shrink-0">
          <span className="text-white/50 text-xs tracking-widest font-semibold uppercase">
            {card.label ?? 'Paper Review'}
          </span>
          <span className="text-white/50 text-xs tabular-nums">
            {current + 1} / {CARDS.length}
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {card.type === 'cover'   && <CoverContent card={card} accent={accent} />}
          {card.type === 'content' && <ContentBody  card={card} accent={accent} />}
          {card.type === 'closing' && <ClosingBody  card={card} accent={accent} />}
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between px-5 py-3 bg-black/20 flex-shrink-0">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="text-white/60 hover:text-white disabled:opacity-20 text-xs font-medium transition-colors px-1 py-1 select-none"
          >
            ← 이전
          </button>

          <div className="flex gap-1 items-center">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300 flex-shrink-0"
                style={{
                  width: i === current ? '16px' : '6px',
                  height: '6px',
                  backgroundColor: i === current ? accent : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={current === CARDS.length - 1}
            className="text-white/60 hover:text-white disabled:opacity-20 text-xs font-medium transition-colors px-1 py-1 select-none"
          >
            다음 →
          </button>
        </div>
      </div>

      {/* Keyboard hint */}
      <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 10, textAlign: 'center', letterSpacing: '0.05em' }}>
        ← → 키보드 탐색 가능
      </p>
    </div>
  );
}
