import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { mailtoHref, siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon },
  { label: "Email", href: mailtoHref, icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line-soft bg-ink-2/40 md:mt-32">
      <Container className="grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">
            {siteConfig.role}. {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9375rem] text-ivory/90 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                className="inline-flex items-center gap-1 text-[0.9375rem] text-ivory/90 transition-colors hover:text-accent"
              >
                Resume
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Connect</p>
          <ul className="mt-4 space-y-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => {
              const external = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2.5 text-[0.9375rem] text-ivory/90 transition-colors hover:text-accent"
                  >
                    <Icon aria-hidden="true" className="size-4 text-mist" />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line-soft py-6 text-[0.75rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="font-serif text-[0.9375rem] italic text-mist/80">Above the clouds.</p>
      </Container>
    </footer>
  );
}
