import { remark } from 'remark';
import html from 'remark-html';

interface MDXContentProps {
  content: string;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function MDXContent({ content }: MDXContentProps) {
  const htmlContent = await markdownToHtml(content);

  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-display prose-headings:text-primary
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-primary
        prose-ul:my-4 prose-li:text-gray-700
        prose-blockquote:border-l-accent prose-blockquote:bg-secondary-light prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
