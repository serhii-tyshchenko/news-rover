import { render, fireEvent } from '@testing-library/react';

import { Toggle } from './toggle';

describe('(Component) Toggle', () => {
  it('should render the toggle with the correct size', () => {
    const size = 'large';
    const onChange = vi.fn();
    const { getByTestId } = render(<Toggle size={size} onChange={onChange} />);
    const toggle = getByTestId('toggle');
    expect(toggle).toHaveClass(`toggle--${size}`);
  });

  it('should call the onChange function when clicked', () => {
    const onChange = vi.fn();
    const { getByTestId } = render(<Toggle onChange={onChange} />);
    const toggle = getByTestId('toggle');
    fireEvent.click(toggle);
    expect(onChange).toHaveBeenCalled();
  });

  it('should be toggled when the toggled prop is true', () => {
    const onChange = vi.fn();
    const { getByTestId } = render(<Toggle toggled onChange={onChange} />);
    const toggle = getByTestId('toggle');
    expect(toggle).toBeChecked();
  });

  it('should be disabled when the disabled prop is true', () => {
    const onChange = vi.fn();
    const { getByTestId } = render(<Toggle disabled onChange={onChange} />);
    const toggle = getByTestId('toggle');
    expect(toggle).toBeDisabled();
  });

  it('should have the correct className when passed as a prop', () => {
    const onChange = vi.fn();
    const className = 'test-class';
    const { getByTestId } = render(
      <Toggle className={className} onChange={onChange} />,
    );
    const toggle = getByTestId('toggle');
    expect(toggle).toHaveClass(className);
  });

  it('should have the correct id when passed as a prop', () => {
    const id = 'test-id';
    const onChange = vi.fn();
    const { getByTestId } = render(<Toggle id={id} onChange={onChange} />);
    const toggle = getByTestId('toggle');
    expect(toggle).toHaveAttribute('id', id);
  });
});
