import { render } from '@testing-library/react';
import Card from './card';

describe('(Component) Card', () => {
  it('should match the snapshot', () => {
    const { container } = render(<Card title="Test" children="Test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the title correctly', () => {
    const title = 'Test Title';
    const { getByText } = render(<Card title={title} children="Test" />);
    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the children correctly', () => {
    const children = <div>Test Children</div>;
    const { getByText } = render(<Card title="Test">{children}</Card>);
    const childrenElement = getByText('Test Children');
    expect(childrenElement).toBeInTheDocument();
  });

  it('should render CardControls component with the correct config', () => {
    const controlsConfig = [
      { icon: 'icon1', title: 'Title 1', onClick: vi.fn() },
      { icon: 'icon2', title: 'Title 2', onClick: vi.fn() },
      { icon: 'icon3', title: 'Title 3', onClick: vi.fn() },
    ];
    const { getByTestId } = render(
      <Card title="Test" controlsConfig={controlsConfig} children="Test" />
    );
    const cardControlsElement = getByTestId('card-controls');
    expect(cardControlsElement).toBeInTheDocument();
  });
});
