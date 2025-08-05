import { isEmpty } from 'lodash-es';

import { Card, CardList } from '@components';
import { EmptyState, ErrorState } from '@components/ui';
import { useAppDispatch, useAppSelector, useLocalization } from '@hooks';
import { useProvidersData } from '@queries';
import { doAddProvider, doRemoveProvider } from '@store/actions';
import { selectLocale } from '@store/selectors';

import ProviderList from './components/provider-list';
import { groupProvidersByCategory } from './providers-page.utils';

function ProvidersPage() {
  const dic = useLocalization();

  const dispatch = useAppDispatch();
  const { isLoading, error, data: availableProviders } = useProvidersData();

  const locale = useAppSelector(selectLocale);

  const groupedProviders = groupProvidersByCategory(
    availableProviders,
    locale,
    dic,
  );

  const handleAddProvider = (providerId: string) => {
    dispatch(doAddProvider(providerId));
  };

  const handleRemoveProvider = (providerId: string) => {
    dispatch(doRemoveProvider(providerId));
  };

  if (isLoading) {
    return <EmptyState>{dic.loading}</EmptyState>;
  }

  if (!isEmpty(error)) {
    return <ErrorState>{dic.genericError}</ErrorState>;
  }

  if (isEmpty(availableProviders)) {
    return <EmptyState>{dic.noProviders}</EmptyState>;
  }

  return (
    <CardList>
      {groupedProviders.map((provider) => (
        <Card key={provider.category} title={provider.title}>
          <ProviderList
            data={provider.data}
            onAddProvider={handleAddProvider}
            onRemoveProvider={handleRemoveProvider}
          ></ProviderList>
        </Card>
      ))}
    </CardList>
  );
}

export default ProvidersPage;
