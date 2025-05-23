import { Link } from 'react-router-dom';

import { isEmpty } from 'lodash';

import { CardList, NewsCard } from '@components';
import { useAppSelector, useLocalization } from '@hooks';
import { BaseLayout } from '@layout';
import {
  selectAddedProviders,
  selectProvidersData,
  selectProvidersError,
} from '@store/selectors';
import { ERoute, TProvider } from '@types';

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
      <div className="flex items-center justify-center h-full p-2 text-center color-danger">
        {dic.genericError}
      </div>
    );
  }
  if (isEmpty(addedProvidersData)) {
    return (
      <div className="flex items-center justify-center h-full p-2 text-center">
        {dic.noProviders}&nbsp;<Link to={ERoute.Providers}>{dic.add}</Link>
      </div>
    );
  }

  return (
    <CardList>
      {addedProvidersData.map((provider: TProvider) => (
        <NewsCard key={provider.id} provider={provider} />
      ))}
    </CardList>
  );
}

export default HomePage;
