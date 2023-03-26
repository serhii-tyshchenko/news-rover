export type TNewsItem = {
  title: string;
  link: string;
  time: string;
};

export type TConfigMap = {
  [key: string]: string;
};

export type TNews = TNewsItem[];
