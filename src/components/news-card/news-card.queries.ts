import { useQuery } from 'react-query';

import { getNewsByProvider } from '@api';
import {
  DEFAULT_AUTOREFERSH_INTERVAL,
  ONE_MINUTE_IN_MILLISECONDS,
} from '@constants';

interface IProps {
  id: string;
  limit: number;
  autorefresh?: boolean;
  autorefreshInterval?: number;
}

export const useNewsProviderData = ({
  id,
  limit,
  autorefresh = false,
  autorefreshInterval = DEFAULT_AUTOREFERSH_INTERVAL,
}: IProps) => {
  const { isLoading, error, data, refetch, isFetching } = useQuery(
    ['fetch-news-by-provider', id, limit],
    () => getNewsByProvider(id, limit),
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
