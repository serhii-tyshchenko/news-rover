import { EControlSize, EIcon } from '@types';
import { getClassName } from '@utils';

import './icon-button.styles.scss';

const NAME_SPACE = 'icon-button';

interface IIconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  icon?: EIcon | string; // Allow string for custom icons
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  size?: EControlSize;
  disabled?: boolean;
  autoFocus?: boolean;
  toggled?: boolean;
  testId?: string;
}

function IconButton(props: IIconButtonProps) {
  const {
    icon = '',
    onClick,
    className = '',
    title = 'Click me',
    type = 'button',
    size = EControlSize.Normal,
    disabled = false,
    autoFocus = false,
    toggled = false,
    testId = NAME_SPACE,
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `icon-${icon}`,
    `${NAME_SPACE}--${size}`,
    { [`${NAME_SPACE}--toggled`]: toggled },
    className,
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

export { IconButton };
