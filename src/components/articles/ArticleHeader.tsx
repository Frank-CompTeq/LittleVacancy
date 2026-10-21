import Image from 'next/image';
import { Article } from '@/types';
import { Badge } from '@/components/ui';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const {
    title,
    excerpt,
    featuredImage,
    featuredImageAlt,
    category,
    destination,
    duration,
    readTime,
    audience,
    publishedAt,
    author,
  } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="relative">
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src={featuredImage}
          alt={featuredImageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container mx-auto px-4 md:px-8 pb-8 md:pb-12">
          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="accent">{category.name}</Badge>
              <Badge variant="secondary">{destination.name}</Badge>
              {audience === 'family' && <Badge variant="secondary">Family-Friendly</Badge>}
              {audience === 'couples' && <Badge variant="secondary">Couples</Badge>}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h1>

            {/* Excerpt */}
            <p className="text-gray-200 text-lg md:text-xl mb-6 max-w-2xl">
              {excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-300">
              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary font-semibold">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span>{author.name}</span>
              </div>

              <span className="hidden md:inline">•</span>

              {/* Date */}
              <span>{formattedDate}</span>

              <span className="hidden md:inline">•</span>

              {/* Duration */}
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {duration}
              </span>

              {/* Read Time */}
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
