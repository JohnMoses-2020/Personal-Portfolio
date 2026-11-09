import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";

const description =
  "A collection of engineering projects, system designs, and experiments in cloud infrastructure, distributed systems, and developer tooling.";

export const metadata: Metadata = {
  title: "Work",
  description,
  alternates: { canonical: "/work" },
  openGraph: { title: "Projects & Case Studies", description, url: "/work" },
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Selected Work"
        title="Projects & Case Studies."
        description={description}
        layout="split"
      />

      <Container className="mt-12 md:mt-16">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index, 3) * 80}>
              <ProjectCard project={project} priority={index === 0} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-[0.8125rem] leading-relaxed text-muted">
          Entries marked <span className="text-mist">Draft</span> or{" "}
          <span className="text-mist">In Progress</span> are proposed or ongoing work. Case
          studies describe that work at a level appropriate for public disclosure and claim
          no results that cannot be shared.
        </p>
      </Container>
    </PageTransition>
  );
}
