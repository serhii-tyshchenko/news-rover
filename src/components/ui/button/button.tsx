import { memo } from 'react';

import { getClassName } from '@utils';

import './button.styles.scss';

const NAME_SPACE = 'button';

interface IButtonProps {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  btnType?: 'primary' | 'secondary' | 'action';
  size?: 'small' | 'normal' | 'large';
  children?: React.ReactNode;
  disabled?: boolean;
  testId?: string;
}

function Button(props: IButtonProps) {
  const {
    onClick = undefined,
    className = '',
    type = 'button',
    btnType = 'primary',
    size = 'normal',
    children = null,
    disabled = false,
    testId = 'button',
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${btnType}`,
    `${NAME_SPACE}--${size}`,
    className,
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

export default memo(Button);
