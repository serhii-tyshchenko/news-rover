import { selectAddedProviders } from '@store/selectors';
import { TProvider } from '@types';
import { useAppSelector } from '@hooks';

import ProviderListItem from './provider-list-item';

interface IProviderListProps {
  data: TProvider[];
  onAddProvider: (providerId: string) => void;
  onRemoveProvider: (providerId: string) => void;
}

function ProviderList({
  data: providers,
  onAddProvider,
  onRemoveProvider,
}: IProviderListProps) {
  const addedProviders = useAppSelector(selectAddedProviders);

  return (
    <ul className="overflow-y-auto pr-2">
      {providers.map((provider) => (
        <ProviderListItem
          key={provider.id}
          data={provider}
          added={addedProviders?.includes(provider.id)}
          onAddProvider={onAddProvider}
          onRemoveProvider={onRemoveProvider}
        />
      ))}
    </ul>
  );
}

export default ProviderList;
