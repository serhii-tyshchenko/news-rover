import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import {
  selectAddedProvidersData,
  selectProvidersError,
} from '@store/selectors';
import { useAppSelector, useLocalization } from '@hooks';
import { BaseLayout } from '@layout';
import { NewsCard, CardList } from '@components';
import { TProvider } from '@types';
import { ERoute } from '@constants';

function HomePage() {
  const dic = useLocalization();

  const addedProviders = useAppSelector(selectAddedProvidersData);
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
        {addedProviders.map((provider: TProvider) => (
          <NewsCard key={provider.id} provider={provider} />
        ))}
      </CardList>
    </BaseLayout>
  );
}

export default HomePage;
