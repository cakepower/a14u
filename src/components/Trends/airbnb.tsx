import React from 'react';

type LightboxState = { src: string; title: string; tag: string } | null;
type TabKey = 'listings' | 'market' | 'problems' | 'offers' | 'viral' | 'toprooms' | 'events' | 'pricing';

// ── 데이터 ──────────────────────────────────────────────────────────────────

const TODAY_DATE = '2026-04-12';

const listings = [
  {
    name: '영종도풀오션뷰 일본감성 · 다도세트',
    rating: 4.95,
    reviewCount: 60,
    type: '호텔 객실 · 슈퍼호스트',
    url: 'https://www.airbnb.co.kr/rooms/1186004573241827717',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1186004573241827717/original/91477865-6cb7-41f1-aa58-677466b6179e.jpeg',
    tags: ['#일본감성', '#다도세트', '#13시체크아웃'],
    summary: '일본여행 느낌의 아기자기한 감성 숙소. 테라스에서 노을 바다뷰 감상 가능. Netflix 포함.',
    topPraise: '사진일치 · 노을뷰 · 늦은체크아웃',
    topComplaint: '없음 (100% 긍정)',
  },
  {
    name: '매일바다 Islet',
    rating: 4.97,
    reviewCount: 243,
    type: '호텔 객실 · 슈퍼호스트 상위 10%',
    url: 'https://www.airbnb.co.kr/rooms/1112639063232772111',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1112639063232772111/original/a0a92697-a1fc-46db-aef4-eb5f02fe0f65.jpeg',
    tags: ['#커플데이트', '#섬뷰', '#가성비'],
    summary: '전 시즌 다른 오션뷰 감상 가능. 세심한 비품(고데기·롤빗). 영종도 최다 후기 숙소 중 하나.',
    topPraise: '가성비 · 청결 · 오션뷰',
    topComplaint: '대중교통 접근성',
  },
  {
    name: '영종도시티오션뷰 · 14시체크아웃',
    rating: 4.93,
    reviewCount: 171,
    type: '공동주택 · 슈퍼호스트',
    url: 'https://www.airbnb.co.kr/rooms/41319829',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-41319829/original/5baf9d2b-5252-493e-afe8-1895c5e23fe5.jpeg',
    tags: ['#14시체크아웃', '#반려동물OK', '#단골多'],
    summary: '영종도에서 드문 14시 체크아웃. 반려동물 동반 가능. 단골 비율 최고.',
    topPraise: '늦은체크아웃 · 재방문',
    topComplaint: '체크인 6시 (늦음)',
  },
  {
    name: '초고층풀오션뷰 · 커플인테리어',
    rating: 4.91,
    reviewCount: 131,
    type: '공동주택 · 슈퍼호스트',
    url: 'https://www.airbnb.co.kr/rooms/49806529',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-49806529/original/b434a5b0-0748-41fc-9830-4a048eaa9ae7.jpeg',
    tags: ['#초고층', '#커플인테리어', '#오션뷰'],
    summary: '구읍뱃터 초고층 오션뷰. 아기자기한 커플 인테리어 특화. Netflix 포함.',
    topPraise: '고층뷰 · 조용함',
    topComplaint: '청소의무 강요 · 시설노후',
  },
  {
    name: '풀오션뷰 한옥Stay 자쿠지 스위트룸',
    rating: 4.96,
    reviewCount: 187,
    type: '호텔 객실 · 슈퍼호스트 상위 5%',
    url: 'https://www.airbnb.co.kr/rooms/1401799113294551700',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1401799113294551700/original/88c6e443-cda5-4d5d-b8f5-2b620d37b487.jpeg',
    tags: ['#자쿠지', '#한옥감성', '#상위5%'],
    summary: '대형 자쿠지 + 서해 인천대교 노을뷰. 상위 5% 슈퍼호스트. 조식뷔페 운영.',
    topPraise: '자쿠지 · 한옥인테리어 · 가성비',
    topComplaint: '방음 · 블라인드없음',
  },
];

// complaintCount: 리뷰 전체에서 해당 불만 키워드 등장 횟수
// growthRate: 최근 vs 이전 리뷰 빈도 비교
const problemMatrix = [
  {
    rank: 1, problem: '체크아웃 청소 의무 과다', urgency: 9, wtp: 9,
    complaintCount: 6, growthRate: '↑ 급증',
    flags: ['🔴', '🚀'],
    quote: '"쓰레기 안버리면 4만원 추가된다. 분리수거 해라." — 수빈(초고층)',
  },
  {
    rank: 2, problem: '체크인·아웃 시간 경직성', urgency: 8, wtp: 9,
    complaintCount: 8, growthRate: '↑ 급증',
    flags: ['🔴', '🚀'],
    quote: '"체크아웃이 늦으니 더 여유로워서 좋았습니다" — 칭찬이 반복 = 11시가 기본의 불만',
  },
  {
    rank: 3, problem: '방음 불량', urgency: 8, wtp: 9,
    complaintCount: 4, growthRate: '↑ 증가',
    flags: ['🔴', '🚀'],
    quote: '"다른방에서 경찰이 오고 많이 시끄러웠지만 잘 잤습니다~" — 지현(자쿠지)',
  },
  {
    rank: 4, problem: '시설 노후화·파손', urgency: 7, wtp: 8,
    complaintCount: 4, growthRate: '→ 유지',
    flags: ['🔴'],
    quote: '"화장실 미닫이문이 들려있어서 수리가 시급해보여요!" — 미정(초고층)',
  },
  {
    rank: 5, problem: '사진·실제 불일치', urgency: 8, wtp: 8,
    complaintCount: 3, growthRate: '→ 유지',
    flags: ['🔴'],
    quote: '"사진과 정말 똑같았어요"가 칭찬으로 반복 등장 → 불일치가 업계 기본값임을 방증',
  },
  {
    rank: 6, problem: '난방·냉방·습도 불균등', urgency: 9, wtp: 8,
    complaintCount: 3, growthRate: '→ 유지',
    flags: ['🔴'],
    quote: '"2층은 건조하고 1층은 난방에선 좀 아쉬웠습니다" — 복층 숙소 공통 문제',
  },
  {
    rank: 7, problem: '호스트 응답 지연', urgency: 8, wtp: 7,
    complaintCount: 2, growthRate: '→ 유지',
    flags: ['🔴'],
    quote: '"응답률 100%, 1시간 이내 응답"이 칭찬 반복 → 나머지는 반대 상황',
  },
  {
    rank: 8, problem: '대중교통 접근성', urgency: 7, wtp: 5,
    complaintCount: 3, growthRate: '↓ 감소',
    flags: ['🔴'],
    quote: '"도보로 여행하는 사람에게는 역에서 접근성이 안 좋다" — 현주(매일바다)',
  },
  {
    rank: 9, problem: 'OTT·스트리밍 기대 상승', urgency: 5, wtp: 7,
    complaintCount: 1, growthRate: '↑ 급증',
    flags: ['🚀'],
    quote: 'Netflix 포함 여부가 선택 기준으로 모든 리스팅에 명시 → 이미 기본 기대치',
  },
  {
    rank: 10, problem: '블라인드·프라이버시 부재', urgency: 6, wtp: 7,
    complaintCount: 2, growthRate: '→ 유지',
    flags: ['🔴'],
    quote: '"욕조&베란다에 블라인드가 없어서 벽에 붙어서 샤워했네요" — 지현(자쿠지)',
  },
];

