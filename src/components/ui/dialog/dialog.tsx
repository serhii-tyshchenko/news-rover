import { memo } from 'react';
import { createPortal } from 'react-dom';

import { getClassName } from '@utils';
import { portalRoot, noop } from '@constants';
import { IconButton, Button } from '@components/ui';

import { TDialogProps } from './dialog.types';

import './dialog.scss';

const NAME_SPACE = 'dialog';

function Dialog(props: TDialogProps) {
  const {
    title = 'Dialog',
    closeBtnTitle = 'Close',
    cancelBtnTitle = 'Cancel',
    confirmBtnTitle = 'Confirm',
    onClose = noop,
    onConfirm = noop,
    children,
    className = '',
  } = props;

  const componentClassName = getClassName(NAME_SPACE, className);

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
            size="big"
            autoFocus
          />
        </header>
        <main className={`${NAME_SPACE}__content`}>{children}</main>
        <footer className={`${NAME_SPACE}__footer`}>
          <Button onClick={onConfirm} className="mr-4">
            {confirmBtnTitle}
          </Button>
          <Button onClick={onClose} btnType="secondary">
            {cancelBtnTitle}
          </Button>
        </footer>
      </div>
    </div>,
    portalRoot
  );
}

export default memo(Dialog);
