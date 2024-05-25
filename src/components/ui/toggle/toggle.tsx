import { getClassName } from '@utils';

import './toggle.scss';

const NAME_SPACE = 'toggle';

interface IToggleProps {
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
}

function Toggle(props: IToggleProps) {
  const {
    id = NAME_SPACE,
    name = NAME_SPACE,
    value = '',
    onChange = () => {},
    className = '',
    size = 'normal',
    toggled = false,
    disabled = false,
    testId = NAME_SPACE,
    animated = false,
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

export { Toggle };
