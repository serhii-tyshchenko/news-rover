import { getNewsByProvider } from '@api';
import {
  DEFAULT_AUTOREFERSH_INTERVAL,
  ONE_MINUTE_IN_MILLISECONDS,
} from '@constants';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  id: string;
  limit: number;
  autorefresh?: boolean;
  autorefreshInterval?: number;
}

export const useProviderNewsData = ({
  id,
  limit,
  autorefresh = false,
  autorefreshInterval = DEFAULT_AUTOREFERSH_INTERVAL,
}: IProps) => {
  const { isLoading, error, data, refetch, isFetching } = useQuery({
    queryKey: ['fetch-news-by-provider', id, limit],
    queryFn: () => getNewsByProvider(id, limit),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: autorefresh
      ? autorefreshInterval * ONE_MINUTE_IN_MILLISECONDS
      : false,
    refetchIntervalInBackground: autorefresh,
  });
  return { isLoading, error, data, refetch, isFetching };
};
