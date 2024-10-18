import { selectProvidersData, selectAddedProviders } from '@store/selectors';
import { doAddProvider, doRemoveProvider } from '@store/actions';
import { useAppSelector, useAppDispatch, useLocalization } from '@hooks';

import { IconButton, Card, CardList } from '@components/ui';
import { BaseLayout } from '@layout';
import { TProvider, TProviders } from '@types';

const groupProvidersByCategory = (providers: TProviders = []) =>
  providers.reduce(
    (acc, provider) => {
      if (!acc[provider.category]) {
        acc[provider.category] = [];
      }
      acc[provider.category].push(provider);
      return acc;
    },
    {} as { [key: string]: TProvider[] },
  );

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
    science: dic.category.science,
    business: dic.category.business,
    blogs: dic.category.blogs,
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
      <CardList>
        {groupedProviders &&
          Object.keys(groupedProviders).map((category) => (
            <Card key={category} title={categoryToNameMap[category]}>
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
    </BaseLayout>
  );
}

export default ProvidersPage;
