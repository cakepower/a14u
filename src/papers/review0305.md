# AI와의 협업 (Human-AI Collaboration)
### Literature Review — 2026.03.05

---

## 1. 개요

2020년 이후 대규모 언어 모델(LLM), 생성형 AI, 자율 에이전트의 폭발적 확산과 함께 **Human-AI Collaboration(HAIC)** 연구가 급증하고 있다. 이 분야는 인간공학, 조직행동론, 인지심리학, 경영과학, 컴퓨터과학에 걸쳐 다학제적으로 진행 중이며, 본 리뷰는 2020–2026년 주요 문헌을 종합·정리한다.

---

## 2. 정의 및 이론적 프레임워크

### 2.1 핵심 정의 문제

"Human-AI 팀"에 대한 합의된 학술 정의는 아직 존재하지 않는다.

**Berretta et al. (2023)** — *"Defining human-AI teaming the human-centered way"* (Frontiers in AI)은 Scopus·Web of Science의 146개 논문을 네트워크 분석하여 6개 연구 클러스터를 식별했다:

1. 과제 수행(Task Performance)
2. 신뢰·투명성(Trust & Transparency)
3. 상황 인식(Situation Awareness)
4. 인지 프레임워크(Cognitive Frameworks)
5. 윤리·공정성(Ethics & Fairness)
6. 설계 방법론(Design Methodology)

**National Academies (2022)** — *"Human-AI Teaming: State-of-the-Art and Research Needs"*는 이 분야에서 가장 권위 있는 연구 어젠다로, 다음을 핵심 구성요소로 제시한다: 팀 성과 모델, 팀 프로세스, 상황 인식, AI 투명성·설명가능성, 신뢰, 편향 감소, 훈련.

### 2.2 협업 모드 분류

**Frontiers in Computer Science (2024)** — *"Human-AI collaboration is not very collaborative yet"*은 2013–2023년 연구(ACM, IEEE, Scopus, PubMed)를 체계적으로 검토한 결과:

> 대부분의 배포된 AI 시스템은 단순 **자문(advisory)** 수준에 그치며, 인간과 AI가 서로에게 적응하는 진정한 양방향 협업은 실제로 드물다.

### 2.3 자동화·증강·공생 모델

**Jarrahi (2018)** — *Business Horizons*는 이 분야에서 가장 많이 인용되는 이론 논문이다. AI는 계산적·반복적 과제에서 인간 인지를 확장하고, 인간은 직관·맥락·윤리 판단에서 우위를 가진다는 **공생(symbiosis) 모델**을 제안한다.

**Peng et al. (2024)** — *Management Science*는 세 가지 체제를 구분한다:

| 체제 | 설명 |
|---|---|
| **자동화(Automation)** | AI가 루틴 과제에서 인간 노동을 대체 |
| **증강(Augmentation)** | AI가 복잡한 과제에서 인간 역량을 강화 |
| **공생(Symbiosis)** | 인간-AI 역량의 반복적 공진화 |

### 2.4 분산 인지(Distributed Cognition) 이론

Hutchins의 분산 인지 이론을 적용한 연구들은 HAIC를 인간, AI 아티팩트, 공유 표상 미디어에 걸쳐 분산된 인지로 모델링한다. 핵심 구성 개념: **상황 인식(SA)**, **공유 정신 모델(SMMs)**, **소통적 조율**.

**Demir et al. (2022)** — *Ergonomics*: 효과적인 Human-AI 팀은 과제 목표, 팀 구조, AI 역량에 관한 정렬된 지식(공유 정신 모델)을 필요로 한다.

### 2.5 EPOCH 프레임워크 (MIT)

MIT Sloan 연구는 AI가 대체하기 어려운 고유한 인간 역량을 **EPOCH 지수**로 정의한다:

- **E**mpathy & Emotional Intelligence (공감·감성 지능)
- **P**resence, Networking & Connection (현장감·네트워크·연결)
- **O**pinion, Judgment & Ethics (판단·윤리)
- **C**reativity & Imagination (창의성·상상력)
- **H**ope, Vision & Leadership (비전·리더십)

---

## 3. 핵심 실증 질문: 언제 Human-AI 협업이 효과적인가?

