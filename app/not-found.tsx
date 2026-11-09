import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { Container } from "@/components/layout/Container";
import { PhotoBackdrop } from "@/components/layout/PhotoBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative -mt-16 flex flex-1 flex-col overflow-hidden md:-mt-[4.5rem]">
      <PhotoBackdrop image={images["article-multi-tenant"]} variant="full" dim={0.35} position="50% 60%" />
      <Container className="relative flex flex-1 flex-col items-start justify-center py-40 md:py-52">
        <Eyebrow className="animate-rise">404 — Lost above the clouds</Eyebrow>
        <h1
          className="animate-rise mt-5 max-w-2xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ivory"
          style={{ animationDelay: "120ms" }}
        >
          This page doesn&apos;t exist.
        </h1>
        <p
          className="animate-rise mt-6 max-w-md text-[1rem] leading-relaxed text-mist"
          style={{ animationDelay: "220ms" }}
        >
          The address may be mistyped, or the page may have moved. Let&apos;s get you back to
          solid ground.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "320ms" }}>
          <ButtonLink href="/" variant="primary">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back home
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            Explore work
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
