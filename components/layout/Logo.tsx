import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "font-sans text-[1.125rem] font-bold tracking-[-0.02em] text-ivory transition-colors hover:text-accent",
        className,
      )}
    >
      {siteConfig.initials}
      <span className="text-accent">.</span>
    </Link>
  );
}
