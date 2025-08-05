import { createPortal } from 'react-dom';

import { FocusTrap } from 'focus-trap-react';
import { noop } from 'lodash-es';

import { IconButton } from '@components/ui';
import { portalRoot } from '@constants';
import { EControlSize, EIcon } from '@types';
import { getClassName } from '@utils';

import './dialog.styles.scss';
import { useDialog } from './use-dialog';

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
    closeBtnTitle = 'Close dialog',
    onClose = noop,
    children,
    className = '',
  } = props;

  const dialogRef = useDialog(opened, onClose);

  if (!opened) {
    return null;
  }

  const componentClassName = getClassName(NAME_SPACE, className);

  return createPortal(
    <FocusTrap>
      <dialog
        ref={dialogRef}
        aria-labelledby="dialog-title"
        aria-modal="true"
        aria-live="assertive"
        className={componentClassName}
      >
        <header className={`${NAME_SPACE}__header`}>
          <h5 id="dialog-title" className="font-bold text-xl">
            {title}
          </h5>
          <IconButton
            className={`${NAME_SPACE}__btn-close`}
            icon={EIcon.Cancel}
            onClick={onClose}
            title={closeBtnTitle}
            size={EControlSize.Big}
            autoFocus
          />
        </header>
        <main className={`${NAME_SPACE}__content`}>{children}</main>
      </dialog>
    </FocusTrap>,
    portalRoot,
  );
}

export default Dialog;
