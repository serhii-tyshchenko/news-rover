import { memo } from 'react';
import { getClassName } from '@utils';

import './icon-button.scss';

const NAME_SPACE = 'icon-button';

function IconButton(props: TiconButtonProps) {
  const {
    icon,
    onClick,
    className,
    title,
    type,
    size,
    disabled,
    autoFocus,
    toggled,
    testId,
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `icon-${icon}`,
    `${NAME_SPACE}--${size}`,
    { [`${NAME_SPACE}--toggled`]: toggled },
    className
  );

  return (
    <button
      type={type}
      className={componentClassName}
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
      autoFocus={autoFocus}
      data-testid={testId}
    />
  );
}

type TiconButtonProps = {
  onClick?: () => void;
  className?: string;
  icon?: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  size?: 'small' | 'normal' | 'big' | 'large';
  disabled?: boolean;
  autoFocus?: boolean;
  toggled?: boolean;
  testId?: string;
};

IconButton.defaultProps = {
  className: '',
  onClick: null,
  type: 'button',
  icon: '',
  title: 'Click me',
  size: 'normal',
  disabled: false,
  autoFocus: false,
  toggled: false,
  testId: 'icon-button',
};

export default memo(IconButton);
