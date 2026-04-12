---
name: download-paper-pdfs
description: literature review 마크다운 문서에서 Semantic Scholar 논문 링크를 파싱하여 PDF를 다운로드하고 public/papers/ 에 저장하는 스킬. "논문 PDF 받아줘", "PDF 다운로드해줘", "원문 저장해줘" 같은 요청 시 사용.
---

# 논문 PDF 다운로드 스킬

literature review 마크다운 문서에 포함된 Semantic Scholar 논문 링크를 파싱하여 PDF를 자동 다운로드하고 `public/papers/` 에 저장한다.

---

## 작업 흐름

### 1단계: 문서에서 논문 ID 추출

review 마크다운 파일을 읽고, Semantic Scholar 링크에서 paper ID를 추출한다.

```
https://www.semanticscholar.org/paper/{PAPER_ID}
```

링크 포맷:
- `[링크](https://www.semanticscholar.org/paper/abc123...)` — 참고 논문 표 형식
- 본문 내 Semantic Scholar URL 포함 시 동일하게 추출

**추출 방법 (Bash)**:

```bash
grep -oP 'semanticscholar\.org/paper/\K[a-f0-9]+' src/papers/review0316.md | sort -u
```

### 2단계: Semantic Scholar API로 PDF URL 조회

각 paper ID에 대해 `mcp__semantic-scholar__get_paper` 를 호출한다.

```
필드: paperId, title, authors, year, openAccessPdf
```

- **rate limit 준수**: 반드시 순차 호출, 각 호출 사이 최소 1초 대기
- `openAccessPdf.url` 이 null 이면 해당 논문은 PDF 없음으로 표기

### 3단계: PDF 다운로드 및 저장

`openAccessPdf.url` 이 있는 논문만 다운로드한다.

**파일명 규칙**: `{첫저자성}_{연도}_{paperId_앞8자}.pdf`

예: `Schmutz_2024_47d511bd.pdf`

**다운로드 명령**:

```bash
curl -L -o "public/papers/{파일명}.pdf" \
  -H "User-Agent: Mozilla/5.0" \
  --max-time 30 \
  "{PDF_URL}"
```

- `-L`: 리다이렉트 따라가기
- `--max-time 30`: 30초 타임아웃
- 실패 시 `--retry 2` 옵션으로 재시도

### 4단계: 결과 보고

작업 완료 후 다음 형식으로 보고:

```
✅ 다운로드 완료 (N편)
  - Schmutz_2024_47d511bd.pdf
  - Dhillon_2024_79878180.pdf
  ...

⚠️ PDF 없음 (M편) — Open Access 아님
  - Simón et al. (2024) — ade05313
  - Ulfert et al. (2023) — 1a9f84b1
  ...

❌ 다운로드 실패 (K편)
  - ...
```

---

## 주의 사항

### rate limit
- `mcp__semantic-scholar__get_paper` 호출 후 반드시 1초 이상 대기
- 429 오류 발생 시 10초 대기 후 재시도

### PDF 접근 불가 논문
- 대부분의 유료 저널 논문은 `openAccessPdf` 가 null
- arXiv, PubMed Central, Frontiers, PLOS 등 오픈 액세스 논문만 다운로드 가능
- Unpaywall 또는 논문 자체 URL(arxiv.org/pdf/...) 이 본문에 직접 있으면 그것을 우선 사용

### 파일 크기 확인
```bash
ls -lh public/papers/*.pdf
```
1KB 미만 파일은 다운로드 실패(HTML 오류 페이지) 가능성 있음 — 삭제 후 재시도

---

## 적용 예시

사용자: "review0316.md 논문들 PDF 다운받아줘"

1. `grep` 으로 review0316.md 에서 paper ID 목록 추출
2. 각 ID에 `get_paper` 호출 (순차, 1초 간격)
3. `openAccessPdf.url` 있는 것만 `curl` 다운로드 → `public/papers/`
4. 결과 보고 (성공/없음/실패 구분)
