import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { statusLabels, type Project } from "@/lib/content";
import { formatDate, joinWithDots } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { PhotoBackdrop } from "@/components/layout/PhotoBackdrop";
import { Callout } from "@/components/mdx/MdxComponents";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TableOfContents } from "@/components/writing/TableOfContents";

type CaseStudyLayoutProps = {
  project: Project;
  nextProject?: Project;
  children: ReactNode;
};

/** Reusable case-study template: cinematic header, metadata rail, editorial body. */
export function CaseStudyLayout({ project, nextProject, children }: CaseStudyLayoutProps) {
  const facts: { label: string; value: string }[] = [
    project.role ? { label: "Role", value: project.role } : null,
    project.timeline ? { label: "Timeline", value: project.timeline } : null,
    { label: "Status", value: statusLabels[project.status] },
    { label: "Updated", value: formatDate(project.date) },
  ].filter((fact): fact is { label: string; value: string } => fact !== null);

  return (
    <article>
      <header className="relative -mt-16 overflow-hidden pt-36 md:-mt-[4.5rem] md:pt-52">
        <PhotoBackdrop image={project.image} variant="full" priority dim={0.25} />
        <Container className="relative pb-10 md:pb-14">
          <Link
            href="/work"
            className="meta inline-flex items-center gap-2 text-mist transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            All work
          </Link>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-x-4 gap-y-2" style={{ animationDelay: "80ms" }}>
            <p className="meta text-mist">{joinWithDots(project.categories)}</p>
            <StatusBadge status={project.status} />
          </div>

          <h1
            className="animate-rise mt-5 max-w-4xl font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.0] tracking-[-0.02em] text-ivory"
            style={{ animationDelay: "160ms" }}
          >
            {project.title}
          </h1>

          <p
            className="animate-rise mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-mist md:text-[1.125rem]"
            style={{ animationDelay: "240ms" }}
          >
            {project.summary}
          </p>
        </Container>
      </header>

      <Container className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
        <div className="min-w-0 max-w-[46rem]">
          {project.disclosure ? (
            <Callout type="note" title="Public disclosure">
              <p>{project.disclosure}</p>
            </Callout>
          ) : null}

          <details className="mb-8 rounded-xl border border-line bg-card/60 px-5 py-4 lg:hidden">
            <summary className="meta cursor-pointer text-ivory">Contents</summary>
            <TableOfContents items={project.toc} compact className="mt-3" />
          </details>

          <div className="prose-editorial">{children}</div>

          <footer className="mt-16 flex flex-col gap-6 border-t border-line-soft pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[0.875rem] text-mist transition-colors hover:text-accent"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to all work
            </Link>
            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group inline-flex items-center gap-3 text-right"
              >
                <span>
                  <span className="meta block text-muted">Next project</span>
                  <span className="mt-1 block font-serif text-[1.25rem] text-ivory transition-colors group-hover:text-accent">
                    {nextProject.title}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 text-ivory transition-transform group-hover:translate-x-1 group-hover:text-accent"
                />
              </Link>
            ) : null}
          </footer>
        </div>

        <aside className="hidden self-start lg:sticky lg:top-28 lg:block">
          <dl className="space-y-5 border-l border-line-soft pl-5">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="meta">{fact.label}</dt>
                <dd className="mt-1 text-[0.9375rem] text-ivory">{fact.value}</dd>
              </div>
            ))}
            {project.technologies.length > 0 ? (
              <div>
                <dt className="meta">Technologies</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-line px-2 py-1 text-[0.75rem] text-mist"
                    >
                      {technology}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>

          <TableOfContents items={project.toc} className="mt-10" />
        </aside>
      </Container>
    </article>
  );
}
