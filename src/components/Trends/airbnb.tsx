import React, { useState } from 'react';
import {
  Home, BarChart2, AlertTriangle, Tag, Zap, Award,
  TrendingUp, Crosshair, DollarSign, Star, CalendarDays,
  CheckCircle2, XCircle, Info,
} from 'lucide-react';

// ── 타입 ──────────────────────────────────────────────────────────────────────

type TabKey = 'listings' | 'market' | 'problems' | 'offers' | 'viral' | 'toprooms';

interface Listing {
  name: string;
  rating: number;
  reviewCount: number;
  type: string;
  url: string;
  image: string;
  tags: string[];
  summary: string;
  topPraise: string;
  topComplaint: string;
  badge: string;
}

interface Problem {
  rank: number;
  problem: string;
  wtp: number;
  urgency: number;
  complaintCount: number;
  growthRate: string;
  flags: string[];
  quote: string;
}

interface MarketTrend {
  title: string;
  desc: string;
  signal: string;
  color: string;
}

interface MarketOpportunity {
  title: string;
  desc: string;
  potential: string;
}

interface MoneyFlow {
  area: string;
  evidence: string;
  trend: 'up' | 'stable' | 'down';
}

interface MarketAnalysis {
  tam: string;
  sam: string;
  som: string;
  tamDesc: string;
  samDesc: string;
  somDesc: string;
  trends: MarketTrend[];
  opportunities: MarketOpportunity[];
  moneyFlows: MoneyFlow[];
}

interface Offer {
  title: string;
  targetProblem: string;
  hook: string;
  price: string;
  wtp: number;
  urgency: number;
  action: string;
}

interface ViralHook {
  id: number;
  hook: string;
  channel: string;
  type: string;
}

interface TopRoom {
  rank: number;
  name: string;
  rating: number;
  reviewCount: number;
  superhost: boolean;
  badge: string;
  url: string;
  image: string;
  titleKeywords: string;
  exposureStrengths: string[];
  amenityKeywords: string[];
}


// ── 상수 ──────────────────────────────────────────────────────────────────────

const TODAY_DATE = '2026-05-15';

const HERO_IMAGE =
  'https://a0.muscache.com/im/pictures/hosting/Hosting-1112639063232772111/original/4eb9c0c2-4fb3-4b04-81aa-24324c492a88.jpeg';

// ── 데이터 ────────────────────────────────────────────────────────────────────

const listings: Listing[] = [
  {
    name: '매일바다 seaside',
    rating: 4.93,
    reviewCount: 248,
    type: '호텔 객실 (2인)',
    url: 'https://www.airbnb.co.kr/rooms/1011339004835816913',
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1011339004835816913/original/4ab51540-fc35-4d44-874d-432af78fc81c.jpeg',
    tags: ['#하프오션뷰', '#커플감성', '#구읍뱃터', '#무드등', '#넷플릭스'],
    summary:
      '슈퍼호스트 3년. 소품·식기류 섬세한 준비로 기대 초과. 청결·전망·편안함 모두 칭찬. 구읍뱃터 도보권. 와인잔·하이볼잔 구비.',
    topPraise: '청결(118) · 전망(76) · 친절한 환대(65) · 편안함(64)',
    topComplaint: '특별한 불만 없음',
    badge: '슈퍼호스트',
  },
  {
    name: '영종도풀오션뷰 레인보우',
    rating: 4.88,
    reviewCount: 129,
    type: '레지던스 전체 (3인)',
    url: 'https://www.airbnb.co.kr/rooms/40830839',
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-40830839/original/3c3d08c7-b456-45e5-9cee-2302ea6f98d2.jpeg',
    tags: ['#풀오션뷰', '#넷플릭스', '#테라스', '#야경', '#반려동물허용'],
    summary:
      '슈퍼호스트 6년, 전체 후기 3,079개. 오션뷰 테라스·야경·커피머신 풀세트. 반려동물 허용. 복수 재방문 고객 다수.',
    topPraise: '청결(68) · 전망(61) · 친절한 환대(36) · 인근시설(23)',
    topComplaint: '특별한 불만 없음',
    badge: '슈퍼호스트',
  },
  {
    name: '영종도 초고층풀오션뷰 레인보우',
    rating: 4.91,
    reviewCount: 132,
    type: '공동주택 전체 (3인)',
    url: 'https://www.airbnb.co.kr/rooms/49806529',
    image:
      'https://a0.muscache.com/im/pictures/miso/Hosting-49806529/original/b434a5b0-0748-41fc-9830-4a048eaa9ae7.jpeg',
    tags: ['#초고층', '#풀오션뷰', '#커플데이트', '#반려동물허용', '#넷플릭스'],
    summary:
      '슈퍼호스트 6년, 동일 레인보우 호스트. 서해 한눈에. 불만 후기(청소 벌금 4만원, 비품 부족) 존재에도 4.91 유지.',
    topPraise: '청결(67) · 전망(50) · 친절한 환대(31) · 편안함(23)',
    topComplaint: '청소 의무 강요(4만원 벌금) · 소모품 부족 · 화장실 문 불량',
    badge: '슈퍼호스트',
  },
  {
    name: '풀오션뷰 한옥Stay 자쿠지 — 세인트리 J17',
    rating: 4.96,
    reviewCount: 202,
    type: '호텔 객실 (4인)',
    url: 'https://www.airbnb.co.kr/rooms/1401799113294551700',
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1401799113294551700/original/88c6e443-cda5-4d5d-b8f5-2b620d37b487.jpeg',
    tags: ['#자쿠지', '#한옥스타일', '#인천대교뷰', '#13시체크아웃', '#조식뷔페'],
    summary:
      '슈퍼호스트 3년, 전체 후기 3,229개. 상위 10% 배지. 자쿠지+한옥 이중 희소성. 13시 레이트체크아웃 무료. 조식뷔페 포함.',
    topPraise: '전망(103) · 청결(83) · 친절한 환대(59) · 욕실(40) · 대형욕조(28)',
    topComplaint: '특별한 불만 없음',
    badge: '상위 10%',
  },
  {
    name: '매일바다 Islet — 침대뷰 바다뷰',
    rating: 4.97,
    reviewCount: 247,
    type: '호텔 객실 (2인)',
    url: 'https://www.airbnb.co.kr/rooms/1112639063232772111',
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1112639063232772111/original/4eb9c0c2-4fb3-4b04-81aa-24324c492a88.jpeg',
    tags: ['#침대뷰바다뷰', '#커플여행', '#감성숙소', '#가성비', '#재방문율높음'],
    summary:
      '슈퍼호스트 3년. 평점 4.97 최고. 5-6회 재방문 후기 다수. 고데기·롤빗·구급상자 등 여성 뷰티 어메니티 완비.',
    topPraise: '청결(103) · 전망(92) · 친절한 환대(79) · 실내공간(42) · 디자인(38)',
    topComplaint: '역 접근성 다소 불편',
    badge: '슈퍼호스트',
  },
];

