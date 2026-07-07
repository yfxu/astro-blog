// @ts-check
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import rehypeFigure from "./src/plugins/rehype-figure.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://yfxu.net",
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        if (item.url.includes("/posts/")) {
          item.changefreq = "monthly";
          item.priority = 0.8;
        } else if (item.url.includes("/gallery/")) {
          item.changefreq = "monthly";
          item.priority = 0.6;
        } else {
          item.changefreq = "weekly";
          item.priority = 0.5;
        }
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeFigure],
  },
});
