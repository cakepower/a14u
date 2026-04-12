# Human-AI Collaboration: 신뢰·의사결정·창의성의 최전선
### Literature Review — 2026.03.16

---

## 1. 개요

2022년 이후 ChatGPT를 비롯한 대형 언어모델(LLM)의 대중화는 Human-AI Collaboration(HAIC) 연구의 질적 전환점을 만들었다. 이전 리뷰(2026.03.05)가 HAIC의 이론적 프레임워크와 정의 논쟁을 다뤘다면, 본 리뷰는 **2022–2026년 실증 연구**에 집중한다. 특히 ① 팀워크 재정의, ② 신뢰·의존 메커니즘, ③ 의사결정의 보완성(complementarity), ④ 창의성·생산성 향상, ⑤ 설명가능성(XAI)과 인지 편향의 다섯 축을 중심으로 정리한다.

수집 논문 수: 약 32편 (인용수 15 이상, 2022–2026)

---

## 2. AI-Teaming: 팀워크의 재정의

### 2.1 AI를 팀원으로 보는 패러다임

**Schmutz et al. (2024)** — *"AI-teaming: Redefining collaboration in the digital era"* (Current Opinion in Psychology, 인용 57)는 AI를 단순 도구가 아닌 **팀 구성원(teammate)**으로 취급하는 'AI-teaming' 개념을 제안한다. 핵심 주장:

- 기존 인간 팀 연구의 개념(응집력, 규범, 역할 분담)이 AI-팀 맥락에서 재해석될 필요
- AI의 비결정론적 행동과 불투명한 추론이 팀 내 **역할 모호성**을 유발
- 효과적인 AI-teaming을 위해 **상호 적응(mutual adaptation)**과 **공유 정신 모델(SMM)** 구축이 핵심

> *"AI teammates differ fundamentally from human teammates in that they lack intentionality, emotions, and social identity — yet they influence team dynamics in equally profound ways."*

**Xu & Gao (2023)** — *"Applying HCAI in Developing Effective Human-AI Teaming"* (arXiv, 인용 33)는 **Human-AI Joint Cognitive Systems(HAIJCS)** 프레임워크를 제안한다. 인간 중심 AI(HCAI) 설계 원칙에서 팀워크 응용 방향을 체계화하며, 상황 인식(SA), 의사결정 지원, 역할 분담 최적화를 세 핵심 축으로 제시한다.

### 2.2 의사소통이 팀 성과를 결정한다

**Zhang et al. (2023)** — *"Investigating AI Teammate Communication Strategies"* (ACM CSCW, 인용 75)는 AI 동료의 소통 전략이 팀 효과성에 미치는 영향을 실험 연구로 검증했다:

| 소통 전략 | 팀 성과 영향 |
|-----------|-------------|
| 설명 제공형 (Explanatory) | 신뢰 향상, 과잉 의존 억제 |
| 지시형 (Directive) | 효율적이나 인간 자율성 저하 |
| 질문형 (Inquiry-based) | 공동 문제해결 촉진, 속도 저하 |

AI가 단순히 "정답"을 제시하는 것이 아니라 추론 과정을 공유하는 소통을 할 때 **팀 성과와 만족도가 동시에 향상**되었다.

### 2.3 적응(Adaptation)의 역할

**Zhao et al. (2022)** — *"The Role of Adaptation in Collective Human-AI Teaming"* (Topics in Cognitive Science, 인용 34)은 팀 수준의 적응이 개인 수준 성과보다 더 강한 예측 변수임을 보인다. AI가 인간의 실수 패턴을 학습하고, 인간이 AI의 오류 경향을 파악하는 **상호 적응 루프**가 장기적 팀 성과의 핵심이다.

---

## 3. 신뢰(Trust)와 의존(Reliance): 가장 연구된 주제

### 3.1 신뢰의 다층 구조

