import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getImage, type SiteImage } from "@/lib/images";
import { estimateReadingTime } from "@/lib/reading-time";
import { extractToc, type TocItem } from "@/lib/toc";
import { isTopicSlug, topics, type TopicSlug } from "@/lib/topics";

/**
 * Content loaders.
 *
 * Content lives in /content as MDX files with YAML frontmatter and is read
 * synchronously at build time. Nothing here runs at request time: every route
 * that uses these loaders is statically generated.
 */

export type ContentStatus = "draft" | "in-progress" | "published";

export const statusLabels: Record<ContentStatus, string> = {
  draft: "Draft",
  "in-progress": "In Progress",
  published: "Published",
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  summary: string;
  categories: string[];
  image: SiteImage;
  status: ContentStatus;
  /** ISO date (YYYY-MM-DD) the entry was last updated. */
  date: string;
  role?: string;
  timeline?: string;
  technologies: string[];
  /** Shown on the home page "Selected Work" section. */
  featured: boolean;
  /** Lower numbers sort first. */
  order: number;
  /** Optional public-disclosure note rendered on the case study page. */
  disclosure?: string;
  body: string;
  readingTime: number;
  toc: TocItem[];
};

/* ------------------------------------------------------------------ */
/* Articles                                                            */
/* ------------------------------------------------------------------ */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). For drafts this is the last-updated date. */
  date: string;
  topics: TopicSlug[];
  image: SiteImage;
  status: ContentStatus;
  featured: boolean;
  body: string;
  readingTime: number;
  toc: TocItem[];
};

/* ------------------------------------------------------------------ */
/* Internals                                                           */
/* ------------------------------------------------------------------ */

type Frontmatter = Record<string, unknown>;

function readDirectory(dir: string) {
  const absolute = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(absolute)) return [];
  return fs
    .readdirSync(absolute)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(absolute, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, data: data as Frontmatter, content, file: `${dir}/${file}` };
    });
}

function requireString(data: Frontmatter, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`content/${file}: frontmatter "${key}" must be a non-empty string.`);
  }
  return value;
}

function optionalString(data: Frontmatter, key: string): string | undefined {
  const value = data[key];
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function stringArray(data: Frontmatter, key: string, file: string): string[] {
  const value = data[key] ?? [];
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`content/${file}: frontmatter "${key}" must be a list of strings.`);
  }
  return value;
}

function parseStatus(data: Frontmatter, file: string): ContentStatus {
  const value = data.status ?? "draft";
  if (value !== "draft" && value !== "in-progress" && value !== "published") {
    throw new Error(
      `content/${file}: frontmatter "status" must be one of draft | in-progress | published.`,
    );
  }
  return value;
}

function parseDate(data: Frontmatter, file: string): string {
  const value = data.date;
  // gray-matter parses unquoted YAML dates into Date objects.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  throw new Error(`content/${file}: frontmatter "date" must be YYYY-MM-DD.`);
}

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date);
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function getAllProjects(): Project[] {
  return readDirectory("projects")
    .map(({ slug, data, content, file }): Project => ({
      slug,
      title: requireString(data, "title", file),
      summary: requireString(data, "summary", file),
      categories: stringArray(data, "categories", file),
      image: getImage(requireString(data, "image", file)),
      status: parseStatus(data, file),
      date: parseDate(data, file),
      role: optionalString(data, "role"),
      timeline: optionalString(data, "timeline"),
      technologies: stringArray(data, "technologies", file),
      featured: data.featured === true,
      order: typeof data.order === "number" ? data.order : 100,
      disclosure: optionalString(data, "disclosure"),
      body: content,
      readingTime: estimateReadingTime(content),
      toc: extractToc(content),
    }))
    .sort((a, b) => a.order - b.order || byDateDesc(a, b));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  const all = getAllProjects();
  const featured = all.filter((project) => project.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export function getAllArticles(): Article[] {
  return readDirectory("writing")
    .map(({ slug, data, content, file }): Article => {
      const topicSlugs = stringArray(data, "topics", file);
      for (const topic of topicSlugs) {
        if (!isTopicSlug(topic)) {
          throw new Error(
            `content/${file}: unknown topic "${topic}". Valid topics: ${topics
              .map((t) => t.slug)
              .join(", ")}.`,
          );
        }
      }
      return {
        slug,
        title: requireString(data, "title", file),
        excerpt: requireString(data, "excerpt", file),
        date: parseDate(data, file),
        topics: topicSlugs as TopicSlug[],
        image: getImage(requireString(data, "image", file)),
        status: parseStatus(data, file),
        featured: data.featured === true,
        body: content,
        readingTime: estimateReadingTime(content),
        toc: extractToc(content),
      };
    })
    .sort(byDateDesc);
}

/** Everything a list/card needs — safe to pass to Client Components. */
export type ArticleSummary = Omit<Article, "body" | "toc">;

export function toArticleSummary(article: Article): ArticleSummary {
  // Pick fields explicitly so the MDX body and TOC never reach the client bundle.
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    topics: article.topics,
    image: article.image,
    status: article.status,
    featured: article.featured,
    readingTime: article.readingTime,
  };
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getFeaturedArticles(limit = 3): Article[] {
  const all = getAllArticles();
  const featured = all.filter((article) => article.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

/** Articles sharing the most topics with `article`, excluding itself. */
export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getAllArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      candidate,
      overlap: candidate.topics.filter((topic) => article.topics.includes(topic)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap || byDateDesc(a.candidate, b.candidate))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export type TopicCount = { slug: TopicSlug | "all"; label: string; icon: string; count: number };

export function getTopicCounts(articles = getAllArticles()): TopicCount[] {
  return [
    { slug: "all", label: "All Posts", icon: "file-text", count: articles.length },
    ...topics.map((topic) => ({
      slug: topic.slug,
      label: topic.label,
      icon: topic.icon,
      count: articles.filter((article) => article.topics.includes(topic.slug)).length,
    })),
  ];
}
