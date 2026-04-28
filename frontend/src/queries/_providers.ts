import { getProviders } from '@api';
import { ONE_MINUTE_IN_MILLISECONDS } from '@constants';
import { useQuery } from '@tanstack/react-query';

export const useProvidersData = () => {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery({
    queryKey: ['fetch-providers'],
    queryFn: () => getProviders(),
    refetchInterval: 60 * ONE_MINUTE_IN_MILLISECONDS,
  });

  return { isLoading, error, data };
};
