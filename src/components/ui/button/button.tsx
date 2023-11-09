import { memo } from 'react';

import { getClassName } from '@utils';

import './button.scss';

const NAME_SPACE = 'button';

function Button(props: TButtonProps) {
  const {
    onClick,
    className,
    type,
    btnType,
    size,
    children,
    disabled,
    testId,
  } = props;

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
      data-testid={testId}
    >
      {children}
    </button>
  );
}

type TButtonProps = {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  btnType?: 'primary' | 'secondary' | 'action';
  size?: 'small' | 'normal' | 'large';
  children?: React.ReactNode;
  disabled?: boolean;
  testId?: string;
};

Button.defaultProps = {
  className: '',
  onClick: null,
  type: 'button',
  btnType: 'primary',
  size: 'normal',
  children: null,
  disabled: false,
  testId: 'button',
};

export default memo(Button);
