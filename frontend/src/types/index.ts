export interface Topic {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_trending: boolean;
  followers_count: number;
  industry_id: number;
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  topics?: Topic[];
}

export interface IntelligenceDevelopment {
  id: number;
  title: string;
  summary: string;
  why_it_matters: string;
  implications?: string;
  industry_id: number;
  industry_name?: string;
  topic_id?: number;
  topic_name?: string;
  source_name: string;
  source_url: string;
  published_at: string;
  importance_score: number;
  relevance_score: number;
  sentiment: 'bullish' | 'bearish' | 'neutral' | 'disrupt' | string;
  status: 'emerging' | 'verified' | 'critical' | string;
  created_at: string;
}

export interface Briefing {
  id: number;
  title: string;
  type: 'daily' | 'weekly';
  period_label: string;
  executive_summary: string;
  key_takeaways?: string;
  created_at: string;
  developments_count?: number;
}

export interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  role_title: string;
  expertise_level: string;
  learning_goals: string;
  briefing_frequency: string;
  followed_industries: Industry[];
  followed_topics: Topic[];
}
