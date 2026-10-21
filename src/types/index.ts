// ============================================
// LittleVacancy.com TypeScript Types
// ============================================

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  category: Category;
  destination: Destination;
  audience: 'family' | 'couples' | 'both';
  duration: string; // e.g., "2 days", "3-4 days"
  readTime: number; // minutes
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  faqs?: FAQ[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  country: string;
  description: string;
  featuredImage?: string;
  highlights?: string[];
  bestTimeToVisit?: string;
  averageTripCost?: string;
}

export interface HubCity {
  id: string;
  name: string;
  slug: string;
  state: string;
  country: string;
  description?: string;
  featuredImage?: string;
  nearbyDestinations?: string[];
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar?: string;
  bio?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AffiliateLink {
  id: string;
  type: 'hotel' | 'activity' | 'restaurant' | 'other';
  name: string;
  url: string;
  provider: string; // e.g., "Booking.com", "Viator"
  description?: string;
  price?: string;
  rating?: number;
  image?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    instagram?: string;
    pinterest?: string;
    facebook?: string;
  };
}

// API Response types
export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface SearchFilters {
  category?: string;
  destination?: string;
  audience?: 'family' | 'couples' | 'both';
  hubCity?: string;
  duration?: string;
}
