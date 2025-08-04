import { useQuery } from 'react-query';

import { getProviders } from '@api';
import { ONE_MINUTE_IN_MILLISECONDS } from '@constants';

export const useProvidersData = (enabled = true) => {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery(['fetch-providers'], () => getProviders(), {
    refetchInterval: 60 * ONE_MINUTE_IN_MILLISECONDS,
    enabled,
  });
  return { isLoading, error, data };
};
