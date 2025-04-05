import {
  DEFAULT_POSTS_LIMIT,
  PROVIDERS_ROOT_URL,
  NEWS_ROOT_URL,
} from '@constants';

import { formatGetNewsByProviderResponse, isValidResponse } from '@utils';

export const getProviders = async () => {
  try {
    const response = await fetch(PROVIDERS_ROOT_URL);
    if (!isValidResponse(response)) {
      throw new Error('Error fetching providers');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getNewsByProvider = async (
  url: string,
  limit = DEFAULT_POSTS_LIMIT,
) => {
  try {
    const response = await fetch(`${NEWS_ROOT_URL}?url=${url}&limit=${limit}`);
    if (!isValidResponse(response)) {
      throw new Error('Error fetching news');
    }

    const data = await response.json();

    return formatGetNewsByProviderResponse(data);
  } catch (error) {
    throw error;
  }
};
