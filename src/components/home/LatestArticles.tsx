import Link from 'next/link';
import { Article } from '@/types';
import { ArticleGrid } from '@/components/articles';

interface LatestArticlesProps {
  articles: Article[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  variant?: 'default' | 'featured';
}

export function LatestArticles({
  articles,
  title = 'Latest Guides',
  subtitle = 'Fresh Inspiration',
  viewAllLink = '/articles',
  variant = 'default',
}: LatestArticlesProps) {
  return (
    <section className="section bg-secondary-light">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              {subtitle}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              {title}
            </h2>
          </div>
          <Link
            href={viewAllLink}
            className="text-accent hover:text-accent-dark font-semibold mt-4 md:mt-0 inline-flex items-center gap-2 group"
          >
            View all guides
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Articles Grid */}
        <ArticleGrid articles={articles} variant={variant} />
      </div>
    </section>
  );
}