### 3.1 결정적 메타분석

**Vaccaro et al. (2024)** — *Nature Human Behaviour*는 이 분야 가장 포괄적인 실증 종합 연구다.

- 분석 대상: **106개 실험, 370개 효과 크기** (2020년 1월 – 2023년 6월)
- **핵심 발견: 평균적으로 Human-AI 조합은 인간 단독 또는 AI 단독보다 성과가 낮다.**
- 성과 저하 집중 영역: **의사결정 과제** (의료 진단, 법적 판단, 채용)
- 성과 향상 영역: **콘텐츠 창작 과제** (글쓰기, 디자인)
- 핵심 조절 변수: AI 단독이 인간 단독을 초과할 때, 인간을 루프에 추가하면 전체 성과 저하

이 발견은 "인간을 추가하면 AI 출력이 항상 향상된다"는 통념을 정면으로 반박한다.

### 3.2 보완성(Complementarity) 조건

**European Journal of Information Systems (2025)** — *"Complementarity in human-AI collaboration"*:

- **과제 간 보완성**: 인간과 AI가 비교 우위에 따라 서로 다른 하위 과제를 담당
- **과제 내 보완성**: 동일 과제에서 서로 다른 인지적 기여를 통해 상호작용

---

## 4. 생산성 및 성과 영향

### 4.1 지식 노동·창작 분야

**Brynjolfsson, Li & Raymond (2023/2024)** — *Quarterly Journal of Economics*

AI 어시스턴트를 사용한 고객 서비스 상담원 5,179명 대상 현장 실험:

- 평균 생산성 **+14%** (시간당 해결 문제 수)
- 하위 25% 작업자 **+34%** (기술 압축 효과)
- AI가 상위 수행자의 암묵 지식을 하위 작업자에게 이전하는 "멘토" 역할

> **기술 압축(Skill Compression) 효과**: AI는 숙련도가 낮은 작업자를 가장 크게 향상시켜 조직 내 생산성 분포를 평탄화한다.

**Dell'Acqua et al. (2023)** — BCG 컨설턴트 대상 GPT-4 사용 실험:

- 과제 수 **+12.2%**, 속도 **+25.1%**, 품질 평가 **+40%** (AI 역량 범위 내 과제)
- **단, AI 역량 경계 밖 과제에서는 AI 사용자가 비사용자보다 성과 저하** ("잠들기 효과")

**Peng et al. (2023)** — GitHub Copilot 사용 개발자:

- 코딩 과제 완수 속도 **+55.8%**
- 경험이 적은 개발자에서 이득이 더 큼

**Zhou & Lee (2024)** — *PNAS*, 400만 작품 분석:

- 텍스트-이미지 AI 협업으로 창작 생산성 **+25%**
- AI 협업 작품의 시장 가치 **+50%** (시간 경과에 따라)
- 단, 청중은 AI 협업 작품을 **감정·의도성 면에서 낮게 평가**

**Scientific Reports (2023)** — *"Best humans still outperform AI in creative divergent thinking"*:

- AI는 평균적 창의성에서는 높은 성과
- 최상위 인간 사상가는 현재 AI보다 여전히 더 독창적인 아이디어 생성

### 4.2 소프트웨어·보안 분야

**arXiv (2025)** — *"LLMs in the SOC"*: 보안 운영 센터(SOC) 45명 분석가의 10개월간 GPT-4 사용 3,090건 쿼리 분석:

- 분석가들은 LLM을 주로 저수준 텔레메트리의 **의미 파악(sensemaking)** 에 사용
- 고위험 판단에는 보수적으로 AI 의존 → 합리적 분업 패턴

---

## 5. AI 신뢰(Trust) 연구

### 5.1 신뢰 프레임워크

**Frontiers in Psychology (2024)** — *"Developing trustworthy AI: insights from trust research"*:
대인 신뢰, 자동화 신뢰, AI 신뢰 세 문헌을 통합한 프레임워크. 신뢰에 영향을 미치는 핵심 기술적 요인:

1. AI 설명 품질 및 투명성
2. 신뢰성·오류율 커뮤니케이션
3. AI 무결성·공정성 인식
4. 시스템 성과 피드백