**Li et al. (2024)** — *"Developing trustworthy artificial intelligence"* (Frontiers in Psychology, 인용 89)는 대인(interpersonal), 자동화(human-automation), AI 신뢰를 통합하는 메타 프레임워크를 제안한다. 주요 발견:

- **초기 신뢰(initial trust)**는 시스템 평판과 인터페이스 설계로 형성
- **동적 신뢰(dynamic trust)**는 상호작용 경험 및 AI 오류 노출로 진화
- AI 신뢰는 자동화 신뢰와 달리 **의인화(anthropomorphism)** 요인이 추가됨

**Ulfert et al. (2023)** — *"Shaping a multidisciplinary understanding of team trust in human-AI teams"* (European Journal of Work & Organizational Psychology, 인용 43)는 신뢰 형성의 시간적 궤적 모델을 제안한다:

```
초기 기반 신뢰 → 지식 기반 신뢰 → 식별 기반 신뢰
(초기 상호작용)   (경험 축적)      (가치·목표 공유)
```

인간-AI 팀에서는 세 번째 단계(식별 기반 신뢰)로의 이행이 구조적으로 어렵다는 것이 핵심 한계다.

### 3.2 적절한 의존(Appropriate Reliance)이란?

**Mehrotra et al. (2023)** — *"A Systematic Review on Fostering Appropriate Trust in Human-AI Interaction"* (인용 61)는 총 63편의 문헌을 체계적으로 분석했다. **적절한 신뢰(appropriate trust)**란:

> AI가 맞을 때 의존하고, 틀릴 때 의존하지 않는 상태 — 과잉 의존(over-reliance)과 과소 의존(under-reliance) 모두가 문제

이를 달성하는 세 가지 경로:
1. **설명가능성(XAI)** — AI 추론 가시화로 신뢰 보정
2. **불확실성 표현(Uncertainty Communication)** — AI 자신감 수준 명시
3. **상호작용 훈련(Interactive Training)** — 사용자 경험 통한 신뢰 교정

**Küper & Krämer (2024)** — *"Psychological Traits and Appropriate Reliance"* (인용 33)는 개인차 변수(인지 스타일, AI 불안감, 자기효능감)가 의존 패턴에 유의한 영향을 줌을 보인다. AI 도구의 '일괄 배포'보다 사용자 유형별 맞춤 온보딩이 필요하다는 함의.

### 3.3 자동화 편향(Automation Bias)의 위협

**Romeo & Conti (2025)** — *"Exploring automation bias in human-AI collaboration"* (인용 35)는 자동화 편향을 "AI 추천을 비판 없이 수용하는 경향"으로 정의하고, XAI가 이를 **완화하거나 오히려 강화**할 수 있다는 역설적 발견을 제시한다:

- 설명이 너무 복잡하면 인지 부담이 커져 오히려 맹목적 수용 증가
- 설명이 너무 단순하면 AI 권위에 대한 과신 형성
- **최적 설명 복잡도(optimal explanation complexity)**가 자동화 편향 최소화의 핵심

---

## 4. 의사결정에서의 보완성(Complementarity)

### 4.1 인간+AI > 인간 또는 AI

**Hemmer et al. (2024)** — *"Complementarity in human-AI collaboration"* (인용 55)는 보완성의 개념, 원천, 실증 증거를 종합 정리한다:

- **기술 보완성**: AI는 패턴 인식·속도, 인간은 맥락 이해·윤리 판단에서 우위
- **인지 보완성**: AI는 일관성, 인간은 유연성에서 강점
- 실증적으로 인간+AI의 결합 성과가 각각 단독보다 높은 사례는 **고난도·불확실성 높은 과제**에서 더 뚜렷

