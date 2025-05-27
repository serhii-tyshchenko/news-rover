import { fireEvent, render } from '@testing-library/react';

import CardControls from './card-controls';

describe('(Component) CardControls', () => {
  it('should render nothing if config is empty', () => {
    const { container } = render(<CardControls />);
    expect(container.firstChild).toBeNull();
  });

  it('should render the correct number of IconButton components', () => {
    const config = [
      { icon: 'icon1', title: 'Title 1', onClick: vi.fn() },
      { icon: 'icon2', title: 'Title 2', onClick: vi.fn() },
      { icon: 'icon3', title: 'Title 3', onClick: vi.fn() },
    ];
    const { getAllByTestId } = render(<CardControls config={config} />);
    const iconButtons = getAllByTestId('icon-button');
    expect(iconButtons.length).toBe(config.length);
  });

  it('should call the onClick function when IconButton is clicked', () => {
    const onClick = vi.fn();
    const config = [{ icon: 'icon1', title: 'Title 1', onClick }];
    const { getByTestId } = render(<CardControls config={config} />);
    const iconButton = getByTestId('icon-button');
    fireEvent.click(iconButton);
    expect(onClick).toHaveBeenCalled();
  });
});
