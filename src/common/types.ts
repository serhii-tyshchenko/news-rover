export type TProvider = {
  id: string;
  name: string;
  description: string;
  url: string;
  homepage: string;
  logo: string;
};

export type TAddedProvider = string;

export type TAddedProviders = Array<TAddedProvider>;

export type TProviders = Array<TProvider>;

type TNewsItem = {
  title: string;
  link: string;
  time: string;
};

export type TNews = Array<TNewsItem>;

export type TConfigMap = {
  [key: string]: string;
};
