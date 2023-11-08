import { render, fireEvent } from '@testing-library/react';
import Button from './button';

describe('(Component) Button', () => {
  it('should render the button with the correct text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<Button>{buttonText}</Button>);
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('should be disabled when the disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Click me</Button>);
    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should have the correct className when passed as a prop', () => {
    const className = 'test-class';
    const { getByRole } = render(
      <Button className={className}>Click me</Button>
    );
    const button = getByRole('button');
    expect(button).toHaveClass(className);
  });

  it('should have the correct type when passed as a prop', () => {
    const type = 'submit';
    const { getByRole } = render(<Button type={type}>Click me</Button>);
    const button = getByRole('button');
    expect(button).toHaveAttribute('type', type);
  });

  it('should have the correct btnType when passed as a prop', () => {
    const btnType = 'secondary';
    const { getByRole } = render(<Button btnType={btnType}>Click me</Button>);
    const button = getByRole('button');
    expect(button).toHaveClass(`button--${btnType}`);
  });

  it('should have the correct size when passed as a prop', () => {
    const size = 'large';
    const { getByRole } = render(<Button size={size}>Click me</Button>);
    const button = getByRole('button');
    expect(button).toHaveClass(`button--${size}`);
  });
});
