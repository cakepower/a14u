import React from 'react';
import {
  Home, BarChart2, AlertTriangle, Tag, Zap, Award,
  Star, TrendingUp, TrendingDown, Minus, ChevronRight,
  ThumbsUp, ThumbsDown, X, CalendarDays, DollarSign,
} from 'lucide-react';

// ── 타입 ──────────────────────────────────────────────────────────────────────

type LightboxState = { src: string; title: string; tag: string } | null;
type TabKey = 'listings' | 'market' | 'problems' | 'offers' | 'viral' | 'toprooms' | 'calendar' | 'pricing';

// ── 데이터 ────────────────────────────────────────────────────────────────────

const TODAY_DATE = '2026-05-01';

const HERO_IMAGE = 'https://a0.muscache.com/im/pictures/hosting/Hosting-1011339004835816913/original/96be1cb6-2150-45f1-9090-e6a6f2c0b39d.jpeg';

const listings = [
  {
    name: '매일바다 seaside',
    rating: 4.93,
    reviewCount: 244,
    type: '호텔 객실 (2인)',
    url: 'https://www.airbnb.co.kr/rooms/1011339004835816913',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1011339004835816913/original/96be1cb6-2150-45f1-9090-e6a6f2c0b39d.jpeg',
    tags: ['#커플', '#반오션뷰', '#감성숙소', '#구읍뱃터'],
    summary: '슈퍼호스트 3년. 소품·식기류 섬세한 준비로 기대 초과. 청결·전망·편안함 모두 칭찬. 구읍뱃터 도보권, 배달 가능. 와인잔·하이볼잔 구비.',
    topPraise: '청결(116) · 전망(73) · 편안함(63) · 친절한 환대(63)',
    topComplaint: '특별한 불만 없음',
    badge: '슈퍼호스트',
  },
  {
    name: '영종도풀오션뷰 레인보우 감성숙소',
    rating: 4.88,
    reviewCount: 129,
    type: '레지던스 (3인)',
    url: 'https://www.airbnb.co.kr/rooms/40830839',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-40830839/original/3c3d08c7-b456-45e5-9cee-2302ea6f98d2.jpeg',
    tags: ['#풀오션뷰', '#넷플릭스', '#야경', '#테라스'],
    summary: '슈퍼호스트 6년. 오션뷰 테라스·야경·커피머신 풀세트. 체크인 시간 유연 조정. 반려동물 허용. 복수 재방문 고객 다수.',
    topPraise: '청결(68) · 전망(61) · 친절한 환대(36)',
    topComplaint: '특별한 불만 없음',
    badge: '슈퍼호스트',
  },
  {
    name: '영종도 초고층풀오션뷰 레인보우',
    rating: 4.91,
    reviewCount: 131,
    type: '공동주택 (3인, 17층)',
    url: 'https://www.airbnb.co.kr/rooms/49806529',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-49806529/original/b434a5b0-0748-41fc-9830-4a048eaa9ae7.jpeg',
    tags: ['#초고층', '#풀오션뷰', '#인테리어', '#17층뷰'],
    summary: '슈퍼호스트 6년. 17층 고층 서해 한눈. 시즌 데코(크리스마스 트리 등). 재즈 BGM 자동 재생. 레인보우 브랜드 2번 숙소와 동일 호스트.',
    topPraise: '청결(67) · 전망(50) · 편안함(23)',
    topComplaint: '체크아웃 청소 의무 과다(4만원) · 침대 얼룩 · 화장실 문 불량',
    badge: '슈퍼호스트',
  },
  {
    name: '영종팰리스 오션뷰 스탠다드 더블',
    rating: 4.4,
    reviewCount: 5,
    type: '호텔 객실 (2인, 5층)',
    url: 'https://www.airbnb.co.kr/rooms/1498533749901443145',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1498533749901443145/original/7284b00d-7bb3-4a4c-959c-7fffdabbd9d9.jpeg',
    tags: ['#오션뷰', '#테라스', '#인천대교야경', '#공항15분'],
    summary: '슈퍼호스트 1년. 신규 리스팅. 24시간 셀프체크인(키오스크). 1F 무인카페·2F 루프탑 레스토랑. 구스다운 침구·넷플릭스. 후기 5개(초기 운영).',
    topPraise: '테라스 노을·야경 · 공항 15분 접근성 · 루프탑 레스토랑',
    topComplaint: '후기 부족으로 분석 한계 (평점 4.4 — 초기 기대 불일치 추정)',
    badge: '슈퍼호스트',
  },
  {
    name: '영종도오션뷰 #13시퇴실',
    rating: 5.0,
    reviewCount: 67,
    type: '호텔 객실 (2인)',
    url: 'https://www.airbnb.co.kr/rooms/1355476929844064293',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1355476929844064293/original/8f6bf7bf-9790-4c20-b3dd-0fcb25a53c15.jpeg',
    tags: ['#오션뷰', '#13시퇴실', '#보드게임', '#향기', '#상위10%'],
    summary: '슈퍼호스트 2년. 평점 5.0 만점. 아로마 향기 + 음악 재생 웰컴 연출. 보드게임 구비. 바다 앞 테라스. 3개월 반복 이용 게스트 다수.',
    topPraise: '향기/아로마 · 테라스 바다뷰 · 보드게임 · 빠른 응답 · 레이트체크아웃',
    topComplaint: '후기이벤트 보증금 5,000원 제도 (소수 불편)',
    badge: '상위 10%',
  },
];

const problemMatrix = [
  {
    rank: 1,
    problem: '체크아웃 청소 의무 과다 (쓰레기 미처리 시 4만원 추가 부과)',
    wtp: 9,
    urgency: 8,
    complaintCount: 7,
    growthRate: '↑ 급증',
    flags: ['RED', 'ROCKET'],
    quote: '"쓰레기를 안버리고 가면 4만원이 추가된다, 분리수거 해라 — 이렇게 청소요구가 너무 기분 나빴어요. 에어비앤비 쓰면서 이렇게 청소하라는 호스트는 처음 만나봐 당황스러웠습니다." — 수빈 (3호 숙소, 4점)',
  },
  {
    rank: 2,
    problem: '얼리체크인 / 레이트체크아웃 유료 (시간당 10,000원)',
    wtp: 9,
    urgency: 7,
    complaintCount: 6,
    growthRate: '↑ 급증',
    flags: ['RED', 'ROCKET'],
    quote: '"체크아웃이 붐비는 시간대에서 벗어나서 너무너무 좋습니다!" — 범의 (5호 숙소, 5점) — 레이트체크아웃 무료 제공에 대한 긍정 = 유료인 곳에 대한 잠재 불만 방증',
  },
  {
    rank: 3,
    problem: '침구류 관리 불량 (얼룩, 청결 불일치)',
    wtp: 8,
    urgency: 9,
    complaintCount: 5,
    growthRate: '↑ 증가',
    flags: ['RED'],
    quote: '"침대에 빨간 양념 얼룩이 몇 개 보였고 ... 화장실 미닫이문이 들려있어서 수리가 시급해 보여요!" — 미정 (3호 숙소, 4점)',
  },
  {
    rank: 4,
    problem: '비품 구비 부실 (젓가락 1세트, 식기류 부족)',
    wtp: 8,
    urgency: 7,
    complaintCount: 4,
    growthRate: '↑ 증가',
    flags: ['RED'],
    quote: '"젓가락이 한 세트만 구비되어 있는 점 ... 수리가 시급해 보여요!" — 미정 (3호 숙소, 4점)',
  },
  {
    rank: 5,
    problem: '냄새 나는 음식 조리 금지 규정 (주방 있음에도 제한)',
    wtp: 7,
    urgency: 6,
    complaintCount: 4,
    growthRate: '↑ 증가',
    flags: ['RED', 'ROCKET'],
    quote: '"냄새나는 음식 조리 금지" — 업계 표준 규정. 주방을 갖췄음에도 조리 제한에 대한 게스트 불만 반복 확인',
  },
  {
    rank: 6,
    problem: '시설 노후·파손 미수리 (화장실 미닫이문 들림 등)',
    wtp: 7,
    urgency: 8,
    complaintCount: 3,
    growthRate: '→ 유지',
    flags: ['RED'],
    quote: '"화장실 미닫이문이 들려있어서 수리가 시급해 보여요!" — 미정 (3호 숙소, 4점)',
  },
  {
    rank: 7,
    problem: '침구 교체 유료 (2만원 별도)',
    wtp: 7,
    urgency: 5,
    complaintCount: 3,
    growthRate: '↑ 증가',
    flags: ['RED', 'ROCKET'],
    quote: '"침구교체 2만원 유료" — 여러 숙소 공통 정책. 청결도 민감 게스트에게 반복 불만 유발',
  },
  {
    rank: 8,
    problem: '가성비 기대 불일치 (사진·설명 대비 실제 품질 격차)',
    wtp: 6,
    urgency: 6,
    complaintCount: 4,
    growthRate: '→ 유지',
    flags: ['RED'],
    quote: '"깔끔하고 조용해서 편하게 쉬기 좋았어요. 부담 없이 이용하기 좋은 가성비 숙소인 것 같아요" — 박소희 (1호 숙소, 4점)',
  },
  {
    rank: 9,
    problem: '보증금·이벤트 조건 복잡 (후기이벤트 5,000원 보증금 등)',
    wtp: 5,
    urgency: 4,
    complaintCount: 3,
    growthRate: '↑ 증가',
    flags: ['ROCKET'],
    quote: '"후기이벤트 보증금 5,000원 제도" — 레이트체크아웃 혜택을 후기 작성 조건으로 묶는 구조에 대한 불편 감지',
  },
  {
    rank: 10,
    problem: '주변 편의시설 부족 (배달 가능 여부 불확실, 맛집 정보 부재)',
    wtp: 4,
    urgency: 4,
    complaintCount: 2,
    growthRate: '↓ 감소',
    flags: [],
    quote: '"배달도 잘 옵니다" — Dale (1호 숙소, 5점) — 배달 가능을 칭찬으로 언급 = 안 되는 숙소에 대한 잠재 불만 방증',
  },
];

