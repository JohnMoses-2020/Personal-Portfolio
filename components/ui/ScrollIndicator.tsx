import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollIndicator({ href, className }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      aria-label="Scroll to next section"
      className={cn(
        "group inline-flex flex-col items-center gap-1 text-mist/70 transition-colors hover:text-accent",
        className,
      )}
    >
      <span className="h-6 w-px bg-current opacity-40" aria-hidden="true" />
      <ChevronDown aria-hidden="true" className="animate-drift size-4" />
    </a>
  );
}
