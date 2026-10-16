export interface MetaTagData {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  siteName: string;
  twitterCard: 'summary_large_image' | 'summary';
  themeColor: string;
  ogType: 'website' | 'article' | 'product' | 'profile';
  author: string;
  keywords: string;
  robots: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow';
  locale: string;
  favicon: string;
}

export type PlatformId =
  | 'all'
  | 'google'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'discord'
  | 'slack'
  | 'whatsapp'
  | 'pinterest';

export interface PresetItem {
  id: string;
  name: string;
  category: string;
  data: MetaTagData;
}

export interface SeoCheck {
  id: string;
  title: string;
  status: 'good' | 'warning' | 'error';
  message: string;
  recommendation: string;
}
