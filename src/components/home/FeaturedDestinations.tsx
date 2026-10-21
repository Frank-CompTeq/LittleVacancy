import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/types';

interface FeaturedDestinationsProps {
  destinations: Destination[];
}

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Popular Escapes
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
              Trending Destinations
            </h2>
          </div>
          <Link
            href="/destinations"
            className="text-accent hover:text-accent-dark font-semibold mt-4 md:mt-0 inline-flex items-center gap-2 group"
          >
            View all destinations
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.slice(0, 6).map((destination) => (
            <Link
              key={destination.slug}
              href={`/destination/${destination.slug}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden"
            >
              {/* Background Image */}
              {destination.featuredImage ? (
                <Image
                  src={destination.featuredImage}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h3 className="font-display text-lg font-semibold text-white group-hover:text-accent-light transition-colors">
                  {destination.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {destination.region}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
