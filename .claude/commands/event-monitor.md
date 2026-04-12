# 영종도 이벤트 모니터 스킬 (Agent 1 — 매일 09:00)

---
name: event-monitor
description: 인스파이어 리조트·인천투어 사이트를 스크래핑하여 신규 이벤트를 감지하고, 이벤트 캘린더를 즉시 업데이트하는 스킬. "이벤트 모니터 실행해줘", "신규 이벤트 확인해줘", "이벤트 캘린더 업데이트해줘" 같은 요청 시 사용.
---

## 0. Firecrawl MCP 사전 확인 (필수)

Firecrawl 도구를 호출하기 전에 `ToolSearch`로 스키마를 로드하세요:

```
ToolSearch query: "select:mcp__firecrawl__firecrawl_scrape,mcp__firecrawl__firecrawl_map"
```

도구 호출이 실패하면 즉시 중단하고 사용자에게 `/mcp` 로 Firecrawl을 reconnect하도록 안내하세요.  
**절대 mock 데이터를 사용하지 마세요.**

---

## 1. 실행 순서 개요

```
STEP 1 → 현재 캘린더 읽기: docs/yeongjonge-event-calendar-2026.md
STEP 2 → 인스파이어 스크래핑 (firecrawl_scrape × 2 병렬)
STEP 3 → 인천투어 스크래핑 (firecrawl_scrape)
STEP 4 → 신규 이벤트 감지 (캘린더와 비교)
STEP 5 → 신규 이벤트 있으면: 캘린더 즉시 업데이트
STEP 6 → 모니터 결과 저장: docs/event-monitor-YYYY-MM-DD.md
```

---

## 2. STEP 1 — 현재 캘린더 읽기

```
Read: docs/yeongjonge-event-calendar-2026.md
```

파일에서 기존 이벤트 목록을 추출하여 중복 감지에 사용합니다.  
파일이 없으면 빈 캘린더로 시작합니다.

---

## 3. STEP 2 — 인스파이어 스크래핑 (병렬)

**2개 URL을 동시에 스크래핑합니다.**

### URL 1 — 인스파이어 아레나 공연 일정

```json
{
  "url": "https://www.inspireresorts.com/ko/entertainment/inspire-arena/featured-performances",
  "formats": ["markdown"],
  "actions": [{"type": "wait", "milliseconds": 4000}],
  "proxy": "stealth"
}
```

### URL 2 — 인스파이어 전체 이벤트

```json
{
  "url": "https://www.inspireresorts.com/ko/entertainment",
  "formats": ["markdown"],
  "actions": [{"type": "wait", "milliseconds": 3000}],
  "proxy": "stealth"
}
```

**추출 대상:**
- 이벤트명 (공연명, 아티스트명)
- 날짜 (시작일~종료일)
- 장소 (인스파이어 아레나, EDGE 등)
- 티켓 판매 상태 (판매중 / 곧 오픈 / 매진)

---

## 4. STEP 3 — 인천투어 스크래핑

```json
{
  "url": "https://itour.incheon.go.kr/ssst/ssst/list.do?pageNm=fstv",
  "formats": ["markdown"],
  "actions": [{"type": "wait", "milliseconds": 3000}],
  "proxy": "stealth"
}
```

**추출 대상:**
- 축제·행사명
- 날짜 (시작일~종료일)
- 장소 (구·군 단위까지)
- 카테고리 (축제, 전시, 공연 등)

---

## 5. STEP 4 — 신규 이벤트 감지

스크래핑 결과와 `docs/yeongjonge-event-calendar-2026.md` 기존 항목을 비교합니다.

**신규 이벤트 판단 기준:**
- 이벤트명이 기존 캘린더에 없는 경우
- 기존 이벤트이지만 날짜가 변경된 경우
- 기존에 "날짜 미정"이었다가 날짜가 확정된 경우

**수요 강도(★) 자동 배정:**

| 카테고리 | 기본 강도 | 조건부 상향 |
|----------|-----------|------------|
| 인스파이어 K팝·콘서트 | ★★★★ | 글로벌 아티스트 → ★★★★★ |
| 인스파이어 e스포츠 | ★★★★ | T1·LCK 관련 → ★★★★★ |
| 인스파이어 EDM·페스티벌 | ★★★★★ | 항상 최고 등급 |
| 지역 축제 (인천 전역) | ★★★ | 을왕리 직접 연관 → ★★★★ |
| 공연·전시 | ★★ | — |
| 가족·체험 행사 | ★★ | — |

---

## 6. STEP 5 — 캘린더 업데이트 (신규 이벤트 있을 때만)

**신규 이벤트가 1개 이상 감지된 경우:**