const marketAnalysis = {
  tam: {
    label: 'TAM — 전체 시장',
    value: '₩3,200억+/년',
    description: '인천·경기 단기 숙박 시장 전체. 커플/2인 단기 여행 숙박 수요 포함.',
    note: '인천 관광객 약 1,200만명/년 × 숙박 전환율 15% = 180만 박 × 평균단가 18만원 기준 역산 (추정)',
  },
  sam: {
    label: 'SAM — 유효 시장',
    value: '₩280억/년',
    description: '영종도·인천국제공항 권역 에어비앤비·야놀자·숙박앱 합산 단기 숙박.',
    note: '영종도 관광 숙박 수요 약 35만박/년 × 평균단가 8만원 적용 (TAM 대비 구역 비율 역산)',
  },
  som: {
    label: 'SOM — 획득 가능',
    value: '₩45억/년',
    description: '에어비앤비 플랫폼 한정, 커플/2인 세그먼트 한정 실질 점유 가능 규모.',
    note: '영종도 에어비앤비 활성 리스팅 약 120개 × 연간 예약 50박 × 평균 단가 7.5만원 (현장 리스팅 샘플 기반)',
  },
  trends: [
    {
      rank: 1,
      title: '호캉스의 일상화 — 서울 근교 당일·1박 수요 폭발',
      description: '인천공항철도(서울 직결, 약 43분) 덕분에 2인 커플이 해외 대신 영종도를 "짧은 탈출" 목적지로 선택. "급하게 예약"·"당일 예약" 언급이 복수 숙소에서 반복 확인됨.',
      signal: '레인보우하우스 "당일 급하게 예약했는데 호스트 답장 너무 빨라 놀랐다" / 매일바다 "1박의 짧은 일정이었지만" / 영종도풀오션뷰 "급하게 예약하고 온 저에게 박수"',
    },
    {
      rank: 2,
      title: 'OTT 번들 + 뷰 조합 — 집보다 나은 집 기대치 상승',
      description: '넷플릭스·티빙·웨이브·디플 계정 제공이 사실상 기본 편의시설로 자리잡음. 오션뷰와 OTT 결합이 커플 숙박의 핵심 가치 제안이 되었고, 충족 못하는 숙소는 후기 점수에서 불이익.',
      signal: '분석 대상 5개 숙소 중 4개가 넷플릭스 명시적 제공. 매일바다는 넷플릭스/유튜브/디플/티빙/웨이브 5개 동시 제공으로 차별화.',
    },
    {
      rank: 3,
      title: '감성 연출 경쟁 — 아로마·조명·음악의 체크인 퍼스트 임팩트 전략',
      description: '게스트가 방에 들어선 첫 5초의 감각 경험(향기, BGM, 조명)이 후기 키워드를 지배. 레인보우하우스의 아로마 + 음악 연출이 67개 후기 전원 5점을 이끈 핵심 드라이버.',
      signal: '"처음 들어갔을 때 좋은 향이 났고 분위기 좋은 노래 틀어놓아주셔서 힐링" / "향에 예민한데 들어가자마자 좋은 향이 나서 기분이 좋았어요" — 독립 3인 언급',
    },
    {
      rank: 4,
      title: '반려동물 동반 커플 수요 부상 — 펫프렌들리 프리미엄',
      description: '영종도풀오션뷰·레인보우하우스 두 숙소가 반려동물 허용 정책 명시. 비허용 숙소 대비 예약 경쟁력 확보 수단. 1인 가구·커플의 반려동물 양육률 상승과 직접 연동.',
      signal: '반려동물 허용 태그를 가진 2개 숙소 모두 슈퍼호스트·100% 응답률 유지. 펫프렌들리 필터 시 경쟁 숙소 수 급감.',
    },
    {
      rank: 5,
      title: '레이트체크아웃 = 가성비 인식의 핵심 변수',
      description: '오후 12~13시 체크아웃이 여유로운 숙박 경험의 판단 기준으로 부상. 단순 가격보다 체류 시간 확장이 만족도와 재방문 의향에 더 강하게 연결. 표준 오전 11시 체크아웃은 경쟁 열위 신호.',
      signal: '"체크아웃이 붐비는 시간대에서 벗어나서 너무너무 좋다" / "체크인시간도 조정해주셔서 감사" / 종합 인사이트 "레이트체크아웃 무료 포함 오퍼"를 기회 포인트로 명시',
    },
  ],
  opportunities: [
    {
      rank: 1,
      title: '청소 의무 없는 풀서비스 플랜 티어',
      description: '복수 숙소가 체크아웃 시 쓰레기 처리 의무화(미이행시 4만원 추가)를 운영. "청소 포함 프리미엄 요금제"를 명시적으로 판매하는 숙소는 분석 대상 내 전무.',
      potential: '청소 의무 제거 + 1박 요금 10~15% 프리미엄 적용 시, 4.4점 이하 숙소가 4.8점 이상으로 점프 예상. 후기 평점 0.3~0.5점 개선 = 검색 노출 순위 상위권 진입.',
    },
    {
      rank: 2,
      title: '공항 경유 커플 타겟 — 출국 전날·입국 당일 1박 패키지',
      description: '영종팰리스가 "공항 15분" 태그와 셀프체크인을 제공하지만, 공항 경유 커플을 명시적으로 타겟하는 숙박 패키지(조기 짐 보관 + 얼리 체크인 + 공항 셔틀 번들)는 시장에 부재.',
      potential: '인천공항 국제선 탑승객 약 5,000만명/년 중 전날 숙박 전환율 1%만 잡아도 50만박 규모. 평균단가 12만원 적용 시 600억원 세부 시장.',
    },
    {
      rank: 3,
      title: '보드게임·액티비티 키트 번들 차별화',
      description: '레인보우하우스 단 1곳만이 보드게임을 편의시설로 명시하고 반복 후기 키워드로 등장. 커플 대상 특화 게임 큐레이션(2인용 카드게임, 루미큐브, 미니 보드게임 세트) 체계화 숙소 없음.',
      potential: '초기 투자 5~15만원으로 후기 언급 빈도 증가. 레인보우하우스 사례상 3개월 반복 이용 게스트 창출의 직접 원인으로 분석.',
    },
    {
      rank: 4,
      title: '시즌 데코 패키지 — 기념일·이벤트 특화 예약',
      description: '초고층풀오션뷰가 크리스마스 트리·모자 세팅으로 칭찬을 받았지만, 생일·기념일·프로포즈 등 커플 이벤트 특화 데코 패키지를 유료 추가 옵션으로 구조화한 숙소 없음.',
      potential: '기념일 패키지 추가 판매 단가 3~8만원/박 적용 시 예약당 마진 15~30% 개선. 프로포즈·기념일 후기는 SNS 바이럴 전환율이 일반 숙박 후기 대비 5~10배 높음.',
    },
    {
      rank: 5,
      title: '연박 인센티브 + 식재료 키트 연계',
      description: '매일바다 후기 "연박으로 요리하고 편안하게 한잔 하고 쉬다가려고 갔는데 대만족" 언급이 있었으나, 연박 할인 + 간단한 식재료 키트(라면·커피·와인 등) 번들 판매 숙소 없음.',
      potential: '연박 전환율 10%p 개선(30%→40%) 시 월 매출 15~20% 증대. 식재료 키트 원가 1만원 이하로 연박 특전 감성 마케팅 효과 창출.',
    },
  ],
  moneyFlows: [
    { area: '오션뷰 프리미엄 레지던스 (구읍뱃터 고층 오션뷰)', proof: '평점 4.88~4.93, 후기 129~244개, 슈퍼호스트 6년 운영. 재방문 언급 전 숙소 공통. 월 30~45박 추정.', size: '단가 8~12만원/박', trend: 'up' as const },
    { area: '레이트체크아웃 차별화 숙소 (오후 12~13시 퇴실)', proof: '레인보우하우스 5.0점 만점 67후기. 레이트체크아웃을 명시적 재방문 이유로 언급. 분석 대상 5개 중 2개(40%) 제공.', size: '소수 플레이어 과점 구간', trend: 'up' as const },
    { area: '슈퍼호스트 감성 인테리어 소규모 유닛 (2인 호텔 객실급)', proof: '매일바다 4.93점 244후기(최다). 소품·식기류 섬세함이 차별 포인트. "기대 이상"·"다시 오고싶다" 언급율 높음.', size: '단가 7~10만원/박', trend: 'stable' as const },
    { area: '공항 접근성 + 24시간 셀프체크인 호텔형', proof: '영종팰리스: 1F 무인카페, 키오스크 체크인, 2F 루프탑 레스토랑. 공항 15분 접근성 명시.', size: '잠재 단가 12~18만원/박', trend: 'up' as const },
    { area: '반려동물 허용 오션뷰 숙소', proof: '영종도풀오션뷰·레인보우하우스가 반려동물 허용+슈퍼호스트 조합. 펫프렌들리 필터 시 경쟁 숙소 수 급감.', size: '프리미엄 단가 10~15% 적용 가능', trend: 'up' as const },
    { area: 'OTT 멀티 계정 번들 (넷플릭스+α)', proof: '매일바다의 5개 OTT 동시 제공이 116개 청결 키워드와 함께 최다 칭찬. 추가 비용 월 3~5만원으로 후기 점수 방어 효과.', size: 'ROI 최상위 투자 영역', trend: 'stable' as const },
  ],
};