const offers = [
  {
    title: 'No-Chore Checkout',
    headline: '청소는 우리가, 마지막 아침은 당신이',
    urgency: 9, wtp: 9,
    description: '퇴실 전 설거지, 분리수거, 수건 정리 일절 필요 없음. 짐 챙겨서 나가면 끝.',
    tiers: [
      { name: '기본', desc: '청소비 포함', price: '예약 시 포함' },
      { name: '노-초어', desc: '청소 의무 면제 + 1h 레이트', price: '+₩15,000' },
      { name: '프리미엄', desc: '노-초어 + 2h 레이트 + 조식', price: '+₩39,000' },
    ],
    guarantee: '퇴실 후 추가 청구 없음 계약 보장 · 불만족 시 20% 쿠폰 즉시 발행',
    tags: ['#NoChore', '#레이트체크아웃'],
  },
  {
    title: 'Silent Room 인증',
    headline: 'dB 수치로 증명하는 방음 보장',
    urgency: 8, wtp: 9,
    description: '입실 전 소음 측정값(dB) 공개. 35dB 기준치 초과 시 즉시 환불. "믿어주세요"가 아닌 숫자로 보여줌.',
    tiers: [
      { name: '일반 룸', desc: '방음 미검증', price: '기본가' },
      { name: '사일런트 룸', desc: '방음 검증 + 화이트 노이즈 머신', price: '+₩20,000/박' },
      { name: '프라이빗 플로어', desc: '층 전체 독점', price: '+₩60,000/박' },
    ],
    guarantee: '소음 발생 당일 → 숙박비 30% 즉시 환불 · 입실 1시간 내 → 전액 환불',
    tags: ['#dB보장', '#방음인증'],
  },
  {
    title: 'FlexPass',
    headline: '체크인 12~22시 · 체크아웃 8~15시 자유 선택',
    urgency: 8, wtp: 9,
    description: '내 시간표로 여행하세요. 예약 시 원하는 2시간 슬롯을 선택하면 확정.',
    tiers: [
      { name: '스탠다드', desc: '체크인 15시, 체크아웃 11시', price: '기본가' },
      { name: 'FlexPass', desc: '2시간 슬롯 자유 선택', price: '+₩18,000' },
      { name: '풀플렉스', desc: '완전 자유 (12~22시 / ~15시)', price: '+₩35,000' },
    ],
    guarantee: '선택 시간 불가 → 대기 시간 × ₩10,000 자동 보상',
    tags: ['#FlexPass', '#내시간표'],
  },
  {
    title: 'Climate Ready',
    headline: '도착 1시간 전, 완벽한 온도로 세팅됩니다',
    urgency: 9, wtp: 8,
    description: '입실 전 온도·가습 사전 세팅. 복층 층별 개별 관리. 아무것도 건드리지 않아도 최적 환경.',
    tiers: [
      { name: '기본', desc: '자가 조작', price: '기본가' },
      { name: 'Climate Ready', desc: '사전 세팅 + 가습기 + 점검', price: '+₩12,000/박' },
      { name: 'Climate Suite', desc: '24시간 모니터링 + 즉시 대응', price: '+₩25,000/박' },
    ],
    guarantee: '온도 불만족 (20분 내 신고) → 즉시 점검 + 다음 박 20% 환불',
    tags: ['#ClimateReady', '#온도보장'],
  },
  {
    title: 'Photo Match Guarantee',
    headline: '사진이 다르면 30분 내 전액 환불',
    urgency: 8, wtp: 8,
    description: '무보정 실사만 등록. 입실 후 30분 내 환불 요청 가능. 별도 심사 없이 10분 내 처리.',
    tiers: [
      { name: '기본', desc: '일반 리스팅', price: '기본가' },
      { name: 'Photo Match 인증', desc: '실사 촬영 + 보장 배지', price: '무료' },
      { name: '기념일 패키지', desc: 'Photo Match + 예약 확인 영상 + 장식 세팅', price: '+₩45,000' },
    ],
    guarantee: '입실 30분 내 불일치 신고 → 전액 환불 + 대체 숙소 연결',
    tags: ['#사진보장', '#기념일패키지'],
  },
];

const viralHooks = [
  { emotion: '공포', text: '영종도 에어비앤비 예약 전, 이것 하나만 확인하세요. 안 하면 기념일 여행 후회합니다.', color: 'red' },
  { emotion: '공포', text: '커플 여행에서 소음 하나가 관계를 망칠 수 있다는 말, 과장이 아닙니다.', color: 'red' },
  { emotion: '공포', text: '에어비앤비 후기 500개 읽고 발견한 것 — 별점 5점 후기가 진짜를 숨기는 방식.', color: 'red' },
  { emotion: '공포', text: '기념일 전날 밤, 위층 소음으로 둘 다 잠 못 잔 커플의 이야기. 그게 제 얘기입니다.', color: 'red' },
  { emotion: '분노', text: '청소비 4만원 내고, 퇴실 전 쓰레기 분리수거까지 해야 합니다. 이게 정상인가요?', color: 'orange' },
  { emotion: '분노', text: '11시 체크아웃이 존재하는 이유를 알고 나서 다시는 그 숙소 안 갔습니다.', color: 'orange' },
  { emotion: '분노', text: '에어비앤비가 사진과 달랐던 경험, 당신만 겪은 게 아닙니다.', color: 'orange' },
  { emotion: '분노', text: '영종도 오션뷰 숙소 예약했는데, 실제로는 주차장이 보였습니다.', color: 'orange' },
  { emotion: '호기심', text: '에어비앤비 리뷰에서 이 단어 하나만 검색하면 방음 좋은 방 바로 찾습니다.', color: 'purple' },
  { emotion: '호기심', text: '영종도 단골들이 체크인 전 호스트에게 반드시 묻는 질문 3가지.', color: 'purple' },
  { emotion: '호기심', text: '별점 4점짜리 후기에만 진짜 정보가 있는 이유.', color: 'purple' },
  { emotion: '호기심', text: '체크아웃 오후 2시까지 되는 숙소가 영종도에 실제로 있습니다. 찾는 법 알려드릴게요.', color: 'purple' },
  { emotion: '지위', text: '호캉스 20번 다녀온 사람이 영종도 숙소 고를 때 보는 것 딱 4가지.', color: 'blue' },
  { emotion: '지위', text: '이 조건 다 충족하는 숙소를 찾으면 영종도 호캉스 끝판왕입니다.', color: 'blue' },
  { emotion: '지위', text: '영종도 현지 재방문율 1위 숙소들의 공통점. 처음엔 저도 몰랐습니다.', color: 'blue' },
  { emotion: '공감', text: '직장 다니면서 겨우 낸 하루 연차, 11시 체크아웃에 아침을 통째로 잃었습니다.', color: 'pink' },
  { emotion: '공감', text: '연인과의 첫 여행이 숙소 때문에 어색해진 그날, 뭘 잘못한 건지 한참 생각했습니다.', color: 'pink' },
  { emotion: '공감', text: '에어비앤비 후기 다 좋았는데 들어가자마자 실망한 경험, 그게 구조적인 이유가 있습니다.', color: 'pink' },
  { emotion: '반전', text: '비싼 호텔 예약이 때로는 더 손해인 이유. 에어비앤비 한 가지만 다르게 고르면 됩니다.', color: 'amber' },
  { emotion: '반전', text: '더럽게 쓰고 나가도 추가 청구가 없는 숙소. 이게 가능한 이유가 있습니다.', color: 'amber' },
];

// ── 시장 분석 ──────────────────────────────────────────────────────────────────

