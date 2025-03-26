import { createPortal } from 'react-dom';

import { getClassName } from '@utils';
import { portalRoot, noop } from '@constants';
import { IconButton } from '@components/ui';
import { EControlSize } from '@types';

import './dialog.styles.scss';

const NAME_SPACE = 'dialog';

interface IProps {
  opened: boolean;
  title?: string;
  closeBtnTitle?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function Dialog(props: IProps) {
  const {
    opened = false,
    title = 'Dialog',
    closeBtnTitle = 'Close',
    onClose = noop,
    children,
    className = '',
  } = props;

  const componentClassName = getClassName(NAME_SPACE, className);

  if (!opened) {
    return null;
  }

  return createPortal(
    <div className={`${NAME_SPACE}__backdrop`}>
      <div
        role="dialog"
        aria-labelledby="dialog-title"
        aria-modal="true"
        className={componentClassName}
      >
        <header className={`${NAME_SPACE}__header`}>
          <h4 id="dialog-title" className={`${NAME_SPACE}__title`}>
            {title}
          </h4>
          <IconButton
            className={`${NAME_SPACE}__btn-close`}
            icon="cancel"
            onClick={onClose}
            title={closeBtnTitle}
            size={EControlSize.Big}
            autoFocus
          />
        </header>
        <main className={`${NAME_SPACE}__content`}>{children}</main>
      </div>
    </div>,
    portalRoot,
  );
}

export default Dialog;
