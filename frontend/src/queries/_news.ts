import { getNewsByProvider } from '@api';
import {
  DEFAULT_AUTOREFERSH_INTERVAL,
  ONE_MINUTE_IN_MILLISECONDS,
} from '@constants';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  autorefresh?: boolean;
  autorefreshInterval?: number;
  id: string;
  limit: number;
  refreshOnFocus?: boolean;
}

export const useProviderNewsData = ({
  autorefresh = false,
  autorefreshInterval = DEFAULT_AUTOREFERSH_INTERVAL,
  id,
  limit,
  refreshOnFocus = false,
}: IProps) => {
  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ['fetch-news-by-provider', id, limit],
    queryFn: () => getNewsByProvider(id, limit),
    refetchOnWindowFocus: refreshOnFocus,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: autorefresh
      ? autorefreshInterval * ONE_MINUTE_IN_MILLISECONDS
      : false,
    refetchIntervalInBackground: autorefresh,
  });
  return { isLoading, error, data, refetch, isFetching };
};
