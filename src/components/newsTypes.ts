// src/components/newsTypes.ts

export type DummyPost = {
  id: string;
  category: string;
  title: string;
  dek: string;
  date: string;
  badge?: string;
  slug?: string;
  thumb?: string;
};

export type TopicPostItem = {
  id: number | string;
  slug?: string;
  title: string;
  dek?: string;
  category?: string;
  date?: string;
  thumb?: string;
};

export type TopicBlock = {
  key: string;
  title: string;
  moreHref?: string;
  items: Array<{
    id: number | string;
    slug?: string;
    title: string;
    dek?: string;
    category?: string;
    date?: string;
    thumb?: string;
  }>;
};

export type DailyTweetItem = {
  id: string | number;
  title: string;
  text: string;      // 요약 텍스트(HTML 제거된 것이 이상적)
  date?: string;     // "2026-01-02"
  slug?: string;
  thumb?: string;    // 이미지 URL (절대/상대 모두 가능)
};

export interface PostFromDB {
  id: number;
  slug: string;
  badge: string;
  category: string;
  date: string;
  title: string;
  dek: string;
  image?: string;
  hits?: number;
}

export type FeaturedConfig = {
  lead_id: string;
  pick_ids: string;
};
