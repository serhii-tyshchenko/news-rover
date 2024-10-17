import { render, fireEvent } from '@testing-library/react';
import { noop } from 'lodash';
import { EControlSize } from '@types';

import { IconButton } from './icon-button';

describe('(Component) IconButton', () => {
  it('should render the icon button with the correct icon', () => {
    const icon = 'cog';
    const { getByTestId } = render(<IconButton onClick={noop} icon={icon} />);
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toHaveClass(`icon-${icon}`);
  });

  it('should call the onClick function when clicked', () => {
    const onClick = vi.fn();
    const { getByTestId } = render(<IconButton onClick={onClick} />);
    const iconButton = getByTestId('icon-button');
    fireEvent.click(iconButton);
    expect(onClick).toHaveBeenCalled();
  });

  it('should be disabled when the disabled prop is true', () => {
    const { getByTestId } = render(<IconButton onClick={noop} disabled />);
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toBeDisabled();
  });

  it('should have the correct className when passed as a prop', () => {
    const className = 'test-class';
    const { getByTestId } = render(
      <IconButton onClick={noop} className={className} />,
    );
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toHaveClass(className);
  });

  it('should have the correct title when passed as a prop', () => {
    const title = 'Search';
    const { getByTestId } = render(<IconButton onClick={noop} title={title} />);
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toHaveAttribute('title', title);
  });

  it('should have the correct type when passed as a prop', () => {
    const type = 'submit';
    const { getByTestId } = render(<IconButton onClick={noop} type={type} />);
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toHaveAttribute('type', type);
  });

  it('should have the correct size when passed as a prop', () => {
    const size = EControlSize.Large;
    const { getByTestId } = render(<IconButton onClick={noop} size={size} />);
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toHaveClass(`icon-button--${size}`);
  });

  it('should have the correct toggled state when passed as a prop', () => {
    const { getByTestId, rerender } = render(
      <IconButton onClick={noop} toggled={false} />,
    );
    let iconButton = getByTestId('icon-button');
    expect(iconButton).not.toHaveClass('icon-button--toggled');
    rerender(<IconButton onClick={noop} toggled />);
    iconButton = getByTestId('icon-button');
    expect(iconButton).toHaveClass('icon-button--toggled');
  });

  it('should be focused when the autoFocus prop is true', () => {
    const { getByTestId } = render(<IconButton onClick={noop} autoFocus />);
    const iconButton = getByTestId('icon-button');
    expect(iconButton).toHaveFocus();
  });
});
