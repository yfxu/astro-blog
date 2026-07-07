import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    location: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    imageUrl: z.string(),
    width: z.number(),
    height: z.number(),
    tags: z.array(z.string()).optional(),
    location: z.string().optional(),
    caption: z.string().optional(),
  }),
});

export const collections = { posts, gallery };