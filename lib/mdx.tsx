import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx/MdxComponents";

const prettyCodeOptions: PrettyCodeOptions = {
  // Muted dark theme that sits well on the navy/charcoal palette.
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: "plaintext",
};

/**
 * Compiles MDX source into React elements at build time.
 * Frontmatter is parsed separately by lib/content.ts, so it's stripped here.
 */
export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });
  return content;
}
