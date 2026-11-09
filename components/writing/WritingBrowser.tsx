"use client";

import { useSearchParams } from "next/navigation";
import type { ArticleSummary, TopicCount } from "@/lib/content";
import { ALL_TOPICS, isTopicSlug } from "@/lib/topics";
import { WritingBrowserView } from "@/components/writing/WritingBrowserView";

type WritingBrowserProps = {
  articles: ArticleSummary[];
  topics: TopicCount[];
};

/**
 * Client wrapper that reads `?topic=` from the URL and filters the list.
 * Must be rendered inside <Suspense>; the fallback is the unfiltered view so
 * the static HTML always contains every article.
 */
export function WritingBrowser({ articles, topics }: WritingBrowserProps) {
  const searchParams = useSearchParams();
  const requested = searchParams.get("topic") ?? ALL_TOPICS;
  const activeTopic = isTopicSlug(requested) ? requested : ALL_TOPICS;

  return <WritingBrowserView articles={articles} topics={topics} activeTopic={activeTopic} />;
}
