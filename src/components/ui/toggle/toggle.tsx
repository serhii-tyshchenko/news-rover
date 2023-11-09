import { memo } from 'react';

import { getClassName } from '@utils';

import './toggle.scss';

const NAME_SPACE = 'toggle';

function Toggle(props: TToggleProps) {
  const { id, onChange, className, size, toggled, disabled, testId } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    className
  );

  return (
    <input
      type="checkbox"
      id={id}
      name={id}
      className={componentClassName}
      onChange={onChange}
      disabled={disabled}
      checked={toggled}
      data-testid={testId}
    />
  );
}

type TToggleProps = {
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  size?: 'small' | 'normal' | 'large';
  toggled?: boolean;
  disabled?: boolean;
  testId?: string;
};

Toggle.defaultProps = {
  id: '',
  className: '',
  onChange: () => {},
  size: 'normal',
  toggled: false,
  disabled: false,
  testId: 'toggle',
};

export default memo(Toggle);
