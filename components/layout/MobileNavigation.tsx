"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, X } from "lucide-react";
import { mailtoHref, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileNavigation({ isOpen, onClose, pathname }: MobileNavigationProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    ...siteConfig.nav,
    { label: "Resume", href: "/resume" as const, external: true },
  ];

  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="animate-fade fixed inset-0 z-[60] flex flex-col bg-ink md:hidden"
      style={{ animationDuration: "250ms" }}
    >
      <div className="container-site flex h-16 items-center justify-between">
        <Logo />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-10 items-center justify-center rounded-md border border-line text-ivory transition-colors hover:border-accent/60"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-site flex flex-1 flex-col justify-center pb-24">
        <ul className="space-y-2">
          {links.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li
                key={item.href}
                className="animate-rise"
                style={{ animationDelay: `${80 + index * 60}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-baseline justify-between border-b border-line-soft py-5 font-serif text-[2.5rem] leading-none transition-colors",
                    active ? "text-accent" : "text-ivory hover:text-accent",
                  )}
                >
                  <span>{item.label}</span>
                  {"external" in item ? (
                    <ArrowUpRight aria-hidden="true" className="size-6 text-mist" />
                  ) : (
                    <span className="meta text-muted">0{index + 1}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className="animate-rise mt-10 flex items-center gap-6"
          style={{ animationDelay: "360ms" }}
        >
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-mist transition-colors hover:text-accent"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-mist transition-colors hover:text-accent"
          >
            <LinkedinIcon className="size-5" />
          </a>
          <a
            href={mailtoHref}
            aria-label="Email"
            className="text-mist transition-colors hover:text-accent"
          >
            <Mail className="size-5" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </div>
  );
}
