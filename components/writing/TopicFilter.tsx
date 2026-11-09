import Link from "next/link";
import { Boxes, Cloud, FileText, Network, ShieldCheck, Workflow } from "lucide-react";
import type { TopicCount } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: Record<string, typeof Cloud> = {
  "file-text": FileText,
  cloud: Cloud,
  boxes: Boxes,
  network: Network,
  shield: ShieldCheck,
  workflow: Workflow,
};

export function topicHref(slug: string) {
  return slug === "all" ? "/writing" : `/writing?topic=${slug}`;
}

type TopicFilterProps = {
  topics: TopicCount[];
  activeTopic: string;
  className?: string;
};

/** Sidebar list of topic filters with counts; the active topic is highlighted. */
export function TopicFilter({ topics, activeTopic, className }: TopicFilterProps) {
  return (
    <nav aria-label="Topics" className={className}>
      <p className="eyebrow">Topics</p>
      {/* Horizontal chip row on small screens; vertical list from lg up. */}
      <ul className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {topics.map((topic) => {
          const Icon = icons[topic.icon] ?? FileText;
          const active = topic.slug === activeTopic;
          return (
            <li key={topic.slug} className="shrink-0">
              <Link
                href={topicHref(topic.slug)}
                scroll={false}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-[0.8125rem] whitespace-nowrap transition-colors duration-300 lg:gap-3 lg:rounded-md lg:px-3 lg:py-2.5",
                  active
                    ? "border-line bg-card text-ivory"
                    : "border-line-soft text-mist hover:bg-card/60 hover:text-ivory lg:border-transparent",
                )}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.5} />
                <span className="lg:flex-1 lg:truncate">{topic.label}</span>
                <span className={cn("meta tabular-nums", active ? "text-ivory" : "text-muted")}>
                  {topic.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
