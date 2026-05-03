import React from 'react';

type LightboxState = { src: string; title: string; publication: string } | null;

const SPRING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const IconLayers = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 8.5 12 4l10 4.5L12 13 2 8.5Z" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m2 13.5 10 4.5 10-4.5" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m2 18 10 4.5 10-4.5" />
  </svg>
);

const IconScissors = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <circle cx="6" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M21 4 9 13.5M14 14.5l7 7M9 10.5 12 12" />
  </svg>
);

const IconStars = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9.5 2.5 11.1 7.4H16l-4 2.9 1.5 4.7-4-2.6-4 2.6 1.5-4.7-4-2.9h4.9L9.5 2.5Z" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M17.5 2.5v3M16 4h3" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M20.5 13v2.5M19.25 14.25h2.5" />
  </svg>
);

type CardItem = { title: string; summary: string; image: string; keywords: string[] };

const TrendCard = ({
  item,
  publication,
  onZoom,
  imageHeight = 'h-48',
}: {
  item: CardItem;
  publication: string;
  onZoom: () => void;
  imageHeight?: string;
}) => (
  <div
    className="group cursor-zoom-in bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[18px] hover:scale-[1.02] active:scale-[0.98]"
    style={{ transition: `transform 0.45s ${SPRING}` }}
    onClick={onZoom}
  >
    <div className="bg-white rounded-[13px] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
      <div className={`overflow-hidden ${imageHeight}`}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105"
          style={{ transition: `transform 0.45s ${SPRING}` }}
        />
      </div>
      <div className="px-5 py-4">
        <h4 className="text-[0.9rem] font-semibold leading-snug text-[#111] mb-2">{item.title}</h4>
        <p className="text-xs text-[#555] leading-relaxed mb-3" style={{ wordBreak: 'keep-all' }}>{item.summary}</p>
        <div className="flex flex-wrap gap-1">
          {item.keywords.map((kw) => (
            <span key={kw} className="bg-[#111]/5 text-[#333] text-[10px] font-medium px-2 py-0.5 rounded-full">{kw}</span>
          ))}
        </div>
      </div>
      <div style={{ height: '2px', background: '#F5C800' }} />
    </div>
  </div>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const vogueItems: CardItem[] = [
  {
    title: 'Shanghai Fashion Week Brought Sophisticated Silhouettes and Girlish Fun',
    summary: '상하이 패션위크에서 선보인 정교한 실루엣과 소녀 감성의 유쾌한 충돌. 동아시아 디자이너들이 제안하는 여성스러움의 새로운 정의.',
    image: 'https://assets.vogue.com/photos/69cec3de5bb6827f1fe17b49/4:3/w_1600%2Cc_limit/trend%2520report%2520copy.jpg',
    keywords: ['상하이 패션위크', '소피스티케이티드', '걸리시'],
  },
  {
    title: "The Most Intriguing Menswear Trends From the Fall 2026 Women's Shows",
    summary: '여성복 컬렉션에서 포착된 남성복 코드들. 오버사이즈 테일러링과 젠더리스 실루엣이 Fall 2026 시즌을 정의한다.',
    image: 'https://assets.vogue.com/photos/69bbf86b5a80ab68fa84324a/4:3/w_1600%2Cc_limit/IMG_1068.jpeg',
    keywords: ['멘즈웨어', 'Fall 2026', '젠더리스'],
  },
  {
    title: 'From Kooky Pearls to Fuzzy Purses, These Are the Standout Fall 2026 Accessory Trends',
    summary: '기발한 진주 장식부터 텍스처 가득한 퍼지 백까지. Fall 2026 시즌 가장 눈길을 사로잡는 액세서리 트렌드 총정리.',
    image: 'https://assets.vogue.com/photos/69bbf3f1da1109fe43cf2e04/4:3/w_1600%2Cc_limit/Collage_alex.jpg',
    keywords: ['액세서리', '진주', '퍼지 백'],
  },
  {
    title: 'The 11 Fashion Trends That Define the Fall 2026 Season',
    summary: 'Fall 2026 시즌을 규정하는 11가지 핵심 패션 트렌드. 런웨이에서 스트리트로 이어지는 스타일 방향을 심층 분석.',
    image: 'https://assets.vogue.com/photos/69bab76174816d46060b337f/4:3/w_1600%2Cc_limit/FallTrendReport26_Laird.jpg',
    keywords: ['가을 트렌드', 'Fall 2026', '시즌 키워드'],
  },
  {
    title: 'Weatherproofed and Accessorized: All the Trends From the Fall 2026 Copenhagen Shows',
    summary: '코펜하겐 패션위크의 날씨 대비 패션. 실용성과 스타일을 동시에 잡은 스칸디나비아 감성의 레이어드 룩과 액세서리 팁.',
    image: 'https://assets.vogue.com/photos/69851d87e133930032e386db/4:3/w_1600%2Cc_limit/CPHFW%2520F26_Laird.jpg',
    keywords: ['코펜하겐', '날씨 대비', '레이어드'],
  },
  {
    title: "All the Fall 2026 Men's Trends: From Cortina-Ready Sweaters to Prep 3.0",
    summary: '코르티나 스키 리조트를 연상시키는 스웨터부터 현대적으로 재해석된 프레피 룩까지. 2026 가을 남성 패션의 전모.',
    image: 'https://assets.vogue.com/photos/698121879b7aa1bd6d7f9faf/4:3/w_1600%2Cc_limit/TRENDREPORT_MFW26.jpg',
    keywords: ['남성 패션', '프레피', '스웨터'],
  },
];

const elleItems: CardItem[] = [
  {
    title: 'Fresh, Chic Ways to Wear Polka Dots This Season',
    summary: '이번 시즌 폴카 도트를 세련되게 스타일링하는 방법들. 클래식한 패턴을 현대적 감각으로 재해석한 룩 가이드.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/b76413c5-888d-4f4d-ac46-ba3af79c4e9f.jpg?crop=0.5625xw:1xh;center,top&resize=360:*',
    keywords: ['폴카 도트', '패턴', '스타일링'],
  },
  {
    title: "Chanel's 'Barefoot Heel' Ushers in the Naked Shoe",
    summary: "샤넬이 제안하는 '맨발 힐'이 새로운 네이키드 슈즈 트렌드를 이끈다. 피부에 가장 가깝게 다가선 신발의 미학.",
    image: 'https://hips.hearstapps.com/hmg-prod/images/3433219f-9611-4d49-830d-052d1dc4758b.jpeg?crop=1xw:0.667xh;0xw,0.321xh&resize=360:*',
    keywords: ['샤넬', '네이키드 슈즈', '힐'],
  },
  {
    title: 'The Top 5 Trends From Watches and Wonders 2026',
    summary: '워치스 앤 원더스 2026에서 포착한 다섯 가지 핵심 시계 트렌드. 하이 패션과 시계 산업의 접점.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/3ffe1115-7ab6-44b0-9b6d-7bc0f2a9e511.jpeg?crop=1xw:0.8xh;0xw,0.123xh&resize=360:*',
    keywords: ['시계', '워치스 앤 원더스', '럭셔리'],
  },
  {
    title: 'Alaïa Gives Jeans a Couture-Level Upgrade',
    summary: '알라이아가 데님에 쿠튀르 수준의 업그레이드를 더했다. 일상복이 예술 작품이 되는 순간.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/b7af6027-89de-4797-8926-fc873e39802a.jpg?crop=0.661666666667xw:1xh;center,top&resize=360:*',
    keywords: ['알라이아', '데님', '쿠튀르'],
  },
  {
    title: '6 White Sneaker Trends That Are Anything but Basic',
    summary: '흰 스니커즈의 진화. 평범함을 거부하는 여섯 가지 혁신적 화이트 스니커 디자인 트렌드.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/02ca4a9e-924f-4514-82b3-e55323566f11.jpg?crop=0.544xw:1xh;0.05xw,0xh&resize=360:*',
    keywords: ['화이트 스니커', '스니커즈', '슈즈 트렌드'],
  },
  {
    title: "Sadie Sink's Prada Gown Is a '90s R+J Flashback",
    summary: '사디 싱크가 입은 프라다 가운이 90년대 로미오와 줄리엣을 떠올리게 한다. 레트로 감성의 현대적 재현.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/8cad58b1-4bb6-497b-9c48-46a4afaf664d.jpeg?crop=1xw:0.6864xh;center,top&resize=360:*',
    keywords: ['프라다', '90년대', '레트로'],
  },
  {
    title: 'How Fashion Fell Hard for Opera',
    summary: '오페라가 패션을 사로잡았다. 드라마틱한 실루엣, 풍성한 패브릭, 화려한 장식이 런웨이를 점령한 배경.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/ec7bc827-7a91-4d5f-81ca-9caeff8b3855.jpg?crop=0.5xw:1xh;center,top&resize=360:*',
    keywords: ['오페라', '드라마틱', '럭셔리 패션'],
  },
  {
    title: 'Fashion Is Suddenly Obsessed With the 18th Century',
    summary: '18세기에 빠진 패션계. 코르셋, 페티코트, 자수 장식이 현대 스트리트 패션과 만나는 역사적 순간.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/913e5b46-b902-4c06-a2d8-5f45716d203d.jpg?crop=1xw:0.666666666667xh;center,top&resize=360:*',
    keywords: ['18세기', '역사적 영감', '코르셋'],
  },
];

const cosmoItems: CardItem[] = [
  {
    title: 'I Keep Seeing This Dress Everywhere for Spring',
    summary: '올 봄 어디서나 눈에 띄는 그 드레스. 비대칭 라인과 선명한 색감이 만들어내는 이 시즌 필수 아이템.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/bd7879cf-d5f3-4427-8e3e-d3c867765a84.png?crop=0.769xw:0.550xh;0.162xw,0.00803xh&resize=360:*',
    keywords: ['봄 드레스', '비대칭', '머스트해브'],
  },
  {
    title: 'Kylie Jenner Wore This Throwback Denim Trend',
    summary: '카일리 제너가 부활시킨 빈티지 데님 트렌드. 자수와 비즈 장식으로 되살아난 Y2K 감성의 진.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2095fc46-cdd2-49f9-b369-22882f89c855.jpeg?crop=0.666333333333xw:1xh;center,top&resize=360:*',
    keywords: ['데님', '카일리 제너', 'Y2K'],
  },
  {
    title: 'This Anti-Jean Trend Is a Major Throwback',
    summary: '청바지의 대안, 블루머와 페티코트 팬츠가 돌아왔다. 빈티지 감성을 현대적으로 풀어낸 앤티-진 무브먼트.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/c5ccda04-ed5c-40c8-9625-13c789ded7e2.jpeg?crop=1xw:0.668xh;0xw,0.264xh&resize=360:*',
    keywords: ['앤티-진', '빈티지', '블루머'],
  },
  {
    title: 'How to Style That Tricky Balloon Pants Trend',
    summary: '풍성한 실루엣의 벌룬 팬츠를 세련되게 입는 법. 볼륨감 있는 하의를 균형 잡힌 룩으로 완성하는 스타일링 가이드.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/0b94494b-538d-45cb-985e-88bc2e45737b.jpeg?crop=0.668xw:1xh;0.194xw,0xh&resize=360:*',
    keywords: ['벌룬 팬츠', '볼륨', '스타일링'],
  },
  {
    title: 'The Tank Hailey Wore at Coachella Is My New Staple',
    summary: '헤일리 비버가 코첼라에서 선택한 탱크톱이 새로운 데일리 필수템으로 자리잡았다. 미니멀하지만 강렬한 기본기.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/e1f458bd-2ce5-423f-bf56-8ec51a5d0f74.png?crop=0.485xw:0.965xh;0xw,0xh&resize=360:*',
    keywords: ['탱크톱', '코첼라', '헤일리 비버'],
  },
  {
    title: "Bye Butter Yellow — Klein Blue Is Spring's It Color",
    summary: '버터 옐로우의 시대는 끝났다. 클라인 블루가 이번 봄을 지배하는 컬러로 부상. 선명하고 강렬한 블루의 귀환.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/4d4d799b-38cb-4f42-915e-8f75c7906a11.jpeg?crop=0.660235615503xw:1xh;center,top&resize=360:*',
    keywords: ['클라인 블루', '봄 컬러', '컬러 트렌드'],
  },
  {
    title: "Confirmed: Zebra Is Spring's Biggest Print Trend",
    summary: '제브라 프린트가 이번 봄 가장 강력한 패턴 트렌드로 확정됐다. 동물 프린트의 재림, 이번에는 더 과감하게.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/a0d22794-3190-45e4-93c4-22c8957fb786.jpg?crop=0.502xw:1xh;0.094xw,0xh&resize=360:*',
    keywords: ['제브라 프린트', '동물 패턴', '봄 트렌드'],
  },
  {
    title: "Everyone's Wearing These Instead of Black Trousers",
    summary: '블랙 트라우저의 자리를 빼앗은 카키 팬츠. 뉴트럴 팔레트의 새로운 강자로 떠오른 어스톤 하의.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/a4e3a7e3-135a-4e04-a259-d177c38e84ac.jpg?crop=0.502xw:1xh;0.039xw,0xh&resize=360:*',
    keywords: ['카키 팬츠', '뉴트럴', '어스톤'],
  },
  {
    title: 'Wide-Leg Jeans + These Jackets Just Make Sense',
    summary: '와이드 레그 진과 재킷의 완벽한 조합. 비율의 미학을 극대화하는 조합으로 에포트리스 시크를 완성.',
    image: 'https://hips.hearstapps.com/hmg-prod/images/c4233094-9183-4817-b565-ba5c6c270af0.jpg?crop=0.668xw:1.00xh;0.199xw,0&resize=360:*',
    keywords: ['와이드 레그', '재킷', '데님 스타일링'],
  },
];

const trendKeywords = [
  { label: 'Klein Blue Dominance', desc: '버터 옐로우를 대체한 클라인 블루의 강세. 선명하고 포화된 단색이 이번 시즌을 물들인다.' },
  { label: 'Couture Denim', desc: '알라이아가 증명한 데님의 고급화. 자수·비즈·정교한 마감이 청바지를 예술품으로 만든다.' },
  { label: 'Opera & 18th Century', desc: '바로크 패브릭과 극적인 실루엣이 역사적 글래머를 현대적으로 재해석하는 헤리티지 무드.' },
  { label: 'Neo-Animal Print', desc: '제브라 프린트의 강렬한 귀환. 이번 시즌은 더 크고, 더 대담하고, 더 과감하게.' },
  { label: 'Volume Play', desc: '벌룬 팬츠, 풍성한 소매, 오버사이즈 실루엣이 공존하는 볼륨 게임. 비율 감각이 핵심.' },
  { label: 'Naked Shoe', desc: '샤넬이 이끄는 네이키드 슈즈 트렌드. 피부와 가장 가깝게, 가장 단순하게.' },
];

const stylingTips = [
  '클라인 블루 아이템은 화이트나 에크루 세퍼레이트와 함께 코디하세요. 단 하나의 컬러가 공간을 지배하게 하세요.',
  '쿠튀르 데님은 미니멀한 탱크톱과 네이키드 샌들로 매치해 과잉 없이 완성하세요.',
  '제브라 프린트에는 화이트 스니커즈를 더하세요. 그래픽 패턴과 클린 미니멀의 조화.',
  '벌룬 팬츠를 입을 때는 상의를 타이트하게 터크인해 실루엣의 균형을 잡아주세요.',
  '폴카 도트는 스케일 믹스가 핵심. 큰 도트와 작은 도트를 레이어드하면 입체감이 생깁니다.',
  '오페라 영감 드레스는 낮에 플랫 슈즈와 매치해 드라마틱한 실루엣을 캐주얼하게 만드세요.',
];

// ── Component ─────────────────────────────────────────────────────────────────

const FashionTrendCards: React.FC = () => {
  const [lightbox, setLightbox] = React.useState<LightboxState>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);

    const container = containerRef.current;
    if (container) {
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
      return () => { window.removeEventListener('keydown', handleKey); observer.disconnect(); };
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-slate-900 w-full max-w-full"
      style={{ background: '#F2F2ED', fontFamily: 'Pretendard, system-ui, -apple-system, sans-serif', overflowX: 'clip' }}
    >
      <style>{`
        [data-sr] { opacity: 0; transform: translateY(1.5rem); transition: opacity 0.65s ${SPRING}, transform 0.65s ${SPRING}; }
        [data-sr].sr-visible { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Hero */}
      <header className="relative min-h-[80dvh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <img
          src="https://assets.vogue.com/photos/69bab76174816d46060b337f/4:3/w_1600%2Cc_limit/FallTrendReport26_Laird.jpg"
          alt="Fashion Trend Hero — Fall 2026"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 100%)' }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <span
            className="inline-block mb-6 text-[10px] uppercase tracking-[0.25em] font-semibold px-3 py-1 rounded-full"
            style={{ background: '#F5C800', color: '#0a0a0a' }}
          >
            Fashion Intelligence · APR 2026
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif italic text-white leading-none tracking-tight mb-6">
            Spring &amp; Fall
            <br />
            <em style={{ color: '#F5C800' }}>2026</em>
          </h1>
          <p
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ wordBreak: 'keep-all' }}
          >
            보그, 엘르, 코스모폴리탄이 선정한 2026년 패션 트렌드 인텔리전스. 런웨이에서 일상까지 이어지는 스타일의 흐름을 분석합니다.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Executive Summary */}
        <div className="mb-20 sm:mb-32" data-sr>
          <div className="bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[24px]">
            <div className="bg-white rounded-[19px] px-8 sm:px-12 py-10 sm:py-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
              <span
                className="block mb-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold w-fit"
                style={{ background: 'rgba(0,0,0,0.06)', color: '#888' }}
              >
                Editorial Summary
              </span>
              <blockquote
                className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#111] leading-snug border-l-4 pl-6"
                style={{ borderColor: '#F5C800', wordBreak: 'keep-all' }}
              >
                "2026 패션은 과거와 현재의 대화다. 18세기 쿠튀르부터 Y2K 데님까지, 헤리티지 감성이 클라인 블루와 제브라 프린트의 대담함과 충돌하며 새로운 시각 언어를 만들어낸다."
              </blockquote>
              <p className="mt-6 text-sm text-[#777] tracking-widest uppercase">
                Vogue · Elle · Cosmopolitan · Spring / Fall 2026 Synthesis
              </p>
            </div>
          </div>
        </div>

        {/* ── Vogue ── */}
        <section className="mb-24 sm:mb-40">
          <div data-sr>
            <span
              className="block mb-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold w-fit"
              style={{ background: 'rgba(0,0,0,0.06)', color: '#888' }}
            >
              Runway Intelligence
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight border-b border-slate-200 pb-4 flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10">
                <IconLayers className="w-5 h-5 text-blue-600" />
              </span>
              Vogue
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-8 sm:mb-12">
              Vogue US · 런웨이 트렌드 리포트 · APR 2026
            </p>
          </div>

          {/* Featured wide card */}
          <div
            className="mb-6 group cursor-zoom-in bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[18px] hover:scale-[1.01] active:scale-[0.99]"
            style={{ transition: `transform 0.45s ${SPRING}` }}
            data-sr
            onClick={() => setLightbox({ src: vogueItems[3].image, title: vogueItems[3].title, publication: 'Vogue' })}
          >
            <div className="bg-white rounded-[13px] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col md:flex-row">
              <div className="overflow-hidden h-64 md:h-auto md:w-2/5 flex-shrink-0">
                <img
                  src={vogueItems[3].image}
                  alt={vogueItems[3].title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105"
                  style={{ transition: `transform 0.45s ${SPRING}` }}
                />
              </div>
              <div className="px-8 py-8 flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#888] mb-3">Cover Story</span>
                <h4 className="text-xl sm:text-2xl font-semibold leading-snug text-[#111] mb-4">{vogueItems[3].title}</h4>
                <p className="text-sm text-[#555] leading-relaxed mb-5" style={{ wordBreak: 'keep-all' }}>{vogueItems[3].summary}</p>
                <div className="flex flex-wrap gap-1">
                  {vogueItems[3].keywords.map((kw) => (
                    <span key={kw} className="bg-[#111]/5 text-[#333] text-[10px] font-medium px-2 py-0.5 rounded-full">{kw}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ height: '2px', background: '#F5C800' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-sr>
            {vogueItems.filter((_, i) => i !== 3).map((item) => (
              <TrendCard
                key={item.title}
                item={item}
                publication="Vogue"
                onZoom={() => setLightbox({ src: item.image, title: item.title, publication: 'Vogue' })}
              />
            ))}
          </div>
        </section>

        {/* ── Elle ── */}
        <section className="mb-24 sm:mb-40">
          <div data-sr>
            <span
              className="block mb-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold w-fit"
              style={{ background: 'rgba(0,0,0,0.06)', color: '#888' }}
            >
              Editor's Pick
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight border-b border-slate-200 pb-4 flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-purple-500/10">
                <IconScissors className="w-5 h-5 text-purple-600" />
              </span>
              Elle
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-8 sm:mb-12">
              Elle US · 트렌드 리포트 · APR 2026
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-sr>
            {elleItems.map((item) => (
              <TrendCard
                key={item.title}
                item={item}
                publication="Elle"
                onZoom={() => setLightbox({ src: item.image, title: item.title, publication: 'Elle' })}
                imageHeight="h-52"
              />
            ))}
          </div>
        </section>

        {/* ── Cosmopolitan ── */}
        <section className="mb-24 sm:mb-40">
          <div data-sr>
            <span
              className="block mb-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold w-fit"
              style={{ background: 'rgba(0,0,0,0.06)', color: '#888' }}
            >
              Style Report
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight border-b border-slate-200 pb-4 flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10">
                <IconStars className="w-5 h-5 text-amber-600" />
              </span>
              Cosmopolitan
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-8 sm:mb-12">
              Cosmopolitan US · 셀럽 스타일 &amp; 트렌드 · APR 2026
            </p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5" data-sr>
            {cosmoItems.map((item, i) => (
              <div key={item.title} className="break-inside-avoid">
                <TrendCard
                  item={item}
                  publication="Cosmopolitan"
                  onZoom={() => setLightbox({ src: item.image, title: item.title, publication: 'Cosmopolitan' })}
                  imageHeight={i % 3 === 0 ? 'h-64' : 'h-44'}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Section */}
        <section className="mt-24 sm:mt-40 bg-black/[0.04] ring-1 ring-black/[0.05] p-[5px] rounded-[24px]" data-sr>
          <div className="bg-white rounded-[19px] p-8 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
            <div className="grid md:grid-cols-2 gap-12 sm:gap-20">
              {/* Left: Trend Keywords */}
              <div>
                <span
                  className="block mb-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold w-fit"
                  style={{ background: 'rgba(0,0,0,0.06)', color: '#888' }}
                >
                  Cross-Publication
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif tracking-tight mb-8 text-[#111]">시즌 키워드</h4>
                <div className="space-y-5">
                  {trendKeywords.map((kw) => (
                    <div key={kw.label} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full" style={{ background: '#F5C800' }} />
                      <div>
                        <span className="font-semibold text-[#111] text-sm">{kw.label}</span>
                        <p className="text-xs text-[#666] mt-0.5 leading-relaxed" style={{ wordBreak: 'keep-all' }}>{kw.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: Styling Tips */}
              <div className="rounded-[16px] p-6 sm:p-8" style={{ background: '#0a0a0a' }}>
                <span
                  className="block mb-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-semibold w-fit"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#aaa' }}
                >
                  Styling Advice
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif tracking-tight mb-8 text-white">스타일링 팁</h4>
                <ul className="space-y-4">
                  {stylingTips.map((tip, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className="flex-shrink-0 text-[10px] font-bold mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: '#F5C800', color: '#0a0a0a' }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed" style={{ wordBreak: 'keep-all' }}>{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer
        className="text-center py-10 text-xs text-slate-400 tracking-widest uppercase border-t border-slate-200"
        style={{ background: '#F2F2ED' }}
      >
        Generated 2026-04-30 · Fashion Trend Intelligence · Firecrawl MCP
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-slate-400 hover:text-white text-4xl leading-none"
            style={{ transition: `color 0.3s ${SPRING}` }}
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-6 text-center px-4">
            <p className="text-white font-serif text-lg">{lightbox.title}</p>
            <p className="text-slate-400 text-xs mt-1 tracking-widest uppercase">{lightbox.publication}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionTrendCards;
