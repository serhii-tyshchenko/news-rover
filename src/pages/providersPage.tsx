import { useState } from 'react';
import { isEqual } from 'lodash';
import { selectProvidersData, selectAddedProviders } from 'store/selectors';
import { doUpdateProviders } from 'store/actions';
import { useAppSelector, useAppDispatch } from 'common/hooks';

import { Toggle, Button } from 'components/atoms';
import { BaseLayout } from 'layout';
import { TProvider, TProviders } from 'common/types';

export const groupProvidersByCategory = (providers: TProviders) => {
  const groupedProviders = providers.reduce((acc, provider) => {
    if (!acc[provider.category]) {
      acc[provider.category] = [];
    }
    acc[provider.category].push(provider);
    return acc;
  }, {} as { [key: string]: TProvider[] });

  return groupedProviders;
};

export const categoryToNameMap: { [key: string]: string } = {
  news: 'News',
  military: 'Military',
  tech: 'Technology',
  science: 'Science',
  software_development: 'Software Development',
  space: 'Space',
};

function ProvidersPage() {
  const dispatch = useAppDispatch();
  const availableProviders = useAppSelector(selectProvidersData);
  const addedProviders = useAppSelector(selectAddedProviders);
  const groupedProviders = groupProvidersByCategory(availableProviders);

  const [selectedProviders, setSelectedProviders] = useState(addedProviders);

  const handleChange = (id: string) => {
    if (selectedProviders.includes(id)) {
      setSelectedProviders(
        selectedProviders.filter((item: string) => item !== id)
      );
    } else {
      setSelectedProviders([...selectedProviders, id]);
    }
  };

  const handleSave = () => {
    dispatch(doUpdateProviders(selectedProviders));
  };

  const isConfirmDisabled = isEqual(selectedProviders, addedProviders);

  return (
    <BaseLayout>
      <div style={{ padding: '0.5rem' }}>
        {groupedProviders &&
          Object.keys(groupedProviders).map((category) => (
            <fieldset key={category}>
              <legend>{categoryToNameMap[category]}</legend>
              <ul className="overflow-y-auto pr-2">
                {groupedProviders[category].map((provider) => (
                  <li key={provider.id} className="mb-4">
                    <div className="d-flex align-items-center mb-1">
                      <a
                        href={provider.homepage}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <h5>{provider.name}</h5>
                      </a>
                      <Toggle
                        onChange={() => handleChange(provider.id)}
                        toggled={selectedProviders?.includes(provider.id)}
                        className="ml-auto"
                        id={provider.id}
                        size="small"
                      />
                    </div>
                    <p className="small">{provider.description}</p>
                  </li>
                ))}
              </ul>
            </fieldset>
          ))}
        <Button
          onClick={handleSave}
          disabled={isConfirmDisabled}
          className="d-block ml-auto"
        >
          Save
        </Button>
      </div>
    </BaseLayout>
  );
}

export default ProvidersPage;