**Leitão et al. (2022)** — *"Human-AI Collaboration in Decision-Making: Beyond Learning to Defer"* (arXiv, 인용 27)는 기존 'AI→인간 위임(learning to defer)' 패러다임을 넘어, **양방향 위임**과 **동적 역할 전환**이 필요함을 주장한다. AI가 언제 인간에게 넘길지, 인간이 언제 AI를 신뢰할지를 함께 학습하는 구조가 최적 성과를 낸다.

### 4.2 의료 분야: 실증의 최전선

**Reverberi et al. (2022)** — *"Experimental evidence of effective human-AI collaboration in medical decision-making"* (Nature Scientific Reports, 인용 149)는 내시경 진단에서 AI 보조 의사 그룹이 AI 단독·의사 단독 모두를 성과에서 앞서는 것을 무작위 대조 실험으로 확인했다. 단, 성과 향상은 **AI 정확도가 일정 임계값 이상**일 때만 나타났다.

**Zhang et al. (2023)** — *"Rethinking Human-AI Collaboration in Complex Medical Decision Making: A Case Study in Sepsis Diagnosis"* (ACM CHI, 인용 83)는 패혈증 진단에서 HAIC가 AI 단독보다 오히려 낮은 성과를 낸 반례를 제시하며, **과제 복잡도와 시간 압박이 협업 이득을 결정**하는 핵심 조절 변수임을 밝혔다.

### 4.3 상호작용 패턴의 분류학

**Gomez et al. (2023)** — *"Human-AI collaboration is not very collaborative yet"* (Frontiers in Computer Science, 인용 44)는 AI 보조 의사결정 연구 122편을 체계적으로 검토하여 **6가지 상호작용 패턴**을 도출했다:

| 패턴 | 설명 | 비율 |
|------|------|------|
| AI→인간 일방 자문 | AI 출력 → 인간 최종 결정 | 67% |
| 순차적 확인 | 인간 결정 후 AI 검토 | 12% |
| 병렬 독립 → 통합 | 각자 독립 판단 후 합산 | 9% |
| 반복적 협의 | 다회 교환 통한 수렴 | 7% |
| 위임 | 인간이 AI에 완전 위임 | 3% |
| 창발적 공동 구성 | 결과물이 양쪽에서 동시 진화 | 2% |

> "현재 AI 보조 의사결정의 67%는 사실상 '자문 도구' 수준이며, 진정한 협업은 2%에 불과하다."

---

## 5. 창의성과 생산성 향상

### 5.1 스캐폴딩 수준이 결과를 결정한다

**Dhillon et al. (2024)** — *"Shaping Human-AI Collaboration: Varied Scaffolding Levels in Co-writing"* (ACM CHI, 인용 110)는 LLM 기반 공동 글쓰기에서 스캐폴딩 수준(낮음·중간·높음)을 달리한 실험을 진행했다:

- **높은 스캐폴딩(강한 AI 유도)**: 완성도 높지만 저자 목소리 약화, 창의성 감소
- **낮은 스캐폴딩(최소 AI 개입)**: 다양성·독창성 높지만 완성도 낮음
- **최적 스캐폴딩**: 과제 단계별 유동적 개입 수준 조절

이 결과는 AI 쓰기 도구 설계에서 **사용자 자율성 보존**이 단순 성과 최적화만큼 중요함을 시사한다.

**Luther et al. (2024)** — *"Teaming Up with an AI: Exploring Human-AI Collaboration in a Writing Scenario with ChatGPT"* (인용 28)는 ChatGPT와의 글쓰기 협업에서 참여자들이 초안 생성에는 AI를 수용하지만 **자신의 관점·스타일이 희석될 때 강한 저항감**을 보임을 질적으로 분석했다. 저자성(authorship) 개념의 재정의가 필요하다는 함의.

### 5.2 집단 지성과의 연결

