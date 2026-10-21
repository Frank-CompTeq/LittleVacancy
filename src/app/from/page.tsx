import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHeader } from '@/components/shared';
import { getAllHubCities } from '@/lib/content';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Find Getaways From Your City',
  description: 'Discover weekend getaways and short trips from major cities across North America. Find the perfect escape within driving distance.',
  openGraph: {
    title: `Find Getaways From Your City | ${siteConfig.name}`,
    description: 'Discover weekend getaways from major cities across North America.',
  },
};

export default function FromPage() {
  const hubCities = getAllHubCities();

  return (
    <>
      <PageHeader
        title="Find Getaways From Your City"
        description="Select your city to discover weekend trips and short getaways within driving distance. All destinations perfect for 2-4 day escapes."
        badge="Where are you?"
      />

      <section className="section">
        <div className="container mx-auto px-4 md:px-8">
          {/* Featured Cities */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubCities.map((city) => (
              <Link
                key={city.slug}
                href={`/from/${city.slug}`}
                className="group"
              >
                <article className="relative aspect-[16/9] rounded-xl overflow-hidden">
                  {city.featuredImage ? (
                    <Image
                      src={city.featuredImage}
                      alt={city.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h2 className="font-display text-2xl font-bold text-white group-hover:text-accent-light transition-colors">
                      {city.name}
                    </h2>
                    <p className="text-gray-300">
                      {city.state}, {city.country}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {city.nearbyDestinations?.length || 0} nearby destinations
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Don't see your city? We're adding more locations every week.
            </p>
            <Link href="/newsletter" className="btn btn-outline">
              Get Notified When We Add More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
