// @ts-check
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

import rehypeFigure from "./src/plugins/rehype-figure.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeFigure],
  },
});
