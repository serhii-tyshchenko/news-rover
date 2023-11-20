import { isEmpty } from 'lodash';
import { IconButton } from '@components/ui/icon-button';

import { TCardControlsProps } from './card-controls.types';

function CardControls(props: TCardControlsProps) {
  const { config = [], testId = 'card-controls' } = props;

  if (isEmpty(config)) {
    return null;
  }

  return (
    <div className="d-flex align-items-center gap-1" data-testid={testId}>
      {config.map((control) => (
        <IconButton
          key={control.icon}
          icon={control.icon}
          title={control.title}
          onClick={control.onClick}
        />
      ))}
    </div>
  );
}

export default CardControls;