**Heyman et al. (2024)** — *"Supermind Ideator: How scaffolding Human-AI collaboration can increase creativity"* (인용 35)는 Malone의 Superminds 이론을 HAIC에 적용, AI가 촉진자(facilitator)로 기능할 때 집단 아이디어 생성이 유의하게 향상됨을 보인다. 단순히 아이디어를 제안하는 것이 아니라 **다양성 주입(diversity injection)**과 **수렴 촉진(convergence facilitation)** 기능이 핵심이었다.

### 5.3 사회정서적 요소의 재발견

**Kolomaznik et al. (2024)** — *"The role of socio-emotional attributes in enhancing human-AI collaboration"* (Frontiers in Psychology, 인용 50)는 AI 시스템의 **공감적 응답, 유머, 감정적 인정**이 협업 성과와 사용자 만족도에 유의한 정(+) 효과를 가짐을 메타분석으로 확인했다. "기능적으로 최적인 AI"보다 "사회적으로 적절한 AI"가 더 나은 협업 성과로 이어진다는 결론은 AI 설계 패러다임에 중요한 시사점을 제공한다.

---

## 6. 설명가능성(XAI)과 인지 편향

### 6.1 XAI의 실제 효과 측정

**Hoffman et al. (2023)** — *"Measures for explainable AI"* (Frontiers in Computer & Human Interaction, 인용 199)는 XAI 평가를 위한 다차원 측정 프레임워크를 제안한다:

| 측정 차원 | 정의 |
|-----------|------|
| 설명 품질 (Explanation Goodness) | 정확성·완전성·이해가능성 |
| 정신 모델 일치 (Mental Model) | 사용자의 AI 이해 정확도 |
| 신뢰 보정 (Trust Calibration) | 신뢰와 실제 AI 정확도의 정렬 |
| 인간-AI 성과 (HAIC Performance) | 최종 과제 결과물 품질 |

이 4개 차원이 서로 독립적으로 변동할 수 있다는 발견이 핵심 — 설명이 이해가능해도 신뢰 보정에 실패하거나, 좋은 설명이 성과 향상으로 이어지지 않을 수 있다.

**Lee & Chew (2023)** — *"Understanding the Effect of Counterfactual Explanations on Trust and Reliance"* (ACM CSCW, 인용 59)는 반사실적 설명("만약 X가 달랐다면 AI는 Y라고 예측했을 것")이 임상 의사결정에서 신뢰 보정 효과가 가장 크다는 것을 확인했다. 단, **과제 전문성이 낮은 사용자**에게는 오히려 혼란을 초래할 수 있다.

### 6.2 LLM 시대의 인지 편향

**Echterhoff et al. (2024)** — *"Cognitive Bias in Decision-Making with LLMs"* (arXiv, 인용 101)는 LLM 기반 도구와의 협업에서 발생하는 편향 유형을 체계화했다:

1. **앵커링 편향**: AI 첫 제안에 과도하게 의존
2. **확증 편향 증폭**: AI가 기존 관점을 강화하는 응답 생성
3. **자동화 편향 (재확인)**: AI 권위에 대한 과신
4. **과도한 일관성 편향**: AI의 "자신감 있는" 어조를 무비판적 수용

> "LLM은 기존 자동화 시스템보다 더 설득력 있는 방식으로 편향을 유발한다. 대화형 인터페이스와 자연어 유창성이 비판적 검토 의지를 약화시킨다."

---

## 7. 조직 수준의 통합: Industry 5.0 관점

**Simón et al. (2024)** — *"Integrating AI in organizations for value creation through Human-AI teaming"* (인용 47)는 동적 역량(Dynamic Capabilities) 이론을 적용해 Human-AI teaming의 조직 수준 가치 창출 메커니즘을 모델링한다:

- **감지(Sensing)**: AI가 조직 외부 신호 탐지, 인간이 전략적 해석
- **포착(Seizing)**: AI가 옵션 생성, 인간이 의사결정
- **재구성(Reconfiguring)**: 학습된 HAIC 패턴이 조직 루틴에 내재화

