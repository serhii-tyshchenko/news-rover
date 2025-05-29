import { fireEvent, render } from '@testing-library/react';
import { EControlSize } from '@types';

import { Button } from './button';

describe('(Component) Button', () => {
  it('should render the button with the correct text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<Button>{buttonText}</Button>);
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', () => {
    const onClick = vi.fn();
    const { getByTestId } = render(<Button onClick={onClick}>Click me</Button>);
    const button = getByTestId('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('should be disabled when the disabled prop is true', () => {
    const { getByTestId } = render(<Button disabled>Click me</Button>);
    const button = getByTestId('button');
    expect(button).toBeDisabled();
  });

  it('should have the correct className when passed as a prop', () => {
    const className = 'test-class';
    const { getByTestId } = render(
      <Button className={className}>Click me</Button>,
    );
    const button = getByTestId('button');
    expect(button).toHaveClass(className);
  });

  it('should have the correct type when passed as a prop', () => {
    const type = 'submit';
    const { getByTestId } = render(<Button type={type}>Click me</Button>);
    const button = getByTestId('button');
    expect(button).toHaveAttribute('type', type);
  });

  it('should have the correct btnType when passed as a prop', () => {
    const btnType = 'secondary';
    const { getByTestId } = render(<Button btnType={btnType}>Click me</Button>);
    const button = getByTestId('button');
    expect(button).toHaveClass(`button--${btnType}`);
  });

  it('should have the correct size when passed as a prop', () => {
    const size = EControlSize.Big;
    const { getByTestId } = render(<Button size={size}>Click me</Button>);
    const button = getByTestId('button');
    expect(button).toHaveClass(`button--${size}`);
  });
});
