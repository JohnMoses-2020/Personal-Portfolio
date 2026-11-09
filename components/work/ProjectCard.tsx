import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { cn, joinWithDots } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";

type ProjectCardProps = {
  project: Project;
  /** Preload the image for above-the-fold cards. */
  priority?: boolean;
  className?: string;
};

/** Horizontal project card: photograph left, editorial copy right, arrow. */
export function ProjectCard({ project, priority = false, className }: ProjectCardProps) {
  return (
    <article className={cn("group relative", className)}>
      <Link
        href={`/work/${project.slug}`}
        className="grid overflow-hidden rounded-xl border border-line bg-card/80 shadow-[var(--shadow-card)] transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-out-quart)] hover:border-accent/40 hover:bg-card-2 focus-visible:outline-offset-4 sm:grid-cols-[minmax(0,38%)_1fr]"
      >
        <div className="relative aspect-[16/9] overflow-hidden sm:aspect-auto sm:min-h-[11.5rem]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 38vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-quart)] group-hover:scale-[1.05]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-card/60"
          />
        </div>

        <div className="flex items-center gap-5 p-5 sm:gap-6 sm:p-7 md:p-8">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="meta">{joinWithDots(project.categories)}</p>
              <StatusBadge status={project.status} hidePublished />
            </div>
            <h3 className="mt-3 font-serif text-[1.625rem] font-medium leading-[1.1] text-ivory transition-colors duration-300 group-hover:text-accent md:text-[1.875rem]">
              {project.title}
            </h3>
            <p className="mt-2.5 line-clamp-2 max-w-[34rem] text-[0.8125rem] leading-relaxed text-mist md:text-[0.875rem]">
              {project.summary}
            </p>
          </div>

          <ArrowRight
            aria-hidden="true"
            className="size-5 shrink-0 text-ivory transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:translate-x-1 group-hover:text-accent"
            strokeWidth={1.75}
          />
        </div>
      </Link>
    </article>
  );
}
