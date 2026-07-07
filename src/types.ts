export type Site = {
  TITLE: string;
  ALT_TITLE: string;
  DESCRIPTION: string;
  EMAIL: string;
  AUTHOR: string;
  OG_IMAGE: string;
  /** Twitter handle including the leading "@", if any. */
  TWITTER_HANDLE?: string;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type SocialLink = {
  name: string;
  url: string;
};
