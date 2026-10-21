import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageHeader } from '@/components/shared';
import { ArticleGrid } from '@/components/articles';
import { getAllCategories, getCategoryBySlug, getArticlesByCategory } from '@/lib/content';
import { siteConfig } from '@/lib/config';

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for each category
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const title = `${category.name} | ${siteConfig.name}`;
  const description = category.description || `Discover the best ${category.name.toLowerCase()} across North America.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = getArticlesByCategory(slug);

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description || ''}
        badge={`${category.icon || '📍'} Category`}
      />

      <section className="section">
        <div className="container mx-auto px-4 md:px-8">
          {categoryArticles.length > 0 ? (
            <>
              <p className="text-gray-600 mb-8">
                {categoryArticles.length} {categoryArticles.length === 1 ? 'guide' : 'guides'} available
              </p>
              <ArticleGrid articles={categoryArticles} columns={3} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No guides in this category yet.
              </p>
              <p className="text-gray-400">
                Check back soon or explore our other categories.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
