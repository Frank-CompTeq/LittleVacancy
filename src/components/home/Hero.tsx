'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import type { HubCity } from '@/types';

interface HeroProps {
  hubCities?: HubCity[];
}

export function Hero({ hubCities = [] }: HeroProps) {
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <section className="relative min-h-[80vh] flex items-center bg-secondary-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-accent font-semibold text-sm md:text-base uppercase tracking-wider mb-4 animate-fade-in-up">
            Weekend Getaways & Short Trips
          </p>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Discover Your Next <br />
            <span className="text-accent">Little Escape</span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Expert guides for families and couples seeking memorable 2-4 day getaways across North America. Plan less, explore more.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="font-semibold text-primary mb-4">Find getaways from your city:</p>

            <div className="flex flex-col md:flex-row gap-4">
              {/* City Selector */}
              <div className="flex-1">
                <label htmlFor="hub-city" className="sr-only">Your city</label>
                <select
                  id="hub-city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                >
                  <option value="">Select your departure city...</option>
                  {hubCities.map((city) => (
                    <option key={city.slug} value={city.slug}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Audience Filter */}
              <div className="flex gap-2">
                <button className="px-4 py-3 rounded-lg border border-gray-200 hover:border-accent hover:bg-accent/5 transition-all flex items-center gap-2 text-gray-600 hover:text-accent">
                  <span>👨‍👩‍👧‍👦</span>
                  <span className="hidden sm:inline">Families</span>
                </button>
                <button className="px-4 py-3 rounded-lg border border-gray-200 hover:border-accent hover:bg-accent/5 transition-all flex items-center gap-2 text-gray-600 hover:text-accent">
                  <span>💑</span>
                  <span className="hidden sm:inline">Couples</span>
                </button>
              </div>

              {/* Search Button */}
              <Button
                variant="accent"
                size="lg"
                href={selectedCity ? `/from/${selectedCity}` : '/destinations'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden md:inline">Find Getaways</span>
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>100+ Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>2-4 Day Trips</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Family & Couples</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Image (Desktop) */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[70%]">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-light via-transparent to-transparent z-10" />
          <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
              alt="Travel destination"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
