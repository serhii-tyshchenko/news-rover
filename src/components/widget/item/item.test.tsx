import { render, fireEvent } from '@testing-library/react';
import Item from './item';
import configureStore from 'redux-mock-store';

const mockItem = {
  title: 'Test Item',
  link: 'https://example.com',
  created: new Date('2022-01-01'),
};

describe('(Component) Item', () => {
  it('should render the item with the correct title', () => {
    const { getByText } = render(
      <Item
        item={mockItem}
        isBookmarked={false}
        onAddBookmark={() => {}}
        onRemoveBookmark={() => {}}
      />
    );
    const title = getByText(mockItem.title);
    expect(title).toBeInTheDocument();
  });

  it('should render the item with the correct published date', () => {
    const { getByText } = render(
      <Item
        item={mockItem}
        isBookmarked={false}
        onAddBookmark={() => {}}
        onRemoveBookmark={() => {}}
      />
    );
    const publishedDate = getByText('Jan 1, 2022');
    expect(publishedDate).toBeInTheDocument();
  });

  it('should render the item with the correct bookmark icon when not bookmarked', () => {
    const { getByTestId } = render(
      <Item
        item={mockItem}
        isBookmarked={false}
        onAddBookmark={() => {}}
        onRemoveBookmark={() => {}}
      />
    );
    const bookmarkIcon = getByTestId('icon-button');
    expect(bookmarkIcon).toHaveAttribute('icon', 'bookmark-emtpy');
  });

  it('should render the item with the correct bookmark icon when bookmarked', () => {
    const { getByTestId } = render(
      <Item
        item={mockItem}
        isBookmarked={true}
        onAddBookmark={() => {}}
        onRemoveBookmark={() => {}}
      />
    );
    const bookmarkIcon = getByTestId('icon-button');
    expect(bookmarkIcon).toHaveAttribute('icon', 'bookmark');
  });

  it('should call the onAddBookmark function when the bookmark icon is clicked and the item is not bookmarked', () => {
    const onAddBookmark = vi.fn();
    const { getByTestId } = render(
      <Item
        item={mockItem}
        isBookmarked={false}
        onAddBookmark={onAddBookmark}
        onRemoveBookmark={() => {}}
      />
    );
    const bookmarkIcon = getByTestId('icon-button');
    fireEvent.click(bookmarkIcon);
    expect(onAddBookmark).toHaveBeenCalledWith(mockItem);
  });

  it('should call the onRemoveBookmark function when the bookmark icon is clicked and the item is bookmarked', () => {
    const onRemoveBookmark = vi.fn();
    const { getByTestId } = render(
      <Item
        item={mockItem}
        isBookmarked={true}
        onAddBookmark={() => {}}
        onRemoveBookmark={onRemoveBookmark}
      />
    );
    const bookmarkIcon = getByTestId('icon-button');
    fireEvent.click(bookmarkIcon);
    expect(onRemoveBookmark).toHaveBeenCalledWith(mockItem);
  });
});
