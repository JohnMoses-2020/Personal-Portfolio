import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info, Lightbulb, PenLine, TriangleExclamationPoint } from "lucide-react";
import { images, type SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Lead — large serif opening paragraph                                */
/* ------------------------------------------------------------------ */

/**
 * MDX wraps block content in <p>, so this renders a <div> to avoid invalid
 * <p><p> nesting. Usage in MDX:
 *
 *   <Lead>
 *     Opening paragraph…
 *   </Lead>
 */
export function Lead({ children }: { children: ReactNode }) {
  return <div className="lead [&>p]:m-0">{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Callout                                                             */
/* ------------------------------------------------------------------ */

type CalloutType = "note" | "tip" | "warning";

const calloutStyles: Record<
  CalloutType,
  { icon: typeof Info; label: string; className: string }
> = {
  note: { icon: Info, label: "Note", className: "border-line bg-card" },
  tip: { icon: Lightbulb, label: "Tip", className: "border-accent/40 bg-accent/5" },
  warning: {
    icon: TriangleExclamationPoint,
    label: "Caution",
    className: "border-[#c98a6a]/40 bg-[#c98a6a]/5",
  },
};

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, label, className } = calloutStyles[type];
  return (
    <aside
      className={cn("not-prose my-8 rounded-xl border px-5 py-4 sm:px-6", className)}
      role="note"
    >
      <div className="flex items-center gap-2">
        <Icon aria-hidden="true" className="size-4 text-accent" />
        <span className="meta text-ivory">{title ?? label}</span>
      </div>
      <div className="mt-2 text-[0.9375rem] leading-relaxed text-mist [&_p]:m-0 [&_p+p]:mt-2">
        {children}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Placeholder — clearly identifies content that is not yet written    */
/* ------------------------------------------------------------------ */

export function Placeholder({ children }: { children?: ReactNode }) {
  return (
    <div className="not-prose my-8 rounded-xl border border-dashed border-line px-5 py-5 sm:px-6">
      <div className="flex items-center gap-2">
        <PenLine aria-hidden="true" className="size-4 text-muted" />
        <span className="meta">Placeholder — to be written</span>
      </div>
      {children ? (
        <div className="mt-2 text-[0.9375rem] leading-relaxed text-muted [&_p]:m-0">{children}</div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Figure & Diagram                                                    */
/* ------------------------------------------------------------------ */

function resolveImage(src: string): SiteImage | null {
  return (images as Record<string, SiteImage>)[src] ?? null;
}

export function Figure({
  src,
  alt,
  caption,
  priority = false,
}: {
  /** Either an image key from lib/images.ts or a /public path. */
  src: string;
  alt?: string;
  caption?: string;
  priority?: boolean;
}) {
  const known = resolveImage(src);
  return (
    <figure className="not-prose my-10">
      <div className="overflow-hidden rounded-xl border border-line bg-card">
        {known ? (
          <Image
            src={known.src}
            alt={alt ?? known.alt}
            width={known.width}
            height={known.height}
            sizes="(min-width: 1024px) 720px, 100vw"
            priority={priority}
            className="h-auto w-full"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- unknown dimensions
          <img src={src} alt={alt ?? ""} loading="lazy" className="h-auto w-full" />
        )}
      </div>
      {caption ? <figcaption className="meta mt-3 text-center normal-case tracking-normal">{caption}</figcaption> : null}
    </figure>
  );
}

/** Wraps a code fence (e.g. ```text) or an image in a labelled diagram frame. */
export function Diagram({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <figure className="diagram-frame not-prose my-10 overflow-hidden rounded-xl border border-line bg-ink-2">
      {title ? (
        <figcaption className="meta border-b border-line-soft bg-card px-5 py-2.5 text-left">
          {title}
        </figcaption>
      ) : null}
      <div className="[&_pre]:text-[0.8125rem]">{children}</div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* HTML element overrides                                              */
/* ------------------------------------------------------------------ */

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: Anchor,
  Lead,
  Callout,
  Placeholder,
  Figure,
  Diagram,
};
