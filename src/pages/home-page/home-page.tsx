import {
  selectProvidersData,
  selectProvidersIsLoading,
  selectAddedProviders,
} from 'store/selectors';

import { useAppSelector } from 'common/hooks';

import { isEmpty } from 'lodash';
import { BaseLayout } from 'layout';
import { Widget } from 'components/organisms';

import { TAddedProviders, TProvider } from 'common/types';

function HomePage() {
  const isLoading = useAppSelector(selectProvidersIsLoading);
  const providers = useAppSelector(selectProvidersData);
  const addedProvidersIds: TAddedProviders =
    useAppSelector(selectAddedProviders);

  const addedProviders = providers?.filter((provider: TProvider) =>
    addedProvidersIds?.includes(provider.id)
  );

  return (
    <BaseLayout>
      {isLoading && <div className="text-align-center">Loading...</div>}
      {!isLoading && isEmpty(addedProviders) && (
        <div className="text-align-center">
          No providers added. Click settings icon to add.
        </div>
      )}
      {!isLoading && !isEmpty(addedProviders) && (
        <ul className="widget-list">
          {addedProviders.map((provider: TProvider) => (
            <Widget key={provider.id} provider={provider} />
          ))}
        </ul>
      )}
    </BaseLayout>
  );
}

export default HomePage;
