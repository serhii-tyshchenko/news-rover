import { render, screen } from '@testing-library/react';

import ErrorState from './error-state';

describe('(Component) ErrorState', () => {
  it('renders with default message and test id', () => {
    render(<ErrorState />);
    const errorDiv = screen.getByTestId('ui-error-state');
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveTextContent(
      'Something went wrong. Try again later.',
    );
  });

  it('renders with custom children', () => {
    render(<ErrorState>Custom error message</ErrorState>);
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('renders with custom testId', () => {
    render(<ErrorState testId="custom-error-state" />);
    expect(screen.getByTestId('custom-error-state')).toBeInTheDocument();
  });
});
