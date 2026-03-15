# Mental Models Workflow Design
**Date:** 2026-03-16
**Status:** In Review
**Type:** Claude Code Conversational Workflow (no new code)

---

## Overview

A semi-automated workflow that lets the user input a research topic, select relevant papers from semantic-scholar search results, and receive both a structured markdown document and a React card component presenting the 5 key mental models shared by experts in that field.

---

## Workflow Steps

### 1. SEARCH
- Use semantic-scholar MCP (`search_papers`) to query the topic
- Retrieve 10–15 top results by relevance (default MCP sort); after fetching, Claude sorts in-context by citation count for the displayed list
- Present results as a numbered list: title, authors, year, citation count, 1-sentence abstract summary

### 2. SELECT + FETCH (combined)
- User selects papers by number (e.g., "1, 3, 5, 7")
- Minimum recommended: 5 papers for meaningful pattern extraction
- Claude calls `get_paper` for each selected paper (1 req/sec rate limit) — this returns title, authors, year, citation count, and abstract
- Note: only abstracts and metadata are available via MCP, not full-text conclusions; analysis is based solely on abstracts

### 3. ANALYZE
- Pass all collected abstracts to Claude in-context (no external API call needed)
- Analysis prompt extracts 5 mental models — each defined as a cognitive frame experts use to approach problems in the field (not just facts)
- Each mental model structured as:
  1. **Name/Label** — short English phrase with Korean subtitle (e.g., "Trust Calibration — 신뢰 보정"), following review0305.md naming convention
  2. **Core Claim** — 1–2 sentences describing the expert belief (Korean)
  3. **Supporting Papers** — citations from selected set
  4. **Practical Application** — how this mental model changes decisions or behavior (Korean)
- **Fallback:** if the selected papers genuinely support fewer than 5 distinct frames (e.g., narrow topic, highly overlapping content), Claude documents the number actually supported rather than padding. Claude should prompt the user to add more papers if fewer than 4 distinct frames emerge.

### 4. WRITE
- Save output to `src/papers/MMDD-<topic-slug>-mental-models.md`
- Document structure:
  ```
  # [Topic] 분야 전문가의 5가지 핵심 멘탈 모델
  > 분석 기반 논문: N편 | 날짜 | semantic-scholar + Claude 분석

  ## 개요
  [이 분야의 맥락과 분석 논문 개요 2~3문장]

  ## 멘탈 모델 1–5
  각: ### [English Label — 한국어 부제]
      **핵심 주장:** ...
      **근거 논문:** Author et al. (year)
      **실무 적용:** ...

  ## 분석된 논문 목록
  | 제목 | 저자 | 연도 | 인용수 |
  ```

### 5. CARDS
- The `paper-review-cards` skill uses a single-paper deep-dive template (cover, TL;DR, background, method, experiment, results, limitations, insight, closing) that is structurally incompatible with a 5-mental-model synthesis document.
- **Therefore, Step 5 is a guided manual card generation**, not a direct skill invocation:
  - Claude reads the generated markdown and manually authors 10 card objects in `CardData[]` format matching the existing `PaperReviewCards.tsx` schema
  - Card mapping for mental models format:
    - Card 1: Cover (topic title, paper count, date)
    - Card 2: TL;DR (most surprising or counterintuitive mental model)
    - Cards 3–7: One card per mental model (type: 'highlight' or 'insight')
    - Card 8: Cross-cutting theme or tension between models
    - Card 9: Practical implications summary
    - Card 10: Closing / further reading
  - Output saved as `src/components/<TopicSlug>MentalModelsCards.tsx` (topic-specific filename to avoid overwriting previous components)
  - Component uses the same THEMES array and CardData type from the existing file; the canonical schema source is `src/components/PaperReviewCards.tsx`, not the skill definition file

---

## Integration

After card component is generated, the user manually imports it into `App.tsx` or wherever appropriate. The spec does not automate this step.

---

## Implementation Notes

- **No new code required for steps 1–4** — uses semantic-scholar MCP
- **Step 5 produces a new TSX file** following existing component patterns
- **Rate limiting** — semantic-scholar MCP: max 1 req/sec; Claude must add delays between `get_paper` calls
- **Language convention** — mental model names: English label + Korean subtitle; body text in Korean; matches review0305.md style

---

## Success Criteria

1. User inputs a topic and receives a numbered paper list within one turn
2. After selection, markdown document is saved to `src/papers/MMDD-<topic-slug>-mental-models.md`
3. React card component is generated as `src/components/<TopicSlug>MentalModelsCards.tsx`
4. 5 mental models are distinct cognitive frames, each citing at least one selected paper
5. If fewer than 4 distinct frames are supported, Claude notifies the user and requests more paper selections
