import Link from 'next/link';
import { categories } from '@/lib/config';

export function CategoriesSection() {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
            Browse by Type
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            What Kind of Escape?
          </h2>
          <p className="text-gray-600">
            Whether you're planning a quick weekend away or a longer adventure, we have the perfect guide for your trip type.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group"
            >
              <div className="bg-secondary-light rounded-xl p-6 text-center h-full transition-all hover:bg-secondary hover:shadow-lg group-hover:-translate-y-1">
                <span className="text-4xl block mb-4">{category.icon}</span>
                <h3 className="font-display font-semibold text-primary group-hover:text-accent transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
