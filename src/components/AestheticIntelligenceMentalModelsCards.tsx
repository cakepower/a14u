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
    emoji: '🎨',
    label: null,
    title: 'Aesthetic\nIntelligence ×\nAI 협업',
    subtitle: '6편 논문 분석 | 전문가 멘탈 모델 5가지 | 2026.03.16',
    keywords: ['Aesthetic Agency', 'Co-creativity', 'Automation', 'Resonance', 'Critical Engagement'],
    extra: '⏱️ Read Time: 5 min  |  HCI · Design · Creativity Research',
    theme: THEMES[0],
  },
  // ── Card 2: TL;DR ──────────────────────────────────────────────
  {
    id: 2,
    type: 'highlight',
    emoji: '🔥',
    label: 'TL;DR',
    title: 'AI는 감정 없이도\n당신의 마음을\n움직일 수 있다.',
    body: 'Zhao & Sun (2024)이 던진 가장 도발적 결론: AI는 진짜 감정이 없어도 보편적 감성 기호(universal emotional symbols)를 정확히 배치해 관객에게 실제 미적 공명(aesthetic resonance)을 이끌어낼 수 있다.\n이는 "예술은 창작자의 진정성에서 나온다"는 전통적 믿음을 정면으로 흔든다. 창작자의 진정성과 관객의 미적 경험은 분리 가능한 변수다.\n그렇다면 우리가 "좋은 미학"이라고 느끼는 것은 진정성의 산물인가, 아니면 패턴 인식의 결과인가?',
    impact: '🎯 핵심: 미적 효과의 원천은 창작자의 내면이 아닐 수 있다 — Zhao & Sun (2024)',
    theme: THEMES[1],
  },
  // ── Card 3: 멘탈 모델 1 ────────────────────────────────────────
  {
    id: 3,
    type: 'highlight',
    emoji: '🎚️',
    label: 'MENTAL MODEL 1',
    title: 'Aesthetic Agency\nas a Spectrum\n— 미적 주체성의 스펙트럼',
    body: '전문가들은 창작에서 "인간이 하느냐, AI가 하느냐"를 이진 선택이 아닌 연속 스펙트럼으로 본다. 미적 주체성은 과제·단계·맥락에 따라 실시간으로 이동하며, 이를 설계(modulate)하는 것이 협업의 핵심 역량이다.\nMoruzzi & Margarido (2024)는 이를 조율하는 다차원 프레임워크를 제안했고, Haase & Pokutta (2024)는 Digital Pen → AI Task Specialist → AI Assistant → AI Co-Creator의 4단계 협업 레벨로 구체화했다.',
    impact: '💡 실무 적용: "AI를 쓸 것인가"가 아니라 "이 단계에서 주체성을 얼마나 위임할 것인가"를 설계 변수로 다뤄라.',
    theme: THEMES[2],
  },
  // ── Card 4: 멘탈 모델 2 ────────────────────────────────────────
  {
    id: 4,
    type: 'insight',
    emoji: '🔁',
    label: 'MENTAL MODEL 2',
    title: 'Replication ≠\nCreation\n— 재조합은 창조가 아니다',
    body: '생성형 AI는 근본적으로 재조합 엔진이다. 기존 패턴을 정교하게 재배열할 수는 있지만, 패러다임을 깨는 미적 혁신은 아직 인간의 고유 영역이다. AI의 "새로움"은 조합적 신선함(combinatorial novelty)이지 개념적 돌파(conceptual breakthrough)가 아니다.\n이는 Sternberg (2024)가 32회 인용된 논문에서 강조한 핵심이다: "Generative AI is replicative. It can recombine and re-sort ideas, but is unlikely to generate the paradigm-breaking ideas the world needs."',
    impact: '💡 실무 적용: AI에게 "새로운 방향"을 묻지 말고, "이 방향의 다양한 변주"를 요청하라. 방향 설정은 인간이, 변주는 AI가.',
    theme: THEMES[3],
  },
  // ── Card 5: 멘탈 모델 3 ────────────────────────────────────────
  {
    id: 5,
    type: 'highlight',
    emoji: '💫',
    label: 'MENTAL MODEL 3',
    title: 'Aesthetic Resonance\nWithout Emotion\n— 감성 공명의 역설',
    body: 'AI는 진짜 감정 없이도 보편적 감성 기호를 배치해 실제 미적 공명을 유도할 수 있다. "창작자의 진정성"과 "관객의 미적 경험"은 분리 가능한 변수다.\nZhao & Sun (2024): AI는 인간 미적 경험을 학습해 보편 감성 기호를 작품에 활용하고, 관객에게 미적 공명을 이끌어낸다. 그러나 AI의 감성 표현은 여전히 "시뮬레이션"에 머물며, 인간 감성 경험과의 간극은 존재한다.',
    impact: '💡 실무 적용: AI 생성 콘텐츠를 "진정성 없음"으로 기각하기보다, 어떤 감성 기호가 공명을 유도하는지 데이터로 검증하라.',
    theme: THEMES[4],
  },
  // ── Card 6: 멘탈 모델 4 ────────────────────────────────────────
  {
    id: 6,
    type: 'insight',
    emoji: '⚖️',
    label: 'MENTAL MODEL 4',
    title: 'The Automation\nSweet Spot\n— 자동화의 황금 비율',
    body: 'AI 자동화는 "많을수록 좋다"가 아니다. Qiao et al. (2025)의 79명 대상 실험: 자동화가 낮으면 효율 이득이 없고, 극단적으로 높으면 인간 창의성 자극이 억제된다. 미적 품질과 창작 경험이 동시에 최대화되는 "중간 자동화 지점"이 존재한다.\n"Moderate automation most effective in lowering task load... extreme automation may be counterproductive. Highly automated GAI rapidly enhances visual aesthetics but limits creativity stimulation."',
    impact: '💡 실무 적용: "가장 자동화된 옵션"이 아닌 "창작자 참여도를 최적화하는 자동화 수준"을 기준으로 툴을 선택하라.',
    theme: THEMES[5],
  },
  // ── Card 7: 멘탈 모델 5 ────────────────────────────────────────
  {
    id: 7,
    type: 'highlight',
    emoji: '🧠',
    label: 'MENTAL MODEL 5',
    title: 'Critical Engagement\nas the Activator\n— 비판적 참여가 증강의 열쇠',
    body: 'AI가 인간의 미적 역량을 증강하느냐 잠식하느냐는 AI 자체의 능력보다 사용자의 참여 방식에 달렸다. 수동적 소비(passive use)는 창의적 퇴화로, 능동적 비판 평가(active critical evaluation)는 미적 역량 향상으로 이어진다.\nRana et al. (2025): 112명 학생 연구에서 GenAI로 수업한 학생들이 "passive user → critical evaluator"로 진화. AI 리터러시는 창의성·윤리·비판적 추론을 아우르는 다차원 역량이다.',
    impact: '💡 실무 적용: 협업 워크플로우에서 "AI 출력 수용 단계"를 제거하고, 매 단계마다 인간의 비판적 선택 체크포인트를 의무화하라.',
    theme: THEMES[6],
  },
  // ── Card 8: 교차 주제 ───────────────────────────────────────────
  {
    id: 8,
    type: 'idea',
    emoji: '🔗',
    label: 'CROSS-CUTTING THEME',
    title: '효율과 깊이의\n트레이드오프:\n협업 설계의 핵심 긴장',
    body: '5가지 멘탈 모델을 관통하는 핵심 긴장: AI는 미적 효율(속도·변주·시각 완성도)을 높이지만, 그 과정에서 인간의 미적 깊이(개념적 돌파·감성 진정성·비판적 사고)가 위협받는다.\n이 긴장은 해소되는 것이 아니라 설계를 통해 관리된다. 스펙트럼 설계(Model 1), 역할 분담(Model 2), 자동화 수준 조절(Model 4), 비판적 참여 구조화(Model 5)가 모두 이 긴장을 다루는 전략이다.',
    impact: '⚡ "AI와의 협업을 어떻게 설계하느냐"가 미적 결과를 결정한다. 기술이 아닌 설계가 핵심이다.',
    theme: THEMES[7],
  },
  // ── Card 9: 실무 종합 ───────────────────────────────────────────
  {
    id: 9,
    type: 'result',
    emoji: '🛠️',
    label: 'PRACTICAL TAKEAWAYS',
    title: '지금 당장\n바꿀 수 있는\n협업 습관 4가지',
    body: '① 협업 시작 전 "주체성 지도" 그리기 — 각 단계에서 미적 결정권을 인간과 AI 중 누가 갖는지 명시적으로 설계.\n② AI에게 방향이 아닌 변주를 요청 — "새로운 아이디어"가 아닌 "이 컨셉의 5가지 변형"으로 질문 재정의.\n③ 자동화 수준을 조절할 수 있는 툴 선택 — 완전 자동화 옵션은 창의성 억제 위험이 있음을 인지.\n④ AI 출력 후 반드시 비판적 평가 스텝 — 출력을 그대로 쓰는 것은 협업이 아니라 위임이다.',
    impact: '📌 핵심: 설계하지 않은 협업은 결국 AI에게 주체성을 빼앗긴다.',
    theme: THEMES[8],
  },
  // ── Card 10: Closing ────────────────────────────────────────────
  {
    id: 10,
    type: 'closing',
    emoji: '📚',
    label: 'FURTHER READING',
    title: '미해결 질문:\n미적 진정성은\n여전히 중요한가?',
    body: 'AI가 감성 공명을 유도할 수 있다면, 미적 진정성(authenticity)의 가치는 어디서 오는가? 이 분야의 열린 질문들:\n\n• Moruzzi & Margarido (2024) — Human-AI Co-creativity Framework (ACM CHI)\n• Haase & Pokutta (2024) — Synergies Across Levels of Creative Collaboration\n• Sternberg (2024) — Generative AI and Human Creativity (Journal of Intelligence)\n• Qiao et al. (2025) — Automation Level in Generative Design Tools\n• Zhao & Sun (2024) — Emotional Aspects of AI in Artistic Design',
    theme: THEMES[9],
  },
];

