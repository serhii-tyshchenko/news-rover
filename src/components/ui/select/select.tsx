import { getClassName } from '@utils';
import { EControlSize } from '@types';

import './select.styles.scss';

const NAME_SPACE = 'select';

interface IProps {
  className?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  title?: string;
  options?: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  required?: boolean;
  disabled?: boolean;
  noArrow?: boolean;
  size?: EControlSize;
  name?: string;
  label?: string;
  error?: string;
  style?: React.CSSProperties;
  testId?: string;
}

function Select(props: IProps) {
  const {
    id,
    value = '',
    onChange = () => {},
    options = [],
    className = '',
    title = 'Select option',
    required = false,
    disabled = false,
    noArrow = false,
    size = EControlSize.Normal,
    name = NAME_SPACE,
    label = '',
    error = '',
    style = {},
    testId = NAME_SPACE,
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    { [`${NAME_SPACE}--error`]: error, [`${NAME_SPACE}--no-arrow`]: noArrow },
    className,
  );

  return (
    <>
      {label && (
        <label htmlFor={id ?? name} className={`${NAME_SPACE}__label`}>
          {label}
        </label>
      )}
      <select
        name={name}
        id={id ?? name}
        onChange={onChange}
        value={value}
        required={required}
        className={componentClassName}
        title={title}
        disabled={disabled}
        style={style}
        data-testid={testId}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={`${NAME_SPACE}__option`}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className={`${NAME_SPACE}__error`}>{error}</div>}
    </>
  );
}

export { Select };
