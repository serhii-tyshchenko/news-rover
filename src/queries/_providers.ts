import { useQuery } from 'react-query';

import { getProviders } from '@api';
import { ONE_MINUTE_IN_MILLISECONDS } from '@constants';

export const useProvidersData = () => {
  const {
    isLoading,
    error,
    data = [],
  } = useQuery(['fetch-providers'], () => getProviders(), {
    refetchInterval: 60 * ONE_MINUTE_IN_MILLISECONDS,
  });
  return { isLoading, error, data };
};
