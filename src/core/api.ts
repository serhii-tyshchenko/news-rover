import { API_URL, DEFAULT_POSTS_LIMIT } from 'common/constants';

export const getProviders = async () => {
  try {
    const response = await fetch(`${API_URL}/providers`);
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
    const response = await fetch(`${API_URL}/news/${provider}?limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
