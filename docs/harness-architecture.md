# 영종도 Airbnb 운영 — Harness Engineering 구조

> 목적: 에이전트들이 역할을 나눠 병렬로 작동하고, 파일로 결과를 공유하며 최종 React 대시보드를 자동 생성하는 시스템 설계
> 작성일: 2026-04-12

---

## 전체 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                      TRIGGER LAYER                              │
│  매일 09:00   매주 월요일   매주 금요일   매월 1일               │
└────────┬──────────────┬────────────────┬──────────────┬─────────┘
         │              │                │              │
         ▼              ▼                ▼              ▼
┌─────────────┐ ┌──────────────┐ ┌───────────────┐ ┌──────────────┐
│ Agent 1     │ │ Agent 2      │ │ Agent 3       │ │ Agent 4      │
│ 이벤트 모니터 │ │ 이벤트 캘린더 │ │ Airbnb 리서치 │ │ 가격 전략    │
│ (매일)      │ │ 업데이트(주간)│ │ (주간·금요일) │ │ (월간)       │
└──────┬──────┘ └──────┬───────┘ └───────┬───────┘ └──────┬───────┘
       │               │                 │                 │
       ▼               ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SHARED FILE STORE                          │
│  docs/event-monitor-YYYY-MM-DD.md                               │
│  docs/yeongjonge-event-calendar-2026.md  ← 덮어쓰기             │
│  docs/airbnb-yeongjonge-YYYY-MM-DD.md                           │
│  docs/analysis-problems-YYYY-MM-DD.md                           │
│  docs/analysis-market-YYYY-MM-DD.md                             │
│  docs/analysis-toprooms-YYYY-MM-DD.md                           │
│  docs/pricing-strategy-YYYY-MM.md                               │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Agent 5: 통합 빌더                          │
│  모든 파일 읽기 → session MD → airbnb.tsx 업데이트              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                  src/components/Trends/airbnb.tsx
```

---

## Agent 역할 정의

### Agent 1 — 이벤트 모니터 (매일 09:00)

**트리거:** 매일 자동  
**입력:** 인스파이어 공식 사이트, 인천투어 사이트  
**작업:**
- 인스파이어 신규 이벤트 등록 여부 확인 (firecrawl_scrape)
- `docs/yeongjonge-event-calendar-2026.md`와 비교
- 신규 이벤트 발견 시 캘린더 즉시 업데이트
- `docs/event-monitor-YYYY-MM-DD.md`에 결과 기록

**산출물:**
```
docs/event-monitor-2026-04-12.md
  → [NEW] 이벤트명 / 날짜 / 수요 강도 / 가격 전략 권고
  → [NO CHANGE] 변경 없음
```

**소스:**
- `https://www.inspireresorts.com/ko/entertainment/inspire-arena/featured-performances`
- `https://itour.incheon.go.kr/ssst/ssst/list.do?pageNm=fstv`

---

### Agent 2 — 이벤트 캘린더 업데이트 (매주 월요일)

**트리거:** 매주 월요일  
**입력:** 인천 중구청, 인천관광공사, 구석구석  
**작업:**
- 이번 주/다음 달 신규 이벤트 수집
- `docs/yeongjonge-event-calendar-2026.md` 갱신 (Write 덮어쓰기)
- 수요 강도(★) 재평가
- 다음 4주 이내 이벤트에 대한 가격 전략 권고 추가

**소스:**
```
https://www.icjg.go.kr          (인천 중구청)
https://itour.incheon.go.kr     (인천투어)
https://korean.visitkorea.or.kr (대한민국 구석구석)
```

**산출물:** `docs/yeongjonge-event-calendar-2026.md` (갱신)

---

### Agent 3 — Airbnb 리서치 (매주 금요일 08:00)

**트리거:** 매주 금요일 (기존 airbnb-research 스킬)  
**병렬 서브에이전트 구조:**

```
Phase 1 (메인, 순차)
  └─ 룸 5곳 스크래핑 → docs/airbnb-yeongjonge-YYYY-MM-DD.md

Phase 2 (병렬, 3개 동시)
  ├─ Agent 3-A: 문제 분석 → docs/analysis-problems-YYYY-MM-DD.md
  ├─ Agent 3-B: 시장 분석 → docs/analysis-market-YYYY-MM-DD.md
  └─ Agent 3-C: 인기룸 분석 → docs/analysis-toprooms-YYYY-MM-DD.md

Phase 3 (Agent 5로 위임)
  └─ 통합 빌더가 airbnb.tsx 생성
```

---

### Agent 4 — 가격 전략 수립 (매월 1일)

**트리거:** 매월 1일  
**입력:**
- `docs/yeongjonge-event-calendar-2026.md` (이벤트 캘린더)
- `docs/yeongjonge-event-info-plan.md` (수집 플랜)
- `docs/analysis-market-YYYY-MM-DD.md` (최신 시장 분석)