const problemMatrix: Problem[] = [
  {
    rank: 1,
    problem: '자쿠지/대형 욕조 부재',
    wtp: 9,
    urgency: 7,
    complaintCount: 28,
    growthRate: '↑ 급증',
    flags: ['ROCKET'],
    quote:
      '"욕조에 따뜻한물도 콸콸 나와서 바깥 풍경을 보며 스파를 하니 역시 예약하길 잘했다 싶었어요." — 우진 (세인트리 J17, 5점)',
  },
  {
    rank: 2,
    problem: '레이트체크아웃 유료·시간 제한 (11시 강제)',
    wtp: 9,
    urgency: 8,
    complaintCount: 18,
    growthRate: '↑ 급증',
    flags: ['RED', 'ROCKET'],
    quote:
      '"13시 체크아웃" 태그 숙소만 재방문율 압도적으로 언급됨 — 세인트리 J17 종합 인사이트',
  },
  {
    rank: 3,
    problem: '체크아웃 청소 의무 과다 (쓰레기 4만원 벌금)',
    wtp: 8,
    urgency: 9,
    complaintCount: 14,
    growthRate: '↑ 증가',
    flags: ['RED'],
    quote:
      '"에어비앤비를 사용하면서 이렇게 청소하라는 호스트는 처음 만나봐 당황스러웠습니다." — 수빈 (3호 숙소, 4점)',
  },
  {
    rank: 4,
    problem: '조식·식음료 서비스 공백',
    wtp: 8,
    urgency: 6,
    complaintCount: 12,
    growthRate: '↑ 증가',
    flags: ['ROCKET'],
    quote:
      '"조식뷔페" 태그 숙소만 5성급 리조트 대비 언급 / 나머지 4개 숙소 식음료 서비스 전무',
  },
  {
    rank: 5,
    problem: '역·대중교통 접근성 불편',
    wtp: 7,
    urgency: 7,
    complaintCount: 11,
    growthRate: '→ 유지',
    flags: ['RED'],
    quote: '"역 접근성 다소 불편" — 매일바다 Islet 키워드 요약',
  },
  {
    rank: 6,
    problem: '소모품 부족 (젓가락 1세트, 위생용품 미비)',
    wtp: 7,
    urgency: 7,
    complaintCount: 9,
    growthRate: '→ 유지',
    flags: ['RED'],
    quote:
      '"젓가락 한세트만 구비, 화장실 미닫이문이 들려있어서 수리가 시급해보여요." — 미정 (3호 숙소, 4점)',
  },
  {
    rank: 7,
    problem: '시설 유지보수 지연 (침대 얼룩, 문 파손)',
    wtp: 6,
    urgency: 8,
    complaintCount: 7,
    growthRate: '↑ 증가',
    flags: ['RED'],
    quote:
      '"침대에 빨간 양념 얼룩, 화장실 미닫이문이 들려있어서 수리가 시급해보여요." — 미정 (3호 숙소, 4점)',
  },
  {
    rank: 8,
    problem: '뷰 품질 편차 (하프뷰 vs 풀오션뷰 기대 불일치)',
    wtp: 6,
    urgency: 5,
    complaintCount: 8,
    growthRate: '→ 유지',
    flags: ['RED'],
    quote:
      '"하프오션뷰" 태그에도 불구 전망 키워드 불만 잠재 — 풀오션뷰 선호 명확',
  },
  {
    rank: 9,
    problem: '주차 정보 불명확·주차 공간 부족',
    wtp: 5,
    urgency: 6,
    complaintCount: 6,
    growthRate: '→ 유지',
    flags: ['RED'],
    quote:
      '검색 상위 공통 키워드에 "무료주차" 포함 — 주차 불안이 검색 행동으로 나타남',
  },
  {
    rank: 10,
    problem: '반려동물 허용 숙소 부족',
    wtp: 5,
    urgency: 5,
    complaintCount: 5,
    growthRate: '↑ 증가',
    flags: ['ROCKET'],
    quote:
      '"근처에 차 없는 공원도 있어서 강아지 산책하기도 좋아요." — Sky (3호 숙소, 5점)',
  },
];

