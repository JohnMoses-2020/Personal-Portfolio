import type { ImageLoaderProps } from "next/image";
import variants from "@/lib/image-variants.generated.json";

/**
 * Custom next/image loader for the static export.
 *
 * Maps a request for `/images/<name>.jpg` at a given width to the pre-built
 * responsive WebP variant produced by scripts/optimize-images.mjs:
 *   /images/_opt/<name>-<width>.webp
 *
 * Picks the smallest available variant that is at least the requested width
 * (falling back to the largest). Unknown sources are returned unchanged.
 */
const manifest: Record<string, number[]> = variants;

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  const match = /^\/images\/([^/]+)\.(?:jpe?g|png)$/i.exec(src);
  if (!match) return src;

  const name = match[1];
  const widths = manifest[name];
  if (!widths || widths.length === 0) return src;

  const chosen = widths.find((candidate) => candidate >= width) ?? widths[widths.length - 1];
  return `/images/_opt/${name}-${chosen}.webp`;
}
