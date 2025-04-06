import { isEmpty } from 'lodash';
import { selectProvidersData, selectProvidersError } from '@store/selectors';
import { doAddProvider, doRemoveProvider } from '@store/actions';
import { useAppSelector, useAppDispatch, useLocalization } from '@hooks';
import { Card, CardList } from '@components/ui';
import { BaseLayout } from '@layout';

import ProviderList from './provider-list';

import {
  groupProvidersByCategory,
  getCategoryTitle,
} from './providers-page.utils';

function ProvidersPage() {
  const dic = useLocalization();

  const dispatch = useAppDispatch();
  const availableProviders = useAppSelector(selectProvidersData);
  const error = useAppSelector(selectProvidersError);

  const groupedProviders = groupProvidersByCategory(availableProviders);

  const handleAddProvider = (providerId: string) => {
    dispatch(doAddProvider(providerId));
  };

  const handleRemoveProvider = (providerId: string) => {
    dispatch(doRemoveProvider(providerId));
  };

  if (!isEmpty(error)) {
    return (
      <BaseLayout>
        <div className="flex items-center justify-center h-full p-2 text-center color-danger">
          {dic.genericError}
        </div>
      </BaseLayout>
    );
  }

  if (isEmpty(groupedProviders)) {
    return (
      <BaseLayout>
        <div className="flex items-center justify-center h-full p-2 text-center">
          {dic.noProviders}
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <CardList>
        {Object.keys(groupedProviders).map((category) => (
          <Card key={category} title={getCategoryTitle(category, dic)}>
            <ProviderList
              data={groupedProviders[category]}
              onAddProvider={handleAddProvider}
              onRemoveProvider={handleRemoveProvider}
            ></ProviderList>
          </Card>
        ))}
      </CardList>
    </BaseLayout>
  );
}

export default ProvidersPage;
