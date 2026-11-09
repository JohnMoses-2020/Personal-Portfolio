const WORDS_PER_MINUTE = 220;

/** Estimates reading time (in whole minutes, minimum 1) for Markdown/MDX source. */
export function estimateReadingTime(source: string) {
  const text = source
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/<[^>]+>/g, " ") // JSX / HTML tags
    .replace(/[#>*_`~\-|]/g, " "); // markdown punctuation

  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
