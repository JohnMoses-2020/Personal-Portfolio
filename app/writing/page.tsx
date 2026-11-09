import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllArticles, getTopicCounts, toArticleSummary } from "@/lib/content";
import { images } from "@/lib/images";
import { ALL_TOPICS } from "@/lib/topics";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { WritingBrowser } from "@/components/writing/WritingBrowser";
import { WritingBrowserView } from "@/components/writing/WritingBrowserView";

const description =
  "Deep dives, system design breakdowns, and lessons learned from building and operating cloud infrastructure at scale.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: { canonical: "/writing" },
  openGraph: { title: "Technical Writing", description, url: "/writing" },
};

export default function WritingPage() {
  const articles = getAllArticles();
  const summaries = articles.map(toArticleSummary);
  const topics = getTopicCounts(articles);

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Engineering Notes"
        title="Technical Writing."
        description={description}
        image={images["writing-mountains"]}
        imagePosition="62% 40%"
      />

      <Container className="mt-14 md:mt-20">
        <Suspense
          fallback={<WritingBrowserView articles={summaries} topics={topics} activeTopic={ALL_TOPICS} />}
        >
          <WritingBrowser articles={summaries} topics={topics} />
        </Suspense>

        <p className="mt-10 max-w-2xl text-[0.8125rem] leading-relaxed text-muted">
          Posts marked <span className="text-mist">Draft</span> are proposed articles and
          outlines, not published pieces. Dates on drafts reflect the last update.
        </p>
      </Container>
    </PageTransition>
  );
}
