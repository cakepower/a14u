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

const TODAY_DATE = '2026-04-16';

const listings = [
  {
    name: '영종도 풀오션뷰 / 넷플릭스 무료 / 주차무료',
    rating: 4.88,
    reviewCount: 181,
    type: '레지던스 · 슈퍼호스트 (6년)',
    url: 'https://www.airbnb.co.kr/rooms/40183996',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-40183996/original/df42294d-7b00-4b4a-9b82-b24b11521b30.jpeg',
    tags: ['#풀오션뷰', '#넷플릭스', '#무료주차', '#반려동물허용'],
    summary: '고층 오션뷰 테라스 + 독특한 향기로 재방문 유도. 주차 넉넉. 침구교체 비용 2만원 별도.',
    topPraise: '전망 · 청결 · 향기 · 재방문',
    topComplaint: '침구교체 비용 2만원',
    badge: '슈퍼호스트',
  },
  {
    name: '영종도풀오션뷰 · 늦은 13시체크아웃 · 일본감성 · 다도세트',
    rating: 4.95,
    reviewCount: 60,
    type: '호텔 객실 · 슈퍼호스트 (2년) · 게스트 선호',
    url: 'https://www.airbnb.co.kr/rooms/1186004573241827717',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1186004573241827717/original/91477865-6cb7-41f1-aa58-677466b6179e.jpeg',
    tags: ['#풀오션뷰', '#일본감성', '#다도세트', '#13시체크아웃'],
    summary: '일본감성 인테리어 + 다도세트 + 무인카페. 구읍뱃터 도보 이동 가능. 13시 체크아웃으로 여유로운 아침.',
    topPraise: '사진일치 · 노을뷰 · 늦은체크아웃 · 아기자기',
    topComplaint: '침구교체 비용 2만원',
    badge: '게스트 선호',
  },
  {
    name: '풀오션뷰 한옥Stay 스위트룸(자쿠지)_노을 전망_인천공항 15분',
    rating: 4.96,
    reviewCount: 189,
    type: '호텔 객실 · 슈퍼호스트 (3년) · 상위 5%',
    url: 'https://www.airbnb.co.kr/rooms/1401799113294551700',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1401799113294551700/original/88c6e443-cda5-4d5d-b8f5-2b620d37b487.jpeg',
    tags: ['#자쿠지', '#풀오션뷰', '#한옥감성', '#조식뷔페', '#레이트체크아웃'],
    summary: '대형 자쿠지 + 인천대교 노을뷰. 조식뷔페·보드게임 제공. 상위 5% 슈퍼호스트. 가성비 최고.',
    topPraise: '자쿠지 · 전망 · 청결 · 가성비 · 셀프체크인',
    topComplaint: '욕실 블라인드 없음 · 공간 협소',
    badge: '상위 5%',
  },
  {
    name: '오션뷰 한옥스테이 인천공항 18분거리 빔프로젝터_넷플릭스',
    rating: 4.29,
    reviewCount: 17,
    type: '호텔 객실 · 비슈퍼호스트 (4년)',
    url: 'https://www.airbnb.co.kr/rooms/1571786840958419875',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1571786840958419875/original/4b0bcfcf-71f2-4281-8aa6-524d8f925f59.jpeg',
    tags: ['#한옥감성', '#빔프로젝터', '#넷플릭스', '#반려동물허용'],
    summary: '한옥감성 + 대교뷰+시티뷰. 반려동물 동반 가능. 가격 경쟁력 있으나 청소·시설 관리 문제.',
    topPraise: '전망 · 한옥감성 · 저렴한 가격',
    topComplaint: '청소 불량 · 시설 고장 · 단열 문제 · 불친절',
    badge: '대조군',
  },
];

const problemMatrix = [
  { rank: 1, problem: '청소 불량 — 입실 시 미청소 상태, 다중 호실 이동 강요', wtp: 9, urgency: 10, complaintCount: 7, growthRate: '↑ 급증', flags: ['RED', 'ROCKET'], quote: '"청소가 되지않았고 다른 방 옮겨도 같은 상황 반복. 응대는 불친절." — 명로 ★1 (숙소5)' },
  { rank: 2, problem: '침구 교체 비용 별도 청구 (2만원) — 기본 서비스로 기대', wtp: 9, urgency: 7, complaintCount: 4, growthRate: '↑ 증가', flags: ['RED', 'ROCKET'], quote: '숙소1·숙소2 리뷰 키워드에서 반복 불만 언급 (고평점 숙소에서도 발생)' },
  { rank: 3, problem: '욕실·샤워 공간 블라인드/프라이버시 미비', wtp: 8, urgency: 8, complaintCount: 3, growthRate: '↑ 증가', flags: ['RED', 'ROCKET'], quote: '"욕조&샤워 하는곳과 베란다에 블라인드가 없어서 벽에 붙어서 샤워했네요." — 지현 (숙소3)' },
  { rank: 4, problem: '단열 불량 — 창문·침대 주변 한기 심함 (겨울철)', wtp: 8, urgency: 8, complaintCount: 2, growthRate: '→ 유지', flags: [], quote: '"침대 머리 옆 유리 한기 심해 패딩으로 막음." — 찬우 (숙소5)' },
  { rank: 5, problem: '시설 고장 방치 — 화장실 문 잠금 불량, 커튼 탈락', wtp: 7, urgency: 8, complaintCount: 3, growthRate: '↑ 증가', flags: ['RED', 'ROCKET'], quote: '"화장실 미닫이 문 멈춤 장치 없어 혼자서는 갇힐 위험, 커튼 끝이 떨어져." — 환진 (숙소5)' },
  { rank: 6, problem: '불친절한 호스트 응대 — 불만 제기 시 냉담·지연 대응', wtp: 7, urgency: 7, complaintCount: 3, growthRate: '↑ 급증', flags: ['RED', 'ROCKET'], quote: '"난방기 문제 있어서 연락했을 때 회신 늦었지만 친절하게 해결." — 찬우. "응대는 불친절." — 명로' },
  { rank: 7, problem: '체크아웃 시간 압박 — 11:00 조기 퇴실로 여유 없음', wtp: 7, urgency: 6, complaintCount: 4, growthRate: '→ 유지', flags: ['RED'], quote: '"체크아웃이 늦으니 더 여유로워서 좋았습니다" — 수빈 (숙소2). 칭찬이 곧 11시 기본값에 대한 불만의 역산.' },
  { rank: 8, problem: '공간 협소 — 사진 대비 실제 면적 과장', wtp: 6, urgency: 5, complaintCount: 2, growthRate: '→ 유지', flags: [], quote: '"생각보다 작았지만 그래서 아늑했어요!" — 수정 (숙소3). 아늑함으로 프레이밍 성공 사례.' },
  { rank: 9, problem: '안전 리스크 — 화장실 미닫이문 잠금 오작동으로 갇힐 위험', wtp: 6, urgency: 9, complaintCount: 1, growthRate: '↑ 증가', flags: ['ROCKET'], quote: '"화장실 미닫이 문 멈춤 장치 없어 혼자서는 갇힐 위험" — 환진 (숙소5). 안전사고 잠재 리스크.' },
  { rank: 10, problem: '입실 동선 불명확 — 신발 탈의 구역 미표시', wtp: 4, urgency: 4, complaintCount: 1, growthRate: '→ 유지', flags: [], quote: '"신발 벗는곳이 명확히 구별되지 않아서 조금 불편하긴 했지만" — 수정 (숙소3)' },
];