1. `docs/yeongjonge-event-calendar-2026.md` 를 읽고
2. 해당 월 섹션에 신규 행 추가 (월이 없으면 새 섹션 생성)
3. 상단 `최종 업데이트` 날짜를 오늘로 갱신
4. 가격 전략 권고 추가 (해당 월 전략 코멘트)

**추가 형식:**

```markdown
| MM.DD~DD | **[이벤트명]** | [장소] | [카테고리] | [수요★] | [출처] |
```

**가격 전략 권고 패턴:**

```
★★★★★ → 티켓 판매 시작 즉시 가격 대폭 인상 + 최소 2박 설정 강력 권고
★★★★  → 이벤트 2주 전부터 15~20% 인상 + 최소 1박 설정 권고
★★★   → 이벤트 주간 10% 인상 권고
★★    → 모니터링만, 가격 유지
```

---

## 7. STEP 6 — 모니터 결과 저장

**파일 경로:** `docs/event-monitor-YYYY-MM-DD.md`  
(오늘 날짜로 생성, 이미 있으면 덮어쓰기)

**형식:**

```markdown
# 이벤트 모니터 — YYYY-MM-DD

> 실행 시각: YYYY-MM-DD 09:00  
> 스크래핑 소스: 인스파이어 리조트, 인천투어

---

## 스크래핑 결과 요약

| 소스 | 스캔 이벤트 수 | 신규 감지 |
|------|:------------:|:--------:|
| 인스파이어 (아레나) | N개 | N개 |
| 인스파이어 (전체) | N개 | N개 |
| 인천투어 | N개 | N개 |
| **합계** | **N개** | **N개** |

---

## [NEW] 신규 이벤트

> 신규 이벤트가 없으면 이 섹션을 `[NO CHANGE] 변경 없음`으로 대체

| 이벤트명 | 날짜 | 장소 | 수요 강도 | 가격 전략 권고 |
|---------|------|------|:--------:|--------------|
| [이벤트명] | MM.DD~DD | [장소] | ★★★★ | 이벤트 2주 전 15% 인상 권고 |

---

## [NO CHANGE] 기존 이벤트 확인

캘린더에 이미 등록된 이벤트 N개를 확인했습니다. 변경 없음.

---

## 캘린더 업데이트 상태

- [ ] 업데이트 없음
- [x] `docs/yeongjonge-event-calendar-2026.md` 업데이트 완료 (N개 추가)

---

*생성: YYYY-MM-DD 09:00 | 도구: Claude + Firecrawl MCP*
```

---

## 8. STEP 7 — airbnb.tsx 이벤트 탭 동기화 (신규 이벤트 있을 때만)

신규 이벤트가 감지되어 캘린더를 업데이트한 경우에만 실행합니다.

**업데이트 위치:** `src/components/Trends/airbnb.tsx` 의 `activeTab === 'events'` 블록

**업데이트 방법:**
1. 갱신된 `docs/yeongjonge-event-calendar-2026.md` 를 읽는다
2. `airbnb.tsx` 에서 `activeTab === 'events'` 블록의 월별 배열 데이터를 교체한다 (Edit 도구)
3. `TODAY_DATE` 상수를 오늘 날짜로 갱신한다
4. `npm run build` 실행

신규 이벤트가 없으면 이 스텝을 건너뜁니다.

---

## 9. 실행 규칙

- **MCP First**: 항상 `firecrawl_scrape` 사용 — 내부 지식으로 이벤트 정보를 채우지 말 것
- **신규만 추가**: 이미 캘린더에 있는 이벤트는 재추가 금지
- **날짜 파싱**: "4월 24일~26일" → "04.24~26" 형식으로 통일
- **수요 강도**: 스크래핑 결과가 불명확하면 카테고리 기본값 사용
- **빈 결과**: 스크래핑이 아무것도 반환하지 않으면 — 즉시 중단, 사용자에게 Firecrawl 연결 확인 안내

---

## 9. 자동 실행 (크론)

```bash
# 매일 09:00
0 9 * * * cd /home/cakepower/tutorial/a14u && claude --print "이벤트 모니터 실행해줘" >> /home/cakepower/tutorial/a14u/logs/event-monitor.log 2>&1
```

### 로그 위치

```
/home/cakepower/tutorial/a14u/logs/event-monitor.log
```

### 크론 등록 확인

```bash
crontab -l | grep event-monitor
```

---

## 10. 크론 등록 명령

```bash
mkdir -p /home/cakepower/tutorial/a14u/logs

(crontab -l 2>/dev/null; echo "0 9 * * * cd /home/cakepower/tutorial/a14u && claude --print \"이벤트 모니터 실행해줘\" >> /home/cakepower/tutorial/a14u/logs/event-monitor.log 2>&1") | crontab -
```
