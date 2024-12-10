import { useQuery } from 'react-query';
import { getNewsByProvider } from '@core/api';
import { AUTOREFRESH_INTERVAL } from '@constants';

export const useNewsProviderData = (
  url: string,
  limit: number,
  autorefresh: boolean = false,
) => {
  const { isLoading, error, data, refetch, isFetching } = useQuery(
    ['fetch-news-by-provider', url, limit],
    () => getNewsByProvider(url, limit),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: autorefresh ? AUTOREFRESH_INTERVAL : false,
      refetchIntervalInBackground: autorefresh,
    },
  );
  return { isLoading, error, data, refetch, isFetching };
};
