import GithubSlugger from "github-slugger";

export type TocItem = {
  id: string;
  text: string;
  depth: 2 | 3;
};

/**
 * Extracts `##` and `###` headings from MDX source and slugs them with the
 * same algorithm `rehype-slug` uses, so TOC anchors always match rendered ids.
 */
export function extractToc(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  const withoutCode = source.replace(/```[\s\S]*?```/g, "");
  const items: TocItem[] = [];

  for (const line of withoutCode.split("\n")) {
    const match = /^(##|###)\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\*\*|__|`/g, "") // strip bold / code markers
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // strip links
      .trim();

    items.push({ id: slugger.slug(text), text, depth });
  }

  return items;
}
