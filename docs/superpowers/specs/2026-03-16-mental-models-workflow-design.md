# Mental Models Workflow Design
**Date:** 2026-03-16
**Status:** Approved
**Type:** Claude Code Conversational Workflow (no new code)

---

## Overview

A semi-automated workflow that lets the user input a research topic, select relevant papers from semantic-scholar search results, and receive both a structured markdown document and a React card component presenting the 5 key mental models shared by experts in that field.

---

## Workflow Steps

### 1. SEARCH
- Use semantic-scholar MCP (`search_papers`) to query the topic
- Retrieve 10–15 top results ranked by citation count and relevance
- Present results as a numbered list: title, authors, year, citation count, 1-sentence abstract summary

### 2. SELECT
- User selects papers by number (e.g., "1, 3, 5, 7")
- Minimum recommended: 5 papers for meaningful pattern extraction
- Claude fetches full details (`get_paper`) for selected papers

### 3. FETCH
- Retrieve abstracts and conclusions for each selected paper via semantic-scholar MCP
- If abstract is unavailable, use available metadata

### 4. ANALYZE
- Pass all collected abstracts/conclusions to Claude (in-context, no external API call needed)
- Analysis prompt extracts 5 mental models — each defined as a cognitive frame experts use to approach problems in the field (not just facts)
- Each mental model structured as:
  1. **Name/Label** — short, memorable identifier
  2. **Core Claim** — 1–2 sentences describing the expert belief
  3. **Supporting Papers** — citations from selected set
  4. **Practical Application** — how this mental model changes decisions or behavior

### 5. WRITE
- Save output to `src/papers/MMDD-<topic-slug>-mental-models.md`
- Document structure:
  ```
  # [Topic] 분야 전문가의 5가지 핵심 멘탈 모델
  > 분석 기반 논문: N편 | 날짜 | semantic-scholar + Claude 분석

  ## 개요
  ## 멘탈 모델 1–5 (각: 이름, 핵심 주장, 근거 논문, 실무 적용)
  ## 분석된 논문 목록 (표 형식)
  ```

### 6. CARDS
- Invoke `paper-review-cards` skill with the generated markdown
- Produces 10-card interactive React component in `src/components/`
- Follows existing `PaperReviewCards.tsx` pattern and themes

---

## Implementation Notes

- **No new code required** — uses existing semantic-scholar MCP + paper-review-cards skill
- **Rate limiting** — semantic-scholar MCP allows max 1 request/second; Claude must add delays between calls
- **Language** — output documents and cards in Korean (matching existing `review0305.md` style)
- **Semantic scholar memory** — per saved feedback, respect 1 req/sec limit

---

## Success Criteria

1. User inputs a topic and receives a numbered paper list within one turn
2. After selection, markdown document is saved to `src/papers/`
3. React card component is generated and integrated into the app
4. 5 mental models are distinct cognitive frames, not redundant summaries
5. Each model cites at least one paper from the selected set
