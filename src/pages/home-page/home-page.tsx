import { isEmpty } from 'lodash';

import {
  selectProvidersData,
  selectProvidersIsLoading,
  selectAddedProviders,
} from '@store/selectors';
import { useAppSelector, useLocalization } from '@hooks';
import { BaseLayout } from '@layout';
import { Widget } from '@components';
import { TAddedProviders, TProvider } from '@types';

function HomePage() {
  const dic = useLocalization();
  const isLoading = useAppSelector(selectProvidersIsLoading);
  const providers = useAppSelector(selectProvidersData);
  const addedProvidersIds: TAddedProviders =
    useAppSelector(selectAddedProviders);

  const addedProviders = providers?.filter((provider: TProvider) =>
    addedProvidersIds?.includes(provider.id)
  );

  return (
    <BaseLayout>
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-align-center">
          {dic.loading}
        </div>
      )}
      {!isLoading && isEmpty(addedProviders) && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-align-center">
          {dic.noProviders}
        </div>
      )}
      {!isLoading && !isEmpty(addedProviders) && (
        <section className="widget-list">
          {addedProviders.map((provider: TProvider) => (
            <Widget key={provider.id} provider={provider} />
          ))}
        </section>
      )}
    </BaseLayout>
  );
}

export default HomePage;
