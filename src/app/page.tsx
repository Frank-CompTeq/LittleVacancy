import {
  Hero,
  FeaturedDestinations,
  LatestArticles,
  CategoriesSection,
  NewsletterSection,
} from '@/components/home';
import { getAllArticles, getAllDestinations, getAllHubCities } from '@/lib/content';

export default function Home() {
  const articles = getAllArticles();
  const destinations = getAllDestinations();
  const hubCities = getAllHubCities();

  return (
    <>
      {/* Hero Section with Search */}
      <Hero hubCities={hubCities} />

      {/* Featured Destinations */}
      <FeaturedDestinations destinations={destinations} />

      {/* Latest Articles - Featured Layout */}
      <LatestArticles
        articles={articles.slice(0, 3)}
        title="Latest Guides"
        subtitle="Fresh Inspiration"
        variant="featured"
      />

      {/* Categories Section */}
      <CategoriesSection />

      {/* More Articles */}
      {articles.length > 3 && (
        <LatestArticles
          articles={articles.slice(3)}
          title="More Getaway Ideas"
          subtitle="Keep Exploring"
          viewAllLink="/articles"
        />
      )}

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
