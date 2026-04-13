import React from 'react';

type LightboxState = { src: string; title: string; tag: string } | null;
type TabKey = 'trends' | 'market' | 'problems' | 'opportunities';

// ── 상수 ────────────────────────────────────────────────────────────────────
const TODAY_DATE = '2026-04-13';
const BASE_PRS = 'https://prs.ohousecdn.com/apne2';
const BASE_IMG = 'https://image.ohousecdn.com/i/bucketplace-v2-development/uploads';

// ── 출처 아티클 (링크 보존) ──────────────────────────────────────────────────
const sources = [
  {
    id: 'advices-12252',
    url: 'https://ohou.se/advices/12252',
    title: '2026 인테리어 트렌드 총정리｜무몰딩·주방·타일까지',
    author: '오늘의리모델링',
    likes: 427, scraps: 27, views: 778,
    cover: `${BASE_PRS}/content/uploads/cards/advice/v1-477286334566464.jpg`,
    badge: '인테리어 전문가',
    tags: ['#무몰딩인테리어', '#대면형주방', '#포세린타일', '#자연소재인테리어', '#조명인테리어'],
    images: [
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-477288661581888.jpg`, caption: '무몰딩 인테리어 — Photo by heden.home', trend: '무몰딩' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-477288741191808.jpg`, caption: '대면형 주방 (아일랜드) — Photo by 혜안홈', trend: '대면형주방' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-477288817881216.jpg`, caption: '자연 소재 인테리어 — Photo by sabuzac_', trend: '자연소재' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-477288950116480.jpg`, caption: '대형 포세린 타일 (600각) — Photo by 오또리하우스2', trend: '포세린타일' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-477288982462528.jpg`, caption: '조명 오브제화 — Photo by 리디홈', trend: '조명' },
    ],
  },
  {
    id: 'advices-12278',
    url: 'https://ohou.se/advices/12278',
    title: '2026 인테리어 디자인 트렌드｜요즘 집이 달라진 이유',
    author: '오늘의리모델링',
    likes: 14, scraps: 4, views: 193,
    cover: `${BASE_PRS}/content/uploads/cards/advice/v1-480576375799808.png`,
    badge: '디자인 원칙',
    tags: ['#인테리어취향', '#믹스매치인테리어', '#텍스처인테리어', '#가구인테리어'],
    images: [
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-480580709523456.jpg`, caption: '취향 중심 인테리어 — Photo by 옥냥s2', trend: '네러티브' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-480580786020416.jpg`, caption: '"호텔 같은 침실" 네러티브 — Photo by 바미수집', trend: '네러티브' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-480581111144512.jpg`, caption: '레이어링 (러그·커튼·쿠션) — Photo by OBJET_HAUS', trend: '레이어링' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-480581210759296.jpg`, caption: '텍스처 우선 — 질감이 분위기를 결정', trend: '텍스처' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-480581366513792.jpg`, caption: '믹스매치 — 우드+메탈 조합 — Photo by 키킴홈', trend: '믹스매치' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-480581866975232.jpg`, caption: '곡선·비정형 — Photo by 플홈데이', trend: '곡선' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-480581475201152.jpg`, caption: '가구·조명 오브제화 — Photo by k__youhee', trend: '오브제화' },
      { url: `${BASE_PRS}/content/uploads/cards/advice/v1-480581945458688.jpg`, caption: 'FAQ — 텍스처 & 인테리어 방향 — Photo by 어반데이', trend: '텍스처' },
    ],
  },
  {
    id: 'projects-190513',
    url: 'https://contents.ohou.se/projects/190513',
    title: '요즘 신혼 어떻게 다를까? 2026 신혼집 인테리어 트렌드',
    author: '집들이에디터',
    likes: 26, scraps: 157, views: 7505,
    cover: `${BASE_IMG}/cards/project/171388264178904403.jpg`,
    badge: '★ 조회 7,505',
    tags: ['#신혼부부', '#2인최적화', '#굳이의낭만', '#가전오브제화', '#취향팔레트'],
    images: [
      // 2인 최적화 — 싱글베드
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470566105153600.jpg`, caption: '싱글베드 2개로 따로 또 같이 — 동그리ㅎㅎㅎ 님', trend: '2인최적화' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470566187622464.jpg`, caption: '멀티패널 분리형 침대 배치', trend: '2인최적화' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470566252859520.jpg`, caption: '각자의 수면 공간 — 수면 질 개선', trend: '2인최적화' },
      // 공유 라운지
      { url: `${BASE_IMG}/cards/project/171385816501315681.jpg`, caption: '따로 또 같이 공유 라운지 — 쿠우홈 님', trend: '라운지' },
      { url: `${BASE_IMG}/cards/project/171360277379578339.jpg`, caption: '사람 중심 가구 배치 — 대화 구조 핵심', trend: '라운지' },
      // 굳이의 낭만 — 다이닝
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470574060277888.jpg`, caption: '느리게 일상을 공유하는 다이닝 — honeymoon.house 님', trend: '굳이낭만' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470574129598464.jpg`, caption: '솥밥 짓는 시간도 이벤트가 되는 주방', trend: '굳이낭만' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470574009704512.jpg`, caption: '거실로 옮긴 다이닝 — 느린 시간 선택', trend: '굳이낭만' },
      // 음악 라운지
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470576965017600.jpg`, caption: '음악과 책이 있는 라운지 거실 — JULY.APT 님', trend: '굳이낭만' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470576326664256.jpg`, caption: 'LP·CD 수납장과 스피커 중심 음악 공간', trend: '굳이낭만' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470576636657728.jpg`, caption: '소파 옆 독서 공간 — 둘만의 자리', trend: '굳이낭만' },
      // 가전 오브제화
      { url: `${BASE_IMG}/cards/project/173297553366617974.jpg`, caption: '가전이 인테리어 일부가 된 주방 — 노랭홈 님', trend: '가전오브제' },
      { url: `${BASE_IMG}/cards/project/173297622337563733.jpg`, caption: '냉장고·오븐·커피머신 소재·컬러 통일', trend: '가전오브제' },
      { url: `${BASE_IMG}/cards/project/173303257913722647.jpg`, caption: '빌트인 정수기까지 톤 맞춘 프리미엄 주방', trend: '가전오브제' },
      { url: `${BASE_IMG}/cards/project/173297775211927566.jpg`, caption: '아일랜드 상판 빌트인 식기세척기 — 오브제 역할', trend: '가전오브제' },
      { url: `${BASE_IMG}/cards/project/173296722349808168.jpg`, caption: '거실의 소형 가전도 공간 오브제로', trend: '가전오브제' },
      // 모듈 아일랜드
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470582438469760.png`, caption: '모듈장 아일랜드 겸 와인셀러 — nizi.zip 님', trend: '모듈' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470582368252032.jpg`, caption: '낮엔 작업실, 저녁엔 와인바로 변하는 공간', trend: '모듈' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470582646964224.jpg`, caption: '반대편은 소가전·주방용품 수납 — 유연한 모듈', trend: '모듈' },
      // 취향 팔레트
      { url: `${BASE_IMG}/cards/project/171876979701756529.jpg`, caption: '블랙으로 중심 잡은 취향 믹스매치 — jiiiyeon_ine 님', trend: '취향팔레트' },
      { url: `${BASE_IMG}/cards/project/171862443478873996.jpg`, caption: '작업 공간에서도 드러나는 두 취향의 균형', trend: '취향팔레트' },
      { url: `${BASE_IMG}/cards/projects/175075376513714820.jpg`, caption: '모던+동양미 오브제존 조화 — joienevv 님', trend: '취향팔레트' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470595620167744.jpg`, caption: '곡선 오브제로 공간 인상 부드럽게', trend: '취향팔레트' },
      { url: `${BASE_PRS}/contents/uploads/cards/project/v1-470595687985280.jpg`, caption: '각자 취향의 오브제존 — 이동·변경 자유', trend: '취향팔레트' },
    ],
  },
];

// ── 2026 트렌드 데이터 ──────────────────────────────────────────────────────
const trends2026 = [
  {
    rank: 1, title: '무몰딩 인테리어', subtitle: '미니멀 구조의 핵심', color: 'slate',
    description: '벽과 천장이 만나는 경계에서 몰딩을 제거해 공간을 더 넓고 호텔처럼 보이게 만드는 공법. 아이보리·베이지 톤과 결합 시 신축 아파트 분위기 극대화.',
    signal: 'ohou.se/advices/12252 기준 좋아요 427, 조회 778 — 인테리어 전문가 상담 현장 1위 키워드',
    tags: ['#무몰딩', '#미니멀', '#호텔느낌'],
    image: `${BASE_PRS}/content/uploads/cards/advice/v1-477288661581888.jpg`,
    growthRate: '↑ 급증', demandScore: 9,
  },
  {
    rank: 2, title: '대면형 주방', subtitle: '요리 공간 → 생활 공간', color: 'amber',
    description: '아일랜드·ㄷ자·오픈형 주방으로 요리 중 가족과 대화하며 거실과 자연스럽게 연결. 빌트인 냉장고·인덕션·식기세척기 배치를 먼저 설계하는 순서가 핵심.',
    signal: '빌트인 가전 배치 우선 설계 트렌드. 아일랜드 상판 문의 급증.',
    tags: ['#대면형주방', '#아일랜드', '#빌트인'],
    image: `${BASE_PRS}/content/uploads/cards/advice/v1-477288741191808.jpg`,
    growthRate: '↑ 증가', demandScore: 8,
  },
  {
    rank: 3, title: '자연 소재 인테리어', subtitle: '내추럴 질감이 답이다', color: 'emerald',
    description: '원목 마루, 무늬목, 엔지니어드 스톤(칸스톤), 포세린 타일. 특히 엔지니어드 스톤 주방 상판은 내구성·관리 편의·고급 질감 삼박자로 주방 상판 1순위.',
    signal: '상담 현장 "오래 써도 질리지 않을까요?" "관리하기 어렵지는 않을까요?" 질문 급증.',
    tags: ['#자연소재', '#원목', '#엔지니어드스톤'],
    image: `${BASE_PRS}/content/uploads/cards/advice/v1-477288817881216.jpg`,
    growthRate: '↑ 급증', demandScore: 8,
  },
  {
    rank: 4, title: '대형 포세린 타일', subtitle: '줄눈을 줄이면 공간이 달라진다', color: 'blue',
    description: '600각 이상의 대형 타일로 줄눈 감소 → 더 넓고 깔끔한 공간. 욕실·거실 벽 모두 적용. 호텔·하이엔드 인테리어 질감을 일반 가정에서 구현.',
    signal: '욕실 리모델링 기본 옵션으로 자리잡기 시작. 시공사 대형 타일 문의 2024년 대비 급증.',
    tags: ['#포세린타일', '#600각', '#욕실리모델링'],
    image: `${BASE_PRS}/content/uploads/cards/advice/v1-477288950116480.jpg`,
    growthRate: '↑ 증가', demandScore: 7,
  },
  {
    rank: 5, title: '조명 오브제화', subtitle: '밝기보다 분위기가 먼저', color: 'orange',
    description: '거실(간접조명) + 주방(작업조명) + 식탁(펜던트)으로 공간별 조도를 달리 설계. "다 예쁘게"보다 "하나를 확실하게" — 조명 하나로 공간 분위기가 확 달라지는 시대.',
    signal: '조명 단품 큐레이션 콘텐츠 좋아요·저장 폭발적 증가. 홈퍼니싱 구매 1-3위 품목에 조명 진입.',
    tags: ['#펜던트조명', '#간접조명', '#조명오브제'],
    image: `${BASE_PRS}/content/uploads/cards/advice/v1-477288982462528.jpg`,
    growthRate: '↑ 급증', demandScore: 7,
  },
  {
    rank: 6, title: '취향 믹스매치', subtitle: '"같아야"가 아닌 "어울려야"', color: 'purple',
    description: '우드+메탈, 베이지+블랙처럼 다른 소재와 색을 자연스럽게 섞는 방식. 텍스처(질감)가 컬러보다 중요해졌다. 신혼집에서는 두 사람 취향을 "공통 포인트"로 중심 잡는 전략.',
    signal: '신혼집 인테리어 트렌드 콘텐츠 조회 7,505 — 수집 페이지 중 압도적 1위.',
    tags: ['#믹스매치', '#텍스처', '#취향인테리어'],
    image: `${BASE_PRS}/content/uploads/cards/advice/v1-480580786020416.jpg`,
    growthRate: '↑ 급증', demandScore: 8,
  },
];

// ── 시장 데이터 ──────────────────────────────────────────────────────────────
const marketData = {
  tam: { label: 'TAM — 전체 시장', value: '₩20조', desc: '국내 홈리빙·가구 제조·유통 시장 (2024년 전망)', note: '출처: KOSIS 국가통계포털 × 한국경제 보도' },
  sam: { label: 'SAM — 유효 시장', value: '₩6조', desc: '온라인·2030·1-2인 가구·셀프인테리어 타깃 세부 시장', note: '온라인 침투율 30% × TAM. 오늘의집·무신사·29CM 합산 기준' },
  som: { label: 'SOM — 획득 가능', value: '₩20~50억', desc: '오늘의집 플랫폼 진입 기준 초기 1~2년 목표', note: 'MAU 10만 × 전환율 2.5% × 객단가 8만원' },
  stats: [
    { label: '홈퍼니싱 구매 경험', value: '75.8%', sub: '최근 1년 내 (엠브레인 n=1,000)', color: 'blue' },
    { label: '1인 가구 비율', value: '36.1%', sub: '전체 804만 가구 (2024 통계청)', color: 'emerald' },
    { label: '셀프 인테리어 경험', value: '66.1%', sub: '인테리어 경험자 중 (엠브레인)', color: 'purple' },
    { label: '오늘의집 2024 매출', value: '2,879억', sub: '영업이익 5.7억 — 플랫폼 흑자 전환', color: 'amber' },
    { label: '"나만의 공간" 니즈', value: '81.5%', sub: '"오롯이 나만을 위한 공간 만들고 싶다"', color: 'rose' },
    { label: '한샘 2025 Q1 매출', value: '4,434억', sub: 'YoY -8.7% — 부동산 침체 영향', color: 'slate' },
  ],
  risks: [
    { label: '부동산 침체 연동', desc: '2025 Q1 아파트 하락 거래 44.9% — 이사·빌트인 수요 직격탄' },
    { label: '대형사 프리미엄 전략', desc: '한샘 키친바흐 +77.2%, 현대리바트 MEISTER COLLECTION — 상위 시장 경쟁 심화' },
    { label: '트렌드 교체 가속', desc: '소비자 교체 주기 2-3년으로 단축. "오래 써도 질리지 않을까요?" 신호 증가' },
  ],
};

// ── 소비자 문제 TOP 10 ────────────────────────────────────────────────────────
const problemMatrix = [
  { rank: 1, problem: '고가 가구 내구성 불일치', urgency: 9, wtp: 9, complaintCount: 4, growthRate: '↑ 급증', flags: ['🔴', '🚀'], quote: '"침대 프레임 진짜 힘주지 마세요..ㅠㅠ" / "중고방어도 안 됩니다"' },
  { rank: 2, problem: '이사 시 대형 가구 이동 불가', urgency: 8, wtp: 9, complaintCount: 3, growthRate: '↑ 급증', flags: ['🔴', '🚀'], quote: '"이사 때 이동 어려움" / "너무 비싼 가구 특히 프레임은 피해라"' },
  { rank: 3, problem: '트렌드 교체 주기 가속', urgency: 7, wtp: 8, complaintCount: 2, growthRate: '↑ 급증', flags: ['🚀'], quote: '"오래 써도 질리지 않을까요?" — 상담 현장 1위 질문' },
  { rank: 4, problem: '자연소재 유지보수 비용 불명확', urgency: 7, wtp: 8, complaintCount: 2, growthRate: '↑ 증가', flags: ['🔴', '🚀'], quote: '"관리하기 어렵지는 않을까요?" / "유지보수 비용이 많이 들까요?"' },
  { rank: 5, problem: '가전 오브제화 실패', urgency: 6, wtp: 7, complaintCount: 2, growthRate: '↑ 급증', flags: ['🚀'], quote: '"냉장고·오븐·커피머신 톤 맞추기" — 제품 선택지 부족·비용 과다' },
  { rank: 6, problem: '구매 후 공간 크기 미스매치', urgency: 8, wtp: 7, complaintCount: 3, growthRate: '↑ 증가', flags: ['🔴'], quote: '"소파 넓어서 손님 침대로 사용" — 크기 예측 실패 빈발' },
  { rank: 7, problem: '조명 설계 전문성 부족', urgency: 6, wtp: 7, complaintCount: 1, growthRate: '↑ 급증', flags: ['🚀'], quote: '"밝기보다 분위기" 트렌드 전환 → 설계 난도 급상승' },
  { rank: 8, problem: '취향 믹스매치 실패', urgency: 5, wtp: 6, complaintCount: 1, growthRate: '↑ 급증', flags: ['🚀'], quote: '"같아야가 아닌 어울려야" — 결과물 기대 이하' },
  { rank: 9, problem: '리모델링 비용 과다·정보 비대칭', urgency: 6, wtp: 6, complaintCount: 1, growthRate: '↑ 증가', flags: ['🚀'], quote: '무몰딩·오픈형 주방 시공비 예산 초과 — 전문가 상담 수요 급증' },
  { rank: 10, problem: '가구 구매 실패 후 중고 처분 불가', urgency: 5, wtp: 6, complaintCount: 2, growthRate: '↑ 증가', flags: ['🔴'], quote: '"가구는 비싼거 사는게 아닙니다 ㅎㅋ"' },
];

// ── 기회 영역 ────────────────────────────────────────────────────────────────
const opportunities = [
  {
    rank: 1, title: '모듈 가구 — 이사 대비 설계', color: 'emerald',
    desc: '"바뀔 수 있기에 너무 비싼 가구 특히 프레임은 피해라" → 분해·재조립 용이한 모듈 설계 수요 급증.',
    evidence: '혼수 실패담 바이럴 콘텐츠 커뮤니티 확산. 문제 #1·#2 WTP 각 9점.',
    potential: '연간 이사 건수 800만+ × 가구 교체율 → 대규모 반복 수요',
    actions: ['모듈형 침대 프레임 라인업', '분해 서비스 구독 모델', '이사 패키지 연계'],
  },
  {
    rank: 2, title: '소재별 케어 키트 + 구독 정기권', color: 'blue',
    desc: '"자연소재 관리 어렵지 않을까요?" — 원목·포세린·엔지니어드 스톤 소재 선택 후 관리 불안 급증.',
    evidence: '문제 #4 WTP 8점. 상담 현장 2번째로 많은 질문.',
    potential: '자재 구매 후 추가 ARPU. 구독 전환 시 LTV 3배 이상',
    actions: ['소재별 케어 가이드 콘텐츠', '유지보수 정기권 월 구독', '원목·타일 케어 키트 번들'],
  },
  {
    rank: 3, title: '조명 큐레이션 패키지', color: 'amber',
    desc: '"밝기보다 분위기가 먼저" — 공간별 조명 설계 수요는 폭발적이나 전문 가이드 부재.',
    evidence: '홈퍼니싱 구매 1-3위: 수납용품(26.1%), 러그/커튼(23.7%), 조명(23.5%)',
    potential: '조명 단품 객단가 낮지만 세트 판매 시 건당 20-40만원',
    actions: ['거실·주방·침실 조명 3종 세트', '공간별 조명 플래닝 가이드', 'AR 조명 미리보기'],
  },
  {
    rank: 4, title: '신혼 2인 최적화 가구 패키지', color: 'purple',
    desc: '"신혼은 1세트" 고정관념 붕괴 → 각자 취향 존중하는 2인 최적화 세트 수요 급증.',
    evidence: '신혼집 트렌드 콘텐츠 조회 7,505 — 압도적 1위. 싱글베드 2개·모듈 선반 조합 인기.',
    potential: '신혼 가구 구매 시즌(봄·가을) 집중 수요. 건당 객단가 300만원+',
    actions: ['싱글베드 2개 세트 패키지', '2인 취향 코디 서비스', '신혼 모듈 선반 시스템'],
  },
  {
    rank: 5, title: '가전 오브제 코디네이션', color: 'rose',
    desc: '"냉장고·오븐·커피머신 톤 맞추기" — 가전의 인테리어 통합 수요, 브랜드 협업 기회.',
    evidence: '신혼 트렌드 "얼굴이 된 가전" 섹션. 오브제화 실패 WTP 7점.',
    potential: '가전+가구 코디 패키지 → 크로스셀링 확대. 브랜드 콜라보 수익화',
    actions: ['가전 톤 맞춤 선반 시스템', '브랜드 코디 패키지 출시', '쇼룸 체험형 전시'],
  },
];

// ── 컴포넌트 ─────────────────────────────────────────────────────────────────

const FurnitureTrendCards: React.FC = () => {
  const [lightbox, setLightbox] = React.useState<LightboxState>(null);
  const [activeTab, setActiveTab] = React.useState<TabKey>('trends');

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const colorMap: Record<string, { border: string; badge: string; bg: string; text: string }> = {
    slate:   { border: 'border-slate-300',   badge: 'bg-slate-100 text-slate-700',     bg: 'bg-slate-50',    text: 'text-slate-700' },
    amber:   { border: 'border-amber-300',   badge: 'bg-amber-100 text-amber-700',     bg: 'bg-amber-50',    text: 'text-amber-700' },
    emerald: { border: 'border-emerald-300', badge: 'bg-emerald-100 text-emerald-700', bg: 'bg-emerald-50',  text: 'text-emerald-700' },
    blue:    { border: 'border-blue-300',    badge: 'bg-blue-100 text-blue-700',       bg: 'bg-blue-50',     text: 'text-blue-700' },
    orange:  { border: 'border-orange-300',  badge: 'bg-orange-100 text-orange-700',   bg: 'bg-orange-50',   text: 'text-orange-700' },
    purple:  { border: 'border-purple-300',  badge: 'bg-purple-100 text-purple-700',   bg: 'bg-purple-50',   text: 'text-purple-700' },
    rose:    { border: 'border-rose-300',    badge: 'bg-rose-100 text-rose-700',       bg: 'bg-rose-50',     text: 'text-rose-700' },
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">

      {/* ── Hero ── */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src={`${BASE_PRS}/content/uploads/cards/advice/v1-477286334566464.jpg`}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="2026 인테리어 트렌드"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">오늘의집 리서치 · {TODAY_DATE}</p>
          <h1 className="text-white text-6xl md:text-8xl font-serif italic mb-4">Furniture<br />Trends</h1>
          <p className="text-white text-lg tracking-[0.3em] uppercase opacity-80">2026 홈퍼니싱 인텔리전스</p>
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {['무몰딩', '자연소재', '믹스매치', '조명오브제', '모듈가구', '신혼2인'].map(tag => (
              <span key={tag} className="text-white/70 text-xs border border-white/30 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Tab Nav ── */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto py-3">
          {[
            { key: 'trends',       label: '🏠 2026 트렌드' },
            { key: 'market',       label: '📊 시장 분석' },
            { key: 'problems',     label: '🔴 소비자 문제' },
            { key: 'opportunities',label: '🎯 기회 영역' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* ══ TAB: 트렌드 ══ */}
        {activeTab === 'trends' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🏠 2026 인테리어·가구 트렌드</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-12">
              오늘의집 실시간 스크래핑 · Firecrawl MCP · {TODAY_DATE}
            </p>

            {/* ── 출처 아티클 카드 ── */}
            <div className="mb-16">
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <span className="text-slate-400 text-base">📌</span> 출처 아티클
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {sources.map((src) => (
                  <a
                    key={src.id}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    <div className="overflow-hidden h-44 bg-slate-100 relative">
                      <img
                        src={src.cover}
                        alt={src.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-full font-bold backdrop-blur-sm">
                        {src.badge}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h4 className="font-serif text-base leading-snug mb-2 group-hover:underline line-clamp-2">{src.title}</h4>
                      <p className="text-slate-400 text-xs mb-3">by {src.author}</p>
                      <div className="flex gap-3 text-xs text-slate-400 mb-4">
                        <span>❤️ {src.likes}</span>
                        <span>🔖 {src.scraps}</span>
                        <span>👁 {src.views.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {src.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* ── 아티클별 이미지 갤러리 ── */}
            {sources.map((src) => (
              <div key={src.id} className="mb-16">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-serif">
                    {src.title.split('｜')[0]}
                    <span className="text-slate-400 text-sm font-sans ml-2">— {src.images.length}장</span>
                  </h3>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 shrink-0"
                  >
                    원문 보기 ↗
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {src.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 cursor-zoom-in"
                      onClick={() => setLightbox({ src: img.url, title: img.caption, tag: img.trend })}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs leading-snug line-clamp-2">{img.caption}</p>
                      </div>
                      <span className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-slate-700 text-[10px] px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        #{img.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* ── 2026 트렌드 인사이트 ── */}
            <div>
              <h3 className="text-2xl font-serif mb-6 border-t pt-8">📐 2026 트렌드 인사이트</h3>
              <div className="space-y-6">
                {trends2026.map((item) => {
                  const c = colorMap[item.color] ?? colorMap.slate;
                  return (
                    <div key={item.rank} className={`flex gap-0 rounded-2xl overflow-hidden border-l-4 hover:shadow-lg transition-shadow ${c.border}`}>
                      <div
                        className="relative w-44 md:w-56 flex-shrink-0 cursor-zoom-in overflow-hidden bg-slate-100"
                        onClick={() => setLightbox({ src: item.image, title: item.title, tag: item.tags[0] })}
                      >
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-black/75 text-white text-xs font-bold px-2 py-0.5 rounded-full">#{item.rank}</div>
                      </div>
                      <div className={`flex-1 p-6 ${c.bg}`}>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-serif text-2xl">{item.title}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${c.badge}`}>{item.growthRate}</span>
                            </div>
                            <p className="text-slate-500 text-sm">{item.subtitle}</p>
                          </div>
                          <div className="flex-shrink-0 text-center">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow"
                              style={{ background: `hsl(${Math.max(0, 120 - item.demandScore * 10)}, 65%, 45%)` }}
                            >
                              {item.demandScore}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">수요</p>
                          </div>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.tags.map((tag, j) => (
                            <span key={j} className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{tag}</span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-400 italic">📡 {item.signal}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ══ TAB: 시장 분석 ══ */}
        {activeTab === 'market' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">📊 TAM · SAM · SOM 시장 분석</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              KOSIS × 엠브레인 트렌드모니터 × Archisketch × 금융감독원 공시
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { ...marketData.tam, bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400' },
                { ...marketData.sam, bg: 'bg-blue-700',  text: 'text-white', sub: 'text-blue-200' },
                { ...marketData.som, bg: 'bg-emerald-600', text: 'text-white', sub: 'text-emerald-100' },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-8 ${item.bg}`}>
                  <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 ${item.sub}`}>{item.label}</p>
                  <p className={`text-4xl font-serif font-bold mb-3 ${item.text}`}>{item.value}</p>
                  <p className={`text-sm leading-relaxed mb-2 ${item.text}`}>{item.desc}</p>
                  <p className={`text-xs italic ${item.sub}`}>{item.note}</p>
                </div>
              ))}
            </div>
            <div className="mb-16">
              <h3 className="text-2xl font-serif mb-6">📈 핵심 시장 통계</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {marketData.stats.map((stat, i) => {
                  const c = colorMap[stat.color] ?? colorMap.slate;
                  return (
                    <div key={i} className={`rounded-xl p-5 border ${c.bg} ${c.border}`}>
                      <p className={`text-3xl font-bold font-serif mb-1 ${c.text}`}>{stat.value}</p>
                      <p className="font-medium text-slate-800 text-sm mb-1">{stat.label}</p>
                      <p className="text-xs text-slate-500">{stat.sub}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-6">⚠️ 시장 리스크</h3>
              <div className="space-y-3">
                {marketData.risks.map((risk, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-red-50 border border-red-100">
                    <span className="text-red-500 font-bold text-lg flex-shrink-0">!</span>
                    <div>
                      <p className="font-medium text-red-800 mb-0.5">{risk.label}</p>
                      <p className="text-sm text-slate-600">{risk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ TAB: 소비자 문제 ══ */}
        {activeTab === 'problems' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🔴 소비자 문제 매트릭스</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-6">
              WTP 점수 기준 정렬 · 오늘의집 커뮤니티 실제 발언 인용
            </p>
            <div className="flex flex-wrap gap-3 mb-10 text-xs">
              <span className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-full font-medium">🔴 실제 커뮤니티 불평 인용</span>
              <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full font-medium">🚀 빠르게 커지는 문제</span>
            </div>
            <div className="space-y-4">
              {problemMatrix.map((item) => {
                const isComplaint = item.flags.includes('🔴');
                const isGrowing   = item.flags.includes('🚀');
                const score = item.urgency + item.wtp;
                const cardBg = isComplaint && isGrowing
                  ? 'bg-red-50 border border-red-200'
                  : isComplaint ? 'bg-orange-50 border border-orange-100'
                  : isGrowing   ? 'bg-amber-50 border border-amber-100'
                  : 'bg-slate-50 border border-slate-100';
                return (
                  <div key={item.rank} className={`rounded-xl p-5 hover:shadow-md transition-shadow ${cardBg}`}>
                    <div className="flex items-start gap-4">
                      <span className="text-2xl font-bold text-slate-300 w-8 flex-shrink-0 leading-none mt-1">#{item.rank}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-serif text-lg">{item.problem}</h4>
                          {isComplaint && (
                            <span className="text-xs bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">🔴 불평 {item.complaintCount}회</span>
                          )}
                          {isGrowing && (
                            <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">🚀 {item.growthRate}</span>
                          )}
                        </div>
                        <p className="text-slate-500 text-sm italic mb-3">{item.quote}</p>
                        {(['wtp', 'urgency'] as const).map((key) => {
                          const val = item[key];
                          const label = key === 'wtp' ? '💰 WTP' : '🔥 긴급도';
                          const highColor   = key === 'wtp' ? 'bg-emerald-500' : 'bg-red-500';
                          const midColor    = key === 'wtp' ? 'bg-emerald-300' : 'bg-red-300';
                          const scoreColor  = key === 'wtp' ? 'text-emerald-600' : 'text-red-600';
                          return (
                            <div key={key} className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-slate-400 w-20">{label}</span>
                              <div className="flex gap-0.5">
                                {Array.from({ length: 10 }, (_, n) => (
                                  <div key={n} className={`w-4 h-4 rounded-sm ${
                                    n < val
                                      ? val >= 8 ? highColor : val >= 5 ? midColor : 'bg-slate-300'
                                      : 'bg-slate-100 border border-slate-200'
                                  }`} />
                                ))}
                              </div>
                              <span className={`text-xs font-bold ml-1 ${scoreColor}`}>{val}/10</span>
                            </div>
                          );
                        })}
                      </div>
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

        {/* ══ TAB: 기회 영역 ══ */}
        {activeTab === 'opportunities' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🎯 시장 기회 영역</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              소비자 문제 WTP × 오늘의집 트렌드 신호 교차 분석
            </p>
            <div className="space-y-8">
              {opportunities.map((opp) => {
                const c = colorMap[opp.color] ?? colorMap.slate;
                return (
                  <div key={opp.rank} className={`rounded-2xl border overflow-hidden ${c.border}`}>
                    <div className={`px-6 py-4 ${c.bg}`}>
                      <div className="flex items-center gap-3">
                        <span className={`text-3xl font-bold opacity-30 ${c.text}`}>0{opp.rank}</span>
                        <div>
                          <h3 className="font-serif text-2xl">{opp.title}</h3>
                          <p className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>기회 영역</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-slate-700 leading-relaxed mb-4">{opp.desc}</p>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">근거 신호</p>
                          <p className="text-sm text-slate-600">{opp.evidence}</p>
                        </div>
                        <div className={`rounded-lg p-4 ${c.bg}`}>
                          <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">수익 포텐셜</p>
                          <p className={`text-sm font-medium ${c.text}`}>{opp.potential}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">액션 아이템</p>
                        <div className="flex flex-wrap gap-2">
                          {opp.actions.map((action, j) => (
                            <span key={j} className={`text-xs px-3 py-1 rounded-full font-medium ${c.badge}`}>{action}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Bottom Summary ── */}
        <section className="mt-24 bg-slate-50 p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-serif mb-6 underline underline-offset-4">핵심 기회 키워드</h4>
              <div className="flex flex-wrap gap-2">
                {['모듈가구', '자연소재케어', '조명큐레이션', '신혼2인세트', '가전코디', '취향믹스매치', '셀프인테리어', '소품취향소비'].map(tag => (
                  <span key={tag} className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-serif mb-6 underline underline-offset-4">이번 주 액션 아이템</h4>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex gap-2"><span className="text-slate-400">01</span> 오늘의집 모듈 가구 카테고리 입점 — "이사 대비" 키워드 선점</li>
                <li className="flex gap-2"><span className="text-slate-400">02</span> 신혼 2인 최적화 콘텐츠 집들이 작성 → 조회수 7,000+ 달성 목표</li>
                <li className="flex gap-2"><span className="text-slate-400">03</span> 조명 3종 세트 패키지 기획 — 수납·러그·조명 홈퍼니싱 TOP3 공략</li>
                <li className="flex gap-2"><span className="text-slate-400">04</span> "가구는 비싼거 사는게 아닙니다" 공감 바이럴 훅 → 가성비 모듈 브랜딩</li>
                <li className="flex gap-2"><span className="text-slate-400">05</span> 자연소재 케어 가이드 무료 배포 → 잠재 고객 DB 확보</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-8 text-white text-4xl leading-none hover:opacity-70" onClick={() => setLightbox(null)}>×</button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="max-h-[82vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-6 text-center px-4">
            <p className="text-white font-serif text-xl">{lightbox.title}</p>
            <span className="inline-block mt-2 bg-white/20 text-white text-xs px-3 py-1 rounded-full tracking-widest uppercase">{lightbox.tag}</span>
          </div>
        </div>
      )}

      <footer className="text-center py-12 border-t border-slate-100 space-y-2">
        <p className="text-slate-400 text-xs tracking-widest uppercase">
          Generated {TODAY_DATE} · 오늘의집 Market Intelligence · Firecrawl MCP
        </p>
        <div className="flex justify-center gap-4 text-xs">
          {sources.map(src => (
            <a key={src.id} href={src.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline hover:text-blue-600 transition-colors">
              {src.url.replace('https://', '')}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default FurnitureTrendCards;
