# Fashion Trend Scraping Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 4개 패션 사이트(elle.co.kr, vogue.co.kr, cosmopolitan.co.kr, eyesmag.com)의 최신 트렌드 기사와 이미지를 긁어와 `public/fashion/`에 저장한다.

**Architecture:** `firecrawl_scrape`로 각 사이트의 패션 섹션을 스크래핑 → 기사 메타데이터(제목, 요약, 이미지 URL) 추출 → 이미지를 `public/fashion/images/`에 다운로드 → 날짜별 통합 마크다운 파일 생성.

**Tech Stack:** firecrawl MCP (firecrawl_scrape), Node.js/bash for image download, markdown output

---

## Chunk 1: 디렉터리 준비 및 각 사이트 스크래핑

### Task 1: public/fashion 디렉터리 구조 준비

**Files:**
- Create: `public/fashion/images/` (directory)
- Create: `public/fashion/2026-03-17-fashion-trends.md`

- [ ] **Step 1: 이미지 저장 디렉터리 생성**

```bash
mkdir -p public/fashion/images
```

- [ ] **Step 2: elle.co.kr 패션 섹션 스크래핑**

`firecrawl_scrape`로 `https://www.elle.co.kr/fashion` 스크래핑.
- formats: ["markdown", "links"]
- onlyMainContent: true
- 기사 제목, 요약, 이미지 URL 추출 (최대 15개)

- [ ] **Step 3: vogue.co.kr 패션 섹션 스크래핑**

`firecrawl_scrape`로 `https://www.vogue.co.kr/fashion` 스크래핑.
- 동일 설정 적용

- [ ] **Step 4: cosmopolitan.co.kr 패션 섹션 스크래핑**

`firecrawl_scrape`로 `https://www.cosmopolitan.co.kr/fashion` 스크래핑.
- 동일 설정 적용

- [ ] **Step 5: eyesmag.com 패션 섹션 스크래핑**

`firecrawl_scrape`로 `https://www.eyesmag.com/posts/category/fashion` 스크래핑.
- 동일 설정 적용

---

## Chunk 2: 이미지 다운로드 및 마크다운 생성

### Task 2: 이미지 다운로드

**Files:**
- Write to: `public/fashion/images/elle_01.jpg` ~ `elle_15.jpg`
- Write to: `public/fashion/images/vogue_01.jpg` ~ `vogue_15.jpg`
- Write to: `public/fashion/images/cosmo_01.jpg` ~ `cosmo_15.jpg`
- Write to: `public/fashion/images/eyesmag_01.jpg` ~ `eyesmag_15.jpg`

- [ ] **Step 1: 스크래핑 결과에서 이미지 URL 추출**

각 사이트 스크래핑 결과 마크다운에서 `![]()` 패턴으로 이미지 URL 수집.

- [ ] **Step 2: 이미지 다운로드 (elle)**

```bash
# 각 이미지 URL을 순서대로 다운로드
curl -L -o public/fashion/images/elle_01.jpg "<url>"
# ... 최대 15개
```

- [ ] **Step 3: 이미지 다운로드 (vogue, cosmo, eyesmag)**

동일 방식으로 각 사이트 이미지 다운로드.

- [ ] **Step 4: 손상된 이미지 확인**

```bash
file public/fashion/images/*.jpg | grep -v "JPEG\|image"
```
JPEG가 아닌 파일은 제거.

### Task 3: 통합 마크다운 파일 생성

**Files:**
- Create: `public/fashion/2026-03-17-fashion-trends.md`

- [ ] **Step 1: 마크다운 파일 작성**

아래 구조로 `public/fashion/2026-03-17-fashion-trends.md` 작성:

```markdown
# 2026-03-17 패션 트렌드

> 출처: Elle Korea, Vogue Korea, Cosmopolitan Korea, Eyesmag

---

## Elle Korea

### [기사 제목](원문 URL)
![](./images/elle_01.jpg)
> 요약 텍스트

---

## Vogue Korea
...

## Cosmopolitan Korea
...

## Eyesmag
...
```

- [ ] **Step 2: 이미지 경로 검증**

마크다운에서 참조하는 이미지 파일이 실제로 존재하는지 확인.

```bash
# 마크다운에서 이미지 경로 추출하여 존재 여부 확인
grep -o 'images/[^)]*' public/fashion/2026-03-17-fashion-trends.md | xargs -I{} test -f public/fashion/{} && echo "OK" || echo "MISSING"
```

---

## 완료 기준

- [ ] `public/fashion/images/` 에 각 사이트별 이미지 저장 (총 40~60장)
- [ ] `public/fashion/2026-03-17-fashion-trends.md` 생성
- [ ] 마크다운 내 이미지 링크가 실제 파일을 가리킴
- [ ] 각 사이트별 최소 5개 이상의 기사 포함
