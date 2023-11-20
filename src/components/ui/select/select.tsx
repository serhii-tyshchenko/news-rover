import { memo } from 'react';

import { getClassName } from '@utils';

import { TSelectProps, defaultProps } from './select.types';
import { NAME_SPACE } from './select.constants';

import './select.scss';

function Select(props: TSelectProps) {
  const {
    value,
    onChange,
    options,
    className,
    title,
    required,
    disabled,
    noArrow,
    size,
    name,
    label,
    error,
    style,
    testId,
  } = props;

  const componentClassName = getClassName(
    NAME_SPACE,
    `${NAME_SPACE}--${size}`,
    { [`${NAME_SPACE}--error`]: error, [`${NAME_SPACE}--no-arrow`]: noArrow },
    className
  );

  return (
    <>
      {label && (
        <label htmlFor={name} className={`${NAME_SPACE}__label`}>
          {label}
        </label>
      )}
      <select
        name={name}
        id={name}
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

Select.defaultProps = defaultProps;

export default memo(Select);
