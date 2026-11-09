import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Download } from "lucide-react";
import { resume, type ResumeEntry } from "@/content/resume";
import { mailtoHref, siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Résumé",
  description: resume.summary,
  alternates: { canonical: "/resume" },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal
      as="section"
      className="grid grid-cols-1 gap-6 border-t border-line-soft py-10 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12 md:py-14"
    >
      <h2 className="eyebrow md:pt-1">{title}</h2>
      <div className="space-y-10">{children}</div>
    </Reveal>
  );
}

function Entry({ entry }: { entry: ResumeEntry }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-serif text-[1.5rem] font-medium leading-tight text-ivory">{entry.title}</h3>
        <p className="meta">{entry.period}</p>
      </div>
      <p className="mt-1 text-[0.9375rem] text-mist">
        {entry.organization}
        {entry.location ? <span className="text-muted"> · {entry.location}</span> : null}
      </p>
      <ul className="mt-4 space-y-2">
        {entry.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-[0.9375rem] leading-relaxed text-mist">
            <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      {entry.placeholder ? (
        <p className="meta mt-4 text-accent/80">Placeholder — confirm details</p>
      ) : null}
    </div>
  );
}

export default function ResumePage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Résumé"
        title={
          <>
            {siteConfig.name}
            <span className="text-accent">.</span>
          </>
        }
        description={resume.summary}
        layout="split"
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {siteConfig.resumePdfUrl ? (
            <ButtonLink href={siteConfig.resumePdfUrl} variant="primary" external>
              <Download aria-hidden="true" className="size-4" />
              Download PDF
            </ButtonLink>
          ) : null}
          <ButtonLink href={mailtoHref} variant={siteConfig.resumePdfUrl ? "secondary" : "primary"}>
            Get in touch
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
        {!siteConfig.resumePdfUrl ? (
          <p className="mt-4 text-[0.8125rem] text-muted">
            A downloadable PDF will be available here once it is added (see README).
          </p>
        ) : null}
      </PageHeader>

      <Container className="mt-12 md:mt-16">
        <Section title="Experience">
          {resume.experience.map((entry) => (
            <Entry key={`${entry.organization}-${entry.title}`} entry={entry} />
          ))}
        </Section>

        <Section title="Education">
          {resume.education.map((entry) => (
            <Entry key={`${entry.organization}-${entry.title}`} entry={entry} />
          ))}
        </Section>

        <Section title="Skills">
          <dl className="grid gap-8 sm:grid-cols-3">
            {resume.skills.map((group) => (
              <div key={group.group}>
                <dt className="font-sans text-[0.875rem] font-semibold text-ivory">{group.group}</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-md border border-line px-2 py-1 text-[0.75rem] text-mist">
                      {item}
                    </span>
                  ))}
                </dd>
                {group.placeholder ? (
                  <dd className="meta mt-3 text-accent/80">Confirm before launch</dd>
                ) : null}
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Interests">
          <p className="font-serif text-[1.375rem] leading-relaxed text-ivory">
            {resume.interests.join(" · ")}
          </p>
        </Section>
      </Container>
    </PageTransition>
  );
}