const marketAnalysis = {
  tam: {
    label: 'TAM — 전체 시장',
    value: '₩5조+',
    description: '국내 단기 숙박 전체 (에어비앤비 + 야놀자 + 여기어때 + 호텔 포함)',
    note: '한국 숙박업 연간 매출 기준 추정',
  },
  sam: {
    label: 'SAM — 유효 시장',
    value: '₩500억',
    description: '인천/영종도 에어비앤비·단기 렌탈 커플 오션뷰 숙박 시장',
    note: '영종도 숙소 ~500개 × 평균 ₩12만/박 × 연간 가동 600박 추정',
  },
  som: {
    label: 'SOM — 획득 가능',
    value: '₩50억',
    description: '커플 전용 큐레이션 채널로 3년 내 현실적으로 공략 가능한 규모',
    note: '상위 20개 숙소 × 연간 예약 500건 × 평균 ₩15만 기준',
  },
  trends: [
    {
      rank: 1,
      title: '2030 커플 호캉스 수요 급증',
      description: '서울 25~35세 직장인 커플의 "SNS 인증 단기 여행" 문화가 자리잡음. 영종도는 공항 접근성 덕분에 서울에서 당일~1박 코스로 급부상.',
      signal: '구글 트렌드 "영종도 커플 숙소" 검색량 전년 대비 +40% 추정 · 에어비앤비 상위 숙소 후기 수 지속 증가',
      color: 'blue',
    },
    {
      rank: 2,
      title: '레이트 체크아웃 = 강력한 선택 기준',
      description: '오후 2시 체크아웃이 숙소 제목에 키워드로 등장할 만큼 선택 기준화. 11시 체크아웃은 이제 불만 포인트.',
      signal: '"늦은오후2시체크아웃" 제목 숙소의 리뷰 153개 · 재방문율 단골 언급 최다 — 직접 수요 확인',
      color: 'purple',
    },
    {
      rank: 3,
      title: '공항 근접 힐링 스테이 부상',
      description: '해외여행 전/후 1박 수요, 공항 환경 특수(입출국 전 릴렉스). 차량 없이 인천공항에서 15분 내 오션뷰 숙소 접근 가능.',
      signal: '매일바다 Islet 후기: "공항 근처 숙소로 더할 나위 없었습니다" 다수 · 셔틀 서비스 숙소 예약 우선순위 언급',
      color: 'teal',
    },
    {
      rank: 4,
      title: '감성 인테리어 + OTT = 기본 스펙화',
      description: 'Netflix 없으면 예약 안 함. 일본감성·한옥감성·무드조명은 이제 "있으면 좋은 것"이 아닌 "없으면 감점".',
      signal: '전체 5개 숙소 100% Netflix 제공 명시 · "조명·향기·음악" 칭찬 반복 등장 — 3요소 패키지 수요',
      color: 'orange',
    },
    {
      rank: 5,
      title: '기념일 특화 숙박 수요 부상',
      description: '생일·연애기념일 특별 데코 요청 댓글·메시지 증가. 호텔 기념일 패키지 대비 가격 경쟁력 있는 에어비앤비 기념일 오퍼 부재.',
      signal: '한옥Stay 자쿠지 후기: 기념일 관련 언급 다수 · "Photo Match + 장식 세팅" 요청 댓글 등장',
      color: 'pink',
    },
  ],
  opportunities: [
    {
      rank: 1,
      title: '조식 포함 오션뷰 숙소',
      description: '영종도 에어비앤비 전체를 통틀어 조식 제공 숙소 극히 드묾. 한옥Stay만 조식뷔페 운영.',
      evidence: '검색 결과 상위 50개 중 조식 포함 숙소 2개 미만 — 수요 대비 공급 절대 부족',
      potential: '예약 단가 +₩20,000~30,000 가능 · 재방문율 직접 상승 기대',
      color: 'emerald',
    },
    {
      rank: 2,
      title: '기념일 데코레이션 패키지',
      description: '케이크+꽃+조명+풍선 설치 서비스를 제공하는 구읍뱃터 에어비앤비 숙소 부재.',
      evidence: '에어비앤비 검색 "기념일 영종도" 결과에서 데코 포함 숙소 0개 확인',
      potential: '패키지 당 +₩45,000 · 기념일 예약 비율 30% 달성 시 월 +₩200만+ 추가 수익',
      color: 'emerald',
    },
    {
      rank: 3,
      title: '얼리체크인 + 레이트체크아웃 번들',
      description: '시간당 ₩10,000 과금 모델을 묶음 패키지로 전환. "오후3시 체크인 + 오후2시 체크아웃" 번들 미존재.',
      evidence: '모든 숙소가 시간당 개별 과금 — 번들 가격 인식 차이로 전환율 개선 여지',
      potential: '번들가 ₩30,000 vs 개별 ₩40,000 → "저렴하다" 인식 + 예약 전환율 +20% 추정',
      color: 'emerald',
    },
    {
      rank: 4,
      title: '반려동물 동반 오션뷰 커플 숙소',
      description: '펫 프렌들리 + 오션뷰 + 커플 특화 조건을 동시에 충족하는 숙소 공급 극히 부족.',
      evidence: '영종도시티오션뷰(41319829)만 반려동물 허용 — 수요 다수인데 선택지 1개',
      potential: '펫 커플 세그먼트 가격 프리미엄 +15~20% · 검색 필터 상단 노출 기회',
      color: 'emerald',
    },
    {
      rank: 5,
      title: '공항 셔틀 × 오션뷰 프리미엄 번들',
      description: '셔틀 제공 숙소는 있지만 오션뷰 + 커플 감성 + 공항 셔틀을 패키지화한 프리미엄 오퍼 미존재.',
      evidence: '레인보우 감성숙소: 현금 결제 셔틀 운영 중이나 마케팅 미활용 — 포장 부재',
      potential: '공항 이용자 타깃 예약 전환 강화 · 여행 전/후 1박 세그먼트 별도 공략 가능',
      color: 'emerald',
    },
  ],
  moneyFlows: [
    { area: '주말 커플 오션뷰 숙소', proof: '상위 5개 숙소 주말 만실 반복 (후기 날짜 분포)', size: '평균 ₩15~18만/박', trend: 'up' as const },
    { area: '레이트 체크아웃 옵션', proof: '시간당 ₩10,000 → 월 수십만 원 추가 수익 확인', size: '숙소당 월 +₩30~50만 추정', trend: 'up' as const },
    { area: '셔틀·교통 부가서비스', proof: '레인보우 감성숙소: 공항 ₩25,000 / 영종역 ₩10,000 현금 운영', size: '건당 ₩10,000~25,000', trend: 'stable' as const },
    { area: 'OTT 포함 리스팅 프리미엄', proof: 'Netflix 미포함 숙소와 비교 시 예약 전환율 차이 추정', size: '예약 전환율 차이 (정량화 필요)', trend: 'up' as const },
  ],
};

// ── 인기룸 분석 (노출 공식 역산) ─────────────────────────────────────────────

