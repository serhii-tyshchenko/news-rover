import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import {
  selectProvidersLoading,
  selectAddedProvidersData,
} from '@store/selectors';
import { useAppSelector, useLocalization } from '@hooks';
import { BaseLayout } from '@layout';
import { NewsCard, CardList, AppLoader } from '@components';
import { TProvider } from '@types';
import { ERoute } from '@constants';

function HomePage() {
  const dic = useLocalization();
  const isLoading = useAppSelector(selectProvidersLoading);

  const addedProviders = useAppSelector(selectAddedProvidersData);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <BaseLayout>
      {!isLoading && isEmpty(addedProviders) && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-center">
          {dic.noProviders}&nbsp;<Link to={ERoute.Providers}>{dic.add}</Link>
        </div>
      )}
      {!isLoading && !isEmpty(addedProviders) && (
        <CardList>
          {addedProviders.map((provider: TProvider) => (
            <NewsCard key={provider.id} provider={provider} />
          ))}
        </CardList>
      )}
    </BaseLayout>
  );
}

export default HomePage;
