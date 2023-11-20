import { SetStateAction } from 'react';

import { getNewsByProvider } from '@core/api';

import { DEFAULT_POSTS_LIMIT } from '@constants';
import { TNews, TNewsItem, TBookmark, TDic } from '@types';

export async function fetchNews(
  provider: string,
  setNews: { (value: SetStateAction<TNews>): void; (arg0: any): void },
  setIsLoading: { (value: boolean): void; (arg0: boolean): void }
) {
  setIsLoading(true);

  try {
    const response = await getNewsByProvider(provider, DEFAULT_POSTS_LIMIT);
    setNews(response);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
}

export const checkIfBookmarked = (
  bookmarks: Array<TBookmark>,
  item: TNewsItem
) => bookmarks.some((bookmark) => bookmark.link === item.link);

type TGetConfig = {
  dic: TDic;
  handleHideProvider: () => void;
  handleRefresh: () => void;
  isLoading: boolean;
};

export const getConfig = ({
  dic,
  handleHideProvider,
  handleRefresh,
  isLoading,
}: TGetConfig) => [
  {
    icon: 'eye-off',
    title: dic.hideProvider,
    onClick: handleHideProvider,
  },
  {
    icon: 'arrows-cw',
    title: dic.refresh,
    onClick: handleRefresh,
    className: isLoading ? 'animation-rotate' : '',
  },
];
