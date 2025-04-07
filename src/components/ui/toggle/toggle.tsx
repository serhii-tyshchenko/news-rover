import { getClassName } from '@utils';
import { EControlSize } from '@types';

import './toggle.styles.scss';

const NAME_SPACE = 'toggle';

interface IProps {
  id?: string;
  name?: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  size?: EControlSize;
  toggled?: boolean;
  disabled?: boolean;
  testId?: string;
  animated?: boolean;
  label: string;
}

function Toggle(props: IProps) {
  const {
    id,
    name = NAME_SPACE,
    value = '',
    onChange = () => {},
    className = '',
    size = EControlSize.Normal,
    toggled = false,
    disabled = false,
    testId = NAME_SPACE,
    animated = false,
    label = '',
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    {
      [`${NAME_SPACE}--animated`]: animated,
    },
    className,
  );

  return (
    <input
      type="checkbox"
      id={id ?? name}
      name={name}
      className={componentClassName}
      onChange={onChange}
      disabled={disabled}
      checked={toggled}
      value={value}
      data-testid={testId}
      aria-label={label}
      title={label}
    />
  );
}

export { Toggle };