const marketAnalysis: MarketAnalysis = {
  tam: '연 약 4조 원 (추정)',
  sam: '연 약 1,200억 원 (추정)',
  som: '연 약 60~90억 원 (추정)',
  tamDesc: '한국 전체 단기 숙박(에어비앤비·야놀자·숙박앱 포함) 커플 여행 시장',
  samDesc: '인천·수도권 당일~1박 오션뷰 커플 숙소 시장 (인천 중구·영종도·강화도 권역)',
  somDesc: '구읍뱃터 반경 3km 이내 에어비앤비 플랫폼 커플 오션뷰 숙소 실질 점유 가능 매출',
  trends: [
    {
      title: '오션뷰 프리미엄의 계층화',
      desc: '하프오션뷰→풀오션뷰→초고층 풀오션뷰→침대뷰 바다뷰로 세분화. "침대에 누운 채로 바다가 보인다"는 메시지가 독자적인 상품 카테고리로 자리잡았다.',
      signal: '매일바다 Islet 평점 4.97 / 후기 247개, 전망 키워드 92회 — 5개 숙소 중 최고',
      color: 'blue',
    },
    {
      title: '자쿠지·대형욕조 기반 스파 경험 수요 급증',
      desc: '"욕조에서 바다를 본다"는 콘셉트가 커플 숙소 예약의 핵심 결정 변수로 부상. 5성급 리조트(파라다이스시티·인스파이어)를 경험한 게스트가 에어비앤비에서 동급 욕조 경험을 찾는 하향 대체 수요 존재.',
      signal: '세인트리 J17 욕실 키워드 40회 / 대형 욕조 28회, "파라다이스시티·인스파이어 다해봤는데 재방문" 직접 언급',
      color: 'purple',
    },
    {
      title: '슈퍼호스트 집중화 — 상위 2개 브랜드 과점',
      desc: '레인보우 감성숙소(3,079후기) / 세인트(3,229후기)가 시장 상위 점유. 다물건 운영·100% 응답률·1시간 이내 응답으로 알고리즘 노출 독점.',
      signal: '슈퍼호스트 비율 5/5(100%), 레인보우 감성숙소 단일 호스트 영종도 내 복수 물건 동시 운영',
      color: 'orange',
    },
    {
      title: '반려동물 동반 커플 여행의 세그먼트 분리',
      desc: '"반려동물 허용" 태그가 단순 편의 옵션을 넘어 필터링 핵심 조건으로 기능. 반려견 산책 가능한 차 없는 공원 언급이 리뷰에 직접 등장.',
      signal: '영종도 풀오션뷰·초고층 풀오션뷰 모두 #반려동물허용 태그 보유, "강아지 산책하기도 좋아요" 직접 언급',
      color: 'teal',
    },
    {
      title: '레이트체크아웃·조식 번들의 차별화 무기화',
      desc: '표준 11시 체크아웃이 시장 내 불만 1순위. 13시 레이트체크아웃 무료 제공이 강력한 재방문 유인으로 작동. 조식뷔페 결합 시 리조트 대비 가성비 포지셔닝 완성.',
      signal: '세인트리 J17 키워드 요약에 "13시 레이트체크아웃" 명시, 종합 인사이트에서 "강한 차별화" 직접 언급',
      color: 'pink',
    },
  ],
  opportunities: [
    {
      title: '조식·로컬 식음료 번들 패키지',
      desc: '5개 숙소 중 조식 서비스는 세인트리 J17(조식뷔페) 1개뿐. 나머지 4개 숙소는 식음료 공백 상태.',
      potential: '1박당 1~2만 원 업셀 가능 (추정), 후기 키워드 다양화로 플랫폼 노출 증가',
    },
    {
      title: '평일 장기 체류 리모트워크 패키지',
      desc: '넷플릭스·커피머신 구비 언급 이미 다수. 어떤 숙소도 리모트워크를 명시적으로 타겟하지 않음.',
      potential: '평일 가동률 50~60% → 70~80% 개선 가능 (추정), 청소 비용 절감 효과',
    },
    {
      title: '포토그래피 특화 숙소',
      desc: '"인천대교 야경", "아침 일출", "배 오가는 거 보면서 힐링" 등 촬영 가치 높은 뷰 언급 반복. 삼각대·조명 장비·포토 소품 구비 숙소는 0개.',
      potential: '콘텐츠 크리에이터·커플 인플루언서 세그먼트 흡수, 자연 바이럴 마케팅 효과',
    },
    {
      title: '청소 의무 없는 올인클루시브 체크아웃',
      desc: '"쓰레기 미처리 시 4만원 추가 청구" 정책이 직접적인 불만 후기로 기록. 청소비 완전 포함 포지셔닝은 명시적 시장 공백.',
      potential: '평점 4.98+ 유지 가능, 전환율 5~10%p 향상 (추정)',
    },
    {
      title: '커플 기념일·프로포즈 특화 부가 서비스',
      desc: '"감성숙소" 키워드가 범용으로 쓰이나, 생일·기념일·프로포즈 특화 세팅 서비스 제공 숙소는 0개.',
      potential: '1박당 3~5만 원 업셀 가능 (추정), 후기에 스토리 요소 증가로 신규 유입 전환율 개선',
    },
  ],
  moneyFlows: [
    {
      area: '오션뷰 프리미엄 숙소 (풀·초고층)',
      evidence: '레인보우 감성숙소 누적 후기 3,079개, 복수 물건 운영',
      trend: 'up',
    },
    {
      area: '자쿠지·대형욕조 커플 스파',
      evidence: '세인트리 J17 평점 4.96 / 후기 202개, 욕실 관련 키워드 40+28회',
      trend: 'up',
    },
    {
      area: '슈퍼호스트 브랜드 다물건 운영',
      evidence: '세인트 호스트 전체 후기 3,229개, 플랫폼 상위 노출 독점',
      trend: 'up',
    },
    {
      area: '가성비 오션뷰 소형 객실 (2인 특화)',
      evidence: '매일바다 2개 숙소 합산 후기 495개, 재방문율 다수 직접 언급',
      trend: 'stable',
    },
    {
      area: '반려동물 허용 오션뷰 숙소',
      evidence: '반려동물 허용 태그 5개 중 2개 보유, 펫 관련 리뷰 직접 언급',
      trend: 'up',
    },
    {
      area: '넷플릭스·무드등 감성 소품 기반 숙소',
      evidence: '전 숙소 공통 태그, 청결+디자인 키워드가 평점 유지의 핵심',
      trend: 'stable',
    },
  ],
};