**Sun & Song (2024)** — *"Unlocking the Synergy: Increasing productivity through Human-AI collaboration in the industry 5.0 Era"* (인용 35)는 Industry 5.0의 '인간 중심 + AI 협력' 패러다임에서 생산성 시너지의 조건으로 **상호 보완적 역할 설계, 지속적 피드백 루프, 심리적 안전감**을 제시한다.

---

## 8. 핵심 발견 종합

| 주제 | 핵심 발견 | 주요 논문 |
|------|-----------|-----------|
| 팀워크 재정의 | AI를 팀원으로 취급, SMM 구축이 성과 핵심 | Schmutz et al. (2024) |
| 신뢰 형성 | 다층·시간적 구조, 식별 기반 신뢰 이행 어려움 | Li et al. (2024), Ulfert et al. (2023) |
| 자동화 편향 | XAI가 역설적으로 편향 강화 가능 | Romeo & Conti (2025) |
| 의사결정 보완성 | 고난도 과제에서 인간+AI > 각각 단독 | Hemmer et al. (2024) |
| 의료 적용 | 임계 정확도 이상에서만 협업 이득 | Reverberi et al. (2022) |
| 창의성 | 스캐폴딩 수준이 창의성-완성도 균형 결정 | Dhillon et al. (2024) |
| 사회정서적 요소 | 공감·유머 등 사회적 속성이 협업 성과 향상 | Kolomaznik et al. (2024) |
| XAI 측정 | 이해가능성 ≠ 신뢰보정 ≠ 성과향상 | Hoffman et al. (2023) |
| LLM 편향 | 대화형 인터페이스가 비판적 검토 약화 | Echterhoff et al. (2024) |

---

## 9. 미래 연구 방향

1. **동적 역할 전환(Dynamic Role Switching)**: 상황에 따라 인간-AI 간 주도권이 유동적으로 변하는 시스템 설계 원칙
2. **개인화된 신뢰 보정(Personalized Trust Calibration)**: 사용자 인지 스타일·전문성에 맞춘 XAI 개입
3. **장기 팀 연구(Longitudinal Teaming Studies)**: 수개월~수년 단위의 인간-AI 팀 진화 추적
4. **LLM 특화 편향 완화(LLM-specific Debiasing)**: 대화형 AI와의 협업에서 발생하는 신종 편향 개입 설계
5. **조직 제도화(Organizational Institutionalization)**: HAIC 패턴이 조직 루틴으로 내재화되는 조건 연구

---

## 참고 논문