**작업:**
- 당월 + 익월 이벤트 수요 강도 합산
- 날짜별 권장 가격 산출 (기본가 × 이벤트 배율)
- 최소 박수 조건 설정 권고
- 얼리버드 가격 오픈 타이밍 권고

**산출물:** `docs/pricing-strategy-YYYY-MM.md`

```markdown
## 2026-05 가격 전략

| 기간 | 이벤트 | 배율 | 최소 박수 | 인상 타이밍 |
|------|--------|:----:|:---------:|------------|
| 05.30~31 | 오슬로우 빈티지 마켓 | ×1.1 | 1박 | 2주 전 |
| 07.01~ | 을왕리 해수욕장 개장 | ×1.5 | 2박 | 6월 중 |
```

---

### Agent 5 — 통합 빌더 (Agent 3 Phase 3 완료 후)

**트리거:** Agent 3의 Phase 2 완료 신호  
**입력 (모두 읽기):**
```
docs/airbnb-yeongjonge-YYYY-MM-DD.md
docs/analysis-problems-YYYY-MM-DD.md
docs/analysis-market-YYYY-MM-DD.md
docs/analysis-toprooms-YYYY-MM-DD.md
docs/yeongjonge-event-calendar-2026.md   ← 이벤트 데이터 포함
docs/pricing-strategy-YYYY-MM.md         ← 가격 전략 포함
```

**작업:**
- 이벤트 캘린더 데이터를 시장 분석 탭에 통합
- 가격 전략을 오퍼 탭에 반영
- `docs/session-YYYY-MM-DD.md` 저장
- `src/components/Trends/airbnb.tsx` 전면 업데이트

**airbnb.tsx 에 추가될 탭:**
```
기존: 숙소리뷰 | 시장분석 | 문제분석 | 고전환오퍼 | 바이럴 | 인기룸
추가: 📅 이벤트 캘린더 | 💰 가격 전략
```

---

## 스케줄 요약

| 에이전트 | 주기 | 트리거 |
|---------|------|--------|
| Agent 1 (이벤트 모니터) | 매일 09:00 | cron |
| Agent 2 (캘린더 업데이트) | 매주 월요일 | cron |
| Agent 3 (Airbnb 리서치) | 매주 금요일 08:00 | cron |
| Agent 4 (가격 전략) | 매월 1일 | cron |
| Agent 5 (통합 빌더) | Agent 3 완료 후 | 이벤트 기반 |

---

## 파일 의존 관계 (DAG)

```
[인스파이어 사이트]──→ Agent 1 ──→ event-monitor-*.md
[인천투어 사이트] ──→ Agent 2 ──→ event-calendar-2026.md ──┐
[Airbnb 사이트]   ──→ Agent 3 ──→ airbnb-yeongjonge-*.md   │
                           └──→ analysis-*.md               │
[시장 분석]       ──→ Agent 4 ──→ pricing-strategy-*.md ───┤
                                                             ▼
                                                        Agent 5
                                                             │
                                                             ▼
                                                      airbnb.tsx
```

---

## 구현 우선순위

| 순서 | 작업 | 난이도 |
|:---:|------|:------:|
| 1 | Agent 3 병렬 구조 (airbnb-research 스킬 이미 작성됨) | ✅ 완료 |
| 2 | Agent 1 이벤트 모니터 스킬 작성 | ✅ 완료 (`event-monitor.md`) |
| 3 | Agent 2 캘린더 업데이트 스킬 작성 | ✅ 완료 (`event-calendar-update.md`) |
| 4 | Agent 4 가격 전략 스킬 작성 | ✅ 완료 (`pricing-strategy.md`) |
| 5 | Agent 5 통합 빌더 — 이벤트 탭 추가 | 중간 |
| 6 | 크론 등록 (crontab 또는 RemoteTrigger) | 낮음 |

---

## 크론 등록 예시

```bash
# Agent 1 — 매일 09:00
0 9 * * * cd /home/cakepower/tutorial/a14u && claude --print "이벤트 모니터 실행해줘" >> logs/event-monitor.log 2>&1

# Agent 2 — 매주 월요일 09:30
30 9 * * 1 cd /home/cakepower/tutorial/a14u && claude --print "이벤트 캘린더 업데이트해줘" >> logs/event-calendar.log 2>&1

# Agent 3 — 매주 금요일 08:00 (기존)
0 8 * * 5 cd /home/cakepower/tutorial/a14u && claude --print "에어비앤비 리서치 해줘" >> logs/airbnb-research.log 2>&1

# Agent 4 — 매월 1일 10:00
0 10 1 * * cd /home/cakepower/tutorial/a14u && claude --print "가격 전략 수립해줘" >> logs/pricing-strategy.log 2>&1
```