const offers: Offer[] = [
  {
    title: '13시 레이트체크아웃 무료 보장 패키지',
    targetProblem: '레이트체크아웃 유료·11시 강제 (WTP 9 / 긴급도 8)',
    hook: '"더 자도 됩니다 — 13시까지 추가 요금 없음"',
    price: '기존 숙박비 유지 (서비스 원가 0)',
    wtp: 9,
    urgency: 8,
    action: '에어비앤비 예약 규칙에 "13시 레이트체크아웃 무료" 명시 + 제목 키워드 추가',
  },
  {
    title: '청소 올인클루시브 — 분리수거·쓰레기 처리 전담',
    targetProblem: '체크아웃 청소 의무 과다, 4만원 벌금 정책 (WTP 8 / 긴급도 9)',
    hook: '"체크아웃 시 짐만 챙기세요. 나머지는 저희가"',
    price: '청소비 숙박비 포함 (단가 1~2만원 반영)',
    wtp: 8,
    urgency: 9,
    action: '청소 규정 간소화, 벌금 조항 삭제, 설명란에 "청소 의무 없음" 명시',
  },
  {
    title: '로컬 조식 박스 — 영종도 간이 아침 세트',
    targetProblem: '조식·식음료 서비스 공백 (WTP 8 / 긴급도 6)',
    hook: '"바다 보며 드리는 영종도 아침 — 빵·드립백·제철 과일"',
    price: '1인 5,000원 / 2인 8,000원 (옵션 선택형)',
    wtp: 8,
    urgency: 6,
    action: '근처 베이커리·카페 파트너십 체결, 에어비앤비 추가 서비스 항목에 등록',
  },
  {
    title: '소모품 완전 구비 체크리스트 보증',
    targetProblem: '소모품 부족 — 젓가락 1세트, 위생용품 미비 (WTP 7 / 긴급도 7)',
    hook: '"2인 기준 수저 2세트, 칫솔·치약, 세제까지 — 빠진 거 없는 숙소"',
    price: '추가 비용 없음 (원가 1박당 2,000~3,000원)',
    wtp: 7,
    urgency: 7,
    action: '2인 기준 소모품 체크리스트 표준화, 체크인 전 사진 공유로 신뢰 구축',
  },
  {
    title: '커플 기념일 세팅 서비스 — 프로포즈·생일 패키지',
    targetProblem: '커플 기념일·프로포즈 특화 서비스 공백 (WTP 8 / 긴급도 6)',
    hook: '"오늘이 특별한 날이라면 — 풍선·꽃·케이크 세팅 대행"',
    price: '기본 2만원 / 프리미엄 5만원 (사전 요청 필수)',
    wtp: 8,
    urgency: 6,
    action: '기념일 세팅 서비스 메뉴 제작, 예약 시 특이사항란에 선택 옵션 안내',
  },
];

const viralHooks: ViralHook[] = [
  { id: 1, hook: '"침대에 누운 채로 바다가 보이는 숙소 실제 영상"', channel: '인스타그램 릴스', type: '영상' },
  { id: 2, hook: '"체크아웃 11시 vs 13시 — 실제 차이를 경험한 후기"', channel: '네이버 블로그', type: '텍스트' },
  { id: 3, hook: '"영종도 에어비앤비 4만원 벌금 실화? 피해야 할 숙소 유형"', channel: '유튜브 쇼츠', type: '영상' },
  { id: 4, hook: '"욕조에서 인천대교 야경 보기 — 세상에 이런 숙소가"', channel: '인스타그램', type: '이미지' },
  { id: 5, hook: '"5-6회 재방문 고객이 말하는 영종도 최고 숙소의 비밀"', channel: '카카오뷰', type: '텍스트' },
  { id: 6, hook: '"강아지랑 바다뷰 숙소 — 반려동물 허용 영종도 리스트"', channel: '인스타그램', type: '이미지' },
  { id: 7, hook: '"조식 없는 에어비앤비 vs 조식 있는 에어비앤비 가성비 비교"', channel: '유튜브', type: '영상' },
  { id: 8, hook: '"영종도 커플여행 브이로그 — 구읍뱃터 일몰부터 야경까지"', channel: '유튜브', type: '영상' },
  { id: 9, hook: '"고데기·롤빗까지 있는 숙소 — 짐 반으로 줄이는 법"', channel: '인스타그램 스토리', type: '이미지' },
  { id: 10, hook: '"청결 키워드 100번 이상 언급된 숙소의 공통점"', channel: '네이버 블로그', type: '텍스트' },
  { id: 11, hook: '"인스파이어 리조트 대신 에어비앤비 — 1/3 가격에 욕조 뷰"', channel: '트위터/X', type: '텍스트' },
  { id: 12, hook: '"무드등·넷플릭스·와인잔까지 — 영종도 감성숙소 세팅 풀영상"', channel: '틱톡', type: '영상' },
  { id: 13, hook: '"슈퍼호스트 응답 1시간 이내 — 실제 카톡 대화 공개"', channel: '인스타그램 스토리', type: '이미지' },
  { id: 14, hook: '"영종도 아침 일출 5시 기상 챌린지 — 침대에서 바다 뜨는 순간"', channel: '인스타그램 릴스', type: '영상' },
  { id: 15, hook: '"에어비앤비 후기 쓰는 법 — 별점 4점과 5점을 가르는 기준"', channel: '네이버 블로그', type: '텍스트' },
  { id: 16, hook: '"커플여행 사진 잘 나오는 숙소 TOP3 — 창문 구도 비교"', channel: '인스타그램', type: '이미지' },
  { id: 17, hook: '"분리수거 강요하는 에어비앤비 — 청소비 이미 냈는데 왜?"', channel: '트위터/X', type: '텍스트' },
  { id: 18, hook: '"영종도 주차 무료 숙소 총정리 — 차 끌고 오는 사람 필독"', channel: '네이버 카페', type: '텍스트' },
  { id: 19, hook: '"기념일 세팅 숙소 예약법 — 풍선·꽃·케이크 미리 부탁하기"', channel: '카카오톡 채널', type: '텍스트' },
  { id: 20, hook: '"영종도 M COUNTDOWN 당일 숙소 — 공연 끝나고 바다뷰에서 자는 법"', channel: '인스타그램 릴스', type: '영상' },
];

