import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

type PhotoBackdropProps = {
  image: SiteImage;
  /** Photo anchored to the right half (hero style) or spanning the full width. */
  variant?: "right" | "full";
  position?: string;
  priority?: boolean;
  className?: string;
  /** Extra darkening for text legibility (0–1). */
  dim?: number;
};

/**
 * Cinematic photo layer that blends into the dark page background on the
 * left and bottom. Sits behind positioned content (parent must be relative).
 */
export function PhotoBackdrop({
  image,
  variant = "right",
  position = "center",
  priority = false,
  className,
  dim = 0,
}: PhotoBackdropProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-full",
          variant === "right" ? "photo-fade-left md:w-[70%]" : "photo-fade-bottom",
        )}
      >
        <ParallaxImage
          image={image}
          priority={priority}
          quality={75}
          position={position}
          sizes={variant === "right" ? "(min-width: 768px) 70vw, 100vw" : "100vw"}
          className="animate-fade"
        />
      </div>
      {dim > 0 ? (
        <div className="absolute inset-0 bg-ink" style={{ opacity: dim }} />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-ink/10",
          variant === "right" ? "md:from-ink/70 md:via-ink/15 md:to-transparent" : "md:from-ink/60 md:via-ink/20 md:to-ink/20",
        )}
      />
    </div>
  );
}
