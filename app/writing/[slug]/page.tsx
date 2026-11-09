import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  toArticleSummary,
} from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { siteConfig } from "@/lib/site";
import { PageTransition } from "@/components/layout/PageTransition";
import { ArticleLayout } from "@/components/writing/ArticleLayout";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const isPublished = article.status === "published";

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/writing/${article.slug}` },
    // Keep draft outlines out of search results until they're published.
    robots: isPublished ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/writing/${article.slug}`,
      publishedTime: isPublished ? article.date : undefined,
      authors: [siteConfig.name],
      images: [{ url: article.image.src, width: article.image.width, height: article.image.height, alt: article.image.alt }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3).map(toArticleSummary);
  const content = await renderMdx(article.body);

  return (
    <PageTransition>
      <ArticleLayout article={article} related={related}>
        {content}
      </ArticleLayout>
    </PageTransition>
  );
}
