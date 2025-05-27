import { fireEvent, render } from '@testing-library/react';
import { EControlSize } from '@types';

import { Select } from './select';

describe('(Component) Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('should render the select with the correct options', () => {
    const { getByTestId } = render(<Select options={options} />);
    const select = getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(select.children.length).toBe(options.length);
  });

  it('should call the onChange function when an option is selected', () => {
    const onChange = vi.fn();
    const { getByTestId } = render(
      <Select options={options} onChange={onChange} />,
    );
    const select = getByTestId('select');
    fireEvent.change(select, { target: { value: options[1].value } });
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Object),
      }),
    );
  });

  it('should have the correct className when passed as a prop', () => {
    const className = 'test-class';
    const { getByTestId } = render(
      <Select options={options} className={className} />,
    );
    const select = getByTestId('select');
    expect(select).toHaveClass(className);
  });

  it('should have the correct title when passed as a prop', () => {
    const title = 'Select an option';
    const { getByTestId } = render(<Select options={options} title={title} />);
    const select = getByTestId('select');
    expect(select).toHaveAttribute('title', title);
  });

  it('should be required when the required prop is true', () => {
    const { getByTestId } = render(<Select options={options} required />);
    const select = getByTestId('select');
    expect(select).toBeRequired();
  });

  it('should be disabled when the disabled prop is true', () => {
    const { getByTestId } = render(<Select options={options} disabled />);
    const select = getByTestId('select');
    expect(select).toBeDisabled();
  });

  it('should have the correct size when passed as a prop', () => {
    const size = EControlSize.Large;
    const { getByTestId } = render(<Select options={options} size={size} />);
    const select = getByTestId('select');
    expect(select).toHaveClass(`select--${size}`);
  });

  it('should have the correct name when passed as a prop', () => {
    const name = 'my-select';
    const { getByTestId } = render(<Select options={options} name={name} />);
    const select = getByTestId('select');
    expect(select).toHaveAttribute('name', name);
  });

  it('should have the correct label when passed as a prop', () => {
    const label = 'My select';
    const name = 'my-select';
    const { getByLabelText } = render(
      <Select label={label} options={options} name={name} />,
    );
    const select = getByLabelText(label);
    expect(select).toBeInTheDocument();
  });

  it('should show an error message when the error prop is true', () => {
    const error = 'Please select an option';
    const { getByText } = render(<Select options={options} error={error} />);
    const errorMessage = getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should have the correct style when passed as a prop', () => {
    const style = { padding: '0' };
    const { getByTestId } = render(<Select options={options} style={style} />);
    const select = getByTestId('select');
    expect(select).toHaveStyle('padding: 0');
  });
});
