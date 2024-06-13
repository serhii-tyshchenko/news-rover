import {
  DEFAULT_POSTS_LIMIT,
  PROVIDERS_ROOT_URL,
  NEWS_ROOT_URL,
} from '@constants';

const formatResponse = (rawData: { data: any[]; count: number }) => ({
  data: rawData.data.map((item) => ({
    created: item.created,
    title: item.title,
    link: item.link,
    thumbnail: item?.enclosures[0]?.url || null,
  })),
  count: rawData.count,
});

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
    return formatResponse(data);
  } catch (error) {
    throw error;
  }
};
