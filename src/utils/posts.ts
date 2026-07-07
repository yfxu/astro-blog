import type { CollectionEntry } from "astro:content";

/**
 * Build a plain-text excerpt from Markdown/MDX body text, stripping syntax so
 * it's safe to drop into a <meta description> or RSS <description>.
 */
export function excerpt(body: string | undefined, length = 155): string {
  if (!body) return "";
  return body
    .replace(/^import .*$/gm, "") // drop MDX import lines
    .replace(/^---[\s\S]*?---/, "") // drop any leftover frontmatter
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/[#>*_`~]/g, "") // markdown punctuation
    .replace(/<[^>]+>/g, "") // stray html/jsx tags
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, length);
}

/**
 * Resolve a post's description: prefer an explicit frontmatter description,
 * otherwise fall back to an excerpt of the body, then the title.
 */
export function postDescription(post: CollectionEntry<"posts">): string {
  if (post.data.description) return post.data.description;
  const ex = excerpt(post.body);
  return ex ? `${ex}…` : post.data.title;
}
