import { render, screen } from '@testing-library/react';

import EmptyState from './empty-state';

describe('(Component) EmptyState', () => {
  it('renders with default text and testId', () => {
    render(<EmptyState />);
    const element = screen.getByTestId('ui-empty-state');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('No data available');
  });

  it('renders with custom children', () => {
    render(<EmptyState>Custom content</EmptyState>);
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<EmptyState testId="custom-id" />);
    expect(screen.getByTestId('custom-id')).toBeInTheDocument();
  });

  it('renders ReactNode as children', () => {
    render(
      <EmptyState>
        <span>Node content</span>
      </EmptyState>,
    );
    expect(screen.getByText('Node content')).toBeInTheDocument();
  });
});
