import {
  DEFAULT_POSTS_LIMIT,
  NEWS_ROOT_URL,
  PROVIDERS_ROOT_URL,
} from '@constants';
import { formatGetNewsByProviderResponse, isValidResponse } from '@utils';

export const getProviders = async () => {
  const response = await fetch(PROVIDERS_ROOT_URL);
  if (!isValidResponse(response)) {
    throw new Error('Error fetching providers');
  }
  const data = await response.json();
  return data;
};

export const getNewsByProvider = async (
  url: string,
  limit = DEFAULT_POSTS_LIMIT,
) => {
  const response = await fetch(`${NEWS_ROOT_URL}?url=${url}&limit=${limit}`);
  if (!isValidResponse(response)) {
    throw new Error('Error fetching news');
  }

  const data = await response.json();

  return formatGetNewsByProviderResponse(data);
};
