import { IconButton } from '@components/ui';
import { useLocalization } from '@hooks';
import { EIcon, TProvider } from '@types';

interface IProviderListItemProps {
  data: TProvider;
  added: boolean;
  onAddProvider: (providerId: string) => void;
  onRemoveProvider: (providerId: string) => void;
}

function ProviderListItem({
  data: { id, name, description, homepage },
  added,
  onAddProvider,
  onRemoveProvider,
}: IProviderListItemProps) {
  const dic = useLocalization();

  const handleToggleProvider = () =>
    added ? onRemoveProvider(id) : onAddProvider(id);

  const providerStateIcon = added ? EIcon.Eye : EIcon.EyeOff;
  const providerStateTitle = added ? dic.hideProvider : dic.showProvider;

  return (
    <li key={id} className="flex mb-4 gap-2">
      <div>
        <h5 className="mb-1 text-xl">
          <a
            href={homepage}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            {name}
          </a>
        </h5>
        <p className="text-sm text-secondary">{description}</p>
      </div>
      <IconButton
        icon={providerStateIcon}
        onClick={handleToggleProvider}
        title={providerStateTitle}
        className="ml-auto"
        toggled={added}
      />
    </li>
  );
}

export default ProviderListItem;
