import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleSummary } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

type ArticleCardProps = {
  article: ArticleSummary;
  className?: string;
  showExcerpt?: boolean;
};

/** "Oct 20, 2026 · 12 min read" — or "Draft · 4 min read" for unpublished work. */
export function ArticleMeta({
  article,
  className,
}: {
  article: ArticleSummary;
  className?: string;
}) {
  return (
    <p className={cn("meta", className)}>
      {article.status === "published" ? (
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      ) : (
        <span>Draft</span>
      )}
      <span aria-hidden="true"> · </span>
      <span>{article.readingTime} min read</span>
    </p>
  );
}

/** Editorial list row: thumbnail, serif title, tracked metadata, arrow. */
export function ArticleCard({ article, className, showExcerpt = true }: ArticleCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link
        href={`/writing/${article.slug}`}
        className="flex items-center gap-4 border-b border-line-soft py-5 transition-colors sm:gap-6 md:py-6"
      >
        <div className="relative h-[4.25rem] w-[6.5rem] shrink-0 overflow-hidden rounded-md border border-line-soft bg-card sm:h-[4.75rem] sm:w-[7.5rem]">
          <Image
            src={article.image.src}
            alt=""
            fill
            sizes="120px"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.06]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[1.25rem] font-medium leading-[1.2] text-ivory transition-colors duration-300 group-hover:text-accent md:text-[1.375rem]">
            {article.title}
          </h3>
          <ArticleMeta article={article} className="mt-2" />
          {showExcerpt ? (
            <p className="mt-2 hidden line-clamp-2 text-[0.8125rem] leading-relaxed text-mist sm:block">
              {article.excerpt}
            </p>
          ) : null}
        </div>

        <ArrowRight
          aria-hidden="true"
          className="size-5 shrink-0 text-ivory transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:text-accent"
          strokeWidth={1.75}
        />
      </Link>
    </article>
  );
}
