import { render } from '@testing-library/react';

import Skeleton from './skeleton';

describe('(Component) Skeleton', () => {
  it('should render the correct number of skeleton items', () => {
    const count = 5;
    const { getAllByTestId } = render(<Skeleton count={count} />);
    const skeletonItems = getAllByTestId('skeleton-item');
    expect(skeletonItems.length).toBe(count);
  });

  it('should have the "skeleton" class', () => {
    const { getByTestId } = render(<Skeleton count={1} />);
    const skeletonItem = getByTestId('skeleton-item');
    expect(skeletonItem).toHaveClass('skeleton');
  });

  it('should have the "skeleton--animated" class when animated prop is true', () => {
    const { getByTestId } = render(<Skeleton count={1} animated />);
    const skeletonItem = getByTestId('skeleton-item');
    expect(skeletonItem).toHaveClass('skeleton--animated');
  });

  it('should not have the "skeleton--animated" class when animated prop is false', () => {
    const { getByTestId } = render(<Skeleton count={1} animated={false} />);
    const skeletonItem = getByTestId('skeleton-item');
    expect(skeletonItem).not.toHaveClass('skeleton--animated');
  });
});