**ACM Journal on Responsible Computing (2024)** — 35개 연구 검토: AI 신뢰 조성을 위한 기술적 요인 위 4가지 확인.

**KPMG Global Trust Survey (2025)** — 47개국 48,000명:

| 지표 | 비율 |
|---|---|
| AI 정기 사용자 | 66% |
| AI 혜택 인식 | 83% |
| AI 시스템 신뢰 의향 | **46%** |
| 정확성 검증 없이 AI 의존 | 66% |

### 5.2 자동화 편향(Automation Bias)

**AI & Society, Springer (2025)** — 의료 등 고위험 영역에서 자동화 편향이 HAIC의 핵심 위협.

- **메커니즘**: 인간은 인지적 노력을 줄이기 위해 AI 추천을 휴리스틱으로 사용, AI가 틀려도 따르는 경향
- 임상 진단 연구: AI 도입으로 정확도 87.2% → 96.4% 향상, 그러나 남은 오류의 **절반이 자동화 편향** 기인

**자동화 편향 완화 전략:**

- AI 오류율 명시적 공개
- 의사결정에 대한 책임감 부여
- 반사실적(counterfactual)·반론적(adversarial) 설명 형식 제공
- AI 실패 사례 집중 훈련

---

## 6. 인지·심리적 차원

### 6.1 역량 저하(Deskilling) 우려

**Lebovitz et al. (2022)** — *Information Systems Research*: 방사선 전문의 AI 진단 보조 도구 사용 연구.

> 숙련 전문가들은 직업적 정체성 위협과 역량 저하 우려로 AI에 판단을 위임하는 것을 능동적으로 **거부**한다.

이는 AI 도입이 기술적 문제뿐 아니라 **사회·심리적 저항**을 수반한다는 것을 보여준다.

### 6.2 상황 인식(Situation Awareness, SA)

National Academies (2022)는 **상황 인식**을 Human-AI 팀 연구의 중심 인지 구성 개념으로 제시한다:

- **개인 SA**: 각 팀원이 현재 상태를 이해
- **공유 SA**: 인간과 AI의 상황 모델 정렬
- **팀 SA**: 조율된 행동을 지지하는 동기화된 이해

**Computers in Human Behavior (2022)** — *"Supporting Human-AI Teams: Transparency, explainability, and situation awareness"*:
AI 투명성은 인간 SA를 직접 지원하지만, **지나치게 복잡한 설명은 오히려 인지 부하를 증가시켜 SA를 저하**시킨다.

### 6.3 근로자 심리적 영향

- 근로자의 **41%**가 AI로 인해 자신의 직무가 쓸모없어질 것을 우려 (Partnership on AI, 2024)
- AI 유발 직업 불안 → 불안·우울·**지식 은닉(knowledge-hiding) 행동**과 상관
- **프레이밍 효과**: "보조(assistive)"로 제시된 AI vs. "대체(replacement)"로 제시된 AI — 직원 참여도에 유의미한 차이 (Frontiers in Public Health, 2024)

---

## 7. 인간 감독(Human Oversight) 및 제어

### 7.1 정렬(Alignment) 프레임워크

**AI Alignment: A Comprehensive Survey (arXiv, 2023)**:

- **순방향 정렬(Forward Alignment)**: 의도한 대로 행동하도록 시스템 훈련
- **역방향 정렬(Backward Alignment)**: 시스템이 정렬되어 있는지 검증·관리

**확장 가능한 감독(Scalable Oversight)** 문제: AI 역량이 특수 도메인에서 인간 이해 수준을 초과하면 효과적인 감독 유지가 구조적으로 어려워진다. 주요 접근:

- 과제 분해를 통한 지도 가능한 하위 과제 구성
- 토론(Debate)·증명자-검증자(Prover-Verifier) 게임
- AI 보조 감독(한 AI가 다른 AI를 검사)

### 7.2 설명가능 AI(XAI)의 한계

현재 XAI 기법이 직면한 핵심 과제:

- 대부분의 방법이 인과적이 아닌 **상관 기반** 설명 제공
- 청중에 따라 다른 설명 필요 (규제자, 전문가, 일반인)
- **"설명 역설"**: 상세한 XAI가 오히려 맹목적 신뢰를 증가시킬 수 있음

