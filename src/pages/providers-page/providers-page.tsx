import { selectProvidersData, selectAddedProviders } from 'store/selectors';
import { doAddProvider, doRemoveProvider } from 'store/actions';
import { useAppSelector, useAppDispatch, useLocalization } from 'common/hooks';

import { IconButton } from 'components/atoms';
import { BaseLayout } from 'layout';
import { TProvider, TProviders } from 'common/types';

export const groupProvidersByCategory = (providers: TProviders = []) => {
  const groupedProviders = providers.reduce((acc, provider) => {
    if (!acc[provider.category]) {
      acc[provider.category] = [];
    }
    acc[provider.category].push(provider);
    return acc;
  }, {} as { [key: string]: TProvider[] });

  return groupedProviders;
};

function ProvidersPage() {
  const dispatch = useAppDispatch();
  const dic = useLocalization();
  const availableProviders = useAppSelector(selectProvidersData);
  const addedProviders = useAppSelector(selectAddedProviders);
  const groupedProviders = groupProvidersByCategory(availableProviders);

  const categoryToNameMap: { [key: string]: string } = {
    news: dic.category.news,
    military: dic.category.military,
    tech: dic.category.technology,
    software_development: dic.category.softwareDevelopment,
    space: dic.category.space,
  };

  const handleClick = (providerId: string) => {
    if (addedProviders.includes(providerId)) {
      dispatch(doRemoveProvider(providerId));
    } else {
      dispatch(doAddProvider(providerId));
    }
  };

  return (
    <BaseLayout>
      <ul className="widget-list">
        {groupedProviders &&
          Object.keys(groupedProviders).map((category) => (
            <div className="widget" key={category}>
              <h3 className="mb-4">{categoryToNameMap[category]}</h3>
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
            </div>
          ))}
      </ul>
    </BaseLayout>
  );
}

export default ProvidersPage;
