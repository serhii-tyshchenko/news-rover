import { SetStateAction } from 'react';

import { getNewsByProvider } from '@core/api';

import { DEFAULT_POSTS_LIMIT } from '@constants';
import { TNews } from '@types';

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
