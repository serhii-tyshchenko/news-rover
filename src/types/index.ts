import { Action } from 'redux';
import { EAnimation } from '@constants';

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
  created: number;
  thumbnail?: string;
};

export type TNews = Array<TNewsItem>;

export type TConfigMap = {
  [key: string]: string;
};

export type TBookmark = {
  id: string;
  title: string;
  link: string;
  created: number;
};

export type TSettings = {
  theme: string;
  locale: string;
  animation: EAnimation;
};

export interface IAction extends Action {
  payload?: any;
}

export type TDic = {
  home: string;
  changeLanguage: string;
  changeTheme: string;
  refresh: string;
  loading: string;
  providers: string;
  showProvider: string;
  hideProvider: string;
  noProviders: string;
  bookmarks: string;
  addBookmark: string;
  removeBookmark: string;
  noBookmarks: string;
  share: string;
  settings: string;
  theme: string;
  language: string;
  animation: string;
  category: {
    business: string;
    it: string;
    military: string;
    news: string;
    technology: string;
    science: string;
    softwareDevelopment: string;
    space: string;
  };
  noNews: string;
  genericError: string;
  today: string;
  yesterday: string;
  loadMore: string;
};
