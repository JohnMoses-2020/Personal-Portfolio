import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Small tracked label with the trailing em-dash from the reference design:
 * "CLOUD INFRASTRUCTURE ENGINEER —"
 */
export function Eyebrow({
  children,
  className,
  dash = true,
  as: Component = "p",
  ...props
}: {
  dash?: boolean;
  as?: "p" | "span" | "div";
} & ComponentPropsWithoutRef<"p">) {
  return (
    <Component className={cn("eyebrow inline-flex items-center gap-3", className)} {...props}>
      <span>{children}</span>
      {dash ? <span aria-hidden="true" className="h-px w-6 bg-mist/70" /> : null}
    </Component>
  );
}
