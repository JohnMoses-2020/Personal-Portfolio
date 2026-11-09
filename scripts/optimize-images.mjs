#!/usr/bin/env node
/**
 * Build-time image optimization for the static export.
 *
 * For every photo in public/images/*.{jpg,jpeg,png} this generates responsive
 * WebP variants in public/images/_opt/<name>-<width>.webp (never upscaling)
 * and writes lib/image-variants.generated.json, which the custom next/image
 * loader (lib/image-loader.ts) uses to pick the right file for a given width.
 *
 * Idempotent: existing variants that are newer than their source are skipped.
 * Runs automatically via the `predev` and `prebuild` npm hooks.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIR = path.join(ROOT, "public", "images");
const OUTPUT_DIR = path.join(SOURCE_DIR, "_opt");
const MANIFEST_PATH = path.join(ROOT, "lib", "image-variants.generated.json");

/** Candidate widths; each image gets those ≤ its own width, plus its native width. */
const WIDTHS = [256, 384, 640, 768, 1024, 1280, 1600, 1920];
const WEBP_QUALITY = 78;

async function isFresh(outputPath, sourceMtimeMs) {
  try {
    const info = await stat(outputPath);
    return info.mtimeMs >= sourceMtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const sources = (await readdir(SOURCE_DIR)).filter((file) => /\.(jpe?g|png)$/i.test(file));
  const manifest = {};
  let generated = 0;
  let skipped = 0;

  for (const file of sources.sort()) {
    const name = file.replace(/\.[^.]+$/, "");
    const sourcePath = path.join(SOURCE_DIR, file);
    const source = await stat(sourcePath);
    const metadata = await sharp(sourcePath).metadata();
    const sourceWidth = metadata.width ?? 0;

    const widths = [...new Set([...WIDTHS.filter((w) => w < sourceWidth), sourceWidth])].sort(
      (a, b) => a - b,
    );
    manifest[name] = widths;

    for (const width of widths) {
      const outputPath = path.join(OUTPUT_DIR, `${name}-${width}.webp`);
      if (await isFresh(outputPath, source.mtimeMs)) {
        skipped += 1;
        continue;
      }
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 5 })
        .toFile(outputPath);
      generated += 1;
    }
  }

  const json = `${JSON.stringify(manifest, null, 2)}\n`;
  const previous = await readFile(MANIFEST_PATH, "utf8").catch(() => "");
  if (previous !== json) {
    await writeFile(MANIFEST_PATH, json);
  }

  const digest = createHash("sha1").update(json).digest("hex").slice(0, 8);
  console.log(
    `images: ${sources.length} sources, ${generated} variants generated, ${skipped} up to date (manifest ${digest})`,
  );
}

main().catch((error) => {
  console.error("optimize-images failed:", error);
  process.exit(1);
});
