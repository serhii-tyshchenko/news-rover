import { first } from 'lodash-es';

import { author, version } from '../../package.json';

export * from './api';

export const APP_NAME = 'NewsRover';
export const APP_VERSION = version;
export const DEFAULT_POSTS_LIMIT = 10;
export const AUTHOR_NAME = author.name;
export const AUTHOR_SITE = author.url;

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
export const DEFAULT_AUTOREFERSH_INTERVAL =
  (first(autorefreshIntervals) as number) || 5;

export const DEFAULT_CARD_COUNT = 4;