function Lines({ text }: { text: string }) {
  const parts = text.split('\n');
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

function CoverContent({ card, accent }: { card: CardData; accent: string }) {
  return (
    <div className="flex flex-col justify-between h-full py-2">
      <div className="flex flex-col items-center text-center gap-3 pt-4">
        <div className="text-6xl leading-none">{card.emoji}</div>
        <h1
          className="text-white font-black text-3xl leading-tight whitespace-pre-line"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          {card.title}
        </h1>
        <p className="text-white/70 text-sm font-medium whitespace-pre-line leading-relaxed">
          {card.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-3 pb-2">
        <div className="h-px bg-white/20 mx-4" />
        <div className="flex flex-wrap gap-2 justify-center px-2">
          {card.keywords?.map((kw) => (
            <span
              key={kw}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10"
              style={{ color: accent }}
            >
              #{kw}
            </span>
          ))}
        </div>
        {card.extra && (
          <p className="text-white/40 text-xs text-center tracking-wide">{card.extra}</p>
        )}
      </div>
    </div>
  );
}

function RegularContent({ card, accent }: { card: CardData; accent: string }) {
  return (
    <div className="flex flex-col h-full gap-2.5">
      {/* Emoji + Label */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-3xl leading-none">{card.emoji}</span>
        {card.label && (
          <span
            className="text-xs font-black tracking-widest px-2.5 py-0.5 rounded-full bg-white/10"
            style={{ color: accent }}
          >
            {card.label}
          </span>
        )}
      </div>

      {/* Title */}
      <h2
        className="text-white font-black text-xl leading-tight whitespace-pre-line flex-shrink-0"
        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
      >
        {card.title}
      </h2>

      {/* Body */}
      {card.body && (
        <div
          className="flex-1 overflow-y-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          <p className="text-white/82 text-xs leading-relaxed font-medium">
            <Lines text={card.body} />
          </p>
        </div>
      )}

      {/* Impact box */}
      {card.impact && (
        <div
          className="rounded-xl p-3 bg-white/10 flex-shrink-0"
          style={{ borderLeft: `3px solid ${accent}` }}
        >
          <p className="text-xs font-semibold leading-relaxed" style={{ color: accent }}>
            {card.impact}
          </p>
        </div>
      )}
    </div>
  );
}

export default function AestheticIntelligenceMentalModelsCards() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const touchX = useRef<number | null>(null);

  const goNext = () => setCurrent((p) => Math.min(p + 1, CARDS.length - 1));
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0));

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
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.45 }}
        style={{
          fontSize: isMobile ? 24 : 36,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: 0,
          marginBottom: 16,
          fontFamily: 'var(--font-display)',
        }}
      >
        Aesthetic Intelligence × AI 협업 멘탈 모델
      </motion.h2>

      {/* Card */}
      <div
        style={cardStyle}
        className={`relative bg-gradient-to-br ${bg} rounded-3xl overflow-hidden shadow-2xl flex flex-col`}
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
            Mental Models
          </span>
          <span className="text-white/50 text-xs tabular-nums">
            {current + 1} / {CARDS.length}
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden px-5 pb-2">
          {card.type === 'cover' ? (
            <CoverContent card={card} accent={accent} />
          ) : (
            <RegularContent card={card} accent={accent} />
          )}
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

          {/* Dot indicators */}
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
