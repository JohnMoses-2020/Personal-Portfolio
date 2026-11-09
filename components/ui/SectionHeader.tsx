import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Visual size of the title. "page" for page headers, "section" for in-page sections. */
  size?: "page" | "section";
  /** Right-aligned description column (as on the Work page) vs. stacked. */
  layout?: "split" | "stacked";
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
  titleAs?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  size = "section",
  layout = "stacked",
  align = "left",
  className,
  action,
  titleAs,
}: SectionHeaderProps) {
  const Title = titleAs ?? (size === "page" ? "h1" : "h2");
  const titleClasses =
    size === "page"
      ? "text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.02] tracking-[-0.015em]"
      : "text-[clamp(2rem,3.6vw,2.875rem)] leading-[1.08] tracking-[-0.01em]";

  return (
    <div
      className={cn(
        layout === "split" && "md:grid md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12",
        align === "center" && "text-center",
        className,
      )}
    >
      <div className={cn(align === "center" && "flex flex-col items-center")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Title className={cn("mt-4 font-serif font-medium text-ivory", titleClasses)}>{title}</Title>
        {layout === "stacked" && description ? (
          <p
            className={cn(
              "mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-mist md:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {layout === "split" && (description || action) ? (
        <div className="mt-6 md:mt-0 md:pb-2">
          {description ? (
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-mist md:text-base">
              {description}
            </p>
          ) : null}
          {action ? <div className="mt-5">{action}</div> : null}
        </div>
      ) : null}

      {layout === "stacked" && action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
