import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Briefcase, CodeXml, GraduationCap, Heart, Mail, MapPin } from "lucide-react";
import { about } from "@/content/about";
import { images } from "@/lib/images";
import { mailtoHref, siteConfig } from "@/lib/site";
import { joinWithDots } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/layout/PageTransition";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: about.intro,
    url: "/about",
    images: [{ url: images["about-stadium"].src, width: 864, height: 1152, alt: images["about-stadium"].alt }],
  },
};

const stadium = images["about-stadium"];

export default function AboutPage() {
  const facts = [
    { icon: MapPin, label: "Location", lines: [siteConfig.location] },
    { icon: Briefcase, label: "Work", lines: [about.work.title, about.work.detail] },
    { icon: GraduationCap, label: "Education", lines: [about.education.title, about.education.detail] },
    { icon: CodeXml, label: "Technical interests", lines: [joinWithDots(about.technicalInterests)] },
    { icon: Heart, label: "Personal interests", lines: [joinWithDots(about.personalInterests)] },
  ];

  const socials = [
    { label: "GitHub", href: siteConfig.links.github, icon: GithubIcon },
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon },
    { label: "Email", href: mailtoHref, icon: Mail },
  ];

  return (
    <PageTransition>
      <section className="relative -mt-16 flex flex-1 flex-col overflow-hidden md:-mt-[4.5rem] md:min-h-[100svh]">
        {/* Photograph: banner on mobile, right-hand panel on desktop. */}
        <div
          aria-hidden="true"
          className="photo-fade-bottom relative h-[52svh] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[50%] md:[mask-image:linear-gradient(to_right,transparent_0%,black_30%)] lg:w-[54%]"
        >
          <Image
            src={stadium.src}
            alt=""
            fill
            priority
            quality={85}
            sizes="(min-width: 768px) 54vw, 100vw"
            className="animate-fade object-cover object-[50%_45%] md:object-[35%_50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-transparent md:bg-gradient-to-r md:from-ink md:via-ink/30 md:to-transparent" />
          <div className="absolute inset-0 hidden bg-gradient-to-b from-ink/30 via-transparent to-ink/60 md:block" />
        </div>

        <Container className="relative -mt-24 flex flex-1 flex-col justify-center pb-16 md:mt-0 md:pb-20 md:pt-44">
          <div className="max-w-[31rem]">
            <Eyebrow className="animate-rise" style={{ animationDelay: "80ms" }}>
              {about.eyebrow}
            </Eyebrow>
            <h1
              className="animate-rise mt-5 font-serif text-[clamp(2.75rem,6vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.02em] text-ivory"
              style={{ animationDelay: "160ms" }}
            >
              {about.headline}
            </h1>
            <p
              className="animate-rise mt-6 text-[0.9375rem] leading-relaxed text-mist md:text-[1rem]"
              style={{ animationDelay: "240ms" }}
            >
              {about.intro}
            </p>

            <ul className="animate-rise mt-9 space-y-4" style={{ animationDelay: "320ms" }}>
              {facts.map(({ icon: Icon, label, lines }) => (
                <li key={label} className="flex items-start gap-4">
                  <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mist" strokeWidth={1.5} />
                  <div>
                    <span className="sr-only">{label}: </span>
                    {lines.map((line, index) => (
                      <p
                        key={line}
                        className={
                          index === 0
                            ? "text-[0.8125rem] leading-snug text-ivory"
                            : "mt-0.5 text-[0.75rem] leading-snug text-mist"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <div className="animate-rise mt-10 flex flex-wrap items-center gap-6" style={{ animationDelay: "400ms" }}>
              <ButtonLink href={mailtoHref} variant="primary">
                {about.cta.label}
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ul className="flex items-center gap-5" aria-label="Profiles">
                {socials.map(({ label, href, icon: Icon }) => {
                  const external = href.startsWith("http");
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        aria-label={label}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="block text-ivory transition-colors hover:text-accent"
                      >
                        <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
