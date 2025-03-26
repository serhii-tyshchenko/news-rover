import { getClassName } from '@utils';
import { EControlSize } from '@types';

import './button.styles.scss';

const NAME_SPACE = 'button';

export interface IProps {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  btnType?: 'primary' | 'secondary' | 'action';
  size?: EControlSize;
  children?: React.ReactNode;
  disabled?: boolean;
  testId?: string;
}

function Button(props: IProps) {
  const {
    onClick = undefined,
    className = '',
    type = 'button',
    btnType = 'primary',
    size = EControlSize.Normal,
    children = null,
    disabled = false,
    testId = NAME_SPACE,
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

export { Button };