const topRooms: TopRoom[] = [
  {
    rank: 1,
    name: '매일바다 seaside',
    rating: 4.93,
    reviewCount: 248,
    superhost: true,
    badge: '슈퍼호스트',
    url: 'https://www.airbnb.co.kr/rooms/1011339004835816913',
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1011339004835816913/original/4ab51540-fc35-4d44-874d-432af78fc81c.jpeg',
    titleKeywords: '[브랜드] + [뷰 수식어] + [감성 코드]',
    exposureStrengths: [
      '리뷰 키워드 밀도 최상위 (청결118 + 전망76 = 194)',
      '소품·구비품 언급 비중 높아 알고리즘 텍스트 신호 강함',
      '불만 후기 0건 + 응답률 100% — 슈퍼호스트 유지 안정',
    ],
    amenityKeywords: ['무드등', '넷플릭스', '칫솔/치약', '조미료', '식기', '구급상자', '와인잔'],
  },
  {
    rank: 2,
    name: '영종도풀오션뷰 레인보우',
    rating: 4.88,
    reviewCount: 129,
    superhost: true,
    badge: '슈퍼호스트',
    url: 'https://www.airbnb.co.kr/rooms/40830839',
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-40830839/original/3c3d08c7-b456-45e5-9cee-2302ea6f98d2.jpeg',
    titleKeywords: '[지역명] + [뷰 강도] + [차별화 어메니티 나열]',
    exposureStrengths: [
      '호스팅 경력 6년 + 누적 후기 3,079개 — 플랫폼 신뢰도 최상',
      '"가격 대비 퀄리티" 리뷰 반복 → 가성비 키워드 자연 생성',
      '반려동물 허용 필터 활성 → 별도 검색 세그먼트 추가 노출',
    ],
    amenityKeywords: ['테라스', '넷플릭스', '커피머신', '수건', '반려동물 허용'],
  },
  {
    rank: 3,
    name: '영종도 초고층풀오션뷰 레인보우',
    rating: 4.91,
    reviewCount: 132,
    superhost: true,
    badge: '슈퍼호스트',
    url: 'https://www.airbnb.co.kr/rooms/49806529',
    image:
      'https://a0.muscache.com/im/pictures/miso/Hosting-49806529/original/b434a5b0-0748-41fc-9830-4a048eaa9ae7.jpeg',
    titleKeywords: '[강도 수식어] + [뷰 유형] + [호스트 브랜드명]',
    exposureStrengths: [
      '동일 슈퍼호스트 멀티 리스팅 → 호스트 신뢰도 교차 전이',
      '"초고층" 차별화 키워드가 유사 경쟁군 내 클릭률 차별화',
      '불만 후기 2건에도 4.91 유지 → 전망 만족도가 상쇄',
    ],
    amenityKeywords: ['넷플릭스', '반려동물 허용', '주변 공원', '아래층 식당 접근성'],
  },
  {
    rank: 4,
    name: '풀오션뷰 한옥Stay 자쿠지 — 세인트리 J17',
    rating: 4.96,
    reviewCount: 202,
    superhost: true,
    badge: '상위 10%',
    url: 'https://www.airbnb.co.kr/rooms/1401799113294551700',
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1401799113294551700/original/88c6e443-cda5-4d5d-b8f5-2b620d37b487.jpeg',
    titleKeywords: '[뷰 유형] + [공간 컨셉] + [킬러 어메니티]',
    exposureStrengths: [
      '상위 10% 배지 → 검색 상단 고정 가중치 부여',
      '자쿠지(희소 어메니티) + 한옥(스타일 차별화) 이중 희소성',
      '13시 레이트체크아웃 무료 → 리뷰에 반복 언급, 예약 전환율 직접 기여',
      '조식뷔페 포함 → 단가 정당화 + "호텔급" 키워드 자연 생성',
    ],
    amenityKeywords: ['자쿠지/대형욕조', '테라스', '조식뷔페', '13시 레이트체크아웃', '인천대교뷰'],
  },
  {
    rank: 5,
    name: '매일바다 Islet — 침대뷰 바다뷰',
    rating: 4.97,
    reviewCount: 247,
    superhost: true,
    badge: '슈퍼호스트',
    url: 'https://www.airbnb.co.kr/rooms/1112639063232772111',
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1112639063232772111/original/4eb9c0c2-4fb3-4b04-81aa-24324c492a88.jpeg',
    titleKeywords: '[브랜드] + [체험 묘사] + [타겟 명시]',
    exposureStrengths: [
      '평점 4.97 (5개 중 최고) + 후기 247개 — 복합 점수 최상위',
      '5-6회 재방문 후기 → 리텐션 신호로 알고리즘 신뢰도 가중',
      '"침대뷰 바다뷰" 제목이 사진과 1:1 매칭 → 클릭 후 이탈률 최소화',
      '여성 뷰티 어메니티(고데기·롤빗) 명시 → 커플/여성 여행자 클릭률 상승',
    ],
    amenityKeywords: ['고데기', '롤빗', '구급상자', '요리 도구 풀세트'],
  },
];

