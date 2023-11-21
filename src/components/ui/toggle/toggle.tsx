import { memo } from 'react';

import { getClassName } from '@utils';

import './toggle.scss';

const NAME_SPACE = 'toggle';

function Toggle(props: TToggleProps) {
  const {
    id,
    name,
    value,
    onChange,
    className,
    size,
    toggled,
    disabled,
    testId,
    animated,
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    {
      [`${NAME_SPACE}--animated`]: animated,
    },
    className
  );

  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      className={componentClassName}
      onChange={onChange}
      disabled={disabled}
      checked={toggled}
      value={value}
      data-testid={testId}
    />
  );
}

type TToggleProps = {
  id?: string;
  name?: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  size?: 'small' | 'normal' | 'large';
  toggled?: boolean;
  disabled?: boolean;
  testId?: string;
  animated?: boolean;
};

Toggle.defaultProps = {
  id: '',
  name: '',
  value: '',
  className: '',
  onChange: () => {},
  size: 'normal',
  toggled: false,
  disabled: false,
  testId: 'toggle',
  animated: false,
};

export default memo(Toggle);