---

## 8. 주요 도전 과제

### 8.1 HAIC 성과 역설

Vaccaro et al. (2024)이 밝힌 핵심 역설: AI 역량이 인간을 초과하는 과제에서 인간을 추가하면 오히려 전체 성과 저하. 극복을 위한 요구사항:

- AI 자신감·역량을 커뮤니케이션하는 **더 나은 조정 인터페이스**
- 인간 vs. AI 강점에 따른 **과제 라우팅**
- 언제 AI를 무시하고 언제 따를지를 판단하는 **인간 훈련**

### 8.2 적절한 신뢰 조정(Trust Calibration)

과도한 신뢰(자동화 편향)도, 과도한 불신(알고리즘 혐오)도 최적 성과를 내지 못한다. 현재 연구 공백: 대부분의 신뢰 연구가 정적 구성 개념으로 신뢰를 측정하지만, 실제 Human-AI 상호작용은 순간순간 동적으로 신뢰가 업데이트된다.

### 8.3 평가 방법론의 부재

**arXiv (2024)** — *"Evaluating Human-AI Collaboration: A Review and Methodological Framework"*: 대부분의 HAIC 연구가 즉각적 과제 성과(정확도, 속도)만 측정하고, 다음을 무시한다:

- 장기적 기술 발달 또는 저하
- 팀 프로세스 품질
- 주관적 경험과 웰빙
- 조직 수준 성과

---

## 9. 미래 연구 방향

| 방향 | 내용 |
|---|---|
| **종단 연구** | 지속적 AI 협업 하에서 기술 발달·저하 추적 (현재 연구는 대부분 단기 실험) |
| **동적 신뢰 조정** | 실시간 적응형 인간-AI 신뢰 프로토콜 개발 |
| **멀티에이전트 AI 감독** | 단일 도구 → AI 에이전트 네트워크 감독으로 전환 (2025–2026 프론티어) |
| **형평성·접근성 연구** | 현재 연구는 WEIRD 맥락에 편중 (서구·교육받은·산업화·부유·민주주의) |
| **조직 수준 성과** | 개인 성과를 넘어 팀·기업 수준 HAIC 효과 연구 |
| **AI 메타인지 리터러시** | 언제, 어떻게, 얼마나 AI와 협업할지 정확히 판단하는 역량 (Collaborative AI Metacognition) |

---

## 10. 핵심 논문 요약

| 논문 | 저자 | 게재 / 연도 | 핵심 기여 |
|---|---|---|---|
| Human-AI Teaming: State-of-the-Art and Research Needs | National Academies | NAP, 2022 | 포괄적 HAIC 연구 어젠다 |
| Generative AI at Work | Brynjolfsson, Li, Raymond | QJE, 2024 | +14% 생산성; 기술 압축 효과 확인 |
| When combinations of humans and AI are useful | Vaccaro et al. | Nature Human Behaviour, 2024 | 106개 연구 메타분석; HAIC가 AI 단독보다 낮은 경우 多 |
| Defining human-AI teaming the human-centered way | Berretta et al. | Frontiers in AI, 2023 | 스코핑 리뷰; 합의된 정의 부재 확인 |
| Human-AI collaboration is not very collaborative yet | — | Frontiers in CS, 2024 | 상호작용 패턴 분류체계; 진정한 협업 희소 |
| The role of shared mental models in human-AI teams | Demir et al. | Ergonomics, 2022 | Human-AI 팀에서 SMM의 이론적 역할 |
| Cognitive Challenges in Human-AI Collaboration | Lebovitz et al. | ISR, 2022 | 위임 저항; 직업 정체성 위협 실증 |
| Developing trustworthy AI | — | Frontiers in Psychology, 2024 | 통합 신뢰 프레임워크 |
| Exploring automation bias in human-AI collaboration | — | AI & Society, 2025 | 자동화 편향 메커니즘·완화 전략 검토 |
| Generative AI, Human Creativity, and Art | Zhou & Lee | PNAS, 2024 | +25% 창작 생산성, +50% 작품 가치 |
| AI Alignment: A Comprehensive Survey | — | arXiv, 2023 | 순방향·역방향 정렬 프레임워크 |
| Evaluating Human-AI Collaboration | — | arXiv, 2024 | HAIC 평가 방법론 프레임워크 |

