import { MetadataRoute } from 'next';
import { getAllArticles, getAllCategories, getAllDestinations, getAllHubCities } from '@/lib/content';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://littlevacancy.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const categories = getAllCategories();
  const destinations = getAllDestinations();
  const hubCities = getAllHubCities();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/from`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/${article.slug}`,
    lastModified: new Date(article.updatedAt || article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Destination pages
  const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: `${baseUrl}/destination/${destination.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Hub city pages (from)
  const hubCityPages: MetadataRoute.Sitemap = hubCities.map((city) => ({
    url: `${baseUrl}/from/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...articlePages,
    ...categoryPages,
    ...destinationPages,
    ...hubCityPages,
  ];
}
