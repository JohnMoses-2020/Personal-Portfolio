import type { ArticleSummary, TopicCount } from "@/lib/content";
import { getTopicLabel, isTopicSlug } from "@/lib/topics";
import { ArticleCard } from "@/components/writing/ArticleCard";
import { TopicFilter } from "@/components/writing/TopicFilter";

type WritingBrowserViewProps = {
  articles: ArticleSummary[];
  topics: TopicCount[];
  activeTopic: string;
};

export function filterArticles(articles: ArticleSummary[], topic: string) {
  if (!isTopicSlug(topic)) return articles;
  return articles.filter((article) => article.topics.includes(topic));
}

/**
 * Presentational two-column browser (sidebar filters + article list).
 * Hook-free so the server can render it as the static fallback, and the
 * client WritingBrowser can render it with live search params.
 */
export function WritingBrowserView({ articles, topics, activeTopic }: WritingBrowserViewProps) {
  const visible = filterArticles(articles, activeTopic);
  const heading = isTopicSlug(activeTopic) ? getTopicLabel(activeTopic) : "All posts";

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
      <TopicFilter topics={topics} activeTopic={activeTopic} className="lg:sticky lg:top-28 lg:self-start" />

      <section aria-live="polite" aria-label={`${heading} articles`}>
        <div className="flex items-baseline justify-between border-b border-line-soft pb-3">
          <h2 className="font-sans text-[0.8125rem] font-medium text-ivory">{heading}</h2>
          <p className="meta">
            {visible.length} {visible.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {visible.length > 0 ? (
          <div>
            {visible.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-[0.9375rem] text-mist">No posts in this topic yet.</p>
        )}
      </section>
    </div>
  );
}
