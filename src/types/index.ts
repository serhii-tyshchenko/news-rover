import { Action } from 'redux';
import { ETheme, ELanguage } from '@constants';

export type TProvider = {
  id: string;
  name: string;
  description: string;
  url: string;
  homepage: string;
  logo: string;
  category: string;
};

export type TAddedProvider = {
  id: string;
  viewMode: EViewMode;
};

export type TNewsItem = {
  title: string;
  link: string;
  created: number;
  thumbnail: string | null;
  description: string;
};

export type TConfigMap = {
  [key: string]: string;
};

export type TEnclosure = {
  url: string;
  type: string;
  length: number;
};

export enum EViewMode {
  TitleOnly = 'title-only',
  TitleWithDescription = 'title-with-description',
  TitleWithThumbnail = 'title-with-thumbnail',
  Full = 'full',
}

export enum EEnclosureType {
  Image = 'image/jpeg',
  Video = 'video/mp4',
  Audio = 'audio/mpeg',
}

export type TBookmark = {
  id: string;
  title: string;
  link: string;
  created: number;
};

export type TSettings = {
  theme: ETheme;
  locale: ELanguage;
  animation: boolean;
  autorefresh: boolean;
  autorefreshInterval: number;
};

export interface IAction extends Action {
  payload?: any;
}

export type TDic = {
  add: string;
  addBookmark: string;
  animation: string;
  autorefresh: string;
  autorefreshInterval: string;
  bookmarks: string;
  category: {
    blogs: string;
    business: string;
    it: string;
    military: string;
    news: string;
    technology: string;
    science: string;
    softwareDevelopment: string;
    space: string;
  };
  changeAutorefreshInterval: string;
  changeLanguage: string;
  changeTheme: string;
  genericError: string;
  hideProvider: string;
  home: string;
  language: string;
  languages: TLanguageKeys;
  loadMore: string;
  noBookmarks: string;
  noNews: string;
  noProviders: string;
  providers: string;
  removeBookmark: string;
  refresh: string;
  settings: string;
  share: string;
  showDescription: string;
  showProvider: string;
  theme: string;
  themes: TThemeKeys;
  thumbnail: string;
  today: string;
  yesterday: string;
  viewMode: EViewMode;
};

type TThemeKeys = {
  [key in ETheme]: string;
};

type TLanguageKeys = {
  [key in ELanguage]: string;
};

export enum EControlSize {
  Small = 'small',
  Normal = 'normal',
  Big = 'big',
  Large = 'large',
}
