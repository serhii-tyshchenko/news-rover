import { isEmpty } from 'lodash-es';

import { Card, CardList, CardListSkeleton } from '@components';
import { EmptyState, ErrorState } from '@components/ui';
import { DEFAULT_CARD_COUNT } from '@constants';
import { useLocalization } from '@hooks';
import { useProvidersData } from '@queries';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { doAddProvider, doRemoveProvider, selectLocale } from '@store/slices';
import { EViewMode } from '@types';

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
    dispatch(
      doAddProvider({
        id: providerId,
        viewMode: EViewMode.TitleOnly,
      }),
    );
  };

  const handleRemoveProvider = (providerId: string) => {
    dispatch(doRemoveProvider(providerId));
  };

  if (isLoading) {
    return (
      <CardListSkeleton
        cardCount={availableProviders.length || DEFAULT_CARD_COUNT}
      />
    );
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
