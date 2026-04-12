export interface CampaignLink {
  title: string;
  url: string;
}

export interface Brand {
  name: string;
  url?: string;
}

export interface Platform {
  id: string;
  korName: string;
  displayName: string;
  color: string;
  trendKeywords: string[];
  campaignLinks: CampaignLink[];
  brands: Brand[];
}

export interface Insights {
  coreKeywords: string[];
  styleTrends: string[];
  itemTrends: string[];
  otherIssues: string[];
}

export interface DashboardData {
  collectionDate: string;
  source: string;
  platforms: Platform[];
  insights: Insights;
}