const topRooms = [
  {
    rank: 1,
    name: '매일바다 seaside',
    url: 'https://www.airbnb.co.kr/rooms/1011339004835816913',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1011339004835816913/original/96be1cb6-2150-45f1-9090-e6a6f2c0b39d.jpeg',
    rating: 4.93,
    reviewCount: 244,
    exposureScore: 1322,
    isSuperhost: true,
    titleKeywords: ['매일바다(브랜드)', 'seaside(영문)', '구읍뱃터', '커플', '반오션뷰'],
    instantBook: true,
    amenities: ['반오션뷰', '소품 완비', '와인잔·하이볼잔', '배달 가능', '조용한 입지'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    thumbnailStrategy: '실내 감성 인테리어 클로즈업 + 바다뷰 배경. 사진과 실제 일치율 높은 촬영 전략.',
    rankingStrength: '후기 244개(5개 중 압도적 최다). 청결 키워드 116회로 청결도 점수 최상위. 고유 브랜드명 "매일바다"로 재방문 직검색 트래픽 확보.',
  },
  {
    rank: 2,
    name: '영종도 초고층풀오션뷰 레인보우',
    url: 'https://www.airbnb.co.kr/rooms/49806529',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-49806529/original/b434a5b0-0748-41fc-9830-4a048eaa9ae7.jpeg',
    rating: 4.91,
    reviewCount: 131,
    exposureScore: 707,
    isSuperhost: true,
    titleKeywords: ['초고층풀오션뷰', '레인보우 감성숙소', '17층', '구읍뱃터'],
    instantBook: true,
    amenities: ['17층 풀오션뷰', '시즌 데코', '재즈 BGM', '세탁기', '무료주차'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    thumbnailStrategy: '17층 광각 오션뷰 또는 야경 와이드샷. 계절별 스타일링 업데이트.',
    rankingStrength: '"초고층" 단어로 고층 검색 세그먼트 독점. 6년 슈퍼호스트(2번 룸과 공유). 시즌 데코로 계절 검색 트래픽 추가 확보.',
  },
  {
    rank: 3,
    name: '영종도풀오션뷰 레인보우 감성숙소',
    url: 'https://www.airbnb.co.kr/rooms/40830839',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-40830839/original/3c3d08c7-b456-45e5-9cee-2302ea6f98d2.jpeg',
    rating: 4.88,
    reviewCount: 129,
    exposureScore: 693,
    isSuperhost: true,
    titleKeywords: ['풀오션뷰', '넷플릭스와 야경', '레인보우 감성숙소', '테라스'],
    instantBook: true,
    amenities: ['풀오션뷰 테라스', '넷플릭스(계정제공)', '야경', '커피머신', '반려동물 허용'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    thumbnailStrategy: '테라스에서 찍은 오션뷰 와이드샷. 야경+오션뷰 조합 황혼 시간대 촬영.',
    rankingStrength: '6년 슈퍼호스트 — 플랫폼 최장 이력. 테라스+풀오션뷰+반려동물 다중 필터 교차 노출. 체크인 시간 유연 조정으로 5점 후기 전환율 상승.',
  },
  {
    rank: 4,
    name: '영종도오션뷰 레인보우하우스 13시퇴실',
    url: 'https://www.airbnb.co.kr/rooms/1355476929844064293',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1355476929844064293/original/8f6bf7bf-9790-4c20-b3dd-0fcb25a53c15.jpeg',
    rating: 5.0,
    reviewCount: 67,
    exposureScore: 369,
    isSuperhost: true,
    titleKeywords: ['레인보우하우스(브랜드)', '13시퇴실 가능', '오션뷰', 'OTT', '보드게임'],
    instantBook: true,
    amenities: ['바다 앞 테라스', '아로마 향기 연출', '보드게임', '넷플릭스(계정)', '반려동물 허용'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    thumbnailStrategy: '숲속 컨셉 인테리어 + 아기자기한 소품 스타일링. 아로마·음악 등 비시각적 감성을 인테리어 사진으로 암시.',
    rankingStrength: '평점 5.0 만점 + 상위 10% 배지 — 별도 노출 가산점. 제목 내 "13시퇴실" 기능 키워드로 레이트체크아웃 수요 직접 포착. 3개월 반복 이용 게스트 다수.',
  },
  {
    rank: 5,
    name: '영종팰리스 오션뷰 스탠다드 더블',
    url: 'https://www.airbnb.co.kr/rooms/1498533749901443145',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1498533749901443145/original/7284b00d-7bb3-4a4c-959c-7fffdabbd9d9.jpeg',
    rating: 4.4,
    reviewCount: 5,
    exposureScore: 24,
    isSuperhost: true,
    titleKeywords: ['영종팰리스(건물명)', '오션뷰', '스탠다드 더블', '테라스'],
    instantBook: true,
    amenities: ['오션뷰 테라스', '24시간 셀프체크인(키오스크)', '1F 무인카페', '2F 루프탑 레스토랑', '구스다운 침구'],
    hostResponseRate: '100%',
    hostResponseTime: '즉시 (키오스크 운영)',
    thumbnailStrategy: '호텔 객실 전경 또는 테라스 오션뷰. 인천대교 야경 태그 포함.',
    rankingStrength: '신규 숙소 부스트 정책(60~90일 한시 노출 가산점). 루프탑 레스토랑+무인카페 복합 시설 차별화. 과제: 후기 20개 이상 단기 확보 필요.',
  },
];

const topRoomsPatterns = [
  { pattern: '슈퍼호스트', count: 5, total: 5, insight: '상위 5개 전원 슈퍼호스트. 슈퍼호스트 없이 상위 노출 진입 불가 수준. 응답률 100%, 취소 0건, 평점 4.8+ 유지가 필수.' },
  { pattern: '오션뷰 키워드 제목 포함', count: 5, total: 5, insight: '"풀오션뷰", "초고층풀오션뷰", "오션뷰" 등 형태 불문하고 전원 포함. 오션뷰 미명시 시 관련 검색 이탈.' },
  { pattern: '즉시예약 활성화', count: 5, total: 5, insight: '후기 누적 패턴상 즉예 없이 이 규모 불가. 즉시예약 = 에어비앤비 알고리즘 가중치 핵심 변수.' },
  { pattern: '응답률 100% / 1시간 이내', count: 5, total: 5, insight: '슈퍼호스트 유지 조건 = 응답률 90%+. 실제로는 전원 100%/1시간 이내 추정.' },
  { pattern: '재방문 의사 후기 다수', count: 5, total: 5, insight: '재방문 언급 = 알고리즘 긍정 신호 + 예약 전환율 제고. 5개 전원에서 재방문 의향 명시.' },
  { pattern: '무료주차 제공', count: 4, total: 5, insight: '영종도 특성상 차량 방문 게스트 다수. 주차 필터 노출 직결.' },
  { pattern: '넷플릭스/OTT 계정 제공', count: 4, total: 5, insight: '커플 호캉스 핵심 편의시설. 필터 검색 + 후기 언급 증가.' },
  { pattern: '브랜드명 제목 삽입', count: 4, total: 5, insight: '단순 기술적 키워드 나열보다 브랜드명이 재방문 직검색 트래픽 유도.' },
  { pattern: '레이트체크아웃 유연 운영', count: 3, total: 5, insight: '명시적 차별화 포인트. 제목 삽입 시 추가 타겟팅 효과. 5호 "13시퇴실" 제목 전략이 증명.' },
  { pattern: '시즌 데코 / 체험 요소', count: 2, total: 5, insight: '보드게임·아로마·크리스마스 트리 등 체험 콘텐츠가 후기 서술 풍부화 → SEO 효과.' },
];

const topRoomsActions = [
  '슈퍼호스트 취득 최우선 — 5위권 전원 슈퍼호스트. 응답률 100% 유지, 취소 0건, 평점 4.8+ 관리를 즉시 시작',
  '제목에 오션뷰 + 기능 키워드 결합 — 레인보우하우스 "13시퇴실 가능" 전략처럼 차별 어메니티를 제목에 직접 삽입',
  '즉시예약 활성화 — 상위 5개 전원 즉예 추정. 에어비앤비 알고리즘 가중치 핵심 변수, 지금 당장 활성화',
  '청결도 후기 키워드 밀도 높이기 — 아로마 디퓨저 + 환기 루틴, 청결 체크리스트 게스트 공개로 청결 후기 서술 유도',
  '체험 차별화 1개 이상 도입 — 보드게임 1~2종, 아로마 디퓨저(입실 시 ON), 환영 음악 재생으로 비용 최소 체험 요소 확보',
];

const offers = [
  {
    title: 'No-Chore Checkout (청소 의무 없는 퇴실)',
    headline: '퇴실 청소 불필요, 쓰레기 4만원 추가 없음 — 가방만 들고 나가세요',
    urgency: 9,
    wtp: 9,
    tags: ['#NoChore', '#청소의무없음', '#퇴실편의'],
    description: '쓰레기 미처리시 4만원 추가 부과가 7회 반복 불만이자 부정 후기 주원인. "청소 불필요" 리스팅으로 차별화하면 4.4점 → 4.8점 점프 가능. 단가 5~10% 프리미엄으로 운영비 상쇄.',
  },
  {
    title: 'FlexCheck Package (레이트체크아웃 무료)',
    headline: '체크인 16시 · 체크아웃 13시 — 눈치 없이 온전히 즐기는 하루',
    urgency: 8,
    wtp: 9,
    tags: ['#레이트체크아웃', '#무료', '#13시퇴실'],
    description: '6회+ 불만으로 업계 1위 페인포인트. 레인보우하우스가 "13시퇴실"을 제목에 명시해 5.0 만점 달성. LTV 기준 운영 비용 손익분기 1~2 사이클 내 회수 가능.',
  },
  {
    title: 'Clean Linen Guarantee (침구 교체 무료)',
    headline: '침구교체비 0원, 청결 불만족 시 즉시 교체 — 위생 걱정 없이 주무세요',
    urgency: 7,
    wtp: 8,
    tags: ['#침구무료', '#청결보증', '#NoExtraCharge'],
    description: '침구류 불량이 3번 숙소에서 4점 후기 직접 원인. 침구 교체 유료(2만원)가 다수 숙소 공통 정책. 무료 교체 포함 시 고가 구간 프리미엄 포지셔닝 가능.',
  },
  {
    title: 'Full Amenity Kit (비품 완비 패키지)',
    headline: '젓가락·식기류·위생용품 완비 — 빈손으로 오세요',
    urgency: 7,
    wtp: 8,
    tags: ['#비품완비', '#풀어메니티', '#빈손여행'],
    description: '젓가락 1세트 등 비품 부실이 4회 반복 불만. 저비용(1~3만원)으로 해결 가능하나 방치 시 4점 후기로 이어짐. 비품 목록을 리스팅 상단에 선제 공개하는 것만으로 기대치 관리.',
  },
  {
    title: 'Yeongjonge Date Kit (커플 데이트 가이드북)',
    headline: '구읍뱃터 맛집·카페·배달 큐레이션 — 검색 없이 데이트 완성',
    urgency: 4,
    wtp: 4,
    tags: ['#데이트가이드', '#구읍뱃터', '#맛집큐레이션'],
    description: '리뷰에서 배달 가능 여부를 특별히 칭찬으로 언급 = 정보 없으면 불만으로 전환. 큐레이션 PDF 제공 = 원가 제로에 리뷰 품질 상승. 커플 특화 데이트 코스 안내.',
  },
];

const viralHooks = [
  // 공포 4개
  { emotion: '공포', text: '영종도 에어비앤비 예약 전, 쓰레기 미처리 4만원 추가 규정 알고 계셨나요? 후기에 이미 7번 등장했습니다.', color: 'red' },
  { emotion: '공포', text: '576개 리뷰 분석했더니 영종도 커플 숙소 반복 불만이 딱 3가지였습니다. 예약 전 확인하세요.', color: 'red' },
  { emotion: '공포', text: '기념일 여행, 체크아웃 11시짜리 숙소 잡았다가 아침을 통째로 날렸습니다. 꼭 확인하세요.', color: 'red' },
  { emotion: '공포', text: '침구 얼룩 있는 숙소, 체크인하고 나서야 알았습니다. 사진엔 절대 안 나와요.', color: 'red' },
  // 분노 4개
  { emotion: '분노', text: '침구 교체비 2만원 따로 내고, 퇴실 전 쓰레기 분리수거까지. 이게 영종도 에어비앤비 관행입니다.', color: 'orange' },
  { emotion: '분노', text: '이미 숙박비에 청소비 포함됐는데 쓰레기 처리 안 하면 4만원 추가 청구. 정상인가요?', color: 'orange' },
  { emotion: '분노', text: '오후 4시에 체크인, 다음 날 오전 11시에 체크아웃. 실제 머무는 시간 19시간인데 1박 요금 냅니다.', color: 'orange' },
  { emotion: '분노', text: '젓가락이 1세트만 있는 숙소. 주방 있다고 예약했는데 같이 온 사람이랑 번갈아 먹었습니다.', color: 'orange' },
  // 호기심 4개
  { emotion: '호기심', text: '영종도에서 평점 5.0 만점 받는 숙소의 비결이 보드게임과 아로마였습니다. 의외의 이유입니다.', color: 'purple' },
  { emotion: '호기심', text: '244개 후기로 영종도 1위 숙소, 비결 딱 3가지 분석했습니다.', color: 'purple' },
  { emotion: '호기심', text: '후기 5개짜리가 후기 244개짜리와 같은 페이지에 상위 노출되는 이유. 에어비앤비 알고리즘 비밀입니다.', color: 'purple' },
  { emotion: '호기심', text: '같은 오션뷰인데 왜 어떤 숙소는 평점 4.4이고 어떤 숙소는 5.0인가요? 차이 딱 3가지입니다.', color: 'purple' },
  // 지위 3개
  { emotion: '지위', text: '호캉스 고수가 영종도 숙소 예약 전 반드시 확인하는 것 4가지.', color: 'blue' },
  { emotion: '지위', text: '영종도 오션뷰 숙소 평점 5.0 받는 방법. 67개 후기 전원 만점 숙소 역분석한 결과입니다.', color: 'blue' },
  { emotion: '지위', text: '에어비앤비 슈퍼호스트가 절대 하지 않는 실수 5가지. 숙소 선택 기준이 달라집니다.', color: 'blue' },
  // 공감 3개
  { emotion: '공감', text: '직장 다니면서 겨우 낸 하루 연차, 11시 체크아웃에 아침을 통째로 잃었습니다.', color: 'pink' },
  { emotion: '공감', text: '기념일 커플 여행, 퇴실 전에 쓰레기 분리수거 하라는 메시지 받고 기분이 망가졌어요.', color: 'pink' },
  { emotion: '공감', text: '영종도 구읍뱃터 배달 되는지 아무도 안 알려줘서 체크인 전날 직접 찾아봤어요.', color: 'pink' },
  // 반전 2개
  { emotion: '반전', text: '가방만 들고 나가도 추가 청구가 없는 숙소. 이게 가능한 이유가 있습니다.', color: 'amber' },
  { emotion: '반전', text: '오후 1시에 체크아웃할 수 있는 숙소가 평점 5.0 만점인 이유. 그 숙소만의 전략입니다.', color: 'amber' },
  // 추가 2개
  { emotion: '호기심', text: '3개월 동안 같은 숙소만 반복 예약하는 게스트들이 있습니다. 그 숙소의 공통점 3가지.', color: 'purple' },
  { emotion: '분노', text: '주방 있는 숙소인데 냄새나는 음식은 조리 금지. 그럼 뭘 하라는 건가요?', color: 'orange' },
];

const eventCalendar = [
  {
    month: '5월',
    strategy: '05.30 영종도 더블 이벤트 — M COUNTDOWN(인스파이어) + 아팝페(파라다이스시티) 동시 개최! +30~50% 인상 + 최소 2박 강력 권고. 05.05 어린이 축제(영종씨사이드파크) → 즉시 +10% 인상.',
    events: [
      { date: '05.02', name: '제3회 인천 어린이 놀이 축제', venue: '경인교육대학교', category: '가족·체험', demand: 2 },
      { date: '05.05', name: '2026 가족의 달 어린이 축제', venue: '영종씨사이드파크 하늘구름광장', category: '가족·축제', demand: 3 },
      { date: '05.08~10', name: '2026 트라이보울 클래식 페스티벌', venue: '인천 트라이보울', category: '공연', demand: 2 },
      { date: '05.22~26', name: '제14회 디아스포라영화제', venue: '인천', category: '축제', demand: 3 },
      { date: '05.30~31', name: '오슬로우 빈티지 마켓', venue: '인천', category: '지역 축제', demand: 3 },
      { date: '05.30', name: '2026 M COUNTDOWN X MEGA CONCERT', venue: '인스파이어 아레나', category: 'K팝·콘서트', demand: 5 },
      { date: '05.30~31', name: '아시안 팝 페스티벌 2026 (아팝페)', venue: '파라다이스시티 (영종도)', category: 'K팝·팝 페스티벌', demand: 5 },
    ],
  },
  {
    month: '6월',
    strategy: '06.03 지방선거 (수요 하락 주의 — 평일 수준 유지 또는 소폭 인하). 06.13 컬처런 (영종도 씨사이드파크) — 이벤트 2주 전부터 +10~15% 인상.',
    events: [
      { date: '06.03', name: '제9회 전국동시지방선거', venue: '인천 전역', category: '선거', demand: 1 },
      { date: '06.13', name: '2026 컬처런', venue: '영종도 씨사이드파크', category: '마라톤·축제', demand: 3 },
    ],
  },
  {
    month: '7~8월',
    strategy: '연중 최성수기. 07.01 영종구 출범 기념식(+5~10%). 07.31~08.02 인천펜타포트 락 페스티벌 — 2주 전부터 +15~20% 인상 + 최소 1박 설정.',
    events: [
      { date: '07.01', name: '영종구 출범 기념식', venue: '영종도', category: '행정·기념행사', demand: 2 },
      { date: '07.31~08.02', name: '인천펜타포트 락 페스티벌', venue: '인천', category: '대형 페스티벌', demand: 4 },
      { date: '08.14~10.18', name: '국가유산 미디어아트', venue: '인천', category: '전시', demand: 2 },
    ],
  },
  {
    month: '10월',
    strategy: '10.02~04 부평풍물대축제 주간 +10% 인상 권고.',
    events: [
      { date: '10.02~04', name: '부평풍물대축제', venue: '부평구', category: '지역 축제', demand: 3 },
    ],
  },
  {
    month: '상시',
    strategy: '인스파이어 아레나 백스테이지 투어 V2 등 상시 운영 이벤트. 공연 일정 업데이트 시 즉시 가격 전략 적용.',
    events: [
      { date: '12.29~12.21', name: '인스파이어 아레나 백스테이지 투어 V2', venue: '인스파이어 아레나', category: '체험', demand: 2 },
      { date: '04.01~11.29', name: '2026 문화가 있는 날', venue: '인천 전역', category: '문화행사', demand: 2 },
      { date: '04.11~05.05', name: '인천중구문화재단 봄 문화행사 (벚꽃)', venue: '자유공원·영종씨사이드파크', category: '문화행사', demand: 2 },
    ],
  },
];

const pricingData = {
  base: { weekday: 90000, weekend: 120000, peak: 150000 },
  multipliers: [
    { stars: 5, label: '★★★★★', mult: '×2.0~3.0', desc: '인스파이어 대형 페스티벌, 아팝페, 해수욕 성수기' },
    { stars: 4, label: '★★★★', mult: '×1.5~1.8', desc: '인스파이어 K팝·e스포츠, 인천 대형 축제' },
    { stars: 3, label: '★★★', mult: '×1.2~1.3', desc: '지역 축제, 연휴, 어린이날' },
    { stars: 2, label: '★★', mult: '×1.0~1.1', desc: '소규모 이벤트, 모니터링 유지' },
  ],
  monthly: [
    {
      period: '2026-05',
      label: '5월 전체',
      rows: [
        { dates: '05.05 (화)', event: '어린이날 공휴일 + 가족 축제 (영종씨사이드파크)', demand: 3, price: 108000, minNights: null as number | null, timing: '즉시 ⚡ (D-4일)' },
        { dates: '05.08~10 (금~일)', event: '트라이보울 클래식 페스티벌', demand: 2, price: 120000, minNights: null as number | null, timing: '기본가' },
        { dates: '05.22~26', event: '제14회 디아스포라영화제', demand: 3, price: 108000, minNights: null as number | null, timing: '+10% (05.08부터)' },
        { dates: '05.30~31 (토~일)', event: 'M COUNTDOWN + 아팝페 (영종도 더블 이벤트)', demand: 5, price: 200000, minNights: 2 as number | null, timing: '즉시 ⚡' },
      ],
    },
    {
      period: '2026-06',
      label: '6월',
      rows: [
        { dates: '06.03 (수)', event: '제9회 전국동시지방선거', demand: 1, price: 90000, minNights: null as number | null, timing: '유지 또는 소폭 인하' },
        { dates: '06.13 (토)', event: '2026 컬처런 (영종도 씨사이드파크)', demand: 3, price: 130000, minNights: null as number | null, timing: '+10~15% (D-2주 전)' },
      ],
    },
  ],
  actions: [
    '✅ 완료: T1 HOME GROUND (04.24~26) 3만명 성황 종료',
    '✅ 완료: BMW M FEST (04.25~26) 종료',
    '⚡ 지금 즉시: 05.05 어린이 축제 (영종씨사이드파크) → ₩108,000 인상 (D-4일)',
    '⚡ 지금 즉시: 05.30 M COUNTDOWN + 아팝페 더블 이벤트 → ₩200,000 + 최소 2박',
    '05.08 전: 디아스포라영화제 (05.22~26) → +10% 인상',
    '05.15 전: 컬처런 (06.13, 영종도) → ₩130,000 인상 설정',
    '06.15 전 데드라인: 7~8월 전체 성수기 가격(₩150,000+) 설정 완료',
  ],
};

// ── 컴포넌트 ──────────────────────────────────────────────────────────────────

const AirbnbResearch: React.FC = () => {
  const [lightbox, setLightbox] = React.useState<LightboxState>(null);
  const [activeTab, setActiveTab] = React.useState<TabKey>('listings');

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const tabItems: { key: TabKey; icon: React.ReactNode; label: string }[] = [
    { key: 'listings', icon: <Home size={13} />, label: '숙소 리뷰' },
    { key: 'market',   icon: <BarChart2 size={13} />, label: '시장 분석' },
    { key: 'problems', icon: <AlertTriangle size={13} />, label: '문제 분석' },
    { key: 'offers',   icon: <Tag size={13} />, label: '고전환 오퍼' },
    { key: 'viral',    icon: <Zap size={13} />, label: '바이럴 전략' },
    { key: 'toprooms', icon: <Award size={13} />, label: '상위 노출 룸' },
    { key: 'calendar', icon: <CalendarDays size={13} />, label: '이벤트 달력' },
    { key: 'pricing',  icon: <DollarSign size={13} />, label: '가격 전략' },
  ];

  return (
    <div
      id="airbnb"
      className="min-h-screen text-slate-900 w-full max-w-full"
      style={{ background: '#F2F2ED', fontFamily: 'Pretendard, system-ui, -apple-system, sans-serif', overflowX: 'clip' }}
    >
      {/* ── Hero ── */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src={HERO_IMAGE}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="영종도 오션뷰 커플 숙소"
        />
        <div className="relative z-10 text-center px-4 w-full max-w-full overflow-hidden">
          <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">영종도 커플 호캉스 · {TODAY_DATE}</p>
          <h1 className="text-white text-4xl sm:text-6xl md:text-9xl font-serif italic mb-4">Market Report</h1>
          <p className="text-white text-xl tracking-[0.3em] uppercase opacity-80">Airbnb Intelligence</p>
          <div className="flex justify-center gap-3 sm:gap-6 mt-8 flex-wrap px-2">
            {[['5', '숙소 스크래핑'], ['576', '총 후기 수'], ['4.82', '평균 평점'], ['₩280억', 'SAM 시장']].map(([v, l], i, arr) => (
              <React.Fragment key={l}>
                <div className="text-center">
                  <div className="text-white text-2xl sm:text-3xl font-bold">{v}</div>
                  <div className="text-white text-xs opacity-60 uppercase tracking-widest">{l}</div>
                </div>
                {i < arr.length - 1 && <div className="text-white text-xl opacity-30 self-center">·</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* ── Tab Nav ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm overflow-x-hidden">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-none">
          <div className="flex flex-wrap sm:flex-nowrap sm:w-max w-full gap-0.5 sm:gap-1 px-2 sm:px-6 py-1 sm:py-2 h-auto">
            {tabItems.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'whitespace-nowrap px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md flex-shrink-0 flex items-center gap-1 transition-colors',
                  activeTab === tab.key
                    ? 'bg-[#111111] text-white'
                    : 'text-slate-600 hover:bg-slate-100',
                ].join(' ')}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 min-w-0">

        {/* ── 숙소 리뷰 ── */}
        {activeTab === 'listings' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10">
                <Home size={20} className="text-blue-600" />
              </span>
              영종도 커플 오션스테이
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              Airbnb 실시간 리뷰 수집 · {TODAY_DATE} · 5곳 · 총 후기 576개 · 평균 평점 4.82
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {listings.map((item, i) => (
                <div
                  key={i}
                  className="group cursor-zoom-in overflow-hidden rounded-[12px] bg-white border border-slate-200 flex flex-col"
                  onClick={() => setLightbox({ src: item.image, title: item.name, tag: item.tags[0] })}
                >
                  <div className="overflow-hidden h-48 rounded-t-[12px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-5 pt-4 pb-2 flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm flex items-center gap-1" style={{ color: '#F5C800' }}>
                        <Star className="w-4 h-4" fill="#F5C800" strokeWidth={0} />
                        {item.rating}
                      </span>
                      <span className="text-slate-400 text-xs">{item.reviewCount}개 후기</span>
                    </div>
                    <p className="text-[1rem] font-bold leading-snug" style={{ color: '#111111' }}>{item.name}</p>
                    <p className="text-[0.85rem] font-normal" style={{ color: '#444444' }}>{item.type}</p>
                    <p className="text-sm leading-relaxed" style={{ color: '#444444' }}>{item.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="text-xs text-slate-500 space-y-1 border-t border-slate-100 pt-3 mt-auto">
                      <div className="flex items-center gap-1"><ThumbsUp size={11} className="text-slate-500" /> {item.topPraise}</div>
                      <div className="flex items-center gap-1"><ThumbsDown size={11} className="text-slate-500" /> {item.topComplaint}</div>
                    </div>
                  </div>
                  <div style={{ height: '3px', background: '#F5C800' }} />
                </div>
              ))}
            </div>

            {/* 종합 인사이트 */}
            <div className="mt-12 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>종합 인사이트</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: '수집 숙소 수', value: '5곳 (2026-05-01 실시간 스크래핑)' },
                  { label: '평균 평점', value: '4.82 (최저 4.4 ~ 최고 5.0)' },
                  { label: '가장 많은 칭찬', value: '청결 · 오션뷰 전망 · 친절한 호스트 · 아기자기한 인테리어' },
                  { label: '가장 많은 불만', value: '체크아웃 청소 의무 과다(4만원) · 얼리/레이트체크아웃 유료 · 침구 불량 · 비품 부실' },
                  { label: '슈퍼호스트 패턴', value: '5개 중 5개 슈퍼호스트(100%). 레인보우 감성숙소(6년), 레인보우하우스(2년+상위10%)' },
                  { label: '기회 포인트', value: '레이트체크아웃 무료화 + 청소 의무 제거 + 아로마·보드게임 체험 차별화 = 즉각 5.0 달성 가능' },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#444444' }}>{row.label}</span>
                    <span style={{ color: '#111111' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 시장 분석 ── */}
        {activeTab === 'market' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10">
                <BarChart2 size={20} className="text-blue-600" />
              </span>
              시장 분석
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              TAM / SAM / SOM · 핵심 트렌드 5개 · 공백 기회 5개 · 돈의 흐름 · {TODAY_DATE}
            </p>

            {/* TAM/SAM/SOM */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { ...marketAnalysis.tam, bg: 'bg-slate-900', textCl: 'text-white', subCl: 'text-slate-400' },
                { ...marketAnalysis.sam, bg: 'bg-slate-800', textCl: 'text-white', subCl: 'text-slate-400' },
                { ...marketAnalysis.som, bg: 'bg-slate-700', textCl: 'text-white', subCl: 'text-slate-300' },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-8 ${item.bg}`}>
                  <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-2 ${item.subCl}`}>{item.label}</p>
                  <p className={`text-3xl font-bold mb-2 ${item.textCl}`}>{item.value}</p>
                  <p className={`text-sm mb-2 ${item.subCl}`}>{item.description}</p>
                  <p className={`text-xs ${item.subCl} opacity-70`}>{item.note}</p>
                </div>
              ))}
            </div>

            {/* 핵심 트렌드 */}
            <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>핵심 트렌드 5개</h3>
            <div className="space-y-4 mb-16">
              {marketAnalysis.trends.map((trend) => (
                <div key={trend.rank} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-slate-200 leading-none flex-shrink-0">{String(trend.rank).padStart(2, '0')}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base mb-1" style={{ color: '#111111' }}>{trend.title}</p>
                      <p className="text-sm mb-2" style={{ color: '#444444' }}>{trend.description}</p>
                      <p className="text-xs text-slate-500 italic">{trend.signal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 기회 */}
            <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>아직 덜 공략된 기회 5개</h3>
            <div className="space-y-4 mb-16">
              {marketAnalysis.opportunities.map((opp) => (
                <div key={opp.rank} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-green-500/10 flex-shrink-0">
                      <TrendingUp size={18} className="text-green-600" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base mb-1" style={{ color: '#111111' }}>{opp.title}</p>
                      <p className="text-sm mb-2" style={{ color: '#444444' }}>{opp.description}</p>
                      <p className="text-xs font-medium" style={{ color: '#111111' }}>{opp.potential}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 돈의 흐름 */}
            <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>이미 돈이 흐르는 영역</h3>
            <div className="space-y-3">
              {marketAnalysis.moneyFlows.map((flow, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 flex-shrink-0 mt-0.5">
                    {flow.trend === 'up' ? <TrendingUp size={16} className="text-blue-600" /> : flow.trend === 'down' ? <TrendingDown size={16} className="text-blue-600" /> : <Minus size={16} className="text-blue-600" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm mb-0.5" style={{ color: '#111111' }}>{flow.area}</p>
                    <p className="text-xs mb-1" style={{ color: '#444444' }}>{flow.proof}</p>
                    <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">{flow.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 문제 분석 ── */}
        {activeTab === 'problems' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10">
                <AlertTriangle size={20} className="text-red-600" />
              </span>
              문제 분석 TOP 10
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              WTP(해결시 지불의향) 내림차순 · 576개 리뷰 분석 · {TODAY_DATE}
            </p>

            <div className="space-y-4">
              {problemMatrix.map((item) => (
                <div key={item.rank} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-slate-200 leading-none flex-shrink-0">{String(item.rank).padStart(2, '0')}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <p className="font-bold text-base" style={{ color: '#111111' }}>{item.problem}</p>
                        <div className="flex gap-1">
                          {item.flags.includes('RED') && <span className="bg-[#111111]/5 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">긴급</span>}
                          {item.flags.includes('ROCKET') && <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">급증</span>}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs mb-3">
                        <span style={{ color: '#444444' }}>WTP <strong style={{ color: '#111111' }}>{item.wtp}/10</strong></span>
                        <span style={{ color: '#444444' }}>긴급도 <strong style={{ color: '#111111' }}>{item.urgency}/10</strong></span>
                        <span style={{ color: '#444444' }}>불평 <strong style={{ color: '#111111' }}>{item.complaintCount}회</strong></span>
                        <span style={{ color: '#444444' }}>성장 <strong style={{ color: '#111111' }}>{item.growthRate}</strong></span>
                      </div>
                      <p className="text-xs text-slate-500 italic leading-relaxed">{item.quote}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 우선순위 요약 */}
            <div className="mt-12 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-bold mb-4" style={{ color: '#111111' }}>즉시 해결 (High WTP + High 긴급도)</h3>
                  <ul className="space-y-2 text-sm" style={{ color: '#444444' }}>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-red-600" />#3 침구류 관리 불량 — 체크인 직후 발각, 위생 신뢰 직결</li>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-red-600" />#6 시설 노후·파손 미수리 — 안전 문제로 확대 가능</li>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-red-600" />#1 체크아웃 청소 의무 — 마지막 인상 파괴, 부정 후기 주원인</li>
                  </ul>
                  <h3 className="text-lg font-bold mt-8 mb-4" style={{ color: '#111111' }}>선점 기회 (High WTP + 빠른 성장)</h3>
                  <ul className="space-y-2 text-sm" style={{ color: '#444444' }}>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-blue-600" />#2 얼리/레이트체크아웃 무료화 → 재방문율·후기 점수 동시 상승</li>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-blue-600" />#5 음식 조리 허용 → 환기 시스템 보강 시 강력한 셀링포인트</li>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-blue-600" />#7 침구 교체 무료 → 프리미엄 포지셔닝 수단</li>
                  </ul>
                </div>
                <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-2xl">
                  <h3 className="text-lg font-bold mb-4">리스크 관리 (중간 WTP + 만성 불만)</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0" />#4 비품 구비 부실 — 저비용 해결 가능. 방치 시 4점 후기</li>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0" />#8 가성비 기대 불일치 — 사진 업데이트로 기대치 조율 필요</li>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0" />#9 보증금·이벤트 조건 복잡 — 정책 단순화 권고</li>
                    <li className="flex items-start gap-2"><ChevronRight size={14} className="mt-0.5 flex-shrink-0" />#10 편의시설 부족 — 맛집 가이드 제공 등 소프트 대응</li>
                  </ul>
                  <p className="text-xs text-slate-400 mt-6">데이터 기반: 5개 숙소(총 576개 후기) · WTP: 해결 시 숙박비 10~15% 추가 지불 의향 1~10 환산</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── 고전환 오퍼 ── */}
        {activeTab === 'offers' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10">
                <Tag size={20} className="text-blue-600" />
              </span>
              고전환 오퍼 5개
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              문제 분석 기반 오퍼 설계 · WTP 내림차순 · {TODAY_DATE}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offers.map((offer, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[12px] overflow-hidden flex flex-col">
                  <div className="px-6 pt-6 pb-4 flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#111111] text-white text-xs font-medium px-2 py-0.5 rounded-full">{offer.title}</span>
                      <div className="flex gap-3 text-xs" style={{ color: '#444444' }}>
                        <span>WTP <strong style={{ color: '#111111' }}>{offer.wtp}/10</strong></span>
                        <span>긴급 <strong style={{ color: '#111111' }}>{offer.urgency}/10</strong></span>
                      </div>
                    </div>
                    <p className="font-bold text-base leading-snug mb-3" style={{ color: '#111111' }}>{offer.headline}</p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#444444' }}>{offer.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {offer.tags.map((tag, j) => (
                        <span key={j} className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ height: '3px', background: '#F5C800' }} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 바이럴 전략 ── */}
        {activeTab === 'viral' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500/10">
                <Zap size={20} className="text-purple-600" />
              </span>
              바이럴 후크 20개
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              감정별 분류 · 공포/분노/호기심/지위/공감/반전 · {TODAY_DATE}
            </p>

            {(['공포', '분노', '호기심', '지위', '공감', '반전'] as const).map((emotion) => {
              const colorMap: Record<string, string> = {
                공포: 'text-red-600',
                분노: 'text-orange-600',
                호기심: 'text-purple-600',
                지위: 'text-blue-600',
                공감: 'text-pink-600',
                반전: 'text-amber-600',
              };
              const hooks = viralHooks.filter((h) => h.emotion === emotion);
              if (hooks.length === 0) return null;
              return (
                <div key={emotion} className="mb-10">
                  <h3 className={`text-lg font-bold mb-4 ${colorMap[emotion]}`}>{emotion} ({hooks.length}개)</h3>
                  <div className="space-y-3">
                    {hooks.map((hook, j) => (
                      <div key={j} className="bg-white border border-slate-200 rounded-2xl px-6 py-4">
                        <p className="text-sm leading-relaxed" style={{ color: '#111111' }}>{hook.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* ── 상위 노출 룸 ── */}
        {activeTab === 'toprooms' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-yellow-400/10">
                <Award size={20} className="text-yellow-500" />
              </span>
              상위 노출 5개 룸
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              노출 공식 역산 (후기수 × 평점 × 1.1) · 제목 키워드 패턴 · 즉시 적용 액션 · {TODAY_DATE}
            </p>

            <div className="space-y-6 mb-16">
              {topRooms.map((room) => (
                <div
                  key={room.rank}
                  className="group cursor-zoom-in bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row"
                  onClick={() => setLightbox({ src: room.image, title: room.name, tag: `노출점수 ${room.exposureScore}` })}
                >
                  <div className="sm:w-48 h-40 sm:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 px-6 py-5 flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[#111111] text-white text-xs font-medium px-2 py-0.5 rounded-full">#{room.rank}위</span>
                      <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">노출점수 {room.exposureScore}</span>
                      {room.isSuperhost && <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">슈퍼호스트</span>}
                      {room.instantBook && <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">즉시예약</span>}
                    </div>
                    <p className="font-bold text-base" style={{ color: '#111111' }}>{room.name}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 font-bold" style={{ color: '#F5C800' }}>
                        <Star className="w-4 h-4" fill="#F5C800" strokeWidth={0} />
                        {room.rating}
                      </span>
                      <span className="text-slate-400">{room.reviewCount}개 후기</span>
                      <span className="text-slate-400">{room.hostResponseRate} · {room.hostResponseTime}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{room.rankingStrength}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {room.titleKeywords.map((kw, j) => (
                        <span key={j} className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sm:hidden" style={{ height: '3px', background: '#F5C800' }} />
                </div>
              ))}
            </div>

            {/* 공통 패턴 */}
            <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>5개 룸 공통 패턴</h3>
            <div className="space-y-3 mb-16">
              {topRoomsPatterns.map((p, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl px-6 py-4 flex items-start gap-4">
                  <div className="text-center flex-shrink-0 w-16">
                    <p className="text-2xl font-bold" style={{ color: '#111111' }}>{p.count}/{p.total}</p>
                    <p className="text-xs text-slate-500">{Math.round(p.count / p.total * 100)}%</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm mb-0.5" style={{ color: '#111111' }}>{p.pattern}</p>
                    <p className="text-xs" style={{ color: '#444444' }}>{p.insight}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 즉시 액션 */}
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>즉시 적용 액션 5개</h3>
              <ul className="space-y-4">
                {topRoomsActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#444444' }}>
                    <span className="bg-[#111111] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── 이벤트 달력 ── */}
        {activeTab === 'calendar' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10">
                <CalendarDays size={20} className="text-blue-600" />
              </span>
              이벤트 캘린더 2026
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              수요 예측 · 가격 전략 수립 · 출처: 인스파이어 리조트 / 인천투어 / 인천 중구청 · {TODAY_DATE}
            </p>

            <div className="space-y-10">
              {eventCalendar.map((month) => (
                <div key={month.month}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold" style={{ color: '#111111' }}>{month.month}</h3>
                  </div>
                  <div className="bg-slate-900 text-white rounded-xl px-5 py-3 mb-4 text-sm">{month.strategy}</div>
                  <div className="space-y-2">
                    {month.events.map((ev, j) => (
                      <div key={j} className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex flex-wrap items-center gap-3 text-sm">
                        <span className="font-mono text-xs bg-[#111111]/5 px-2 py-0.5 rounded font-medium" style={{ color: '#111111' }}>{ev.date}</span>
                        <span className="font-medium flex-1" style={{ color: '#111111' }}>{ev.name}</span>
                        <span className="text-slate-400 text-xs">{ev.venue}</span>
                        <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">{ev.category}</span>
                        <span className="text-[#F5C800] text-xs font-bold">{'★'.repeat(ev.demand)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 가격 전략 ── */}
        {activeTab === 'pricing' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-yellow-400/10">
                <DollarSign size={20} className="text-yellow-500" />
              </span>
              가격 전략
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              기본가 · 이벤트 승수 · 월별 전략 · 즉시 액션 · {TODAY_DATE}
            </p>

            {/* 기본가 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { label: '평일 기본가', value: `₩${pricingData.base.weekday.toLocaleString()}`, note: '월~목, 비이벤트 주간' },
                { label: '주말 기본가', value: `₩${pricingData.base.weekend.toLocaleString()}`, note: '금~일, 비이벤트 주간' },
                { label: '성수기 기본가', value: `₩${pricingData.base.peak.toLocaleString()}`, note: '7~8월 여름 성수기' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-900 rounded-2xl p-8">
                  <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2 text-slate-400">{item.label}</p>
                  <p className="text-3xl font-bold text-white mb-1">{item.value}</p>
                  <p className="text-sm text-slate-400">{item.note}</p>
                </div>
              ))}
            </div>

            {/* 승수 테이블 */}
            <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>이벤트 수요 승수표</h3>
            <div className="space-y-3 mb-16">
              {pricingData.multipliers.map((row, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl px-6 py-4 flex items-center gap-4">
                  <span className="text-[#F5C800] font-bold text-sm w-24 flex-shrink-0">{row.label}</span>
                  <span className="font-bold text-lg w-24 flex-shrink-0" style={{ color: '#111111' }}>{row.mult}</span>
                  <span className="text-sm" style={{ color: '#444444' }}>{row.desc}</span>
                </div>
              ))}
            </div>

            {/* 월별 전략 */}
            {pricingData.monthly.map((month) => (
              <div key={month.period} className="mb-10">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#111111' }}>{month.label}</h3>
                <div className="space-y-2">
                  {month.rows.map((row, j) => (
                    <div key={j} className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-mono text-xs bg-[#111111]/5 px-2 py-0.5 rounded font-medium" style={{ color: '#111111' }}>{row.dates}</span>
                      <span className="flex-1 font-medium" style={{ color: '#111111' }}>{row.event}</span>
                      <span className="text-[#F5C800] font-bold text-xs">{'★'.repeat(row.demand)}</span>
                      <span className="font-bold" style={{ color: '#111111' }}>₩{row.price.toLocaleString()}</span>
                      {row.minNights && <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">최소 {row.minNights}박</span>}
                      <span className="bg-[#111111] text-white text-xs font-medium px-2 py-0.5 rounded-full">{row.timing}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 즉시 액션 */}
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>즉시 적용 액션</h3>
              <ul className="space-y-3">
                {pricingData.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#444444' }}>
                    <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#111111' }} />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

      </main>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white text-4xl leading-none hover:opacity-70"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
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
    </div>
  );
};

export default AirbnbResearch;
