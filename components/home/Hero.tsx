import { ArrowRight, FileText } from "lucide-react";
import { hero } from "@/content/home";
import { images } from "@/lib/images";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { ExpertiseGrid } from "@/components/home/ExpertiseGrid";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-16 flex min-h-[100svh] flex-col overflow-hidden md:-mt-[4.5rem]"
    >
      {/* Photography */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="photo-fade-left absolute inset-y-0 right-0 w-full md:w-[72%]">
          <ParallaxImage
            image={images["hero-clouds"]}
            priority
            quality={85}
            sizes="(min-width: 768px) 72vw, 100vw"
            position="68% 45%"
            className="animate-fade"
          />
        </div>
        {/* Blend into the page: darker at the bottom, slightly at the top. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10 md:from-ink/80 md:via-ink/20 md:to-transparent" />

        {/* Decorative orbit line from the reference composition. */}
        <svg
          className="absolute -right-[10%] top-[-18%] hidden h-[115%] w-auto text-ivory/[0.14] md:block"
          viewBox="0 0 900 900"
          fill="none"
        >
          <circle cx="450" cy="450" r="430" stroke="currentColor" strokeWidth="1" />
          <circle cx="450" cy="450" r="430" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" opacity="0.6" transform="rotate(12 450 450)" />
        </svg>
      </div>

      {/* Content */}
      <Container className="relative flex flex-1 flex-col pb-8 pt-32 md:pt-44">
        <div className="max-w-[36rem]">
          <Eyebrow className="animate-rise" style={{ animationDelay: "80ms" }}>
            {hero.eyebrow}
          </Eyebrow>

          <h1
            id="hero-heading"
            className="animate-rise mt-6 font-serif text-[clamp(2.75rem,8.5vw,5.25rem)] font-medium leading-[1.0] tracking-[-0.02em] text-ivory"
            style={{ animationDelay: "160ms" }}
          >
            {hero.headline}
          </h1>

          <p
            className="animate-rise mt-7 max-w-[30rem] text-[0.9375rem] leading-relaxed text-mist md:text-[1.0625rem]"
            style={{ animationDelay: "260ms" }}
          >
            {hero.description}
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "340ms" }}
          >
            <ButtonLink href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              <FileText aria-hidden="true" className="size-4" />
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-20 md:mt-auto md:pt-24">
          <ExpertiseGrid />
          <div className="mt-10 flex justify-center md:mt-8">
            <ScrollIndicator href="#selected-work" className="animate-fade" />
          </div>
        </div>
      </Container>
    </section>
  );
}
