import { TAddedProviders } from 'common/types';

export type TManageProvidersDialogProps = {
  onConfirm: (providers: TAddedProviders) => void;
  onClose: () => void;
};
