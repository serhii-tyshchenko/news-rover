import { render } from '@testing-library/react';

import Skeleton from './skeleton';

const TEST_ID = 'skeleton-list-test';

describe('(Component) Skeleton', () => {
  it('should render the correct number of skeleton items', () => {
    const count = 5;
    const { getAllByRole } = render(<Skeleton count={count} />);
    const skeletonItems = getAllByRole('listitem');
    expect(skeletonItems.length).toBe(count);
  });

  it('should have the "animate-pulse" class when animated prop is true', () => {
    const { getByTestId } = render(
      <Skeleton count={1} testId={TEST_ID} animated />,
    );
    const skeleton = getByTestId(TEST_ID);
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('should not have the "animate-pulse" class when animated prop is false', () => {
    const { getByTestId } = render(
      <Skeleton count={1} testId={TEST_ID} animated={false} />,
    );
    const skeleton = getByTestId(TEST_ID);
    expect(skeleton).not.toHaveClass('animate-pulse');
  });
});
