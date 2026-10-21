import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { Badge } from '@/components/ui';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'horizontal';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const { slug, title, excerpt, featuredImage, featuredImageAlt, category, duration, readTime, audience } = article;

  if (variant === 'featured') {
    return (
      <Link href={`/${slug}`} className="group block">
        <article className="relative overflow-hidden rounded-2xl aspect-[16/10] md:aspect-[16/9]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={featuredImage}
              alt={featuredImageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <div className="flex gap-2 mb-3">
              <Badge variant="accent">{category.name}</Badge>
              {audience === 'family' && <Badge variant="secondary">Family</Badge>}
              {audience === 'couples' && <Badge variant="secondary">Couples</Badge>}
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-accent-light transition-colors">
              {title}
            </h2>
            <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
              {excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duration}
              </span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={`/${slug}`} className="group block">
        <article className="flex gap-4 md:gap-6">
          {/* Image */}
          <div className="relative w-32 md:w-48 flex-shrink-0 aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={featuredImage}
              alt={featuredImageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 128px, 192px"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="mb-2 w-fit">{category.name}</Badge>
            <h3 className="font-display text-lg md:text-xl font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-1">
              {title}
            </h3>
            <p className="text-gray-700 text-sm line-clamp-2 hidden md:block mb-2">
              {excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span>{duration}</span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default vertical card
  return (
    <Link href={`/${slug}`} className="group block">
      <article className="card h-full">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={featuredImage}
            alt={featuredImageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="accent">{category.name}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-xl font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-gray-700 text-sm line-clamp-2 mb-4">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration}
            </span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
