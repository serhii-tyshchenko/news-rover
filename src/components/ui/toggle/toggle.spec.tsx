import { render, fireEvent } from '@testing-library/react';

import Toggle from './toggle';

describe('(Component) Toggle', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Toggle />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the toggle with the correct size', () => {
    const size = 'large';
    const { getByTestId } = render(<Toggle size={size} />);
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
    const { getByTestId } = render(<Toggle toggled />);
    const toggle = getByTestId('toggle');
    expect(toggle).toBeChecked();
  });

  it('should be disabled when the disabled prop is true', () => {
    const { getByTestId } = render(<Toggle disabled />);
    const toggle = getByTestId('toggle');
    expect(toggle).toBeDisabled();
  });

  it('should have the correct className when passed as a prop', () => {
    const className = 'test-class';
    const { getByTestId } = render(<Toggle className={className} />);
    const toggle = getByTestId('toggle');
    expect(toggle).toHaveClass(className);
  });

  it('should have the correct id when passed as a prop', () => {
    const id = 'test-id';
    const { getByTestId } = render(<Toggle id={id} />);
    const toggle = getByTestId('toggle');
    expect(toggle).toHaveAttribute('id', id);
  });
});
