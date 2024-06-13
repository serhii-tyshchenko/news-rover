import { useQuery } from 'react-query';
import { getNewsByProvider } from '@core/api';

export const useNewsProviderData = (providerId: string, limit: number) => {
  const { isLoading, error, data, refetch, isFetching } = useQuery(
    ['fetch-news-by-provider', providerId, limit],
    () => getNewsByProvider(providerId, limit),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );
  return { isLoading, error, data, refetch, isFetching };
};
