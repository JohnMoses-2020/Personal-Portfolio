"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // The menu remembers the path it was opened on, so navigating to a new
  // route closes it automatically without an effect.
  const [menuOpenedOn, setMenuOpenedOn] = useState<string | null>(null);
  const isMenuOpen = menuOpenedOn === pathname;
  const openMenu = () => setMenuOpenedOn(pathname);
  const closeMenu = () => setMenuOpenedOn(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        isScrolled
          ? "border-b border-line-soft/70 bg-ink/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-[4.5rem]">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {siteConfig.nav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative py-2 font-sans text-[0.8125rem] font-medium tracking-[0.01em] transition-colors",
                      active ? "text-ivory" : "text-mist hover:text-ivory",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ease-[var(--ease-out-quart)]",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/resume"
            aria-current={isActivePath(pathname, "/resume") ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-3.5 py-1.5 font-sans text-[0.8125rem] font-medium transition-colors",
              isActivePath(pathname, "/resume")
                ? "border-accent/60 text-ivory"
                : "border-line text-ivory hover:border-accent/60 hover:text-accent",
            )}
          >
            Resume
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Open menu"
          className="inline-flex size-10 items-center justify-center rounded-md border border-line text-ivory transition-colors hover:border-accent/60 md:hidden"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </Container>

      <MobileNavigation isOpen={isMenuOpen} onClose={closeMenu} pathname={pathname} />
    </header>
  );
}