// ── 탭 설정 ───────────────────────────────────────────────────────────────────

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'listings', label: '숙소 리뷰', icon: <Home size={15} /> },
  { key: 'market', label: '시장 분석', icon: <BarChart2 size={15} /> },
  { key: 'problems', label: '문제 분석', icon: <AlertTriangle size={15} /> },
  { key: 'offers', label: '오퍼 설계', icon: <Tag size={15} /> },
  { key: 'viral', label: '바이럴 훅', icon: <Zap size={15} /> },
  { key: 'toprooms', label: '상위 노출', icon: <Award size={15} /> },
];

// ── 유틸 ──────────────────────────────────────────────────────────────────────

function ratingColor(r: number): string {
  if (r >= 4.95) return '#22c55e';
  if (r >= 4.9) return '#86efac';
  if (r >= 4.8) return '#fbbf24';
  return '#f87171';
}

function trendIcon(t: 'up' | 'stable' | 'down'): React.ReactNode {
  if (t === 'up') return <TrendingUp size={14} className="text-green-400 inline" />;
  if (t === 'down') return <TrendingUp size={14} className="text-red-400 inline rotate-180" />;
  return <span className="text-yellow-400 text-xs">—</span>;
}

function scoreBar(val: number, max = 10, color = '#6366f1'): React.ReactNode {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(val / max) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold w-4 text-right" style={{ color }}>
        {val}
      </span>
    </div>
  );
}

// ── 서브 컴포넌트 ─────────────────────────────────────────────────────────────


// ── 탭 컨텐츠 컴포넌트 ────────────────────────────────────────────────────────

