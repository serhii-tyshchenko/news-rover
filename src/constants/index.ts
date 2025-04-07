export * from './api';
export * from './app';

export const DEFAULT_POSTS_LIMIT = 10;

export const AUTHOR_NAME = 'Serhii Tyshchenko';

export const AUTHOR_SITE = 'https://github.com/serhii-tyshchenko';

export enum ETheme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
  LightBlue = 'light-blue',
  DarkBlue = 'dark-blue',
  DarkRed = 'dark-red',
}

export enum ELanguage {
  En = 'en',
  Uk = 'uk',
  Ge = 'de',
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

export const ONE_SECOND_IN_MILLISECONDS = 1000;

export const ONE_MINUTE_IN_MILLISECONDS = 60 * ONE_SECOND_IN_MILLISECONDS;

const autorefreshIntervals =
  import.meta.env.VITE_AUTOREFRESH_INTERVALS_MINUTES?.split(',').map(
    Number,
  ) ?? [5, 10, 15, 30, 60];

export const AUTOREFRESH_INTERVAL_OPTIONS = autorefreshIntervals.map(
  (value: number) => ({
    value,
    label: value.toString(),
  }),
);

export const DEFAULT_AUTOREFERSH_INTERVAL = autorefreshIntervals[0];

export const noop = () => {};
