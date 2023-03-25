import { SetStateAction } from 'react';
import { TNews } from '../../App.types';

const PROD_ENV_URL = 'https://my-news-be.netlify.app/.netlify/functions/api/';

export async function fetchNews(
  provider: string,
  setNews: { (value: SetStateAction<TNews>): void; (arg0: any): void },
  setIsLoading: { (value: boolean): void; (arg0: boolean): void }
) {
  setIsLoading(true);

  try {
    const response = await fetch(
      `${PROD_ENV_URL}/rss/?provider=${provider}&limit=10`,
      {
        method: 'GET',
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