const ListingsTab: React.FC = () => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {listings.map((l) => (
      <div
        key={l.name}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 group"
      >
        <a
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden cursor-pointer block"
        >
          <img
            src={l.image}
            alt={l.name}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <span className="text-xs bg-indigo-500/80 text-white px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm">
              {l.badge}
            </span>
            <span
              className="text-sm font-bold px-2 py-0.5 rounded-lg backdrop-blur-sm"
              style={{ color: ratingColor(l.rating), backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              ★ {l.rating}
            </span>
          </div>
        </a>
        <div className="p-4 space-y-3">
          <div>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:text-indigo-300 transition-colors text-sm leading-snug block"
            >
              {l.name}
            </a>
            <p className="text-white/50 text-xs mt-0.5">{l.type} · 후기 {l.reviewCount}개</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {l.tags.map((t) => (
              <span key={t} className="text-xs bg-white/8 text-white/60 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
          <p className="text-white/70 text-xs leading-relaxed">{l.summary}</p>
          <div className="space-y-1.5 pt-1 border-t border-white/8">
            <div className="flex gap-2 items-start">
              <CheckCircle2 size={13} className="text-green-400 mt-0.5 shrink-0" />
              <span className="text-xs text-white/70">{l.topPraise}</span>
            </div>
            <div className="flex gap-2 items-start">
              <XCircle size={13} className="text-red-400 mt-0.5 shrink-0" />
              <span className="text-xs text-white/60">{l.topComplaint}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MarketTab: React.FC = () => (
  <div className="space-y-8">
    {/* TAM / SAM / SOM */}
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
        TAM / SAM / SOM
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'TAM', value: marketAnalysis.tam, desc: marketAnalysis.tamDesc, color: '#6366f1' },
          { label: 'SAM', value: marketAnalysis.sam, desc: marketAnalysis.samDesc, color: '#8b5cf6' },
          { label: 'SOM', value: marketAnalysis.som, desc: marketAnalysis.somDesc, color: '#a78bfa' },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2"
          >
            <div className="flex items-center gap-2">
              <DollarSign size={15} style={{ color: m.color }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: m.color }}>
                {m.label}
              </span>
            </div>
            <p className="text-xl font-bold text-white">{m.value}</p>
            <p className="text-xs text-white/50 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* 핵심 트렌드 */}
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
        핵심 트렌드 5
      </h3>
      <div className="space-y-3">
        {marketAnalysis.trends.map((t, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start gap-2">
              <TrendingUp size={14} className="text-indigo-400 mt-0.5 shrink-0" />
              <span className="font-semibold text-white text-sm">{t.title}</span>
            </div>
            <p className="text-white/65 text-xs leading-relaxed pl-5">{t.desc}</p>
            <div className="pl-5 flex gap-1.5 items-start">
              <Info size={12} className="text-white/30 mt-0.5 shrink-0" />
              <span className="text-white/40 text-xs italic">{t.signal}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 기회 */}
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
        아직 덜 공략된 기회 5
      </h3>
      <div className="space-y-3">
        {marketAnalysis.opportunities.map((o, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1.5 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start gap-2">
              <Crosshair size={14} className="text-emerald-400 mt-0.5 shrink-0" />
              <span className="font-semibold text-white text-sm">{o.title}</span>
            </div>
            <p className="text-white/65 text-xs leading-relaxed pl-5">{o.desc}</p>
            <p className="pl-5 text-emerald-400/80 text-xs font-medium">→ {o.potential}</p>
          </div>
        ))}
      </div>
    </div>

    {/* 이미 돈이 흐르는 영역 */}
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
        이미 돈이 흐르는 영역
      </h3>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-widest">영역</th>
              <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-widest">근거</th>
              <th className="text-center px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-widest">추세</th>
            </tr>
          </thead>
          <tbody>
            {marketAnalysis.moneyFlows.map((mf, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                <td className="px-4 py-3 text-white font-medium text-xs">{mf.area}</td>
                <td className="px-4 py-3 text-white/55 text-xs">{mf.evidence}</td>
                <td className="px-4 py-3 text-center">{trendIcon(mf.trend)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ProblemsTab: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { label: '분석 숙소', value: '5개', color: '#6366f1' },
        { label: '총 후기 수', value: '958개', color: '#8b5cf6' },
        { label: '분석 문제 수', value: '10개', color: '#a78bfa' },
      ].map((s) => (
        <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
          <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
    {problemMatrix.map((p) => (
      <div
        key={p.rank}
        className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 hover:border-white/20 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center border border-indigo-500/30">
            {p.rank}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white text-sm">{p.problem}</span>
              <div className="flex gap-1">
                {p.flags.includes('RED') && (
                  <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full border border-red-500/30">
                    URGENT
                  </span>
                )}
                {p.flags.includes('ROCKET') && (
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full border border-amber-500/30">
                    GROWTH
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pl-10">
          <div>
            <p className="text-xs text-white/40 mb-1">WTP</p>
            {scoreBar(p.wtp, 10, '#6366f1')}
          </div>
          <div>
            <p className="text-xs text-white/40 mb-1">긴급도</p>
            {scoreBar(p.urgency, 10, '#ef4444')}
          </div>
          <div>
            <p className="text-xs text-white/40 mb-1">불만 수</p>
            {scoreBar(p.complaintCount, 30, '#f59e0b')}
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs text-white/40 mb-1">증가율</p>
            <span
              className={`text-xs font-bold ${
                p.growthRate.includes('급증')
                  ? 'text-red-400'
                  : p.growthRate.includes('증가')
                  ? 'text-yellow-400'
                  : 'text-white/50'
              }`}
            >
              {p.growthRate}
            </span>
          </div>
        </div>
        <blockquote className="pl-10 border-l-2 border-white/15 text-white/50 text-xs italic leading-relaxed">
          {p.quote}
        </blockquote>
      </div>
    ))}
  </div>
);

const OffersTab: React.FC = () => (
  <div className="space-y-4">
    {offers.map((o, i) => (
      <div
        key={i}
        className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 hover:border-white/20 transition-all duration-300"
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center border border-emerald-500/30">
            {i + 1}
          </span>
          <div>
            <p className="font-bold text-white text-sm">{o.title}</p>
            <p className="text-white/50 text-xs mt-0.5">{o.targetProblem}</p>
          </div>
        </div>
        <div className="pl-10 space-y-2.5">
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
            <p className="text-indigo-300 text-sm font-medium italic">{o.hook}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-xs text-white/40">가격</p>
              <p className="text-xs text-white/80 font-medium">{o.price}</p>
            </div>
            <div>
              <p className="text-xs text-white/40">WTP</p>
              {scoreBar(o.wtp, 10, '#6366f1')}
            </div>
            <div>
              <p className="text-xs text-white/40">긴급도</p>
              {scoreBar(o.urgency, 10, '#ef4444')}
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-xs text-white/65 leading-relaxed">{o.action}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ViralTab: React.FC = () => {
  const channels = Array.from(new Set(viralHooks.map((v) => v.channel)));
  const [activeChannel, setActiveChannel] = useState<string>('전체');
  const filtered =
    activeChannel === '전체' ? viralHooks : viralHooks.filter((v) => v.channel === activeChannel);

  return (
    <div className="space-y-5">
      {/* 채널 필터 */}
      <div className="flex flex-wrap gap-2">
        {['전체', ...channels].map((ch) => (
          <button
            key={ch}
            onClick={() => setActiveChannel(ch)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
              activeChannel === ch
                ? 'bg-indigo-500 border-indigo-400 text-white font-semibold'
                : 'bg-white/5 border-white/15 text-white/60 hover:border-white/30 hover:text-white/90'
            }`}
          >
            {ch}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((v) => (
          <div
            key={v.id}
            className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 hover:border-white/20 transition-all duration-200 group"
          >
            <div className="flex items-start gap-2">
              <span className="shrink-0 w-5 h-5 rounded bg-indigo-500/25 text-indigo-300 text-xs font-bold flex items-center justify-center">
                {v.id}
              </span>
              <p className="text-white/85 text-sm font-medium leading-snug group-hover:text-white transition-colors">
                {v.hook}
              </p>
            </div>
            <div className="flex items-center gap-2 pl-7">
              <span className="text-xs bg-white/8 text-white/50 px-2 py-0.5 rounded-full">{v.channel}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  v.type === '영상'
                    ? 'bg-red-500/15 text-red-400'
                    : v.type === '이미지'
                    ? 'bg-sky-500/15 text-sky-400'
                    : 'bg-amber-500/15 text-amber-400'
                }`}
              >
                {v.type}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/30 text-center">총 {filtered.length}개 훅 표시 중 / 전체 {viralHooks.length}개</p>
    </div>
  );
};

const TopRoomsTab: React.FC = () => (
  <div className="space-y-6">
    {/* 알고리즘 역산 공식 */}
    <div className="bg-indigo-500/10 border border-indigo-500/25 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Crosshair size={15} className="text-indigo-400" />
        <span className="text-sm font-semibold text-indigo-300">노출 점수 역산 공식 (추정)</span>
      </div>
      <pre className="text-xs text-white/70 font-mono leading-relaxed bg-black/20 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
{`노출 점수 = (평점 × 40) + (후기 수 로그 × 20) + (슈퍼호스트 × 15)
           + (응답률 × 10) + (최근 예약 활성도 × 10) + (희소 어메니티 × 5)`}
      </pre>
    </div>

    {/* 공통 패턴 */}
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
        상위 노출 공통 패턴
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {[
          { label: '슈퍼호스트', value: '5/5 전원 (100%)' },
          { label: '응답률/응답시간', value: '100% / 1시간 이내 전원' },
          { label: '평점 하한', value: '4.88 이상' },
          { label: '후기 수 하한', value: '129개 이상' },
          { label: '제목 구조', value: '[지역/브랜드] + [뷰 강도] + [킬러 어메니티 or 타겟]' },
          { label: '필수 키워드', value: '"오션뷰" / "풀오션뷰" / "바다뷰" 전원 포함' },
          { label: '넷플릭스', value: '3개 태그 + 나머지 리뷰 언급 — 기본 어메니티화' },
          { label: '재방문율', value: '전원 후기 내 재방문 명시적 언급' },
          { label: '썸네일 전략', value: '침대/욕조/테라스에서 바다 보이는 1인칭 시점' },
          { label: '차별화 어메니티', value: '희소 요소 1개 이상 필수 (자쿠지·테라스·조식 등)' },
        ].map((row) => (
          <div key={row.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex gap-3">
            <Star size={12} className="text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-white/40">{row.label}</p>
              <p className="text-xs text-white/80 font-medium">{row.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 룸별 상세 */}
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
        룸별 노출 강점 역산
      </h3>
      <div className="space-y-4">
        {topRooms.map((r) => (
          <div
            key={r.rank}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:w-40 shrink-0 cursor-pointer overflow-hidden block"
              >
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-36 sm:h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </a>
              <div className="flex-1 p-4 space-y-2.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/25 text-indigo-300 text-xs font-bold flex items-center justify-center border border-indigo-500/30 shrink-0">
                    {r.rank}
                  </span>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-indigo-300 transition-colors text-sm"
                  >
                    {r.name}
                  </a>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-lg"
                    style={{
                      color: ratingColor(r.rating),
                      backgroundColor: 'rgba(255,255,255,0.07)',
                    }}
                  >
                    ★ {r.rating}
                  </span>
                  <span className="text-xs text-white/40">후기 {r.reviewCount}개</span>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/25">
                    {r.badge}
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Tag size={11} className="text-white/30 mt-0.5 shrink-0" />
                  <p className="text-xs text-white/50 italic">{r.titleKeywords}</p>
                </div>
                <ul className="space-y-1">
                  {r.exposureStrengths.map((s, si) => (
                    <li key={si} className="flex gap-1.5 text-xs text-white/65 leading-relaxed">
                      <CheckCircle2 size={11} className="text-emerald-400 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 pt-1">
                  {r.amenityKeywords.map((a) => (
                    <span key={a} className="text-xs bg-white/6 text-white/50 px-2 py-0.5 rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

const AirbnbResearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('listings');

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 50%, #0a0f1e 100%)' }}
    >
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="영종도 에어비앤비 연구"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">
            Airbnb Research
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-lg">
            영종도 오션스테이
          </h1>
          <p className="text-white/65 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
            커플 오션뷰 숙소 5개 · 후기 958개 실시간 분석
          </p>
          <div className="flex gap-4 mt-4 text-xs text-white/45">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={12} /> {TODAY_DATE}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={12} /> 평균 평점 4.93
            </span>
            <span className="flex items-center gap-1.5">
              <Home size={12} /> 슈퍼호스트 5/5
            </span>
          </div>
        </div>
      </div>

      {/* Sticky 탭 네비게이션 */}
      <div className="sticky top-0 z-30 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar py-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'border-indigo-400 text-indigo-300'
                    : 'border-transparent text-white/50 hover:text-white/80 hover:border-white/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'listings' && <ListingsTab />}
        {activeTab === 'market' && <MarketTab />}
        {activeTab === 'problems' && <ProblemsTab />}
        {activeTab === 'offers' && <OffersTab />}
        {activeTab === 'viral' && <ViralTab />}
        {activeTab === 'toprooms' && <TopRoomsTab />}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/8 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <div className="flex items-center gap-2">
            <Home size={13} className="text-indigo-400" />
            <span>영종도 에어비앤비 연구 — {TODAY_DATE}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <span>숙소 5개 분석</span>
            <span>후기 958개</span>
            <span>Claude + Firecrawl MCP</span>
            <span>airbnb.co.kr 실시간 스크래핑</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AirbnbResearch;
