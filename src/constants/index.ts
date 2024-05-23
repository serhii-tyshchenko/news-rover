export const DEFAULT_POSTS_LIMIT = 10;

export const APP_NAME = 'NewsRover';

export const APP_VERSION = '1.6.1';

export const AUTHOR_NAME = 'Serhii Tyshchenko';

export const AUTHOR_SITE = 'https://github.com/serhii-tyshchenko';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
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

export const noop = () => {};
