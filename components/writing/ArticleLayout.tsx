import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Article, ArticleSummary } from "@/lib/content";
import { getTopicLabel } from "@/lib/topics";
import { Container } from "@/components/layout/Container";
import { PhotoBackdrop } from "@/components/layout/PhotoBackdrop";
import { Callout } from "@/components/mdx/MdxComponents";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArticleCard, ArticleMeta } from "@/components/writing/ArticleCard";
import { TableOfContents } from "@/components/writing/TableOfContents";
import { topicHref } from "@/components/writing/TopicFilter";

type ArticleLayoutProps = {
  article: Article;
  related: ArticleSummary[];
  children: ReactNode;
};

/** Reusable editorial article template: cinematic header, TOC rail, prose body, related posts. */
export function ArticleLayout({ article, related, children }: ArticleLayoutProps) {
  return (
    <article>
      <header className="relative -mt-16 overflow-hidden pt-36 md:-mt-[4.5rem] md:pt-52">
        <PhotoBackdrop image={article.image} variant="full" priority dim={0.3} />
        <Container className="relative pb-10 md:pb-14">
          <Link
            href="/writing"
            className="meta inline-flex items-center gap-2 text-mist transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            All writing
          </Link>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-x-4 gap-y-2" style={{ animationDelay: "80ms" }}>
            <ul className="meta flex flex-wrap items-center gap-x-2 text-mist" aria-label="Topics">
              {article.topics.map((topic, index) => (
                <li key={topic} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">·</span> : null}
                  <Link href={topicHref(topic)} className="transition-colors hover:text-accent">
                    {getTopicLabel(topic)}
                  </Link>
                </li>
              ))}
            </ul>
            <StatusBadge status={article.status} hidePublished />
          </div>

          <h1
            className="animate-rise mt-5 max-w-4xl font-serif text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.04] tracking-[-0.02em] text-ivory"
            style={{ animationDelay: "160ms" }}
          >
            {article.title}
          </h1>

          <p
            className="animate-rise mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-mist md:text-[1.125rem]"
            style={{ animationDelay: "240ms" }}
          >
            {article.excerpt}
          </p>

          <ArticleMeta article={article} className="animate-rise mt-6 text-mist" />
        </Container>
      </header>

      <Container className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
        <div className="min-w-0 max-w-[46rem]">
          {article.status !== "published" ? (
            <Callout type="note" title="Work in progress">
              <p>
                This is a draft outline, not a published article. Section headings show the
                intended structure; placeholders mark what is still to be written.
              </p>
            </Callout>
          ) : null}

          <details className="mb-8 rounded-xl border border-line bg-card/60 px-5 py-4 lg:hidden">
            <summary className="meta cursor-pointer text-ivory">Contents</summary>
            <TableOfContents items={article.toc} compact className="mt-3" />
          </details>

          <div className="prose-editorial">{children}</div>
        </div>

        <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
          <TableOfContents items={article.toc} />
        </aside>
      </Container>

      {related.length > 0 ? (
        <Container as="section" aria-labelledby="related-heading" className="mt-20 md:mt-28">
          <Eyebrow>Related</Eyebrow>
          <h2 id="related-heading" className="mt-3 font-serif text-[2rem] font-medium leading-tight text-ivory">
            Keep reading.
          </h2>
          <div className="mt-6 max-w-3xl border-t border-line-soft">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} showExcerpt={false} />
            ))}
          </div>
        </Container>
      ) : null}
    </article>
  );
}
