import { Action } from 'redux';
import { EAnimation, EThumbnail } from '@constants';

export type TProvider = {
  id: string;
  name: string;
  description: string;
  url: string;
  homepage: string;
  logo: string;
  category: string;
};

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
  thumbnail: EThumbnail;
};

export interface IAction extends Action {
  payload?: any;
}

export type TDic = {
  addBookmark: string;
  animation: string;
  bookmarks: string;
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
  changeLanguage: string;
  changeTheme: string;
  genericError: string;
  hideProvider: string;
  home: string;
  language: string;
  loading: string;
  loadMore: string;
  noBookmarks: string;
  noNews: string;
  noProviders: string;
  providers: string;
  removeBookmark: string;
  refresh: string;
  settings: string;
  share: string;
  showProvider: string;
  theme: string;
  thumbnail: string;
  today: string;
  yesterday: string;
};
