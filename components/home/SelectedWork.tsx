import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/work/ProjectCard";

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <section id="selected-work" aria-labelledby="selected-work-heading" className="scroll-mt-24 pt-24 md:pt-32">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Selected Work"
            title={<span id="selected-work-heading">Projects &amp; Case Studies.</span>}
            description="A collection of engineering projects, system designs, and experiments in cloud infrastructure, distributed systems, and developer tooling."
            layout="split"
            action={
              <ButtonLink href="/work" variant="ghost" className="-ml-1 px-1 text-accent hover:text-ivory">
                View all work
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            }
          />
        </Reveal>

        <div className="mt-12 space-y-4 md:mt-14">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
