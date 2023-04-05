import { memo } from 'react';

import { getClassName } from 'common/utils';

import './toggle.scss';

const NAME_SPACE = 'toggle';

function Toggle(props: TToggleProps) {
  const { id, onChange, className, size, toggled, disabled } = props;

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
    />
  );
}

type TToggleProps = {
  id?: string;
  onChange?: () => void;
  className?: string;
  size?: 'small' | 'normal' | 'large';
  toggled?: boolean;
  disabled?: boolean;
};

Toggle.defaultProps = {
  id: '',
  className: '',
  onChange: null,
  size: 'normal',
  toggled: false,
  disabled: false,
};

export default memo(Toggle);
