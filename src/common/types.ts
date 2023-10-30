export type TProvider = {
  id: string;
  name: string;
  description: string;
  url: string;
  homepage: string;
  logo: string;
  category: string;
};

export type TAddedProvider = string;

export type TAddedProviders = Array<TAddedProvider>;

export type TProviders = Array<TProvider>;

export type TNewsItem = {
  title: string;
  link: string;
  created: Date;
};

export type TNews = Array<TNewsItem>;

export type TConfigMap = {
  [key: string]: string;
};
