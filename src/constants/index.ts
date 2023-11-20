export const DEFAULT_POSTS_LIMIT = 10;

export const APP_NAME = 'NewsRover';

export const APP_VERSION = '1.4.0';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const LANGUAGES = {
  EN: 'en',
  UA: 'ua',
};

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

export const noop = () => {};
