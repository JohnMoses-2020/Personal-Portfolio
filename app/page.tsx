import { getFeaturedArticles, getFeaturedProjects } from "@/lib/content";
import { PageTransition } from "@/components/layout/PageTransition";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { WritingPreview } from "@/components/home/WritingPreview";

export default function HomePage() {
  const projects = getFeaturedProjects(3);
  const articles = getFeaturedArticles(3);

  return (
    <PageTransition>
      <Hero />
      <SelectedWork projects={projects} />
      <WritingPreview articles={articles} />
    </PageTransition>
  );
}
