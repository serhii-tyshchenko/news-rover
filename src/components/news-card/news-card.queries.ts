import { useQuery } from 'react-query';

import {
  DEFAULT_AUTOREFERSH_INTERVAL,
  ONE_MINUTE_IN_MILLISECONDS,
} from '@constants';
import { getNewsByProvider } from '@core/api';

interface IProps {
  url: string;
  limit: number;
  autorefresh?: boolean;
  autorefreshInterval?: number;
}

export const useNewsProviderData = ({
  url,
  limit,
  autorefresh = false,
  autorefreshInterval = DEFAULT_AUTOREFERSH_INTERVAL,
}: IProps) => {
  const { isLoading, error, data, refetch, isFetching } = useQuery(
    ['fetch-news-by-provider', url, limit],
    () => getNewsByProvider(url, limit),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: autorefresh
        ? autorefreshInterval * ONE_MINUTE_IN_MILLISECONDS
        : false,
      refetchIntervalInBackground: autorefresh,
    },
  );
  return { isLoading, error, data, refetch, isFetching };
};