const marketAnalysis = {
  tam: { label: 'TAM — 전체 시장', value: '약 20조 원/년', description: '국내 전체 숙박 시장 (호텔·리조트·펜션·에어비앤비 포함)', note: '커플/2인 여행은 전체의 35~40% 비중 추산' },
  sam: { label: 'SAM — 유효 시장', value: '600억~900억 원/년', description: '인천/영종도 권역 에어비앤비·단기 렌탈 커플 오션뷰 숙박 시장', note: '추정 500~800개 유닛 × 평균 객단가 10~15만 원 × 연간 가동일 약 150일' },
  som: { label: 'SOM — 획득 가능', value: '30억~60억 원/년', description: '커플 전용 큐레이션 채널로 3년 내 현실적으로 공략 가능한 규모', note: '초기 도달 커버리지 10~20% 가정. 첫 해 목표 3~5억 원, 3년 내 30억 원' },
  trends: [
    { rank: 1, title: '오션뷰 감성 > 숙소 스펙 — "전망이 먼저다"', description: '방 크기·침대 퀄리티보다 창밖 바다 풍경이 예약 결정 요인 1위. 공간 협소 약점도 뷰로 상쇄됨.', signal: '4곳 합산 리뷰에서 전망이 압도적 1위 — 숙소1: 117회, 숙소3: 95회. 오션뷰 프리미엄 20~40% 정당화.' },
    { rank: 2, title: '호캉스의 일본감성·한옥감성 혼합 — "감성 레이어링"', description: '테마 정체성(일본감성·한옥감성)이 예약 전환율과 재방문율을 높임. 스토리 있는 인테리어 → 콘텐츠화 → SNS 바이럴 선순환.', signal: '숙소2 일본감성+다도세트 ★4.95 / 숙소3 한옥감성+자쿠지 ★4.96. "인테리어 압권"(상혁), "아기자기"(향아)' },
    { rank: 3, title: '늦은 체크아웃 = 재방문 결정 변수', description: '커플 여행자에게 체크아웃 시간은 "여유로운 모닝 루틴" 가치와 직결. 무료 레이트 체크아웃은 실질 비용 대비 리뷰 점수 상승 효과 최고.', signal: '숙소2 "체크아웃이 늦으니 더 여유로워서 좋았습니다"(수빈), 숙소3 레이트 체크아웃 다수 언급. 표준 11시는 경쟁 열위 요소로 부각.' },
    { rank: 4, title: '자쿠지·스파 — 커플 숙소의 필수 요소화', description: '자쿠지는 단순 부가 시설이 아닌 커플 숙소 예약 결정 요인 Top 3 진입. 가성비 숙소에서도 자쿠지 유무가 리뷰 만족도 좌우.', signal: '숙소3 자쿠지 키워드 27회, 리뷰 6개 중 4개가 자쿠지 직접 언급. "자쿠지 이용도 너무너무 만족"(소정)' },
    { rank: 5, title: '슈퍼호스트 + 즉각 응답 = 예약 신뢰 프리미엄', description: '커플 여행은 특별한 날(기념일·생일)과 연결되는 경우가 많아 호스트 응답 신뢰도가 크게 작용. 재방문 의향도 슈퍼호스트 숙소에 집중.', signal: '고평점 3곳(★4.88~4.96) 모두 슈퍼호스트, 응답률 100%, 1시간 이내. 저평점 숙소(★4.29)는 슈퍼호스트 아님, "회신 늦었고" "응대는 불친절"' },
  ],
  opportunities: [
    { rank: 1, title: '커플 전용 큐레이션 예약 채널', description: '에어비앤비 검색은 날짜·인원·위치 필터 중심. "커플", "자쿠지", "오션뷰", "늦은체크아웃"을 동시에 만족하는 숙소를 발견하기 어려움.', potential: '팔로워 10만 기준 월 예약 연결 200~500건. 수수료 5% 기준 월 1,000~2,500만 원' },
    { rank: 2, title: '기념일 패키지 번들링', description: '수집 숙소 4곳 모두 기본 숙박 외 번들 서비스 없음. 꽃배달·케이크·와인·다도체험 등 게스트가 직접 외부 주문해야 함.', potential: '기념일 번들 객단가 +5~10만 원 추가. 커플 예약의 30~40%가 기념일 연관 → 월 100건 × 7만 원 = 700만 원 부가수익' },
    { rank: 3, title: '영종도 노을 타임 콘텐츠화', description: '"해가질때 바다위로 노을이 너무 예뻤어요"(윤경, 숙소2). 노을 관련 언급이 2~3곳에서 나오나 숙소 마케팅에서 활용 안 됨.', potential: '"영종도 커플 노을 코스" 숏폼 콘텐츠 → 자연스러운 숙소 예약 연결. 콘텐츠 광고 수익 + 예약 연결 이중 수익화' },
    { rank: 4, title: '저평점 숙소 리브랜딩 컨설팅', description: '숙소5(★4.29)는 위치·뷰·한옥감성은 경쟁력 있으나 청소 불량·시설 관리·응대 문제로 하위 평점. B2B 호스트 컨설팅 서비스 시장 미개척.', potential: '영종도 권역 저평점 숙소 50~100개 대상. 월 30~50만 원 구독형 운영 지원 패키지.' },
    { rank: 5, title: '반려동물 동반 커플 숙소 세그먼트', description: '수집 숙소 중 반려동물 허용은 숙소1·숙소5 2곳만 명시. "강아지랑 편안하게 잘 놀고왔습니다"(지은, 숙소5). 공급 희소성이 프리미엄 포지셔닝 기회.', potential: '반려동물 동반 커플 여행 수요 연 20%+ 성장 중. 객단가 10~20% 프리미엄 부과 가능.' },
  ],
  moneyFlows: [
    { area: '오션뷰 프리미엄 숙소', proof: '숙소3 "가성비 최고" 언급에도 ★5 만족도 — 가격 저항 낮음', size: '영종도 오션뷰 유닛 월 예약 수익 평균 150~300만 원/호', trend: 'up' as const },
    { area: '자쿠지 스위트 세그먼트', proof: '숙소3 자쿠지 키워드 27회, 예약 경쟁률 상위권', size: '자쿠지 유닛 1곳 월 예약 수익 200~400만 원', trend: 'up' as const },
    { area: '슈퍼호스트 재방문 수익', proof: '숙소1 "올때마다 항상 이용"(가연), 숙소2·3 다수 재방문 명시', size: '재방문 예약 마케팅 비용 0 → 순이익률 70%+', trend: 'up' as const },
    { area: '늦은 체크아웃 프리미엄', proof: '숙소2·3 모두 "늦은 체크아웃" 키워드가 5성 리뷰 결정 요인', size: '체크아웃 연장 1회 유료 판매 시 2~3만 원 추가 수익', trend: 'up' as const },
    { area: '인천공항 인접 수요', proof: '"인천공항 15분"(숙소3) 태그 강조. Nanami(일본인 추정) 리뷰 존재', size: '공항 인접 숙소 오프시즌 점유율 유지 강점', trend: 'up' as const },
    { area: '침구교체 유료화', proof: '숙소1·2가 침구교체 2만 원 청구 — 불만 언급되나 예약 이탈로 이어지지 않음', size: '월 30~50박 × 50% 교체 = 월 30~50만 원 부가수익/호', trend: 'stable' as const },
  ],
};

