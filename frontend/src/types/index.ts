import { Action } from 'redux';

export enum ETheme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
  LightBlue = 'light-blue',
  DarkBlue = 'dark-blue',
  LightGreen = 'light-green',
  DarkGreen = 'dark-green',
  LightRed = 'light-red',
  DarkRed = 'dark-red',
}

export enum ELocale {
  EnUS = 'en-US',
  Uk = 'uk',
  DeDE = 'de-DE',
}

export enum ERoute {
  Home = '/',
  Bookmarks = 'bookmarks',
  Providers = 'providers',
}

// TODO add rest icons
export enum EIcon {
  ArrowsCW = 'arrows-cw',
  Bookmark = 'bookmark',
  BookmarkEmpty = 'bookmark-empty',
  Cancel = 'cancel',
  Rss = 'rss',
  Moon = 'moon',
  Sun = 'sun',
  Settings = 'cog',
  Eye = 'eye',
  EyeOff = 'eye-off',
  ThList = 'th-list',
  ThLarge = 'th-large',
  Share = 'share',
}

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

export type TRawNewsItem = {
  created: number;
  title: string;
  link: string;
  enclosures?: TEnclosure[];
  description?: string;
};

export type TNewsItem = {
  title: string;
  link: string;
  created: number;
  thumbnail: string | null;
  description: string | undefined;
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

export type TSettings = {
  theme: ETheme;
  locale: ELocale;
  animation: boolean;
  autorefresh: boolean;
  autorefreshInterval: number;
};

export interface IAction<T = unknown> extends Action {
  type: string;
  payload?: T;
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
  languages: Record<ELocale, string>;
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

export enum EControlSize {
  Small = 'small',
  Normal = 'normal',
  Big = 'big',
  Large = 'large',
}

export type TBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
