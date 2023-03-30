import { API_URL, DEFAULT_POSTS_LIMIT } from 'common/constants';

const PROVIDERS_ROOT = `${API_URL}providers`;
const NEWS_ROOT = `${API_URL}rss/`;

export const getProviders = async () => {
  try {
    const response = await fetch(PROVIDERS_ROOT);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNewsByProvider = async (
  provider: string,
  limit = DEFAULT_POSTS_LIMIT
) => {
  try {
    const response = await fetch(
      `${NEWS_ROOT}?provider=${provider}&limit=${limit}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
