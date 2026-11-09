"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
  /** Compact variant for the collapsible mobile version. */
  compact?: boolean;
};

/**
 * Heading list with the currently visible section highlighted.
 * Anchors rely on CSS smooth scrolling and `scroll-margin-top` on headings.
 */
export function TableOfContents({ items, className, compact = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0 || typeof IntersectionObserver === "undefined") return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={className}>
      {!compact ? <p className="eyebrow">Contents</p> : null}
      <ol className={cn("space-y-0.5", !compact && "mt-4 border-l border-line-soft")}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "block py-1.5 text-[0.8125rem] leading-snug transition-colors",
                  compact ? "pl-0" : "-ml-px border-l pl-4",
                  item.depth === 3 && (compact ? "pl-4" : "pl-7"),
                  active
                    ? "border-accent text-ivory"
                    : "border-transparent text-muted hover:text-ivory",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
