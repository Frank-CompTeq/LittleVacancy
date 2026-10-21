import { Article } from '@/types';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'featured';
}

export function ArticleGrid({ articles, columns = 3, variant = 'default' }: ArticleGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (variant === 'featured' && articles.length >= 3) {
    // Featured layout: 1 large + 2 small side by side
    const [featured, ...rest] = articles;

    return (
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Featured Article */}
        <div className="lg:row-span-2">
          <ArticleCard article={featured} variant="featured" />
        </div>

        {/* Secondary Articles */}
        <div className="grid gap-6">
          {rest.slice(0, 2).map((article) => (
            <ArticleCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
