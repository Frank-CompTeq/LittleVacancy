import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Article, Category, Destination, HubCity, Author } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

// Generic function to get all items from a content directory
function getContentFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((file) =>
    file.endsWith('.mdx') || file.endsWith('.md') || file.endsWith('.json')
  );
}

// Parse frontmatter from MDX file
function parseContentFile<T>(dir: string, filename: string): T & { content?: string; slug: string } {
  const fullPath = path.join(contentDirectory, dir, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  if (filename.endsWith('.json')) {
    const data = JSON.parse(fileContents);
    return {
      ...data,
      slug: filename.replace('.json', ''),
    };
  }

  const { data, content } = matter(fileContents);
  const slug = filename.replace(/\.mdx?$/, '');

  return {
    ...data,
    content,
    slug,
  } as T & { content?: string; slug: string };
}

// ============================================
// Categories
// ============================================
export function getAllCategories(): Category[] {
  const files = getContentFiles('categories');
  return files.map((file) => parseContentFile<Category>('categories', file));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getAllCategories();
  return categories.find((cat) => cat.slug === slug);
}

// ============================================
// Destinations
// ============================================
export function getAllDestinations(): Destination[] {
  const files = getContentFiles('destinations');
  return files.map((file) => parseContentFile<Destination>('destinations', file));
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  const destinations = getAllDestinations();
  return destinations.find((dest) => dest.slug === slug);
}

// ============================================
// Hub Cities
// ============================================
export function getAllHubCities(): HubCity[] {
  const files = getContentFiles('hub-cities');
  return files.map((file) => parseContentFile<HubCity>('hub-cities', file));
}

export function getHubCityBySlug(slug: string): HubCity | undefined {
  const hubCities = getAllHubCities();
  return hubCities.find((city) => city.slug === slug);
}

// ============================================
// Authors
// ============================================
export function getAllAuthors(): Author[] {
  const files = getContentFiles('authors');
  return files.map((file) => parseContentFile<Author>('authors', file));
}

export function getAuthorBySlug(slug: string): Author | undefined {
  const authors = getAllAuthors();
  return authors.find((author) => author.slug === slug);
}

// ============================================
// Articles
// ============================================
interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  categorySlug: string;
  destinationSlug: string;
  authorSlug: string;
  audience: 'family' | 'couples' | 'both';
  duration: string;
  publishedAt: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  faqs?: { question: string; answer: string }[];
}

export function getAllArticles(): Article[] {
  const files = getContentFiles('articles');
  const categories = getAllCategories();
  const destinations = getAllDestinations();
  const authors = getAllAuthors();

  return files.map((file) => {
    const data = parseContentFile<ArticleFrontmatter>('articles', file);
    const category = categories.find((c) => c.slug === data.categorySlug);
    const destination = destinations.find((d) => d.slug === data.destinationSlug);
    const author = authors.find((a) => a.slug === data.authorSlug);

    const stats = readingTime(data.content || '');

    return {
      id: data.slug,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content || '',
      featuredImage: data.featuredImage,
      featuredImageAlt: data.featuredImageAlt || data.title,
      category: category || { id: '', name: 'Uncategorized', slug: 'uncategorized', description: '' },
      destination: destination || { id: '', name: 'Unknown', slug: 'unknown', region: '', country: '', description: '' },
      author: author || { id: '', name: 'LittleVacancy Team', slug: 'team', bio: '' },
      audience: data.audience,
      duration: data.duration,
      readTime: Math.ceil(stats.minutes),
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.excerpt,
      tags: data.tags || [],
      faqs: data.faqs || [],
    };
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles();
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => article.category.slug === categorySlug);
}

export function getArticlesByDestination(destinationSlug: string): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => article.destination.slug === destinationSlug);
}

export function getArticlesByAudience(audience: 'family' | 'couples'): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) =>
    article.audience === audience || article.audience === 'both'
  );
}

export function getFeaturedArticles(limit: number = 3): Article[] {
  return getAllArticles().slice(0, limit);
}
