import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { selectAddedProvidersData } from '@store/selectors';
import { useAppSelector, useLocalization } from '@hooks';
import { BaseLayout } from '@layout';
import { NewsCard, CardList } from '@components';
import { TProvider } from '@types';
import { ERoute } from '@constants';

function HomePage() {
  const dic = useLocalization();

  const addedProviders = useAppSelector(selectAddedProvidersData);

  return (
    <BaseLayout>
      {isEmpty(addedProviders) && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-center">
          {dic.noProviders}&nbsp;<Link to={ERoute.Providers}>{dic.add}</Link>
        </div>
      )}
      {!isEmpty(addedProviders) && (
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