const topRooms = [
  {
    rank: 1,
    name: '영종도 풀오션뷰 / 넷플릭스 무료 / 주차무료',
    url: 'https://www.airbnb.co.kr/rooms/40183996',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-40183996/original/df42294d-7b00-4b4a-9b82-b24b11521b30.jpeg',
    rating: 4.88,
    reviewCount: 181,
    isSuperhost: true,
    titleKeywords: ['풀오션뷰', '넷플릭스무료', '주차무료', '반려동물허용', '테라스'],
    instantBook: true,
    amenities: ['넷플릭스', '무료주차', '테라스', '반려동물허용', '에어컨'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    lastReviewDate: '2026-02',
    thumbnailStrategy: '오션뷰 전망 메인, 인테리어 보조 — 무료 혜택 3종 전면 배치',
    rankingStrength: '후기 누적량 최대 + 슈퍼호스트 6년 = 알고리즘 신뢰도 최상. 제목에 "무료" 키워드 3개로 가성비 클릭률 극대화.',
  },
  {
    rank: 2,
    name: '영종도풀오션뷰 · 늦은 13시체크아웃 · 일본감성 · 다도세트',
    url: 'https://www.airbnb.co.kr/rooms/1186004573241827717',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1186004573241827717/original/91477865-6cb7-41f1-aa58-677466b6179e.jpeg',
    rating: 4.95,
    reviewCount: 60,
    isSuperhost: true,
    titleKeywords: ['풀오션뷰', '13시체크아웃', '일본감성', '다도세트', '무인카페'],
    instantBook: true,
    amenities: ['다도세트', '무인카페', '테라스', '넷플릭스', '무료주차'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    lastReviewDate: '2026-03',
    thumbnailStrategy: '일본 감성 인테리어 메인 + 오션뷰 테라스 보조 — 차별화 경험 전면 배치',
    rankingStrength: '"늦은 체크아웃 13시"를 제목 2번째 위치에 배치. 후기에서 반복 등장하는 핵심 차별점. 4.95 평점 + 게스트 선호 배지로 후기 수 보완.',
  },
  {
    rank: 3,
    name: '풀오션뷰 한옥Stay 스위트룸(자쿠지)_노을 전망_인천공항 15분',
    url: 'https://www.airbnb.co.kr/rooms/1401799113294551700',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1401799113294551700/original/88c6e443-cda5-4d5d-b8f5-2b620d37b487.jpeg',
    rating: 4.96,
    reviewCount: 189,
    isSuperhost: true,
    titleKeywords: ['풀오션뷰', '한옥Stay', '자쿠지', '노을전망', '인천공항15분'],
    instantBook: true,
    amenities: ['자쿠지', '조식뷔페', '보드게임', '넷플릭스', '무료주차', '셀프체크인'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    lastReviewDate: '2026-04 (1주 이내)',
    thumbnailStrategy: '자쿠지·한옥 인테리어 메인 + 오션뷰 보조. 한옥 소품 + 창밖 인천대교 노을 — 문화+자연 2가지 동시 노출',
    rankingStrength: '후기 빈도 최고 + 상위 5% 배지 + 최근성(1주 이내 후기) = 알고리즘 3중 최적화. 자쿠지를 제목 괄호 안에 배치해 눈에 띄게 처리.',
  },
  {
    rank: 4,
    name: '오션뷰 한옥스테이 (대조군 — 하위 노출)',
    url: 'https://www.airbnb.co.kr/rooms/1571786840958419875',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1571786840958419875/original/4b0bcfcf-71f2-4281-8aa6-524d8f925f59.jpeg',
    rating: 4.29,
    reviewCount: 17,
    isSuperhost: false,
    titleKeywords: ['한옥감성', '빔프로젝터', '넷플릭스', '반려동물허용'],
    instantBook: false,
    amenities: ['빔프로젝터', '넷플릭스', '반려동물허용'],
    hostResponseRate: '미확인',
    hostResponseTime: '지연 (리뷰 언급)',
    lastReviewDate: '2026-03',
    thumbnailStrategy: '한옥감성 이미지 — 오션뷰 부각 미흡',
    rankingStrength: '청소 불량(★1 후기) → 평점 4.29로 급락 → 알고리즘 노출 최하위. 어메니티(빔프로젝터·반려동물)는 경쟁력 있으나 청소 일관성 실패로 모든 전략 무효.',
  },
];

const topRoomsPatterns = [
  { pattern: '슈퍼호스트', count: 3, total: 4, insight: '상위 3곳 100% 슈퍼호스트 — 미인증 숙소는 검색 상단 도달 불가' },
  { pattern: '즉시예약 활성화', count: 3, total: 4, insight: '즉시예약 없으면 에어비앤비 알고리즘 페널티 — 필수 조건' },
  { pattern: '후기 100개 이상', count: 2, total: 4, insight: '60개 숙소도 상위권 진입 — 평점 4.9+가 후기 수 보완' },
  { pattern: '늦은 체크아웃 (13시+)', count: 2, total: 4, insight: '상위권 2/4가 레이트 체크아웃을 제목 키워드로 활용 — 강력 검색 유입' },
  { pattern: '평균 평점 4.88 이상', count: 3, total: 4, insight: '4.9 미만은 "게스트 선호" 배지 미달 — 노출 급감' },
  { pattern: '응답률 100% / 1시간 이내', count: 3, total: 4, insight: '응답 속도가 알고리즘 순위에 직접 반영 — 대조군은 응답 지연으로 페널티' },
];

const topRoomsActions = [
  '슈퍼호스트 기준 달성: 응답률 90%+ 유지, 취소율 1% 이하, 완료 숙박 10박 이상, 평점 4.8+',
  '즉시예약 활성화: 설정 → 예약 설정 → "즉시 예약 허용" ON',
  '제목에 레이트 체크아웃 시간 직접 삽입 (예: "13시체크아웃" or "늦은오후2시체크아웃")',
  '썸네일 1번 사진: 침대+바다 프레임 또는 창밖 뷰 와이드샷으로 교체',
  '후기 최신성 관리: 체크아웃 후 24시간 이내 호스트 후기 작성, 월 2건 이상 신규 후기 유지',
  '노출 점수 공식 적용: 슈퍼호스트(×2.0) + (평점-4.0)×10 + log(후기수)×1.5 + 최근30일후기수×0.8',
];

// offers / viral — 분석 파일 미작성 상태, 문제 기반 플레이스홀더
const offers = [
  { title: '청소 불량 대응 오퍼', headline: '입실 전 제3자 청소 검수 보장 — 미흡 시 30% 즉시 환불', urgency: 9, wtp: 9, tags: ['#청소보장', '#즉시환불'] },
  { title: '침구교체 비용 없음 오퍼', headline: '침구 교체는 기본 서비스, 추가 청구 없음', urgency: 7, wtp: 9, tags: ['#NoCharge', '#침구무료'] },
  { title: '욕실 프라이버시 보장 오퍼', headline: '모든 욕실·테라스에 블라인드 설치 완료 인증', urgency: 8, wtp: 8, tags: ['#프라이버시', '#블라인드완비'] },
  { title: '늦은 체크아웃 13시 무료', headline: '13시 체크아웃 무료 — 아침을 온전히 즐기세요', urgency: 6, wtp: 7, tags: ['#13시체크아웃', '#레이트'] },
  { title: '시설 고장 즉시 수리 SLA', headline: '고장 신고 후 1시간 내 수리 또는 전액 환불', urgency: 8, wtp: 7, tags: ['#SLA', '#즉시수리'] },
];

const viralHooks = [
  { emotion: '공포', text: '영종도 에어비앤비 예약 전, 이것 하나만 확인하세요. 안 하면 기념일 여행 후회합니다.', color: 'red' },
  { emotion: '분노', text: '청소비 2만원 내고, 퇴실 전 침구 교체 요청까지 해야 합니다. 이게 정상인가요?', color: 'orange' },
  { emotion: '공포', text: '욕실 블라인드 없는 숙소, 예약 전엔 아무도 알려주지 않습니다.', color: 'red' },
  { emotion: '분노', text: '11시 체크아웃이 존재하는 이유를 알고 나서 다시는 그 숙소 안 갔습니다.', color: 'orange' },
  { emotion: '호기심', text: '에어비앤비 리뷰에서 이 단어 하나만 검색하면 방음 좋은 방 바로 찾습니다.', color: 'purple' },
  { emotion: '지위', text: '호캉스 20번 다녀온 사람이 영종도 숙소 고를 때 보는 것 딱 4가지.', color: 'blue' },
  { emotion: '공감', text: '직장 다니면서 겨우 낸 하루 연차, 11시 체크아웃에 아침을 통째로 잃었습니다.', color: 'pink' },
  { emotion: '반전', text: '더럽게 쓰고 나가도 추가 청구가 없는 숙소. 이게 가능한 이유가 있습니다.', color: 'amber' },
  { emotion: '호기심', text: '영종도 단골들이 체크인 전 호스트에게 반드시 묻는 질문 3가지.', color: 'purple' },
  { emotion: '반전', text: '비싼 호텔 예약이 때로는 더 손해인 이유. 에어비앤비 한 가지만 다르게 고르면 됩니다.', color: 'amber' },
];

const eventCalendar = [
  {
    month: '4월',
    strategy: 'T1 HOME GROUND (04.24~26) e스포츠 팬 수요 강함 — ₩180,000 + 최소 1박 설정. DxS [소야곡] (04.17~19)도 동일 배율.',
    events: [
      { date: '04.11~19', name: '인천 고려산 진달래축제', venue: '강화군 고려산', category: '자연·축제', demand: 3 },
      { date: '04.11~12', name: 'tuki. 1ST ASIA TOUR 2026', venue: '인스파이어 아레나', category: 'K팝·콘서트', demand: 4 },
      { date: '04.17~19', name: 'DxS [소야곡] ON STAGE', venue: '인스파이어 아레나', category: '공연', demand: 4 },
      { date: '04.17~5.17', name: '핑크페스타', venue: '강화군', category: '축제', demand: 2 },
      { date: '04.24~26', name: '2026 T1 HOME GROUND', venue: '인스파이어 아레나', category: 'e스포츠', demand: 4 },
    ],
  },
  {
    month: '5월',
    strategy: '05.30 M COUNTDOWN X MEGA CONCERT + 빈티지 마켓 겹침. 05.29~31 기간 ₩180,000 + 최소 1박 권고.',
    events: [
      { date: '05.05', name: '인천어린이과학관 행사 (어린이날)', venue: '인천어린이과학관', category: '가족·행사', demand: 3 },
      { date: '05.08~10', name: '2026 트라이보울 클래식 페스티벌', venue: '트라이보울', category: '클래식·공연', demand: 2 },
      { date: '05.30~31', name: '오슬로우 빈티지 마켓', venue: '인천 (장소 미정)', category: '마켓·팝업', demand: 2 },
      { date: '05.30', name: '2026 M COUNTDOWN X MEGA CONCERT', venue: '인스파이어 아레나', category: 'K팝·콘서트', demand: 4 },
    ],
  },
  {
    month: '7~8월',
    strategy: '연중 최성수기. 해수욕장 개장(7월 초)부터 8월 말까지 ₩150,000+ 전면 적용. 펜타포트(07.31~08.02) ×2.0~2.5 배율.',
    events: [
      { date: '07월 초', name: '을왕리·왕산 해수욕장 개장', venue: '을왕리 해수욕장', category: '해수욕·여름', demand: 5 },
      { date: '07.31~08.02', name: '인천펜타포트 락 페스티벌', venue: '인천 송도 일대', category: '록·페스티벌', demand: 4 },
      { date: '08.14~10.18', name: '국가유산 미디어아트', venue: '인천 (장소 미정)', category: '전시·문화', demand: 2 },
    ],
  },
  {
    month: '10월',
    strategy: 'EDC 코리아 개천절 연휴(10.03~04) 겹침 — 수요 폭발 예상. 티켓 판매 시작 즉시 최대 인상 + 최소 2박 설정 강력 권고.',
    events: [
      { date: '10.02~04', name: '부평풍물대축제', venue: '부평', category: '전통·축제', demand: 2 },
      { date: '10.03~04', name: 'EDC 코리아 2026', venue: '인스파이어 리조트', category: 'EDM·페스티벌', demand: 5 },
    ],
  },
];

const pricingData = {
  base: { weekday: 90000, weekend: 120000, peak: 150000 },
  multipliers: [
    { stars: 5, label: '★★★★★', mult: '×2.0~3.0', desc: '인스파이어 대형 페스티벌, 해수욕 성수기' },
    { stars: 4, label: '★★★★', mult: '×1.5~1.8', desc: '인스파이어 K팝·e스포츠, 인천 대형 축제' },
    { stars: 3, label: '★★★', mult: '×1.2~1.3', desc: '지역 축제, 연휴' },
    { stars: 2, label: '★★', mult: '×1.0~1.1', desc: '소규모 이벤트, 모니터링 유지' },
  ],
  monthly: [
    {
      period: '2026-04',
      label: '4월 잔여 (04.16~30)',
      rows: [
        { dates: '04.16 (목)', event: '진달래축제', demand: 3, price: 108000, minNights: null as number | null, timing: '즉시' },
        { dates: '04.17~19 (금~일)', event: 'DxS [소야곡] ON STAGE', demand: 4, price: 180000, minNights: 1, timing: '즉시 ⚡' },
        { dates: '04.20~23 (월~목)', event: '핑크페스타 (간접)', demand: 2, price: 90000, minNights: null as number | null, timing: '기본가' },
        { dates: '04.24~26 (금~일)', event: 'T1 HOME GROUND', demand: 4, price: 180000, minNights: 1, timing: '즉시 ⚡' },
        { dates: '04.27~30 (월~목)', event: '핑크페스타', demand: 2, price: 90000, minNights: null as number | null, timing: '기본가' },
      ],
    },
    {
      period: '2026-05',
      label: '5월 전체',
      rows: [
        { dates: '05.01~03 (금~일)', event: '핑크페스타 (잔여)', demand: 2, price: 120000, minNights: null as number | null, timing: '기본가' },
        { dates: '05.05 (화)', event: '어린이날 공휴일', demand: 3, price: 108000, minNights: null as number | null, timing: 'D-14 알림' },
        { dates: '05.08~10 (금~일)', event: '트라이보울 클래식 페스티벌', demand: 2, price: 120000, minNights: null as number | null, timing: '기본가' },
        { dates: '05.29~31 (금~일)', event: 'M COUNTDOWN X MEGA CONCERT', demand: 4, price: 180000, minNights: 1, timing: '즉시 ⚡' },
      ],
    },
  ],
  actions: [
    '즉시 적용: DxS ON STAGE (04.17~19) → ₩180,000 + 최소 1박',
    '즉시 적용: T1 HOME GROUND (04.24~26) → ₩180,000 + 최소 1박',
    '04.21 캘린더 알림: 어린이날 (05.05) → ₩108,000 인상',
    '즉시 적용: M COUNTDOWN (05.29~31) → ₩180,000 + 최소 1박',
    '06.15 전 데드라인: 7~8월 전체 기간 성수기 가격(₩150,000+) 설정 완료',
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
          src="https://a0.muscache.com/im/pictures/hosting/Hosting-1401799113294551700/original/88c6e443-cda5-4d5d-b8f5-2b620d37b487.jpeg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="영종도 오션뷰"
        />
        <div className="relative z-10 text-center px-4 w-full max-w-full overflow-hidden">
          <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">영종도 커플 호캉스 · {TODAY_DATE}</p>
          <h1 className="text-white text-4xl sm:text-6xl md:text-9xl font-serif italic mb-4">Market Report</h1>
          <p className="text-white text-xl tracking-[0.3em] uppercase opacity-80">Airbnb Intelligence</p>
          <div className="flex justify-center gap-3 sm:gap-6 mt-8 flex-wrap px-2">
            {[['4', '숙소 스크래핑'], ['447', '총 후기 수'], ['4.69', '평균 평점'], ['600~900억', 'SAM 시장']].map(([v, l], i, arr) => (
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
              Airbnb 실시간 리뷰 수집 · {TODAY_DATE} · 4곳 · 총 후기 447개
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
                  { label: '수집 숙소 수', value: '4곳 (1곳 스크래핑 오류)' },
                  { label: '평균 평점 (상위 3곳)', value: '4.93 (전체 평균 4.69)' },
                  { label: '가장 많은 칭찬', value: '전망/바다뷰, 청결, 가성비' },
                  { label: '가장 많은 불만', value: '청소 미흡, 침구교체 비용, 욕실 블라인드 없음' },
                  { label: '슈퍼호스트 패턴', value: '상위 3곳 모두 슈퍼호스트, 응답률 100%, 1시간 이내' },
                  { label: '기회 포인트', value: '늦은 체크아웃 무료 제공 → 후기 차별화 (숙소2, 3 검증)' },
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
              TAM / SAM / SOM · 핵심 트렌드 5개 · 공백 기회 5개 · 돈의 흐름
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
                      <h4 className="font-bold text-base mb-1" style={{ color: '#111111' }}>{trend.title}</h4>
                      <p className="text-sm mb-3" style={{ color: '#444444' }}>{trend.description}</p>
                      <p className="text-xs bg-slate-100 text-slate-600 px-3 py-2 rounded-lg">{trend.signal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 공백 기회 */}
            <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>덜 공략된 기회 5개</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {marketAnalysis.opportunities.map((opp) => (
                <div key={opp.rank} className="bg-white border border-slate-200 rounded-[12px] flex flex-col overflow-hidden">
                  <div className="px-5 pt-5 pb-4 flex-1">
                    <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full mb-3 inline-block">기회 {opp.rank}</span>
                    <h4 className="font-bold text-sm mb-2" style={{ color: '#111111' }}>{opp.title}</h4>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: '#444444' }}>{opp.description}</p>
                    <p className="text-xs font-medium" style={{ color: '#111111' }}>{opp.potential}</p>
                  </div>
                  <div style={{ height: '3px', background: '#F5C800' }} />
                </div>
              ))}
            </div>

            {/* 돈의 흐름 */}
            <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>돈의 흐름</h3>
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <div className="space-y-4">
                {marketAnalysis.moneyFlows.map((flow, i) => (
                  <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 mt-1">
                      {(flow.trend as string) === 'up' ? (
                        <TrendingUp size={16} className="text-slate-700" />
                      ) : (flow.trend as string) === 'down' ? (
                        <TrendingDown size={16} className="text-slate-400" />
                      ) : (
                        <Minus size={16} className="text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-sm" style={{ color: '#111111' }}>{flow.area}</span>
                      <p className="text-xs mt-0.5" style={{ color: '#444444' }}>{flow.proof}</p>
                    </div>
                    <span className="text-xs font-medium text-right flex-shrink-0 max-w-[140px]" style={{ color: '#444444' }}>{flow.size}</span>
                  </div>
                ))}
              </div>
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
              문제 분석
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              WTP 내림차순 · TOP 10 · 분석일 {TODAY_DATE} · 실질 3곳 + 대조군 1곳
            </p>

            <div className="space-y-3 mb-12">
              {problemMatrix.map((item) => (
                <div key={item.rank} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-slate-200 leading-none flex-shrink-0 w-8 text-center">{item.rank}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-bold text-sm" style={{ color: '#111111' }}>{item.problem}</h4>
                        <div className="flex gap-1">
                          {item.flags.includes('RED') && (
                            <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">긴급</span>
                          )}
                          {item.flags.includes('ROCKET') && (
                            <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">급증</span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs italic mb-3" style={{ color: '#444444' }}>{item.quote}</p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <span><span className="font-bold" style={{ color: '#111111' }}>WTP</span> <span style={{ color: '#444444' }}>{item.wtp}/10</span></span>
                        <span><span className="font-bold" style={{ color: '#111111' }}>긴급도</span> <span style={{ color: '#444444' }}>{item.urgency}/10</span></span>
                        <span><span className="font-bold" style={{ color: '#111111' }}>실제불평</span> <span style={{ color: '#444444' }}>{item.complaintCount}회</span></span>
                        <span><span className="font-bold" style={{ color: '#111111' }}>성장</span> <span style={{ color: '#444444' }}>{item.growthRate}</span></span>
                      </div>
                    </div>
                    {/* WTP 바 */}
                    <div className="flex-shrink-0 hidden sm:flex flex-col items-end gap-1">
                      <span className="text-xs font-bold" style={{ color: '#111111' }}>WTP {item.wtp}</span>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-700 rounded-full" style={{ width: `${item.wtp * 10}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 핵심 인사이트 */}
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>핵심 인사이트</h3>
              <ol className="space-y-3">
                {[
                  '청소 불량은 단독으로 ★1 리뷰를 유발하는 유일한 즉각 탈락 요인. 숙소5의 평점 4.29는 청소+응대 문제만으로 설명된다.',
                  '침구 교체 비용(2만원)은 고평점 숙소(4.88, 4.95)에서도 불만 키워드로 등장. WTP 9점 문제임에도 쉽게 해소 가능한 정책 항목이다.',
                  '늦은 체크아웃 무료 제공은 이미 검증된 후기 차별화 수단(숙소2·3)으로, 도입 비용 대비 리뷰 ROI가 가장 높다.',
                  '욕실 블라인드·단열·시설 고장은 1회성 설치·수리로 해소되는 물리적 문제임에도 반복 언급 — 호스트의 시설 점검 루틴 부재가 근본 원인.',
                ].map((insight, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: '#444444' }}>
                    <span className="font-bold flex-shrink-0" style={{ color: '#111111' }}>{i + 1}.</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ol>
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
              고전환 오퍼
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              문제 분석 기반 오퍼 설계 (초안) · 오퍼-바이럴 상세 분석 파일 작성 예정
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {offers.map((offer, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[12px] flex flex-col overflow-hidden">
                  <div className="px-5 pt-5 pb-4 flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">WTP {offer.wtp}/10</span>
                      <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">긴급도 {offer.urgency}/10</span>
                    </div>
                    <h4 className="font-bold text-sm mb-2" style={{ color: '#111111' }}>{offer.title}</h4>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#444444' }}>{offer.headline}</p>
                    <div className="flex flex-wrap gap-1">
                      {offer.tags.map((tag, j) => (
                        <span key={j} className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ height: '3px', background: '#F5C800' }} />
                </div>
              ))}
            </div>
            <div className="mt-10 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <p className="text-sm" style={{ color: '#444444' }}>
                오퍼 상세 설계 (티어 구성, 가격, 보장 조건, 바이럴 훅 연결)는 <span className="font-bold" style={{ color: '#111111' }}>offers-viral 분석 파일</span> 작성 후 업데이트 예정입니다.
                현재 데이터는 문제 분석(analysis-problems-2026-04-16.md) 기반 플레이스홀더입니다.
              </p>
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
              바이럴 전략
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              감정 훅 · 10개 인스타/틱톡/릴스 후크 초안 · 상세 전략 파일 작성 예정
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {viralHooks.map((hook, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6">
                  <span className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full mb-3 inline-block">{hook.emotion}</span>
                  <p className="text-sm leading-relaxed font-medium" style={{ color: '#111111' }}>{hook.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <p className="text-sm" style={{ color: '#444444' }}>
                바이럴 전략 상세 (SPICE 프레임워크, 채널별 게시 캘린더, CTA 연결 구조)는 <span className="font-bold" style={{ color: '#111111' }}>offers-viral 분석 파일</span> 작성 후 업데이트 예정입니다.
              </p>
            </div>
          </section>
        )}

        {/* ── 상위 노출 룸 ── */}
        {activeTab === 'toprooms' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-yellow-400/10">
                <Award size={20} className="text-yellow-500" />
              </span>
              상위 노출 룸 분석
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              검색 상위 노출 공식 역분석 · 즉시 적용 액션 아이템 · 분석일 {TODAY_DATE}
            </p>

            {/* 알고리즘 공식 박스 */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-12 overflow-x-auto">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-slate-400">알고리즘 노출 점수 가설 공식</h3>
              <pre className="text-sm leading-relaxed text-slate-200 whitespace-pre-wrap font-mono">
{`노출 점수 = (슈퍼호스트 여부 × 2.0)
           + (평점 - 4.0) × 10
           + log(후기 수) × 1.5
           + (최근 30일 후기 수 × 0.8)
           + (게스트 선호 배지 × 1.5)
           + (즉시예약 여부 × 0.5)
           + (풀오션뷰 키워드 포함 × 0.3)`}
              </pre>
              <p className="text-xs text-slate-400 mt-4">슈퍼호스트와 평점이 지수적 영향을 미치며, 후기 최신성이 정체된 리스팅을 역전시키는 핵심 변수.</p>
            </div>

            {/* 룸 카드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {topRooms.map((room) => (
                <div
                  key={room.rank}
                  className="group cursor-zoom-in overflow-hidden rounded-[12px] bg-white border border-slate-200 flex flex-col"
                  onClick={() => setLightbox({ src: room.image, title: room.name, tag: `★${room.rating}` })}
                >
                  <div className="relative overflow-hidden h-48 rounded-t-[12px]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${room.isSuperhost ? 'bg-[#111111] text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                        {room.isSuperhost ? '슈퍼호스트' : '비슈퍼호스트'}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" fill="#F5C800" strokeWidth={0} />
                      {room.rating}
                    </div>
                  </div>
                  <div className="px-5 pt-4 pb-4 flex-1 flex flex-col gap-2">
                    <p className="font-bold text-sm leading-snug" style={{ color: '#111111' }}>{room.name}</p>
                    <p className="text-xs" style={{ color: '#444444' }}>{room.reviewCount}개 후기 · 최근 후기 {room.lastReviewDate}</p>
                    <div className="flex flex-wrap gap-1 my-1">
                      {room.titleKeywords.slice(0, 3).map((kw, j) => (
                        <span key={j} className="bg-[#111111]/5 text-[#111111] text-xs font-medium px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#444444' }}>{room.rankingStrength}</p>
                  </div>
                  <div style={{ height: '3px', background: '#F5C800' }} />
                </div>
              ))}
            </div>

            {/* 공통 패턴 */}
            <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>상위 노출 공통 패턴</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {topRoomsPatterns.map((p, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm" style={{ color: '#111111' }}>{p.pattern}</span>
                    <span className="text-sm font-bold" style={{ color: '#111111' }}>{p.count}/{p.total}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-slate-700 rounded-full" style={{ width: `${(p.count / p.total) * 100}%` }} />
                  </div>
                  <p className="text-xs" style={{ color: '#444444' }}>{p.insight}</p>
                </div>
              ))}
            </div>

            {/* 즉시 적용 액션 */}
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>즉시 적용 액션 아이템</h3>
              <ol className="space-y-3">
                {topRoomsActions.map((action, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: '#444444' }}>
                    <ChevronRight size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#111111' }} />
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ── 이벤트 달력 ── */}
        {activeTab === 'calendar' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10">
                <CalendarDays size={20} className="text-emerald-600" />
              </span>
              이벤트 달력
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              2026 영종도·인천 주요 이벤트 · 수요 강도 기반 가격 전략 연계 · 업데이트 {TODAY_DATE}
            </p>

            {/* 수요 강도 범례 */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { label: '★★★★★', desc: '대형 페스티벌·성수기', bg: 'bg-[#111111] text-white' },
                { label: '★★★★', desc: 'K팝·e스포츠 콘서트', bg: 'bg-[#111111]/70 text-white' },
                { label: '★★★', desc: '지역 축제·연휴', bg: 'bg-[#111111]/10 text-[#111111]' },
                { label: '★★', desc: '소규모 이벤트', bg: 'bg-slate-100 text-slate-600' },
              ].map((item) => (
                <span key={item.label} className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 ${item.bg}`}>
                  <span>{item.label}</span>
                  <span className="opacity-70">{item.desc}</span>
                </span>
              ))}
            </div>

            {/* 월별 이벤트 */}
            <div className="space-y-10 mb-12">
              {eventCalendar.map((month) => (
                <div key={month.month}>
                  <div className="flex flex-wrap items-baseline gap-3 mb-4">
                    <h3 className="text-xl font-bold" style={{ color: '#111111' }}>{month.month}</h3>
                    <p className="text-xs" style={{ color: '#444444' }}>{month.strategy}</p>
                  </div>
                  <div className="space-y-2">
                    {month.events.map((ev, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-2xl px-5 py-4 flex flex-wrap sm:flex-nowrap items-center gap-3">
                        <span className="text-xs font-mono font-bold text-slate-500 flex-shrink-0 w-28">{ev.date}</span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                            ev.demand === 5 ? 'bg-[#111111] text-white' :
                            ev.demand === 4 ? 'bg-[#111111]/70 text-white' :
                            ev.demand === 3 ? 'bg-[#111111]/10 text-[#111111]' :
                            'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {'★'.repeat(ev.demand)}
                        </span>
                        <span className="font-bold text-sm flex-1 min-w-0" style={{ color: '#111111' }}>{ev.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs" style={{ color: '#444444' }}>{ev.venue}</span>
                          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{ev.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 연중 수요 바 */}
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl mb-10">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>연중 수요 강도 개요</h3>
              <div className="space-y-2 font-mono text-sm" style={{ color: '#444444' }}>
                {[
                  ['1~2월', '░░░░░░░', '비수기'],
                  ['3월', '░░░▒▒░░', '봄 시작'],
                  ['4월', '▒▒▒███▒', '인스파이어 공연 + 진달래축제'],
                  ['5월', '▒▒▒▒▒▒▒', '중간'],
                  ['6월', '▒▒▒▒▒▒▒', '중간'],
                  ['7월', '███████', '해수욕 성수기'],
                  ['8월', '███████', '해수욕 성수기 + 펜타포트'],
                  ['9월', '▒▒▒▒▒▒▒', '가을 시작'],
                  ['10월', '▒▒████▒', 'EDC 코리아 + 개천절 연휴'],
                  ['11월', '░░░░░░░', '비수기'],
                  ['12월', '▒▒▒███▒', '인스파이어 연말 공연 예상'],
                ].map(([m, bar, desc]) => (
                  <div key={m} className="flex items-center gap-3">
                    <span className="w-12 text-right text-xs font-bold" style={{ color: '#111111' }}>{m}</span>
                    <span className="tracking-wider" style={{ color: '#111111' }}>{bar}</span>
                    <span className="text-xs" style={{ color: '#444444' }}>{desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color: '#888888' }}>░ 비수기 &nbsp; ▒ 보통 &nbsp; █ 성수기</p>
            </div>

            {/* 다음 확인 일정 */}
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>확인 주기</h3>
              <div className="space-y-3 text-sm">
                {[
                  { when: '매주 월요일', what: '인스파이어 아레나 공연 라인업 신규 등록 확인', link: 'https://www.inspireresorts.com/ko/entertainment/inspire-arena/featured-performances' },
                  { when: '매월 1일', what: '인천투어 이번 달 축제·행사 목록 갱신', link: 'https://itour.incheon.go.kr/ssst/ssst/list.do?pageNm=fstv' },
                  { when: '즉시 (지금)', what: '인스파이어 5~6월 공연 라인업 확인 — 사이트 업데이트 빠름', link: null },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="font-bold flex-shrink-0 w-24 text-xs" style={{ color: '#111111' }}>{item.when}</span>
                    <span style={{ color: '#444444' }}>{item.what}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 가격 전략 ── */}
        {activeTab === 'pricing' && (
          <section>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif mb-2 border-b pb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-500/10">
                <DollarSign size={20} className="text-slate-600" />
              </span>
              가격 전략
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide uppercase mb-8 sm:mb-10 leading-relaxed">
              이벤트 배율 기반 날짜별 권장 가격 · 기준일 {TODAY_DATE} · 매월 1일 갱신
            </p>

            {/* 기본 요금 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
              {[
                { label: '평일 기본가', sublabel: '월~목', value: `₩${pricingData.base.weekday.toLocaleString()}` },
                { label: '주말 기본가', sublabel: '금~일', value: `₩${pricingData.base.weekend.toLocaleString()}` },
                { label: '성수기 기본가', sublabel: '7~8월', value: `₩${pricingData.base.peak.toLocaleString()}` },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-7 ${i === 0 ? 'bg-slate-900 text-white' : i === 1 ? 'bg-slate-800 text-white' : 'bg-slate-700 text-white'}`}>
                  <p className="text-xs font-bold tracking-[0.3em] uppercase mb-1 text-slate-400">{item.label}</p>
                  <p className="text-xs text-slate-400 mb-3">{item.sublabel}</p>
                  <p className="text-3xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* 이벤트 배율 기준 */}
            <h3 className="text-xl font-bold mb-4" style={{ color: '#111111' }}>이벤트 배율 기준</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {pricingData.multipliers.map((m) => (
                <div key={m.label} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold" style={{ color: '#111111' }}>{m.label}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        m.stars === 5 ? 'bg-[#111111] text-white' :
                        m.stars === 4 ? 'bg-[#111111]/70 text-white' :
                        m.stars === 3 ? 'bg-[#111111]/10 text-[#111111]' :
                        'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {m.mult}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#444444' }}>{m.desc}</p>
                </div>
              ))}
            </div>

            {/* 월별 가격표 */}
            {pricingData.monthly.map((period) => (
              <div key={period.period} className="mb-10">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#111111' }}>{period.label}</h3>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: '#444444' }}>날짜</th>
                          <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: '#444444' }}>이벤트</th>
                          <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: '#444444' }}>수요</th>
                          <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: '#444444' }}>권장 가격</th>
                          <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: '#444444' }}>최소 박수</th>
                          <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wide" style={{ color: '#444444' }}>타이밍</th>
                        </tr>
                      </thead>
                      <tbody>
                        {period.rows.map((row, i) => (
                          <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-3 font-mono text-xs" style={{ color: '#444444' }}>{row.dates}</td>
                            <td className="px-5 py-3 font-medium text-xs" style={{ color: '#111111' }}>{row.event}</td>
                            <td className="px-5 py-3 text-center">
                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  row.demand === 5 ? 'bg-[#111111] text-white' :
                                  row.demand === 4 ? 'bg-[#111111]/70 text-white' :
                                  row.demand === 3 ? 'bg-[#111111]/10 text-[#111111]' :
                                  'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {'★'.repeat(row.demand)}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right font-bold text-sm" style={{ color: row.demand >= 4 ? '#111111' : '#444444' }}>
                              ₩{row.price.toLocaleString()}
                            </td>
                            <td className="px-5 py-3 text-center text-xs" style={{ color: '#444444' }}>
                              {row.minNights ? `${row.minNights}박 이상` : '없음'}
                            </td>
                            <td className="px-5 py-3 text-center">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                row.timing.includes('즉시') ? 'bg-[#111111] text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {row.timing}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            {/* 핵심 액션 */}
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#111111' }}>지금 당장 해야 할 액션</h3>
              <ol className="space-y-3">
                {pricingData.actions.map((action, i) => (
                  <li key={i} className="flex gap-3 text-sm" style={{ color: '#444444' }}>
                    <ChevronRight size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#111111' }} />
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

      </main>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-1.5 hover:bg-white transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="닫기"
            >
              <X size={16} />
            </button>
            <img src={lightbox.src} alt={lightbox.title} className="w-full object-cover max-h-[70vh]" />
            <div className="px-6 py-4 border-t border-slate-200">
              <p className="font-bold text-sm" style={{ color: '#111111' }}>{lightbox.title}</p>
              <p className="text-xs mt-1" style={{ color: '#444444' }}>{lightbox.tag}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirbnbResearch;