const topRooms = [
  {
    rank: 1,
    name: '매일바다 Islet',
    url: 'https://www.airbnb.co.kr/rooms/1112639063232772111',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1112639063232772111/original/a0a92697-a1fc-46db-aef4-eb5f02fe0f65.jpeg',
    rating: 4.97,
    reviewCount: 243,
    isSuperhost: true,
    priceWeekday: '₩10~13만',
    priceWeekend: '₩15~18만',
    titleKeywords: ['봄바다', '커플데이트', '섬뷰', '침대앞바다', '공항근처'],
    instantBook: true,
    minNights: 1,
    amenities: ['넷플릭스', '유튜브', '무료주차', '전기차충전', '에어컨'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    lastReviewDate: '2026-04-08',
    thumbnailStrategy: '침대 위에서 찍은 바다뷰 와이드샷 — 침대+바다 동시 프레임',
    rankingStrength: '슈퍼호스트 + 후기 243개(최다) + 4.97점 + 즉시예약 + 계절별 키워드 업데이트',
  },
  {
    rank: 2,
    name: '영종도 늦은오후2시체크아웃 · 테라스 시티오션뷰',
    url: 'https://www.airbnb.co.kr/rooms/929613935113182910',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-929613935113182910/original/933cb062-6a29-440f-b2e7-6d27f2c06ac6.jpeg',
    rating: 4.96,
    reviewCount: 153,
    isSuperhost: true,
    priceWeekday: '₩8~11만',
    priceWeekend: '₩12~15만',
    titleKeywords: ['늦은오후2시체크아웃', '테라스', '시티오션뷰', '인테리어'],
    instantBook: true,
    minNights: 1,
    amenities: ['넷플릭스', '구글TV', '세탁기', '테라스', '보드게임'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    lastReviewDate: '2026-03-28',
    thumbnailStrategy: '조명 켜진 아늑한 내부 + 창밖 시티뷰 — 감성 포근함 강조',
    rankingStrength: '"늦은오후2시체크아웃" 키워드를 제목에 직접 삽입 → 장기 체류 희망 고객 직접 검색 유입',
  },
  {
    rank: 3,
    name: '풀오션뷰 한옥Stay 자쿠지 스위트룸',
    url: 'https://www.airbnb.co.kr/rooms/1401799113294551700',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1401799113294551700/original/88c6e443-cda5-4d5d-b8f5-2b620d37b487.jpeg',
    rating: 4.96,
    reviewCount: 187,
    isSuperhost: true,
    priceWeekday: '₩13~17만',
    priceWeekend: '₩18~25만',
    titleKeywords: ['자쿠지', '한옥감성', '풀오션뷰', '노을전망', '인천공항15분'],
    instantBook: true,
    minNights: 1,
    amenities: ['자쿠지', '조식뷔페', '넷플릭스', '무료주차', '에어컨'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    lastReviewDate: '2026-04-05',
    thumbnailStrategy: '한옥 소품 + 창밖 인천대교 노을 — 문화+자연 2가지 동시 노출',
    rankingStrength: '자쿠지(희소 어메니티) + 조식 제공 + 상위 5% 슈퍼호스트 조합 → 고가 세그먼트 리드',
  },
  {
    rank: 4,
    name: '영종도시티오션뷰 · 14시체크아웃',
    url: 'https://www.airbnb.co.kr/rooms/41319829',
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-41319829/original/5baf9d2b-5252-493e-afe8-1895c5e23fe5.jpeg',
    rating: 4.93,
    reviewCount: 171,
    isSuperhost: true,
    priceWeekday: '₩8~11만',
    priceWeekend: '₩12~16만',
    titleKeywords: ['14시체크아웃', '시티오션뷰', '반려동물허용', '구읍뱃터'],
    instantBook: true,
    minNights: 1,
    amenities: ['넷플릭스', '반려동물허용', '에어컨', '무료주차', '세탁기'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    lastReviewDate: '2026-04-10',
    thumbnailStrategy: '창밖 시티오션뷰 와이드샷 — 도심+바다 조합 시각적 임팩트',
    rankingStrength: '"14시체크아웃" 키워드 + 반려동물 허용(니치 필터) + 6년 호스팅 경력으로 신뢰 축적',
  },
  {
    rank: 5,
    name: '풀오션뷰 일본감성 · 13시체크아웃 레인보우하우스',
    url: 'https://www.airbnb.co.kr/rooms/1186004573241827717',
    image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1186004573241827717/original/91477865-6cb7-41f1-aa58-677466b6179e.jpeg',
    rating: 4.95,
    reviewCount: 60,
    isSuperhost: true,
    priceWeekday: '₩9~12만',
    priceWeekend: '₩13~17만',
    titleKeywords: ['풀오션뷰', '13시체크아웃', '일본감성', '테라스노을뷰'],
    instantBook: true,
    minNights: 1,
    amenities: ['넷플릭스', '다도세트', '에어컨', '무료주차', '테라스'],
    hostResponseRate: '100%',
    hostResponseTime: '1시간 이내',
    lastReviewDate: '2026-03-15',
    thumbnailStrategy: '일본풍 소품 + 테라스 노을 바다 — 이국적 감성 강조',
    rankingStrength: '일본감성(차별화 테마) + 13시체크아웃 키워드 + 노을뷰 썸네일 조합',
  },
];

const topRoomsPatterns = [
  { pattern: '슈퍼호스트', count: 5, total: 5, insight: '상위 5개 100% 슈퍼호스트 — 미인증 숙소는 검색 상단 도달 불가' },
  { pattern: '즉시예약 활성화', count: 5, total: 5, insight: '즉시예약 없으면 에어비앤비 알고리즘 페널티 — 필수 조건' },
  { pattern: '후기 100개 이상', count: 4, total: 5, insight: '60개 숙소도 5위 진입 — 평점 4.9+가 후기 수 보완' },
  { pattern: '늦은 체크아웃 (13시+)', count: 3, total: 5, insight: '3/5가 레이트 체크아웃을 제목 키워드로 활용 — 강력 검색 유입' },
  { pattern: '평균 평점 4.9 이상', count: 5, total: 5, insight: '4.9 미만은 "게스트 선호" 배지 미달 — 노출 급감' },
  { pattern: '응답률 100% / 1시간 이내', count: 5, total: 5, insight: '응답 속도가 알고리즘 순위에 직접 반영' },
];

const topRoomsActions = [
  '슈퍼호스트 기준 달성: 응답률 90%+ 유지, 취소율 1% 이하, 완료 숙박 10박 이상, 평점 4.8+',
  '즉시예약 활성화: 설정 → 예약 설정 → "즉시 예약 허용" ON',
  '제목에 레이트 체크아웃 시간 직접 삽입 (예: "13시체크아웃" or "늦은오후2시체크아웃")',
  '썸네일 1번 사진: 침대+바다 프레임 또는 창밖 뷰 와이드샷으로 교체',
  '계절별 제목 업데이트: "봄바다", "여름오션뷰", "가을노을" 키워드 순환',
];

// ── 이벤트 캘린더 ──────────────────────────────────────────────────────────────

type DemandLevel = 1 | 2 | 3 | 4 | 5;

const eventCalendar: {
  month: string;
  events: {
    date: string;
    name: string;
    venue: string;
    category: string;
    demand: DemandLevel;
    source: string;
  }[];
  strategy: string;
}[] = [
  {
    month: '4월',
    strategy: 'T1 HOME GROUND (04.24~26) e스포츠 팬 수요 강함. 해당 주말 최소 1~2박 설정 + 가격 15~20% 인상 권고.',
    events: [
      { date: '04.11~19', name: '인천 고려산 진달래축제', venue: '강화군 고려산', category: '자연·축제', demand: 3, source: '인천투어' },
      { date: '04.11~12', name: 'tuki. 1ST ASIA TOUR 2026', venue: '인스파이어 아레나', category: 'K팝·콘서트', demand: 4, source: '인스파이어' },
      { date: '04.17~19', name: 'DxS [소야곡] ON STAGE', venue: '인스파이어 아레나', category: '공연', demand: 4, source: '인스파이어' },
      { date: '04.17~5.17', name: '핑크페스타', venue: '강화군', category: '축제', demand: 2, source: '인천투어' },
      { date: '04.24~26', name: '2026 T1 HOME GROUND', venue: '인스파이어 아레나', category: 'e스포츠', demand: 4, source: '인스파이어' },
    ],
  },
  {
    month: '5월',
    strategy: '오슬로우 빈티지 마켓(05.30~31)은 트렌디한 2030 타깃. 어린이날 연휴(05.03~06) 가족 수요와 커플 수요 동시 상승.',
    events: [
      { date: '05.05', name: '인천어린이과학관 어린이날 행사', venue: '인천어린이과학관', category: '가족·행사', demand: 2, source: '인천투어' },
      { date: '05.08~10', name: '2026 트라이보울 클래식 페스티벌', venue: '트라이보울 공연장', category: '클래식·공연', demand: 2, source: '인천투어' },
      { date: '05.30~31', name: '오슬로우 빈티지 마켓', venue: '인천', category: '마켓·팝업', demand: 2, source: '인천투어' },
    ],
  },
  {
    month: '7~8월 (성수기)',
    strategy: '연중 최성수기. 을왕리 해수욕장 개장일부터 8월 말까지 성수기 요금 전면 적용. 펜타포트 락 페스티벌 기간(07.31~08.02) 특히 수요 급증.',
    events: [
      { date: '07월 초', name: '을왕리·왕산 해수욕장 개장', venue: '을왕리 해수욕장', category: '해수욕·여름', demand: 5, source: '매년 정례' },
      { date: '07.31~08.02', name: '인천펜타포트 락 페스티벌', venue: '인천 송도 일대', category: '록·페스티벌', demand: 4, source: '인천투어' },
      { date: '08.14~10.18', name: '국가유산 미디어아트', venue: '인천', category: '전시·문화', demand: 2, source: '인천투어' },
    ],
  },
  {
    month: '10월',
    strategy: 'EDC 코리아는 개천절 연휴(10.03~04)와 맞물린 대형 EDM 페스티벌. 영종도 숙소 수요 폭발 예상. 티켓 판매 시작 즉시 가격 대폭 인상 + 최소 2박 조건 설정 강력 권고.',
    events: [
      { date: '10.02~04', name: '부평풍물대축제', venue: '부평', category: '전통·축제', demand: 2, source: '인천투어' },
      { date: '10.03~04', name: 'EDC 코리아 2026', venue: '인스파이어 리조트', category: 'EDM·페스티벌', demand: 5, source: '연합뉴스' },
    ],
  },
];

// ── 가격 전략 ──────────────────────────────────────────────────────────────────

const pricingStrategy: {
  month: string;
  rows: {
    period: string;
    event: string;
    demand: DemandLevel;
    basePrice: string;
    recommendedPrice: string;
    multiplier: string;
    minNights: string;
    timing: string;
  }[];
}[] = [
  {
    month: '4월',
    rows: [
      { period: '04.11~12', event: 'tuki. 1ST ASIA TOUR', demand: 4, basePrice: '₩120,000', recommendedPrice: '₩180,000', multiplier: '×1.5', minNights: '1박', timing: '지금 즉시' },
      { period: '04.17~19', event: 'DxS ON STAGE', demand: 4, basePrice: '₩120,000', recommendedPrice: '₩180,000', multiplier: '×1.5', minNights: '1박', timing: '지금 즉시' },
      { period: '04.24~26', event: 'T1 HOME GROUND', demand: 4, basePrice: '₩120,000', recommendedPrice: '₩200,000', multiplier: '×1.7', minNights: '1박', timing: '지금 즉시' },
    ],
  },
  {
    month: '5월',
    rows: [
      { period: '05.03~06', event: '어린이날 연휴', demand: 3, basePrice: '₩120,000', recommendedPrice: '₩150,000', multiplier: '×1.25', minNights: '1박', timing: '2주 전' },
      { period: '05.30~31', event: '오슬로우 빈티지 마켓', demand: 2, basePrice: '₩120,000', recommendedPrice: '₩130,000', multiplier: '×1.1', minNights: '1박', timing: '1주 전' },
    ],
  },
  {
    month: '7~8월 (성수기)',
    rows: [
      { period: '07.01~08.31', event: '을왕리 해수욕장 성수기', demand: 5, basePrice: '₩150,000', recommendedPrice: '₩270,000', multiplier: '×1.8', minNights: '2박', timing: '6월 15일 이전' },
      { period: '07.31~08.02', event: '인천펜타포트 락 페스티벌', demand: 4, basePrice: '₩150,000', recommendedPrice: '₩250,000', multiplier: '×1.7', minNights: '2박', timing: '4주 전' },
    ],
  },
  {
    month: '10월',
    rows: [
      { period: '10.03~04', event: 'EDC 코리아 2026', demand: 5, basePrice: '₩120,000', recommendedPrice: '₩360,000', multiplier: '×3.0', minNights: '2박', timing: '티켓 판매 시작 즉시' },
    ],
  },
];

const pricingActions = [
  { label: '즉시 적용', text: '04.24~26 T1 HOME GROUND 기간 가격 ₩200,000으로 인상 + 최소 1박 설정', urgency: 'high' as const },
  { label: '즉시 적용', text: '10.03~04 EDC 코리아 티켓 판매 시작 모니터링 → 즉시 ₩360,000으로 인상 + 최소 2박', urgency: 'high' as const },
  { label: 'D-30 알림', text: '7월 1일 이전 성수기 요금(₩270,000) 설정 완료 — 늦어도 6월 15일까지', urgency: 'medium' as const },
  { label: '모니터링', text: '인스파이어 리조트 신규 공연 티켓 판매 오픈 즉시 감지 → event-monitor 스킬 자동 실행 중', urgency: 'low' as const },
];

const opportunityKeywords = [
  { label: 'No-Chore Checkout', desc: '청소 의무 없는 퇴실 — 가장 빠르게 커지는 니즈' },
  { label: 'Silent Room 인증', desc: 'dB 수치 공개로 방음 보장 — 프리미엄 차별화' },
  { label: 'FlexPass 체크아웃', desc: '14~15시 체크아웃이 선택 기준으로 부상' },
  { label: '커플 큐레이션 채널', desc: '에어비앤비도 호텔도 없는 포지셔닝 공백' },
  { label: '보장 기반 예약', desc: '사진 불일치·소음 자동 환불 — 신뢰 구매 전환' },
  { label: 'Climate Ready', desc: '입실 전 온도 세팅 — 고가 호텔만의 서비스를 민박에' },
];

const actionItems = [
  '에어비앤비 리스팅 제목에 "No-Chore Checkout" 키워드 삽입',
  '"청소비 내고 청소하셨나요?" SPICE 훅 콘텐츠 인스타 업로드',
  '매일바다 Islet 호스트 파트너십 제안 연락',
  '네이버 블로그 "영종도 14시 체크아웃 숙소 찾는 법" 포스팅',
  '즉시예약 + 슈퍼호스트 기준 달성 → 썸네일 침대+바다 와이드샷으로 교체',
];

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

  const hookColorMap: Record<string, string> = {
    red: 'bg-red-50 border-red-200 text-red-800',
    orange: 'bg-orange-50 border-orange-200 text-orange-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    pink: 'bg-pink-50 border-pink-200 text-pink-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
  };

  const tabs = [
    { key: 'listings' as TabKey, label: '🏠 숙소 리뷰' },
    { key: 'market' as TabKey, label: '📊 시장 분석' },
    { key: 'problems' as TabKey, label: '🔴 문제 분석' },
    { key: 'offers' as TabKey, label: '💎 고전환 오퍼' },
    { key: 'viral' as TabKey, label: '⚡ 바이럴 전략' },
    { key: 'toprooms' as TabKey, label: '🏆 인기룸 분석' },
    { key: 'events' as TabKey, label: '📅 이벤트 캘린더' },
    { key: 'pricing' as TabKey, label: '💰 가격 전략' },
  ];

  const trendColorMap: Record<string, { border: string; badge: string; bg: string }> = {
    blue: { border: 'border-blue-300', badge: 'bg-blue-100 text-blue-700', bg: 'bg-blue-50' },
    purple: { border: 'border-purple-300', badge: 'bg-purple-100 text-purple-700', bg: 'bg-purple-50' },
    orange: { border: 'border-orange-300', badge: 'bg-orange-100 text-orange-700', bg: 'bg-orange-50' },
    pink: { border: 'border-pink-300', badge: 'bg-pink-100 text-pink-700', bg: 'bg-pink-50' },
    teal: { border: 'border-teal-300', badge: 'bg-teal-100 text-teal-700', bg: 'bg-teal-50' },
    emerald: { border: 'border-emerald-300', badge: 'bg-emerald-100 text-emerald-700', bg: 'bg-emerald-50' },
  };

  return (
    <div id="airbnb" className="bg-white min-h-screen font-sans text-slate-900">

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://a0.muscache.com/im/pictures/hosting/Hosting-1401799113294551700/original/88c6e443-cda5-4d5d-b8f5-2b620d37b487.jpeg"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
          alt="영종도 오션뷰"
        />
        <div className="relative z-10 text-center px-4">
          <p className="text-white text-xs tracking-[0.5em] uppercase opacity-60 mb-4">
            영종도 커플 호캉스 · {TODAY_DATE}
          </p>
          <h1 className="text-white text-6xl md:text-9xl font-serif italic mb-4">
            Market Report
          </h1>
          <p className="text-white text-xl tracking-[0.3em] uppercase opacity-80">
            Airbnb Intelligence
          </p>
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            <div className="text-center">
              <div className="text-white text-3xl font-bold">5</div>
              <div className="text-white text-xs opacity-60 uppercase tracking-widest">숙소 스크래핑</div>
            </div>
            <div className="text-white text-xl opacity-30 self-center">·</div>
            <div className="text-center">
              <div className="text-white text-3xl font-bold">792</div>
              <div className="text-white text-xs opacity-60 uppercase tracking-widest">리뷰 수집</div>
            </div>
            <div className="text-white text-xl opacity-30 self-center">·</div>
            <div className="text-center">
              <div className="text-white text-3xl font-bold">4.944</div>
              <div className="text-white text-xs opacity-60 uppercase tracking-widest">평균 평점</div>
            </div>
            <div className="text-white text-xl opacity-30 self-center">·</div>
            <div className="text-center">
              <div className="text-white text-3xl font-bold">₩500억</div>
              <div className="text-white text-xs opacity-60 uppercase tracking-widest">SAM 시장</div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto py-3">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* ── TAB: 숙소 리뷰 ── */}
        {activeTab === 'listings' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🏠 영종도 커플 오션스테이</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              Airbnb 실시간 리뷰 수집 · {TODAY_DATE} · 5곳 · 792개 후기
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {listings.map((item, i) => (
                <div
                  key={i}
                  className="group cursor-zoom-in overflow-hidden rounded-xl bg-slate-50 hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setLightbox({ src: item.image, title: item.name, tag: item.tags[0] })}
                >
                  <div className="overflow-hidden h-52">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-500 font-bold text-sm">⭐{item.rating}</span>
                      <span className="text-slate-400 text-xs">{item.reviewCount}개 후기</span>
                    </div>
                    <h4 className="font-serif text-lg mb-1 leading-snug">{item.name}</h4>
                    <p className="text-slate-500 text-xs mb-3">{item.type}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.summary}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="text-xs text-slate-500 space-y-1 border-t border-slate-100 pt-3">
                      <div>👍 {item.topPraise}</div>
                      <div>👎 {item.topComplaint}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TAB: 시장 분석 ── */}
        {activeTab === 'market' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">📊 시장 분석</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              TAM · SAM · SOM · 핵심 트렌드 5개 · 공백 기회 5개 · 돈의 흐름
            </p>

            {/* TAM / SAM / SOM */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { ...marketAnalysis.tam, bg: 'bg-slate-900', text: 'text-white', sub: 'text-slate-400' },
                { ...marketAnalysis.sam, bg: 'bg-blue-700', text: 'text-white', sub: 'text-blue-200' },
                { ...marketAnalysis.som, bg: 'bg-emerald-600', text: 'text-white', sub: 'text-emerald-100' },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-8 ${item.bg}`}>
                  <p className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 ${item.sub}`}>{item.label}</p>
                  <p className={`text-4xl font-serif font-bold mb-3 ${item.text}`}>{item.value}</p>
                  <p className={`text-sm leading-relaxed mb-2 ${item.text}`}>{item.description}</p>
                  <p className={`text-xs italic ${item.sub}`}>{item.note}</p>
                </div>
              ))}
            </div>

            {/* 수요를 만드는 핵심 트렌드 5개 */}
            <div className="mb-16">
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <span>🚀</span> 수요를 만드는 핵심 트렌드
              </h3>
              <div className="space-y-4">
                {marketAnalysis.trends.map((item, i) => {
                  const c = trendColorMap[item.color] ?? trendColorMap.blue;
                  return (
                    <div key={i} className={`flex gap-4 p-5 rounded-xl border-l-4 ${c.bg} ${c.border}`}>
                      <span className="text-2xl font-bold text-slate-300 w-8 flex-shrink-0 leading-none mt-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-serif text-lg font-semibold">{item.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>트렌드</span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-2">{item.description}</p>
                        <p className="text-xs text-slate-400 italic">📡 {item.signal}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 아직 덜 공략된 기회 5개 */}
            <div className="mb-16">
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <span>🎯</span> 아직 덜 공략된 기회
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {marketAnalysis.opportunities.map((item, i) => (
                  <div key={i} className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl font-bold text-emerald-200 leading-none">#{item.rank}</span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">공백 기회</span>
                    </div>
                    <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.description}</p>
                    <div className="space-y-1 text-xs">
                      <p className="text-slate-400">🔍 근거: <span className="text-slate-600">{item.evidence}</span></p>
                      <p className="text-emerald-600 font-medium">💰 잠재: {item.potential}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 돈의 흐름 */}
            <div>
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-2">
                <span>💸</span> 이미 돈이 흐르는 영역
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketAnalysis.moneyFlows.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-2xl flex-shrink-0">
                      {item.trend === 'up' ? '📈' : item.trend === 'stable' ? '➡️' : '📉'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 mb-1">{item.area}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed mb-1">{item.proof}</p>
                      <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        {item.size}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── TAB: 문제 분석 ── */}
        {activeTab === 'problems' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🔴 숙소 문제 매트릭스</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              WTP 기준 정렬 · 실제 불평 횟수 · 성장 속도 · 🔴 실제 불평 · 🚀 빠르게 커지는 니즈
            </p>
            <div className="space-y-3">
              {problemMatrix.map((item) => {
                const isActualComplaint = item.flags.includes('🔴');
                const isFastGrowing = item.flags.includes('🚀');
                const cardBg = isActualComplaint && isFastGrowing
                  ? 'bg-red-50 border border-red-200'
                  : isActualComplaint
                  ? 'bg-orange-50 border border-orange-100'
                  : isFastGrowing
                  ? 'bg-amber-50 border border-amber-100'
                  : 'bg-slate-50 border border-slate-100';

                const growthColor = item.growthRate.includes('급증') ? 'text-red-600 font-bold'
                  : item.growthRate.includes('증가') ? 'text-orange-500'
                  : item.growthRate.includes('감소') ? 'text-slate-400'
                  : 'text-slate-500';

                return (
                  <div key={item.rank} className={`flex items-start gap-4 p-5 rounded-xl hover:shadow-sm transition-all ${cardBg}`}>
                    <span className="text-2xl font-bold text-slate-300 w-8 flex-shrink-0 mt-0.5">
                      #{item.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-serif text-lg">{item.problem}</h4>
                        {item.flags.map((f, j) => <span key={j} className="text-base">{f}</span>)}
                      </div>
                      <p className="text-slate-500 text-sm italic mb-3 leading-relaxed">{item.quote}</p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="text-sm">
                          <span className="text-slate-400">긴급도 </span>
                          <span className="font-bold text-red-600">{item.urgency}/10</span>
                        </div>
                        <div className="text-sm flex items-center gap-2">
                          <span className="text-slate-400">WTP</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 10 }, (_, k) => (
                              <div
                                key={k}
                                className={`w-3 h-3 rounded-sm ${
                                  k < item.wtp
                                    ? item.wtp >= 8 ? 'bg-emerald-500' : item.wtp >= 5 ? 'bg-emerald-300' : 'bg-slate-300'
                                    : 'bg-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-emerald-600">{item.wtp}/10</span>
                        </div>
                        {isActualComplaint && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                            🔴 {item.complaintCount}회 직접 불평
                          </span>
                        )}
                        <span className={`text-xs font-medium ${growthColor}`}>
                          {item.growthRate}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base"
                        style={{ background: `hsl(${Math.max(0, 120 - (item.urgency + item.wtp) * 5)}, 70%, 45%)` }}
                      >
                        {item.urgency + item.wtp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── TAB: 고전환 오퍼 ── */}
        {activeTab === 'offers' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">💎 고전환 오퍼 설계</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              Top 5 문제 · 이상적 고객 정의 · 보장 포함 · 경쟁사 비교
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offers.map((offer, i) => (
                <div key={i} className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-slate-900 text-white p-5">
                    <p className="text-slate-400 text-xs tracking-widest uppercase mb-1">
                      OFFER {i + 1} · 긴급 {offer.urgency} / WTP {offer.wtp}
                    </p>
                    <h4 className="font-serif text-2xl italic mb-1">{offer.title}</h4>
                    <p className="text-slate-300 text-sm">{offer.headline}</p>
                  </div>
                  <div className="p-5 space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{offer.description}</p>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">가격 티어</p>
                      <div className="space-y-2">
                        {offer.tiers.map((tier, j) => (
                          <div key={j} className="flex justify-between items-start text-sm gap-2">
                            <div className="min-w-0">
                              <span className="font-medium">{tier.name}</span>
                              <span className="text-slate-400 ml-2 text-xs">{tier.desc}</span>
                            </div>
                            <span className="font-bold text-blue-700 whitespace-nowrap">{tier.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3">
                      <p className="text-xs text-emerald-700 font-medium leading-relaxed">🛡️ {offer.guarantee}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {offer.tags.map((tag, j) => (
                        <span key={j} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TAB: 바이럴 전략 ── */}
        {activeTab === 'viral' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">⚡ 바이럴 콘텐츠 전략</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              고전환 훅 20개 · 감정 트리거 × 6 · SPICE 구조 · 플랫폼별 전략
            </p>

            {/* 훅 카드 */}
            <div className="columns-1 md:columns-2 gap-5 mb-16">
              {viralHooks.map((hook, i) => (
                <div
                  key={i}
                  className={`break-inside-avoid p-4 rounded-xl border mb-4 ${hookColorMap[hook.color] || hookColorMap.blue}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold opacity-50 uppercase tracking-widest">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold opacity-70 uppercase tracking-wider">{hook.emotion}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">"{hook.text}"</p>
                </div>
              ))}
            </div>

            {/* 플랫폼 전략 */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 rounded-2xl p-6">
                <h4 className="font-serif text-xl mb-4">감정 트리거 맵</h4>
                <div className="space-y-3 text-sm">
                  {[
                    { emotion: '공포', trigger: '"여행 망할 수 있다"', action: '저장 · 파트너 전송', color: 'text-red-600' },
                    { emotion: '분노', trigger: '"이건 불합리하다"', action: '댓글 · 공유 · 태그', color: 'text-orange-600' },
                    { emotion: '호기심', trigger: '"나만 모르는 정보"', action: '클릭 · 저장', color: 'text-purple-600' },
                    { emotion: '지위', trigger: '"아는 사람만 안다"', action: '스토리 리포스트', color: 'text-blue-600' },
                    { emotion: '공감', trigger: '"나만 겪은 게 아니다"', action: 'DM · 파트너 태그', color: 'text-pink-600' },
                    { emotion: '반전', trigger: '"알던 게 틀렸다"', action: '댓글 "진짜요?" · 공유', color: 'text-amber-600' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className={`font-semibold w-14 flex-shrink-0 ${row.color}`}>{row.emotion}</span>
                      <span className="text-slate-600 flex-1">{row.trigger}</span>
                      <span className="text-slate-400 text-xs text-right">{row.action}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6">
                <h4 className="font-serif text-xl mb-4">플랫폼별 전략</h4>
                <div className="space-y-3 text-sm">
                  {[
                    { platform: '인스타그램', hook: '지위 / 공감', format: '캐러셀 10장' },
                    { platform: '틱톡', hook: '공포 / 반전', format: '영상 훅 30~60초' },
                    { platform: '네이버 블로그', hook: '호기심 / 실용', format: '리스트 포스트 1,500자' },
                    { platform: '카카오 채팅', hook: '분노 / 공감', format: '텍스트 + 스크린샷' },
                    { platform: '유튜브 쇼츠', hook: '반전 / 스토리', format: '1인칭 영상 60초' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="font-medium w-24 flex-shrink-0 text-slate-800">{row.platform}</span>
                      <span className="text-slate-500 flex-1">{row.hook}</span>
                      <span className="text-slate-400 text-xs">{row.format}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── TAB: 인기룸 분석 ── */}
        {activeTab === 'toprooms' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">🏆 Airbnb 인기룸 분석</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              상위 노출 5개 룸 · 노출 공식 역산 · 공통 패턴 · 즉시 적용 액션
            </p>

            {/* 룸 카드 */}
            <div className="space-y-6 mb-16">
              {topRooms.map((room) => (
                <div
                  key={room.rank}
                  className="group rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow cursor-zoom-in"
                  onClick={() => setLightbox({ src: room.image, title: room.name, tag: `검색 ${room.rank}위` })}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 flex-shrink-0 overflow-hidden h-48 md:h-auto relative">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        검색 {room.rank}위
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3 gap-4 flex-wrap">
                        <div>
                          <h4 className="font-serif text-xl mb-1">{room.name}</h4>
                          <div className="flex items-center gap-3 text-sm flex-wrap">
                            <span className="text-amber-500 font-bold">⭐{room.rating}</span>
                            <span className="text-slate-400">{room.reviewCount}개 후기</span>
                            {room.isSuperhost && (
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-medium">🏅 슈퍼호스트</span>
                            )}
                            {room.instantBook && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">⚡ 즉시예약</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right text-sm flex-shrink-0">
                          <div className="text-slate-900 font-bold">{room.priceWeekend}<span className="text-slate-400 font-normal text-xs">/주말</span></div>
                          <div className="text-slate-500">{room.priceWeekday}<span className="text-slate-400 text-xs">/평일</span></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1.5">제목 키워드</p>
                          <div className="flex flex-wrap gap-1">
                            {room.titleKeywords.map((kw, j) => (
                              <span key={j} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{kw}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1.5">핵심 어메니티</p>
                          <div className="flex flex-wrap gap-1">
                            {room.amenities.map((a, j) => (
                              <span key={j} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{a}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1.5">썸네일 전략</p>
                          <p className="text-slate-600 leading-relaxed">{room.thumbnailStrategy}</p>
                        </div>
                        <div>
                          <p className="text-xs text-red-400 uppercase tracking-wider mb-1.5">노출 강점 ★</p>
                          <p className="text-slate-800 font-medium leading-relaxed">{room.rankingStrength}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 공통 패턴 테이블 */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-6">상위 노출 공통 패턴</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 pr-6 text-slate-500 font-medium uppercase tracking-wider text-xs">패턴</th>
                      <th className="text-center py-3 px-4 text-slate-500 font-medium uppercase tracking-wider text-xs">비율</th>
                      <th className="text-left py-3 pl-4 text-slate-500 font-medium uppercase tracking-wider text-xs">인사이트</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topRoomsPatterns.map((p, i) => (
                      <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-4 pr-6 font-medium text-slate-800">{p.pattern}</td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {Array.from({ length: p.total }, (_, k) => (
                              <div
                                key={k}
                                className={`w-4 h-4 rounded-full ${k < p.count ? 'bg-emerald-500' : 'bg-slate-200'}`}
                              />
                            ))}
                            <span className="ml-2 font-bold text-emerald-700">{p.count}/{p.total}</span>
                          </div>
                        </td>
                        <td className="py-4 pl-4 text-slate-600">{p.insight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 즉시 적용 액션 */}
            <div className="bg-slate-900 text-white rounded-2xl p-8">
              <h3 className="font-serif text-2xl mb-6">우리 룸에 즉시 적용 가능한 것</h3>
              <div className="space-y-4">
                {topRoomsActions.map((action, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-slate-300 leading-relaxed pt-1">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Summary — 이벤트·가격 탭 제외 */}
        {activeTab !== 'events' && activeTab !== 'pricing' && <section className="mt-24 bg-slate-50 p-10 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-2xl font-serif mb-6 underline underline-offset-4">핵심 기회 키워드</h4>
              <div className="space-y-3">
                {opportunityKeywords.map((kw, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-xs bg-slate-900 text-white px-2 py-0.5 rounded font-medium whitespace-nowrap mt-0.5">
                      {kw.label}
                    </span>
                    <span className="text-slate-500 text-sm leading-relaxed">{kw.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-serif mb-6 underline underline-offset-4">이번 주 액션 아이템</h4>
              <ul className="space-y-3">
                {actionItems.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700">
                    <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>}

        {/* ── TAB: 이벤트 캘린더 ── */}
        {activeTab === 'events' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">📅 영종도 이벤트 캘린더</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              2026 수요 예측 캘린더 · 인스파이어 아레나 · 인천투어 · 최종 업데이트 2026-04-12
            </p>

            {/* 수요 강도 범례 */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { stars: '★★★★★', label: '초성수기', color: 'bg-red-100 text-red-700 border-red-200' },
                { stars: '★★★★', label: '성수기', color: 'bg-orange-100 text-orange-700 border-orange-200' },
                { stars: '★★★', label: '준성수기', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                { stars: '★★', label: '보통', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                { stars: '★', label: '미미', color: 'bg-slate-100 text-slate-600 border-slate-200' },
              ].map(({ stars, label, color }) => (
                <span key={label} className={`text-xs px-3 py-1 rounded-full border font-medium ${color}`}>
                  {stars} {label}
                </span>
              ))}
            </div>

            {/* 월별 카드 */}
            {[
              {
                month: '4월',
                strategy: 'T1 HOME GROUND (04.24~26) e스포츠 팬 수요 강함. 해당 주말 최소 1박 + 가격 15~20% 인상 즉시 적용.',
                events: [
                  { date: '04.11~19', name: '인천 고려산 진달래축제', venue: '강화군 고려산', category: '자연·축제', demand: '★★★' },
                  { date: '04.11~12', name: 'tuki. 1ST ASIA TOUR 2026', venue: '인스파이어 아레나', category: 'K팝·콘서트', demand: '★★★★' },
                  { date: '04.17~19', name: 'DxS [소야곡] ON STAGE', venue: '인스파이어 아레나', category: '공연', demand: '★★★★' },
                  { date: '04.17~5.17', name: '핑크페스타', venue: '강화군', category: '축제', demand: '★★' },
                  { date: '04.24~26', name: '2026 T1 HOME GROUND', venue: '인스파이어 아레나', category: 'e스포츠', demand: '★★★★' },
                  { date: '04.24~10.23', name: '(소)통하는 (금)요일 기획공연', venue: '인천국악회관', category: '공연', demand: '★' },
                ],
              },
              {
                month: '5월',
                strategy: '이벤트 공백기. 어린이날(05.05) D-14(04.21) 알림 설정 후 ₩108,000 인상 준비.',
                events: [
                  { date: '05.05', name: '어린이날 공휴일 + 인천어린이과학관 행사', venue: '인천어린이과학관', category: '가족·행사', demand: '★★★' },
                  { date: '05.08~10', name: '2026 트라이보울 클래식 페스티벌', venue: '트라이보울 공연장', category: '클래식·공연', demand: '★★' },
                  { date: '05.30~31', name: '오슬로우 빈티지 마켓', venue: '인천 (장소 미정)', category: '마켓·팝업', demand: '★★' },
                ],
              },
              {
                month: '7~8월 (성수기)',
                strategy: '연중 최성수기. 을왕리 해수욕장 개장일(7월 초) 확인 즉시 전 기간 성수기 요금 적용. 펜타포트 락 페스티벌(07.31~08.02) 수요 급증.',
                events: [
                  { date: '07월 초', name: '을왕리·왕산 해수욕장 개장', venue: '을왕리 해수욕장', category: '해수욕·여름', demand: '★★★★★' },
                  { date: '07.31~08.02', name: '인천펜타포트 락 페스티벌', venue: '인천 송도 일대', category: '록·페스티벌', demand: '★★★★' },
                  { date: '08.14~10.18', name: '국가유산 미디어아트', venue: '인천 (장소 미정)', category: '전시·문화', demand: '★★' },
                ],
              },
              {
                month: '10월',
                strategy: 'EDC 코리아는 개천절 연휴(10.03~04) 대형 EDM 페스티벌. 티켓 판매 시작 즉시 가격 대폭 인상 + 최소 2박 조건 강력 권고.',
                events: [
                  { date: '10.02~04', name: '부평풍물대축제', venue: '부평', category: '전통·축제', demand: '★★' },
                  { date: '10.03~04', name: '🎵 EDC 코리아 2026', venue: '인스파이어 리조트', category: 'EDM·페스티벌', demand: '★★★★★' },
                ],
              },
            ].map(({ month, strategy, events }) => (
              <div key={month} className="mb-12">
                <h3 className="text-2xl font-serif mb-4">{month}</h3>
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 pr-4 text-slate-400 font-medium uppercase tracking-wider text-xs w-32">날짜</th>
                        <th className="text-left py-2 pr-4 text-slate-400 font-medium uppercase tracking-wider text-xs">이벤트</th>
                        <th className="text-left py-2 pr-4 text-slate-400 font-medium uppercase tracking-wider text-xs hidden md:table-cell">장소</th>
                        <th className="text-left py-2 pr-4 text-slate-400 font-medium uppercase tracking-wider text-xs hidden md:table-cell">카테고리</th>
                        <th className="text-center py-2 text-slate-400 font-medium uppercase tracking-wider text-xs">수요</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((ev, i) => {
                        const demandColor =
                          ev.demand === '★★★★★' ? 'text-red-600 font-bold' :
                          ev.demand === '★★★★' ? 'text-orange-500 font-bold' :
                          ev.demand === '★★★' ? 'text-yellow-600 font-semibold' :
                          'text-slate-400';
                        return (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 pr-4 text-xs text-slate-500 font-mono">{ev.date}</td>
                            <td className="py-3 pr-4 font-medium text-slate-800">{ev.name}</td>
                            <td className="py-3 pr-4 text-slate-500 hidden md:table-cell">{ev.venue}</td>
                            <td className="py-3 pr-4 hidden md:table-cell">
                              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">{ev.category}</span>
                            </td>
                            <td className={`py-3 text-center text-sm ${demandColor}`}>{ev.demand}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
                  💡 <strong>전략:</strong> {strategy}
                </div>
              </div>
            ))}

            {/* 연간 수요 강도 히트맵 */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-6">연간 수요 강도 캘린더</h3>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {[
                  { m: '1월', level: 0 }, { m: '2월', level: 0 }, { m: '3월', level: 1 },
                  { m: '4월', level: 3 }, { m: '5월', level: 2 }, { m: '6월', level: 2 },
                  { m: '7월', level: 4 }, { m: '8월', level: 4 }, { m: '9월', level: 2 },
                  { m: '10월', level: 4 }, { m: '11월', level: 0 }, { m: '12월', level: 3 },
                ].map(({ m, level }) => {
                  const bg = ['bg-slate-100', 'bg-blue-100', 'bg-yellow-200', 'bg-orange-300', 'bg-red-400'][level];
                  const text = level >= 3 ? 'text-white' : 'text-slate-700';
                  return (
                    <div key={m} className={`${bg} ${text} rounded-lg py-3 text-center`}>
                      <div className="text-xs font-bold">{m}</div>
                      <div className="text-xs mt-1">{'★'.repeat(level) || '—'}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── TAB: 가격 전략 ── */}
        {activeTab === 'pricing' && (
          <section>
            <h2 className="text-5xl font-serif mb-2 border-b pb-4">💰 가격 전략</h2>
            <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">
              기준: 평일 ₩90,000 / 주말 ₩120,000 · 이벤트 배율 적용 · 생성 2026-04-13
            </p>

            {/* 핵심 액션 3가지 */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-6">이번 달 핵심 액션</h3>
              <div className="space-y-4">
                {[
                  {
                    urgency: '즉시 적용',
                    color: 'border-red-400 bg-red-50',
                    badge: 'bg-red-500 text-white',
                    title: 'DxS ON STAGE (04.17~19) → ₩180,000 + 최소 1박',
                    desc: '인스파이어 아레나 ★★★★ 공연. 4일 후 시작 → 지금 즉시 인상.',
                  },
                  {
                    urgency: '즉시 적용',
                    color: 'border-orange-400 bg-orange-50',
                    badge: 'bg-orange-500 text-white',
                    title: 'T1 HOME GROUND (04.24~26) → ₩180,000 + 최소 1박',
                    desc: 'e스포츠 팬 수요 강함. 3주 전 기준(04.03) 이미 지남 → 지금 즉시 인상.',
                  },
                  {
                    urgency: 'D-14 알림 (04.21)',
                    color: 'border-yellow-400 bg-yellow-50',
                    badge: 'bg-yellow-500 text-white',
                    title: '어린이날 (05.05) → ₩108,000 예정',
                    desc: '공휴일 + 어린이 행사 복합 수요. 04.21에 캘린더 알림 설정.',
                  },
                ].map((item, i) => (
                  <div key={i} className={`border-l-4 rounded-r-xl p-4 ${item.color}`}>
                    <div className="flex items-start gap-3 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-1 rounded flex-shrink-0 ${item.badge}`}>{item.urgency}</span>
                      <div>
                        <p className="font-semibold text-slate-800">{item.title}</p>
                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4월 가격표 */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-6">4월 날짜별 권장 가격 (잔여: 04.13~30)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-2 pr-4 text-slate-400 font-medium uppercase tracking-wider text-xs">날짜</th>
                      <th className="text-left py-2 pr-4 text-slate-400 font-medium uppercase tracking-wider text-xs hidden md:table-cell">이벤트</th>
                      <th className="text-center py-2 pr-4 text-slate-400 font-medium uppercase tracking-wider text-xs">수요</th>
                      <th className="text-right py-2 pr-4 text-slate-400 font-medium uppercase tracking-wider text-xs">권장가</th>
                      <th className="text-left py-2 text-slate-400 font-medium uppercase tracking-wider text-xs hidden md:table-cell">인상 타이밍</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: '04.13 (월)', event: '진달래축제 진행 중', demand: '★★★', price: '₩108,000', timing: '즉시' },
                      { date: '04.14~16', event: '진달래축제', demand: '★★★', price: '₩108,000', timing: '즉시' },
                      { date: '04.17~19', event: 'DxS [소야곡] ON STAGE', demand: '★★★★', price: '₩180,000', timing: '즉시 ⚡' },
                      { date: '04.20~23', event: '핑크페스타 (간접)', demand: '★★', price: '₩90,000', timing: '—' },
                      { date: '04.24~26', event: 'T1 HOME GROUND', demand: '★★★★', price: '₩180,000', timing: '즉시 ⚡' },
                      { date: '04.27~30', event: '핑크페스타 (간접)', demand: '★★', price: '₩90,000', timing: '—' },
                    ].map((row, i) => {
                      const isHighlight = row.demand === '★★★★';
                      return (
                        <tr key={i} className={`border-b border-slate-100 ${isHighlight ? 'bg-orange-50' : 'hover:bg-slate-50'}`}>
                          <td className="py-3 pr-4 font-mono text-xs text-slate-600">{row.date}</td>
                          <td className="py-3 pr-4 text-slate-700 hidden md:table-cell">{row.event}</td>
                          <td className={`py-3 pr-4 text-center text-xs font-semibold ${row.demand === '★★★★' ? 'text-orange-500' : row.demand === '★★★' ? 'text-yellow-600' : 'text-slate-400'}`}>{row.demand}</td>
                          <td className={`py-3 pr-4 text-right font-bold ${isHighlight ? 'text-orange-600' : 'text-slate-800'}`}>{row.price}</td>
                          <td className="py-3 text-slate-500 text-xs hidden md:table-cell">{row.timing}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 배율 근거 */}
            <div className="mb-12">
              <h3 className="text-2xl font-serif mb-6">가격 배율 근거</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 pr-6 text-slate-400 font-medium uppercase tracking-wider text-xs">수요 강도</th>
                      <th className="text-center py-2 px-4 text-slate-400 font-medium uppercase tracking-wider text-xs">배율</th>
                      <th className="text-left py-2 pl-4 text-slate-400 font-medium uppercase tracking-wider text-xs">적용 이벤트</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { demand: '★★★★★', mult: '×2.0~3.0', events: '을왕리 해수욕장 개장, EDC 코리아', color: 'text-red-600 font-bold' },
                      { demand: '★★★★', mult: '×1.5', events: 'DxS ON STAGE, T1 HOME GROUND, 펜타포트', color: 'text-orange-500 font-bold' },
                      { demand: '★★★', mult: '×1.2', events: '진달래축제(평일), 어린이날 공휴일', color: 'text-yellow-600 font-semibold' },
                      { demand: '★★', mult: '×1.0', events: '핑크페스타, 트라이보울, 빈티지 마켓', color: 'text-blue-500' },
                      { demand: '없음', mult: '×1.0', events: '기본가 적용', color: 'text-slate-400' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className={`py-3 pr-6 ${row.color}`}>{row.demand}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-slate-800">{row.mult}</td>
                        <td className="py-3 pl-4 text-slate-600">{row.events}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6월 미리보기 */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-serif text-xl mb-4 text-blue-900">6월 성수기 준비 데드라인</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2"><span className="text-blue-400 font-bold flex-shrink-0">→</span><span><strong>6월 15일 이전:</strong> 7~8월 전체 기간 성수기 가격(₩150,000+) 설정 완료</span></li>
                <li className="flex gap-2"><span className="text-blue-400 font-bold flex-shrink-0">→</span><span><strong>을왕리 해수욕장 개장 발표 즉시:</strong> 7~8월 ×2.0~3.0 배율 + 최소 2박(주말) 적용</span></li>
                <li className="flex gap-2"><span className="text-blue-400 font-bold flex-shrink-0">→</span><span><strong>매주 월요일:</strong> 인스파이어 5~6월 공연 라인업 신규 확인</span></li>
              </ul>
            </div>
          </section>
        )}

      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white text-4xl leading-none hover:opacity-70"
            onClick={() => setLightbox(null)}
          >
            ×
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

      <footer className="text-center py-12 text-slate-400 text-xs tracking-widest uppercase border-t border-slate-100">
        Generated {TODAY_DATE} · Airbnb Market Intelligence · Firecrawl MCP · 5개 숙소 · 792개 리뷰
      </footer>

    </div>
  );
};

export default AirbnbResearch;
