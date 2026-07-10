import { type CollectionEntry, getCollection } from "astro:content";

export interface TagCount {
  tag: string;
  count: number;
}

export async function getGalleryTags(): Promise<TagCount[]> {
  const photos = await getCollection("gallery");
  const counts = new Map<string, number>();
  for (const photo of photos) {
    for (const tag of photo.data.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getGalleryIdsByTag(tag: string): Promise<string[]> {
  return (await getCollection("gallery"))
    .filter((photo: CollectionEntry<"gallery">) => photo.data.tags?.includes(tag))
    .map((photo) => photo.id);
}
