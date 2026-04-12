import type { DashboardData, Platform, Insights } from './types';

const PLATFORM_MAP: Record<string, { id: string; displayName: string; color: string }> = {
  '무신사': { id: 'musinsa', displayName: 'MUSINSA GLOBAL', color: '#3b82f6' },
  'W컨셉':  { id: 'wconcept', displayName: 'W CONCEPT',      color: '#ec4899' },
  '29CM':   { id: 'twentynine', displayName: '29CM',          color: '#f59e0b' },
};

type SubsectionType = 'keywords' | 'links' | 'brands' | 'brand_keywords' | 'skip';

function classifySubsection(heading: string): SubsectionType {
  if (heading.includes('상품 링크') || heading.includes('이미지 링크')) return 'skip';
  if (heading.includes('브랜드 키워드')) return 'brand_keywords';
  if (heading.includes('브랜드')) return 'brands';
  if (heading.includes('링크') || heading.includes('기사') || heading.includes('콘텐츠')) return 'links';
  return 'keywords';
}

const splitBy = (s: string) =>
  s.split(/[\/,]/).map(k => k.trim()).filter(Boolean);

export function parseDateTxt(text: string): DashboardData {
  const lines = text.split('\n');

  const dateMatch = text.match(/수집일:\s*(\d{4}-\d{2}-\d{2})/);
  const collectionDate = dateMatch?.[1] ?? '';

  const sourceMatch = text.match(/출처:\s*(.+)/);
  const source = sourceMatch?.[1].trim() ?? '';

  const platforms: Platform[] = [];
  const insights: Insights = { coreKeywords: [], styleTrends: [], itemTrends: [], otherIssues: [] };

  let currentPlatform: Platform | null = null;
  let subsectionType: SubsectionType = 'skip';
  let subsectionHeading = '';
  let prevLine = '';
  let inInsights = false;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    // Section separators
    if (trimmed.startsWith('===')) { prevLine = ''; continue; }

    // Platform header  ## [무신사] ...
    if (trimmed.startsWith('## [')) {
      const m = trimmed.match(/\[([^\]]+)\]/);
      if (m) {
        if (currentPlatform) platforms.push(currentPlatform);
        const meta = PLATFORM_MAP[m[1]];
        currentPlatform = {
          id:            meta?.id ?? m[1],
          korName:       m[1],
          displayName:   meta?.displayName ?? m[1],
          color:         meta?.color ?? '#6366f1',
          trendKeywords: [],
          campaignLinks: [],
          brands:        [],
        };
        inInsights = false;
        subsectionType = 'skip';
        prevLine = '';
      }
      continue;
    }

    // Insights section  ## 종합 ...
    if (trimmed.startsWith('## 종합')) {
      if (currentPlatform) { platforms.push(currentPlatform); currentPlatform = null; }
      inInsights = true;
      subsectionHeading = '';
      prevLine = '';
      continue;
    }

    // Subsection header  ### ...
    if (trimmed.startsWith('###')) {
      subsectionHeading = trimmed.replace(/^###\s*/, '');
      subsectionType = classifySubsection(subsectionHeading);
      prevLine = '';
      continue;
    }

    // Empty lines / top-level comments
    if (!trimmed || trimmed.startsWith('#')) {
      if (subsectionType === 'links') prevLine = '';
      continue;
    }

    const isUrl = trimmed.startsWith('http');

    // ── Insights parsing ──────────────────────────────────────────
    if (inInsights) {
      if (subsectionHeading.includes('3월') || subsectionHeading.includes('핵심')) {
        insights.coreKeywords.push(...splitBy(trimmed));
      } else if (subsectionHeading.includes('스타일 코어')) {
        insights.styleTrends.push(...splitBy(trimmed));
      } else if (subsectionHeading.includes('아이템')) {
        insights.itemTrends.push(...splitBy(trimmed));
      } else if (subsectionHeading.includes('기타')) {
        insights.otherIssues.push(trimmed);
      }
      continue;
    }

    if (!currentPlatform) continue;

    // ── Platform data parsing ─────────────────────────────────────
    switch (subsectionType) {
      case 'keywords':
        if (!isUrl) currentPlatform.trendKeywords.push(...splitBy(trimmed));
        break;

      case 'links':
        if (isUrl && prevLine) {
          currentPlatform.campaignLinks.push({ title: prevLine, url: trimmed });
          prevLine = '';
        } else if (!isUrl) {
          prevLine = trimmed;
        }
        break;

      case 'brands':
        if (!isUrl) {
          currentPlatform.brands.push({ name: trimmed });
          prevLine = trimmed;
        } else if (isUrl) {
          const last = currentPlatform.brands.at(-1);
          if (last && last.name === prevLine) last.url = trimmed;
          prevLine = '';
        }
        break;

      case 'brand_keywords':
        if (!isUrl) {
          const names = trimmed.split(',').map(n => n.trim()).filter(Boolean);
          currentPlatform.brands.push(...names.map(name => ({ name })));
        }
        break;

      case 'skip':
      default:
        break;
    }
  }

  if (currentPlatform) platforms.push(currentPlatform);
  return { collectionDate, source, platforms, insights };
}
