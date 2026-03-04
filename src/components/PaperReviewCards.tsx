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
  {
    id: 1,
    type: 'cover',
    emoji: '🤝',
    label: null,
    title: 'AI와의 협업\nHuman-AI\nCollaboration',
    subtitle: '2020–2026 핵심 문헌 종합 리뷰\nLiterature Review  |  2026.03.05',
    keywords: ['Human-AI Teaming', 'Automation Bias', 'Productivity', 'Trust', 'Symbiosis'],
    extra: '⏱️ Read Time: 5 min  |  HCI · Management Science · Psychology',
    theme: THEMES[0],
  },
  {
    id: 2,
    type: 'highlight',
    emoji: '🔥',
    label: 'TL;DR',
    title: '인간을 추가하면\n항상 더 나아질까?\n그렇지 않다.',
    body: 'Vaccaro et al. (2024, Nature Human Behaviour)는 106개 실험·370개 효과 크기를 종합한 메타분석에서 충격적 결론을 도출했다. 평균적으로 Human-AI 조합은 인간 단독 또는 AI 단독보다 성과가 낮으며, AI 역량이 인간을 초과하는 과제에서 인간을 루프에 추가하면 전체 성과가 오히려 저하된다.\n반면 콘텐츠 창작·글쓰기처럼 인간 창의성이 발휘되는 영역에서는 Human-AI 협업이 효과적이었다. 즉, "무조건 협업"이 아니라 과제 유형에 따른 설계가 결정적이다.',
    impact: '🎯 핵심: "Human-in-the-loop이 항상 품질을 높인다"는 통념은 106개 실험에 의해 실증적으로 반박됐다.',
    theme: THEMES[1],
  },
  {
    id: 3,
    type: 'background',
    emoji: '❓',
    label: 'RESEARCH BACKGROUND',
    title: 'Human-AI 협업이란\n무엇인가?\n정의조차 없다.',
    body: '"Human-AI 팀"에 대한 합의된 학술 정의는 아직 존재하지 않는다. Berretta et al. (2023, Frontiers in AI)은 Scopus·Web of Science의 146개 논문을 네트워크 분석해 ① 과제 수행, ② 신뢰·투명성, ③ 상황 인식, ④ 인지 프레임워크, ⑤ 윤리·공정성, ⑥ 설계 방법론의 6개 연구 클러스터를 식별했다.\nFrontiers in Computer Science (2024)의 체계적 검토에 따르면, 2013–2023년 배포된 대부분의 AI는 단순 자문(advisory) 수준에 머물며, 인간과 AI가 서로에게 적응하는 진정한 양방향 협업은 실제로 드물다.',
    impact: '📌 연구 공백: 인간공학·조직행동론·인지심리학·경영과학·CS가 각기 다른 정의로 연구 중 — 통합 프레임워크가 필요하다.',
    theme: THEMES[2],
  },
  {
    id: 4,
    type: 'idea',
    emoji: '🎯',
    label: 'CORE FRAMEWORK',
    title: '자동화·증강·공생:\n세 가지 Human-AI\n협업 체제의 분류',
    body: 'Peng et al. (2024, Management Science)은 Human-AI 관계를 세 체제로 구분한다. 자동화(Automation)는 AI가 루틴 과제에서 인간 노동을 대체하고, 증강(Augmentation)은 복잡한 과제에서 인간 역량을 강화하며, 공생(Symbiosis)은 인간-AI 역량의 반복적 공진화가 이루어지는 최고 수준의 협력이다.\nMIT Sloan의 EPOCH 프레임워크는 AI 대체가 어려운 인간 고유 역량을 정의한다: 공감(Empathy), 현장감·네트워크(Presence), 판단·윤리(Opinion), 창의성·상상력(Creativity), 비전·리더십(Hope).',
    impact: '💡 Jarrahi (2018, Business Horizons): AI는 계산·반복 과제에서, 인간은 직관·맥락·윤리 판단에서 비교 우위를 가진다 — 공생이 가능한 이유.',
    theme: THEMES[3],
  },
  {
    id: 5,
    type: 'method',
    emoji: '🧪',
    label: 'THEORY & METHOD',
    title: '분산 인지와\n공유 정신 모델:\nHuman-AI 팀의 인지 구조',
    body: 'Hutchins의 분산 인지(Distributed Cognition) 이론을 HAIC에 적용하면, 협업은 인간·AI·공유 표상 미디어에 걸쳐 분산된 인지로 모델링된다. 핵심 구성 개념은 상황 인식(Situation Awareness, SA)과 공유 정신 모델(Shared Mental Models, SMMs)이다.\nDemir et al. (2022, Ergonomics): 효과적인 Human-AI 팀은 과제 목표·팀 구조·AI 역량에 관한 정렬된 지식(SMM)을 필요로 한다. AI 투명성은 인간 SA를 지원하지만, 지나치게 복잡한 설명은 오히려 인지 부하(Cognitive Load)를 증가시켜 SA를 저하시킨다.',
    impact: '⚙️ 확장 가능한 감독(Scalable Oversight): AI가 특수 도메인에서 인간 이해를 초과하면 효과적인 감독 유지가 구조적으로 불가능해진다.',
    theme: THEMES[4],
  },
  {
    id: 6,
    type: 'experiment',
    emoji: '📊',
    label: 'KEY EXPERIMENTS',
    title: '현장 실험으로\n측정한 Human-AI\n협업의 실제 효과',
    body: '① Brynjolfsson, Li & Raymond (QJE 2024): 고객 서비스 상담원 5,179명 대상 AI 어시스턴트 현장 실험 — 6개월간 생산성 추적.\n② Dell\'Acqua et al. (2023): BCG 컨설턴트 대상 GPT-4 무작위 대조 실험(RCT). AI 역량 경계 내·외부 과제를 분리 측정해 "잠들기 효과"를 발견.\n③ Peng et al. (2023): GitHub Copilot 사용 개발자의 코딩 속도·품질 비교.\n④ Vaccaro et al. (Nature HB 2024): 2020–2023년 106개 실험, 370개 효과 크기를 종합한 최대 규모 메타분석.',
    impact: '🔬 평가 지표: 과제 완수 속도(throughput), 품질 블라인드 평가(blind rating), 생산성 분포, 창작 시장 가치.',
    theme: THEMES[5],
  },
  {
    id: 7,
    type: 'result',
    emoji: '📈',
    label: 'KEY RESULTS',
    title: 'AI 협업의\n생산성 효과:\n수치로 증명하다',
    body: '고객 서비스 (Brynjolfsson et al.): 평균 +14% 생산성. 하위 25% 작업자는 +34% → 기술 압축(Skill Compression) 효과. AI가 상위 수행자의 암묵 지식을 하위 작업자에게 이전하는 "멘토" 역할.\nBCG 컨설턴트 (Dell\'Acqua et al.): AI 역량 내 과제에서 +12.2% 과제 수, +25.1% 속도, +40% 품질. 단, AI 역량 밖 과제에서 AI 사용자가 비사용자보다 오히려 성과 저하("잠들기 효과").\n개발자 (Peng et al.): 코딩 완수 속도 +55.8%.\n창작 (Zhou & Lee, PNAS 2024): 생산성 +25%, 작품 시장 가치 +50%.',
    impact: '📌 역설: AI 협업 창작물의 시장 가치는 높지만, 청중은 감정·의도성(intentionality) 면에서 낮게 평가한다.',
    theme: THEMES[6],
  },
  {
    id: 8,
    type: 'limitation',
    emoji: '⚠️',
    label: 'LIMITATIONS',
    title: 'HAIC의 어두운 면:\n자동화 편향과\n역량 저하 위협',
    body: '자동화 편향(Automation Bias): 인간은 인지적 노력을 줄이기 위해 AI 추천을 휴리스틱으로 사용하며 AI가 틀려도 따르는 경향이 있다. 임상 연구에서 AI 도입으로 진단 정확도가 87.2% → 96.4%로 향상됐지만, 남은 오류의 절반이 자동화 편향에서 기인했다(AI & Society, 2025).\n역량 저하(Deskilling): Lebovitz et al. (2022, ISR)은 방사선 전문의들이 직업적 정체성(Professional Identity) 위협과 역량 저하 우려로 AI에 판단을 위임하는 것을 능동적으로 거부함을 발견했다.\n신뢰 조정(Trust Calibration) 공백: 기존 연구는 신뢰를 정적 구성 개념으로 측정하지만, 실제 상호작용에서 신뢰는 순간순간 동적으로 업데이트된다.',
    impact: '🚨 KPMG (2025, 47개국 48,000명): AI 신뢰 의향 46% — 그러나 정확성 검증 없이 AI에 의존하는 비율은 66%.',
    theme: THEMES[7],
  },
  {
    id: 9,
    type: 'insight',
    emoji: '💡',
    label: 'REVIEWER INSIGHTS',
    title: 'Human-AI 협업의\n미래: 우리는\n무엇을 준비해야 하나',
    body: '이 리뷰의 핵심 메시지는 "AI 도입 = 성과 향상"이라는 단순 낙관론에 대한 경고다. 성과는 과제 유형, 인간-AI 강점의 정렬, 신뢰 조정 수준에 따라 크게 달라진다.\n프레이밍(Framing)도 결정적이다. "보조(assistive)"로 제시된 AI는 참여도를 높이지만 "대체(replacement)"로 제시되면 지식 은닉(knowledge-hiding)·불안·저항으로 이어진다(Frontiers in Public Health, 2024). 근로자의 41%가 AI로 자신의 직무가 쓸모없어질 것을 우려한다(Partnership on AI, 2024).\n미래 핵심 역량: AI 메타인지 리터러시(Collaborative AI Metacognition) — 언제 AI를 따르고 언제 무시할지 정확히 판단하는 능력이다.',
    impact: '🔮 2025–2026 프론티어: 단일 AI 도구 → 멀티에이전트 AI 네트워크 감독으로의 전환이 새로운 HAIC 연구 과제로 부상 중.',
    theme: THEMES[8],
  },
  {
    id: 10,
    type: 'closing',
    emoji: '👋',
    label: 'CLOSING',
    title: '인간과 AI의 진정한\n협업은 아직\n시작도 되지 않았다.',
    body: '이 리뷰는 HAIC 분야가 정의 논쟁·방법론 미비·단기 실험 편중이라는 근본 과제를 안고 있음을 보여준다. 그러나 올바르게 설계된 협업이 코딩 속도 +55.8%, 컨설팅 품질 +40% 향상을 가져올 수 있음도 동시에 증명한다. 결국 설계(Design)가 열쇠다.\n\n📄 핵심 읽을거리:\n• Vaccaro et al. (2024) — Nature HB (메타분석, 필독)\n• Brynjolfsson et al. (2024) — Quarterly Journal of Economics\n• National Academies (2022) — HAIC State-of-the-Art\n• arXiv 2407.19098 — HAIC 평가 방법론 프레임워크',
    impact: '★ 총평: AI 역량보다 Human-AI 인터페이스 설계와 신뢰 조정(Trust Calibration)이 협업 성과의 핵심 결정 변수다.',
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

export default function PaperReviewCards() {
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
        AI-인간 협업 문헌 리뷰
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
            HAIC Review
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
