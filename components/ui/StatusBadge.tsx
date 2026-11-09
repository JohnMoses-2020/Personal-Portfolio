import { statusLabels, type ContentStatus } from "@/lib/content";
import { cn } from "@/lib/utils";

const styles: Record<ContentStatus, string> = {
  draft: "border-line text-muted",
  "in-progress": "border-accent/50 text-accent",
  published: "border-[#8fb9a8]/50 text-[#a9d1c2]",
};

const dots: Record<ContentStatus, string> = {
  draft: "bg-muted",
  "in-progress": "bg-accent",
  published: "bg-[#a9d1c2]",
};

export function StatusBadge({
  status,
  className,
  hidePublished = false,
}: {
  status: ContentStatus;
  className?: string;
  /** Published is the default state; hide the badge for it in lists. */
  hidePublished?: boolean;
}) {
  if (hidePublished && status === "published") return null;
  return (
    <span
      className={cn(
        "meta inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.625rem]",
        styles[status],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dots[status])} />
      {statusLabels[status]}
    </span>
  );
}