| 저자 (연도) | 제목 (축약) | 저널/학회 | 링크 |
|-------------|-------------|-----------|------|
| Schmutz et al. (2024) | AI-teaming: Redefining collaboration | Current Opinion in Psychology | [링크](https://www.semanticscholar.org/paper/47d511bd3b91458e4f5a67bcf7d8a98411b0a88b) |
| Xu & Gao (2023) | Applying HCAI in Human-AI Teaming | arXiv | [링크](https://www.semanticscholar.org/paper/98e2b291cd1502b1f7530e043dc27ed387701d57) |
| Zhang et al. (2023) | AI Teammate Communication Strategies | ACM CSCW | [링크](https://www.semanticscholar.org/paper/80b22833df9438fafd209f8338ac062eeaf971eb) |
| Zhao et al. (2022) | Adaptation in Collective Human-AI Teaming | Topics in Cognitive Science | [링크](https://www.semanticscholar.org/paper/fac3bbf1c0815aead534d7341830720540c82276) |
| Simón et al. (2024) | Integrating AI for value creation | (Journal) | [링크](https://www.semanticscholar.org/paper/ade053130ff9dfd04f9b33dd40d7cb0968eb5591) |
| Li et al. (2024) | Developing trustworthy artificial intelligence | Frontiers in Psychology | [링크](https://www.semanticscholar.org/paper/d8c20ea7ab5f9e73a02446becd7d88bc3ff3b1f9) |
| Ulfert et al. (2023) | Team trust in human-AI teams | European J. Work & Org. Psych. | [링크](https://www.semanticscholar.org/paper/1a9f84b1f365b30203cc29467ba7d51521aba82d) |
| Mehrotra et al. (2023) | Fostering Appropriate Trust in HACI | (Systematic Review) | [링크](https://www.semanticscholar.org/paper/0072959e028aadf81e55353d3be7bd4f95e447e4) |
| Küper & Krämer (2024) | Psychological Traits and Appropriate Reliance | (Journal) | [링크](https://www.semanticscholar.org/paper/9a127b849a7ab574b5cc71c25dcccff1fca0a12a) |
| Romeo & Conti (2025) | Automation bias in human-AI collaboration | (Review) | [링크](https://www.semanticscholar.org/paper/5858572fc526bb2d264623df679e04c3d84a2476) |
| McGrath et al. (2024) | CHAI-T: Process framework for trust | (Journal) | [링크](https://www.semanticscholar.org/paper/5e50ee64a8bb74df488510303214943a768e865a) |
| Hemmer et al. (2024) | Complementarity in human-AI collaboration | (Journal) | [링크](https://www.semanticscholar.org/paper/df29a654e19d4551a1e222f019c819b56f8ddd7c) |
| Leitão et al. (2022) | Beyond Learning to Defer | arXiv | [링크](https://www.semanticscholar.org/paper/d644de1087f8a894142dff2595c8357146bcca89) |
| Gomez et al. (2023) | Taxonomy of interaction patterns (HAIC) | Frontiers in Computer Science | [링크](https://www.semanticscholar.org/paper/deb51990406f25e6b7ec47d023cc83c4d4451da2) |
| Reverberi et al. (2022) | Experimental evidence HAIC in medicine | Nature Scientific Reports | [링크](https://www.semanticscholar.org/paper/1bfc69cd9a06be740ea6a0f421e0852a90856220) |
| Zhang et al. (2023) | HAIC in Sepsis Diagnosis | ACM CHI | [링크](https://www.semanticscholar.org/paper/455dfbc280e81e2b425aebd274accfd52d745731) |
| Dhillon et al. (2024) | Scaffolding Levels in Co-writing with LM | ACM CHI | [링크](https://www.semanticscholar.org/paper/7987818066aa92322b16a62b309ab4de98333944) |
| Luther et al. (2024) | Teaming Up with an AI (ChatGPT writing) | (Journal) | [링크](https://www.semanticscholar.org/paper/909587c5645b433fe6805d261587ba6600b063a8) |
| Heyman et al. (2024) | Supermind Ideator: creativity with HAIC | (Conference) | [링크](https://www.semanticscholar.org/paper/880ad51160400cf0ef278722875cc6a9d237a583) |
| Kolomaznik et al. (2024) | Socio-emotional attributes in HAIC | Frontiers in Psychology | [링크](https://www.semanticscholar.org/paper/59ec4e5e5e7b78a10a753385ba52ee629fd9389e) |
| Sun & Song (2024) | Productivity through HAIC: Industry 5.0 | (Journal) | [링크](https://www.semanticscholar.org/paper/899287acf4e098a019b2f2ee056e39b4336df282) |
| Hoffman et al. (2023) | Measures for explainable AI | Frontiers in C&HI | [링크](https://www.semanticscholar.org/paper/3038e62388ba4961595ec0062948b31eef251e5d) |
| Lee & Chew (2023) | Counterfactual Explanations on Trust | ACM CSCW | [링크](https://www.semanticscholar.org/paper/afe05c9afdeb48e111712bb6fe5f8b68632145fb) |
| Echterhoff et al. (2024) | Cognitive Bias in Decision-Making with LLMs | arXiv | [링크](https://www.semanticscholar.org/paper/3abd61d29c47949b2445b9eed08512500ebb6380) |
