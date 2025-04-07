import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import {
  selectAddedProviders,
  selectProvidersData,
  selectProvidersError,
} from '@store/selectors';
import { useAppSelector, useLocalization } from '@hooks';
import { BaseLayout } from '@layout';
import { NewsCard, CardList } from '@components';
import { TProvider } from '@types';
import { ERoute } from '@constants';

function HomePage() {
  const dic = useLocalization();

  const availableProviders = useAppSelector(selectProvidersData) ?? [];
  const addedProviders = useAppSelector(selectAddedProviders);
  const addedProvidersData = availableProviders.filter((provider: TProvider) =>
    addedProviders.some((addedProvider) => addedProvider.id === provider.id),
  );
  const error = useAppSelector(selectProvidersError);

  if (!isEmpty(error)) {
    return (
      <BaseLayout>
        <div className="flex items-center justify-center h-full p-2 text-center color-danger">
          {dic.genericError}
        </div>
      </BaseLayout>
    );
  }
  if (isEmpty(addedProviders)) {
    return (
      <BaseLayout>
        <div className="flex items-center justify-center h-full p-2 text-center">
          {dic.noProviders}&nbsp;<Link to={ERoute.Providers}>{dic.add}</Link>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <CardList>
        {addedProvidersData.map((provider: TProvider) => (
          <NewsCard key={provider.id} provider={provider} />
        ))}
      </CardList>
    </BaseLayout>
  );
}

export default HomePage;
