import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/shared';
import { getAllDestinations, getArticlesByDestination } from '@/lib/content';
import { siteConfig } from '@/lib/config';
import type { Destination } from '@/types';

export const metadata: Metadata = {
  title: 'All Destinations',
  description: 'Explore weekend getaway destinations across North America. From coastal towns to mountain retreats, find your perfect escape.',
  openGraph: {
    title: `All Destinations | ${siteConfig.name}`,
    description: 'Explore weekend getaway destinations across North America.',
  },
};

// Group destinations by region
function groupByRegion(destinations: Destination[]) {
  return destinations.reduce((acc, destination) => {
    const region = destination.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(destination);
    return acc;
  }, {} as Record<string, Destination[]>);
}

export default function DestinationsPage() {
  const destinations = getAllDestinations();
  const groupedDestinations = groupByRegion(destinations);
  const regions = Object.keys(groupedDestinations).sort();

  return (
    <>
      <PageHeader
        title="All Destinations"
        description="Discover amazing weekend getaway spots across North America. Browse by region or search for your next adventure."
        badge="Explore"
      />

      <section className="section">
        <div className="container mx-auto px-4 md:px-8">
          {/* Region Navigation */}
          <div className="flex flex-wrap gap-3 mb-12">
            {regions.map((region) => (
              <a
                key={region}
                href={`#${region.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-secondary rounded-full text-primary font-medium hover:bg-accent hover:text-white transition-colors"
              >
                {region}
              </a>
            ))}
          </div>

          {/* Destinations by Region */}
          {regions.map((region) => (
            <div key={region} id={region.toLowerCase().replace(/\s+/g, '-')} className="mb-16 last:mb-0">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
                {region}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {groupedDestinations[region].map((destination) => {
                  const articleCount = getArticlesByDestination(destination.slug).length;

                  return (
                    <Link
                      key={destination.slug}
                      href={`/destination/${destination.slug}`}
                      className="group"
                    >
                      <article className="relative aspect-[4/5] rounded-xl overflow-hidden">
                        {destination.featuredImage && (
                          <Image
                            src={destination.featuredImage}
                            alt={destination.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <h3 className="font-display text-lg md:text-xl font-semibold text-white group-hover:text-accent-light transition-colors">
                            {destination.name}
                          </h3>
                          <p className="text-gray-300 text-sm line-clamp-1">
                            {destination.description}
                          </p>
                          {articleCount > 0 && (
                            <p className="text-gray-400 text-xs mt-1">
                              {articleCount} {articleCount === 1 ? 'guide' : 'guides'}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
