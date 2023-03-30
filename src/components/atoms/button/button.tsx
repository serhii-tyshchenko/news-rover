import { memo } from 'react';

import { getClassName } from 'common/utils';

import './button.scss';

const NAME_SPACE = 'button';

type TButtonProps = {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  btnType?: 'primary' | 'secondary' | 'action';
  size?: 'small' | 'normal' | 'large';
  children?: React.ReactNode;
  disabled?: boolean;
};

function Button(props: TButtonProps) {
  const { onClick, className, type, btnType, size, children, disabled } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${btnType}`,
    `${NAME_SPACE}--${size}`,
    className
  );

  return (
    <button
      type={type}
      className={componentClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  onClick: null,
  type: 'button',
  btnType: 'primary',
  size: 'normal',
  children: null,
  disabled: false,
};

export default memo(Button);
