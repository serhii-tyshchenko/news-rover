import { IconButton } from '@components';
import { useLocalization } from '@hooks';
import { TProvider } from '@types';

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

  const handleClick = () => {
    if (added) {
      onRemoveProvider(id);
    } else {
      onAddProvider(id);
    }
  };
  const icon = added ? 'eye' : 'eye-off';
  const title = added ? dic.hideProvider : dic.showProvider;

  return (
    <li key={id} className="flex mb-4">
      <div className="mr-2">
        <h5 className="mb-1">
          <a href={homepage} target="_blank" rel="noreferrer">
            {name}
          </a>
        </h5>
        <p className="text-sm color-secondary">{description}</p>
      </div>
      <IconButton
        icon={icon}
        onClick={handleClick}
        title={title}
        className="ml-auto"
        toggled={added}
      />
    </li>
  );
}

export default ProviderListItem;
