"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  image: SiteImage;
  /** Maximum vertical travel in pixels. Keep it subtle. */
  strength?: number;
  priority?: boolean;
  sizes?: string;
  quality?: 60 | 75 | 85;
  className?: string;
  imageClassName?: string;
  /** CSS object-position for the photo, e.g. "70% 50%". */
  position?: string;
};

/**
 * Full-bleed photograph with a subtle scroll parallax. Uses a single
 * requestAnimationFrame-throttled scroll listener and a CSS variable, so the
 * image itself is still a plain optimized <Image>. Disabled when the user
 * prefers reduced motion.
 */
export function ParallaxImage({
  image,
  strength = 36,
  priority = false,
  sizes = "100vw",
  quality = 75,
  className,
  imageClassName,
  position = "center",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const center = rect.top + rect.height / 2 - viewport / 2;
      const range = viewport / 2 + rect.height / 2;
      const progress = Math.max(-1, Math.min(1, center / range));
      element.style.setProperty("--parallax", `${(progress * -strength).toFixed(1)}px`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={cn("object-cover will-change-transform", imageClassName)}
        style={{
          objectPosition: position,
          transform: "translate3d(0, var(--parallax, 0px), 0) scale(1.08)",
        }}
      />
    </div>
  );
}
