import {
  DEFAULT_POSTS_LIMIT,
  PROVIDERS_ROOT_URL,
  RSS_ROOT_URL,
} from '@constants';
import { formatNewsResponse, isValidResponse } from '@utils';

export const getProviders = async () => {
  const response = await fetch(PROVIDERS_ROOT_URL);
  if (!isValidResponse(response)) {
    throw new Error('Error fetching providers');
  }
  const data = await response.json();
  return data;
};

export const getNewsByProvider = async (
  id: string,
  limit = DEFAULT_POSTS_LIMIT,
) => {
  const response = await fetch(
    `${PROVIDERS_ROOT_URL}/${id}/news?limit=${limit}`,
  );
  if (!isValidResponse(response)) {
    throw new Error('Error fetching news');
  }

  const data = await response.json();

  return formatNewsResponse(data);
};

export const getNewsByRssUrl = async (
  url: string,
  limit = DEFAULT_POSTS_LIMIT,
) => {
  const response = await fetch(
    `${RSS_ROOT_URL}?url=${encodeURIComponent(url)}&limit=${limit}`,
  );
  if (!isValidResponse(response)) {
    throw new Error('Error fetching news');
  }

  const data = await response.json();

  return formatNewsResponse(data);
};
