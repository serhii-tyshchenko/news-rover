import { SetStateAction } from 'react';

import { getNewsByProvider } from 'core/api';

import { DEFAULT_POSTS_LIMIT } from 'common/constants';
import { TNews } from 'common/types';

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

export const formatTime = (date: Date) => {
  const rawDate = new Date(date);
  const hours = rawDate.getHours().toString().padStart(2, '0');
  const minutes = rawDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
