import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/shared';
import { ArticleGrid } from '@/components/articles';
import { getAllHubCities, getHubCityBySlug, getAllDestinations, getAllArticles } from '@/lib/content';
import { siteConfig } from '@/lib/config';

// Generate static params for all hub cities
export async function generateStaticParams() {
  const hubCities = getAllHubCities();
  return hubCities.map((city) => ({
    slug: city.slug,
  }));
}

// Generate metadata for each hub city
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const hubCity = getHubCityBySlug(slug);

  if (!hubCity) {
    return { title: 'City Not Found' };
  }

  const title = `Weekend Getaways from ${hubCity.name} | ${siteConfig.name}`;
  const description = `Discover the best weekend trips and short getaways from ${hubCity.name}, ${hubCity.state}. Perfect 2-4 day escapes for families and couples.`;

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

export default async function FromCityPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const hubCity = getHubCityBySlug(slug);

  if (!hubCity) {
    notFound();
  }

  // Get all destinations
  const allDestinations = getAllDestinations();

  // Filter to nearby destinations if available, otherwise show all
  const nearbyDestinations = hubCity.nearbyDestinations
    ? allDestinations.filter(d => hubCity.nearbyDestinations?.includes(d.slug))
    : allDestinations.slice(0, 6);

  // Get all articles
  const allArticles = getAllArticles();

  // Filter to articles for nearby destinations
  const relatedArticles = allArticles.filter(article =>
    nearbyDestinations.some(d => d.slug === article.destination.slug)
  ).slice(0, 6);

  return (
    <>
      <PageHeader
        title={`Weekend Getaways from ${hubCity.name}`}
        description={hubCity.description || `Discover perfect short trips and weekend escapes from ${hubCity.name}, ${hubCity.state}. All destinations are within driving distance for a 2-4 day trip.`}
        badge={`From ${hubCity.state}`}
      />

      <section className="section">
        <div className="container mx-auto px-4 md:px-8">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-secondary-light rounded-xl p-6 text-center">
              <p className="font-display text-3xl font-bold text-accent mb-1">
                {nearbyDestinations.length}
              </p>
              <p className="text-gray-600">Destinations</p>
            </div>
            <div className="bg-secondary-light rounded-xl p-6 text-center">
              <p className="font-display text-3xl font-bold text-accent mb-1">
                2-6 hrs
              </p>
              <p className="text-gray-600">Drive Time</p>
            </div>
            <div className="bg-secondary-light rounded-xl p-6 text-center">
              <p className="font-display text-3xl font-bold text-accent mb-1">
                {relatedArticles.length}+
              </p>
              <p className="text-gray-600">Travel Guides</p>
            </div>
          </div>

          {/* Nearby Destinations */}
          <div className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
              Top Destinations from {hubCity.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {nearbyDestinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/destination/${destination.slug}`}
                  className="group"
                >
                  <article className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    {destination.featuredImage && (
                      <Image
                        src={destination.featuredImage}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-accent-light transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {destination.region}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
                Travel Guides for Your Trip
              </h2>
              <ArticleGrid articles={relatedArticles} columns={3} />
            </div>
          )}

          {/* Filter by Type */}
          <div className="bg-secondary-light rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-primary mb-6 text-center">
              What type of trip are you planning?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link
                href={`/from/${hubCity.slug}?audience=family`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
                <div>
                  <p className="font-semibold text-primary">Family Getaway</p>
                  <p className="text-sm text-gray-500">Kid-friendly adventures</p>
                </div>
              </Link>
              <Link
                href={`/from/${hubCity.slug}?audience=couples`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl">💑</span>
                <div>
                  <p className="font-semibold text-primary">Couples Retreat</p>
                  <p className="text-sm text-gray-500">Romantic escapes</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
