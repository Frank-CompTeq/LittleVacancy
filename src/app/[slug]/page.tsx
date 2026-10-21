import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleHeader, ShareButtons } from '@/components/articles';
import { ArticleJsonLd, TravelGuideJsonLd, FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo';
import { getAllArticles, getArticleBySlug } from '@/lib/content';
import { siteConfig } from '@/lib/config';
import { MDXContent } from '@/components/mdx';

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.featuredImage],
    },
  };
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `${siteConfig.url}/${article.slug}`;

  // Breadcrumb items for JSON-LD
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: article.category.name, url: `/category/${article.category.slug}` },
    { name: article.destination.name, url: `/destination/${article.destination.slug}` },
    { name: article.title, url: `/${article.slug}` },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <ArticleJsonLd article={article} />
      <TravelGuideJsonLd article={article} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      {article.faqs && article.faqs.length > 0 && <FAQJsonLd faqs={article.faqs} />}

      <article>
        {/* Article Header with Hero Image */}
        <ArticleHeader article={article} />

        {/* Article Content */}
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 max-w-5xl mx-auto">
            {/* Main Content */}
            <div>
              {/* Share Buttons */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <ShareButtons title={article.title} url={articleUrl} />
              </div>

              {/* Article Body - MDX Content */}
              <div className="prose">
                <MDXContent content={article.content} />
              </div>

              {/* FAQs Section */}
              {article.faqs && article.faqs.length > 0 && (
                <section className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="font-display text-2xl font-bold text-primary mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {article.faqs.map((faq, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Author Box */}
              <div className="mt-12 p-6 bg-secondary-light rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary font-display font-bold text-xl">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-primary">{article.author.name}</p>
                    <p className="text-gray-600 text-sm mt-1">{article.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Newsletter CTA */}
                <div className="bg-primary rounded-xl p-6 text-white">
                  <p className="font-display font-semibold mb-2">Get More Tips</p>
                  <p className="text-sm text-gray-300 mb-4">
                    Join our newsletter for exclusive getaway ideas.
                  </p>
                  <a
                    href="/newsletter"
                    className="btn btn-accent w-full text-center"
                  >
                    Subscribe
                  </a>
                </div>

                {/* Related Destination */}
                <div className="bg-secondary-light rounded-xl p-6">
                  <p className="font-display font-semibold text-primary mb-4">
                    Explore {article.destination.name}
                  </p>
                  <a
                    href={`/destination/${article.destination.slug}`}
                    className="text-accent hover:underline text-sm"
                  >
                    View all {article.destination.name} guides →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
