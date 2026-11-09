/**
 * Writing topics. The slug is used in article frontmatter (`topics: [...]`)
 * and in the `/writing?topic=<slug>` filter.
 */
export const topics = [
  { slug: "cloud-infrastructure", label: "Cloud Infrastructure", icon: "cloud" },
  { slug: "kubernetes", label: "Kubernetes", icon: "boxes" },
  { slug: "distributed-systems", label: "Distributed Systems", icon: "network" },
  { slug: "reliability", label: "Reliability", icon: "shield" },
  { slug: "engineering-process", label: "Engineering Process", icon: "workflow" },
] as const;

export type TopicSlug = (typeof topics)[number]["slug"];
export type TopicIcon = (typeof topics)[number]["icon"];

export const ALL_TOPICS = "all";

export function isTopicSlug(value: string): value is TopicSlug {
  return topics.some((topic) => topic.slug === value);
}

export function getTopicLabel(slug: TopicSlug) {
  return topics.find((topic) => topic.slug === slug)?.label ?? slug;
}
