import type { MetadataRoute } from "next";
import { getAllArticles, getAllProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

// Required for `output: "export"` — emitted as a static sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projects: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${base}/work/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Draft articles are noindex, so only list published ones.
  const articles: MetadataRoute.Sitemap = getAllArticles()
    .filter((article) => article.status === "published")
    .map((article) => ({
      url: `${base}/writing/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...projects, ...articles];
}
