import { memo } from 'react';
import { createPortal } from 'react-dom';

import { getClassName } from 'common/utils';
import { portalRoot } from 'common/constants';

import { IconButton } from 'components/atoms';

import './dialog.scss';

const NAME_SPACE = 'dialog';

function Dialog(props: TDialogProps) {
  const { title, closeBtnTitle, opened, onClose, children, className } = props;

  const componentClassName = getClassName(NAME_SPACE, className);

  if (!opened) {
    return null;
  }

  return createPortal(
    <div className={`${NAME_SPACE}__backdrop`}>
      <div
        role="dialog"
        aria-labelledby="ui-dialog-title"
        aria-modal="true"
        className={componentClassName}
      >
        <div className={`${NAME_SPACE}__header`}>
          <h4 id="ui-dialog-title" className={`${NAME_SPACE}__title`}>
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
        </div>
        <div className={`${NAME_SPACE}__content`}>{children}</div>
      </div>
    </div>,
    portalRoot
  );
}

type TDialogProps = {
  title?: string;
  closeBtnTitle?: string;
  opened?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
};

Dialog.defaultProps = {
  title: 'Dialog',
  closeBtnTitle: 'Close',
  opened: false,
  className: '',
};

export default memo(Dialog);
