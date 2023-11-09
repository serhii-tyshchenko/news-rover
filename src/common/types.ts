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

export type TBookmark = {
  id: string;
  title: string;
  link: string;
  created: Date;
};

export type TSettings = {
  theme: string;
  locale: string;
};

export type TAction = {
  type: string;
  payload?: any;
};

export type TDispatch = (arg0: TAction) => void;
