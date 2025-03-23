import { isEmpty } from 'lodash';
import { selectProvidersData, selectAddedProviders } from '@store/selectors';
import { doAddProvider, doRemoveProvider } from '@store/actions';
import { useAppSelector, useAppDispatch, useLocalization } from '@hooks';
import { IconButton, Card, CardList } from '@components/ui';
import { BaseLayout } from '@layout';

import {
  groupProvidersByCategory,
  getCategoryTitle,
} from './providers-page.utils';

function ProvidersPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();
  const availableProviders = useAppSelector(selectProvidersData);
  const addedProviders = useAppSelector(selectAddedProviders);
  const groupedProviders = groupProvidersByCategory(availableProviders);

  const handleClick = (providerId: string) =>
    addedProviders.includes(providerId)
      ? dispatch(doRemoveProvider(providerId))
      : dispatch(doAddProvider(providerId));

  return (
    <BaseLayout>
      {isEmpty(groupedProviders) && (
        <div className="d-flex align-items-center justify-content-center h-100 p-2 text-center">
          {dic.noProviders}
        </div>
      )}
      {!isEmpty(groupedProviders) && (
        <CardList>
          {Object.keys(groupedProviders).map((category) => (
            <Card key={category} title={getCategoryTitle(category, dic)}>
              <ul className="overflow-y-auto pr-2">
                {groupedProviders[category].map((provider) => (
                  <li key={provider.id} className="d-flex mb-4">
                    <div className="mr-2">
                      <h5>
                        <a
                          href={provider.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {provider.name}
                        </a>
                      </h5>
                      <p className="small">{provider.description}</p>
                    </div>
                    <IconButton
                      icon={
                        addedProviders?.includes(provider.id)
                          ? 'eye'
                          : 'eye-off'
                      }
                      onClick={() => handleClick(provider.id)}
                      title={
                        addedProviders?.includes(provider.id)
                          ? dic.hideProvider
                          : dic.showProvider
                      }
                      className="ml-auto"
                      toggled={addedProviders?.includes(provider.id)}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </CardList>
      )}
    </BaseLayout>
  );
}

export default ProvidersPage;
