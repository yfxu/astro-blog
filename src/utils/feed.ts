import { parse } from "node-html-parser";

/** Tags that either don't render in a feed reader or are unsafe/pointless there. */
const DROP_TAGS = [
  "script",
  "style",
  "link",
  "template",
  "noscript",
  "canvas",
  "astro-island",
  "astro-slot",
];

/** URL schemes / forms that are already absolute and shouldn't be rewritten. */
function isAbsolute(url: string): boolean {
  return /^(?:[a-z]+:|\/\/|#|data:|mailto:|tel:)/i.test(url);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function absolutize(url: string | undefined, site: URL): string | undefined {
  if (!url || isAbsolute(url)) return url;
  try {
    return new URL(url, site).toString();
  } catch {
    return url;
  }
}

/**
 * Turn the server-rendered HTML of a post body into feed-safe `content:encoded`
 * HTML: replace <Figure> wrappers with their caption, drop non-rendering tags,
 * and rewrite relative image/link URLs to absolute ones.
 */
export function feedContent(html: string, site: URL | undefined): string {
  const root = parse(html, { comment: false });

  // Replace each <Figure> wrapper's subtree with its caption placeholder.
  for (const node of root.querySelectorAll("[data-rss-caption]")) {
    const caption = node.getAttribute("data-rss-caption") ?? "";
    node.replaceWith(`<p><em>${escapeHtml(caption)}</em></p>`);
  }

  // Drop tags that don't belong in a feed (scripts, islands, canvas, …).
  for (const tag of DROP_TAGS) {
    for (const node of root.querySelectorAll(tag)) node.remove();
  }

  // Rewrite relative URLs to absolute so readers can resolve them.
  if (site) {
    for (const img of root.querySelectorAll("img")) {
      const src = absolutize(img.getAttribute("src"), site);
      if (src) img.setAttribute("src", src);
    }
    for (const a of root.querySelectorAll("a")) {
      const href = absolutize(a.getAttribute("href"), site);
      if (href) a.setAttribute("href", href);
    }
    for (const source of root.querySelectorAll("source")) {
      const src = absolutize(source.getAttribute("src"), site);
      if (src) source.setAttribute("src", src);
    }
  }

  return root.toString();
}
