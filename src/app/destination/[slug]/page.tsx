import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageHeader } from '@/components/shared';
import { ArticleGrid } from '@/components/articles';
import { getAllDestinations, getDestinationBySlug, getArticlesByDestination } from '@/lib/content';
import { siteConfig } from '@/lib/config';

// Generate static params for all destinations
export async function generateStaticParams() {
  const destinations = getAllDestinations();
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

// Generate metadata for each destination
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  const title = `${destination.name} Weekend Getaways | ${siteConfig.name}`;
  const description = `Plan your perfect weekend trip to ${destination.name}. ${destination.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: destination.featuredImage ? [
        {
          url: destination.featuredImage,
          width: 1200,
          height: 630,
          alt: destination.name,
        },
      ] : undefined,
    },
  };
}

export default async function DestinationPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const destinationArticles = getArticlesByDestination(slug);

  return (
    <>
      <PageHeader
        title={destination.name}
        description={destination.description}
        image={destination.featuredImage}
        imageAlt={destination.name}
        badge={destination.region}
      />

      <section className="section">
        <div className="container mx-auto px-4 md:px-8">
          {/* Quick Facts */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-secondary-light rounded-xl p-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Region</p>
              <p className="font-display font-semibold text-primary text-lg">{destination.region}</p>
            </div>
            <div className="bg-secondary-light rounded-xl p-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Country</p>
              <p className="font-display font-semibold text-primary text-lg">{destination.country}</p>
            </div>
            <div className="bg-secondary-light rounded-xl p-6">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Guides Available</p>
              <p className="font-display font-semibold text-primary text-lg">
                {destinationArticles.length} {destinationArticles.length === 1 ? 'guide' : 'guides'}
              </p>
            </div>
          </div>

          {/* Articles Section */}
          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-6">
              {destination.name} Travel Guides
            </h2>

            {destinationArticles.length > 0 ? (
              <ArticleGrid articles={destinationArticles} columns={3} />
            ) : (
              <div className="text-center py-12 bg-secondary-light rounded-xl">
                <p className="text-gray-500 text-lg mb-4">
                  No guides for {destination.name} yet.
                </p>
                <p className="text-gray-400">
                  We're working on adding content. Check back soon!
                </p>
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Planning a Trip to {destination.name}?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get our free {destination.name} packing list and insider tips delivered to your inbox.
            </p>
            <a href="/newsletter" className="btn btn-accent">
              Get Free Guide
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
