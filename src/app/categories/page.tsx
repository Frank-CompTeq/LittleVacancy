import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/shared';
import { categories } from '@/lib/config';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Browse by Category',
  description: 'Explore weekend getaways and short trips by category. Find family escapes, couples retreats, long weekends, and more.',
  openGraph: {
    title: `Browse by Category | ${siteConfig.name}`,
    description: 'Explore weekend getaways and short trips by category.',
  },
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        title="Browse by Category"
        description="Find the perfect getaway based on what you're looking for. From quick weekend escapes to romantic couples retreats."
        badge="Explore"
      />

      <section className="section">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group"
              >
                <article className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 h-full">
                  <span className="text-5xl block mb-4">{category.icon}</span>
                  <h2 className="font-display text-2xl font-bold text-primary group-hover:text-accent transition-colors mb-3">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <span className="text-accent font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Browse guides
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