---

## 참고 문헌

- Vaccaro et al. (2024). [When combinations of humans and AI are useful: A systematic review and meta-analysis.](https://www.nature.com/articles/s41562-024-02024-1) *Nature Human Behaviour.*
- Brynjolfsson, Li & Raymond (2024). [Generative AI at Work.](https://academic.oup.com/qje/article/140/2/889/7990658) *Quarterly Journal of Economics.*
- National Academies of Sciences, Engineering, and Medicine (2022). [Human-AI Teaming: State-of-the-Art and Research Needs.](https://nap.nationalacademies.org/catalog/26355/human-ai-teaming-state-of-the-art-and-research-needs) National Academies Press.
- Berretta et al. (2023). [Defining human-AI teaming the human-centered way.](https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2023.1250725/full) *Frontiers in Artificial Intelligence.*
- (2024). [Human-AI collaboration is not very collaborative yet: a taxonomy of interaction patterns in AI-assisted decision making.](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2024.1521066/full) *Frontiers in Computer Science.*
- Demir et al. (2022). [The role of shared mental models in human-AI teams: a theoretical review.](https://www.tandfonline.com/doi/full/10.1080/1463922X.2022.2061080) *Ergonomics.*
- Lebovitz et al. (2022). [Cognitive Challenges in Human-AI Collaboration: Investigating the Path Toward Productive Delegation.](https://pubsonline.informs.org/doi/10.1287/isre.2021.1079) *Information Systems Research.*
- Peng et al. (2023). [The Impact of AI on Developer Productivity: Evidence from GitHub Copilot.](https://www.researchgate.net/publication/368473822_The_Impact_of_AI_on_Developer_Productivity_Evidence_from_GitHub_Copilot) arXiv.
- Zhou & Lee (2024). [Generative AI, Human Creativity, and Art.](https://pubmed.ncbi.nlm.nih.gov/38444602/) *PNAS.*
- (2025). [Exploring automation bias in human-AI collaboration.](https://link.springer.com/article/10.1007/s00146-025-02422-7) *AI & Society.*
- (2024). [Developing trustworthy artificial intelligence: insights from research on interpersonal, human-automation, and human-AI trust.](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1382693/full) *Frontiers in Psychology.*
- (2024). [A Systematic Review on Fostering Appropriate Trust in Human-AI Interaction.](https://dl.acm.org/doi/10.1145/3696449) *ACM Journal on Responsible Computing.*
- KPMG (2025). [Trust, attitudes and use of AI: A global study.](https://kpmg.com/xx/en/our-insights/ai-and-technology/trust-attitudes-and-use-of-ai.html)
- Microsoft Research (2024). [New Future of Work Report 2024.](https://www.microsoft.com/en-us/research/wp-content/uploads/2024/12/NFWReport2024_12.20.24.pdf)
- (2025). [Complementarity in human-AI collaboration.](https://www.tandfonline.com/doi/full/10.1080/0960085X.2025.2475962) *European Journal of Information Systems.*
- (2023). [AI Alignment: A Comprehensive Survey.](https://arxiv.org/abs/2310.19852) arXiv.
- (2024). [Evaluating Human-AI Collaboration: A Review and Methodological Framework.](https://arxiv.org/html/2407.19098v2) arXiv.
- (2024). [Supporting Human-AI Teams: Transparency, explainability, and situation awareness.](https://www.sciencedirect.com/science/article/abs/pii/S0747563222003946) *Computers in Human Behavior.*
- (2023). [Best humans still outperform artificial intelligence in a creative divergent thinking task.](https://www.nature.com/articles/s41598-023-40858-3) *Scientific Reports.*
- (2024). [Assist me or replace me? Uncovering the influence of AI awareness on employees' counterproductive work behaviors.](https://www.frontiersin.org/articles/10.3389/fpubh.2024.1449561/full) *Frontiers in Public Health.*

---

*작성일: 2026년 3월 5일*
