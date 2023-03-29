import { SetStateAction } from 'react';
import { POSTS_LIMIT, API_URL } from 'common/constants';
import { TNews } from 'App.types';

export async function fetchNews(
  provider: string,
  setNews: { (value: SetStateAction<TNews>): void; (arg0: any): void },
  setIsLoading: { (value: boolean): void; (arg0: boolean): void }
) {
  setIsLoading(true);

  try {
    const response = await fetch(
      `${API_URL}rss/?provider=${provider}&limit=${POSTS_LIMIT}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    setNews(data);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
}

export const convertDate = (date: Date) => {
  const rawDate = new Date(date);
  const hours = rawDate.getHours();
  const minutes = rawDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
