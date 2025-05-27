import { isEmpty } from 'lodash';

import { Card, CardList } from '@components/ui';
import { useAppDispatch, useAppSelector, useLocalization } from '@hooks';
import { doAddProvider, doRemoveProvider } from '@store/actions';
import {
  selectLocale,
  selectProvidersData,
  selectProvidersError,
} from '@store/selectors';

import ProviderList from './provider-list';
import { groupProvidersByCategory } from './providers-page.utils';

function ProvidersPage() {
  const dic = useLocalization();

  const dispatch = useAppDispatch();
  const availableProviders = useAppSelector(selectProvidersData);
  const error = useAppSelector(selectProvidersError);
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

  if (!isEmpty(error)) {
    return (
      <div className="flex items-center justify-center h-full p-2 text-center color-danger">
        {dic.genericError}
      </div>
    );
  }

  if (isEmpty(groupedProviders)) {
    return (
      <div className="flex items-center justify-center h-full p-2 text-center">
        {dic.noProviders}
      </div>
    );
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
