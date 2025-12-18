import type { Metadata, Site } from "@types";

export const SITE: Site = {
  TITLE: "yfxu.net",
  ALT_TITLE: "徐逸飞",
  DESCRIPTION: "Yifei's blog",
  EMAIL: "yifei@yfxu.net",
}

export const HOME_METADATA: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "home page",
}

export const POSTS_METADATA: Metadata = {
  TITLE: "Posts",
  DESCRIPTION: "blog posts",
}

export const ABOUT_METADATA: Metadata = {
  TITLE: "About",
  DESCRIPTION: "about the author",
}

export const GALLERY_METADATA: Metadata = {
  TITLE: "Gallery",
  DESCRIPTION: "photography gallery",
}

export const SOCIAL_LINKS = [
  { name: "github", url: "https://github.com/yfxu" },
  { name: "osu!", url: "https://osu.ppy.sh/users/3214844" },
  { name: "email", url: "mailto:yifei@yfxu.net" },
  { name: "youtube", url: "https://www.youtube.com/@yifei-xu" },
]