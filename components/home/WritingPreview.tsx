import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticleCard } from "@/components/writing/ArticleCard";

export function WritingPreview({ articles }: { articles: Article[] }) {
  return (
    <section aria-labelledby="writing-preview-heading" className="pt-24 md:pt-32">
      <Container className="md:grid md:grid-cols-[1fr_1.6fr] md:gap-16">
        <Reveal>
          <SectionHeader
            eyebrow="Engineering Notes"
            title={<span id="writing-preview-heading">Technical Writing.</span>}
            description="Deep dives, system design breakdowns, and lessons learned from building and operating cloud infrastructure at scale."
            action={
              <ButtonLink href="/writing" variant="ghost" className="-ml-1 px-1 text-accent hover:text-ivory">
                Read all writing
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            }
          />
        </Reveal>

        <div className="mt-10 border-t border-line-soft md:mt-0">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 80}>
              <ArticleCard article={article} showExcerpt={false} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
