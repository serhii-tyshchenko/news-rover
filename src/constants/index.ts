export * from './api';
export * from './app';

export const DEFAULT_POSTS_LIMIT = 10;

export const AUTHOR_NAME = 'Serhii Tyshchenko';

export const AUTHOR_SITE = 'https://github.com/serhii-tyshchenko';

export const THEMES = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
  DARK_BLUE: 'dark-blue',
  DARK_RED: 'dark-red',
};

export const LANGUAGES = {
  EN: 'en',
  UA: 'ua',
};

export enum EAnimation {
  On = 'on',
  Off = 'off',
  System = 'system',
}

export enum EThumbnail {
  On = 'on',
  Off = 'off',
}

export enum ERoute {
  Home = '/',
  Bookmarks = '/bookmarks',
  Providers = '/providers',
}

export enum EIcon {
  Bookmark = 'bookmark',
  BookmarkEmpty = 'bookmark-empty',
  Rss = 'rss',
  Moon = 'moon',
  Sun = 'sun',
  Settings = 'cog',
}

export const portalRoot = document.getElementById('portal-root') as HTMLElement;

export const ONE_SECOND = 1000;

export const ONE_MINUTE = 60 * ONE_SECOND;

export const noop = () => {};
