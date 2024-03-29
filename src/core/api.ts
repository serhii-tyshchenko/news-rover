import { DEFAULT_POSTS_LIMIT } from '@constants';

import { PROVIDERS_ROOT_URL, NEWS_ROOT_URL } from './api.contants';

export const getProviders = async () => {
  try {
    const response = await fetch(PROVIDERS_ROOT_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNewsByProvider = async (
  provider: string,
  limit = DEFAULT_POSTS_LIMIT,
) => {
  try {
    const response = await fetch(
      `${NEWS_ROOT_URL}?provider=${provider}&limit=${limit}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
