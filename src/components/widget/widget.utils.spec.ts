import { TBookmark } from 'types';
import { checkIfBookmarked } from './widget.utils';

describe('(Function) checkIfBookmarked', () => {
  const bookmarks: TBookmark[] = [
    { id: 'id1', title: 'title1', link: 'bookmark1', created: new Date() },
    { id: 'id2', title: 'title2', link: 'bookmark2', created: new Date() },
    { id: 'id3', title: 'title3', link: 'bookmark3', created: new Date() },
  ];

  const item = {
    id: 'id2',
    title: 'title2',
    link: 'bookmark2',
    created: new Date(),
  };

  it('should return true if the item is bookmarked', () => {
    expect(checkIfBookmarked(bookmarks, item)).toBe(true);
  });

  it('should return false if the item is not bookmarked', () => {
    const nonBookmarkedItem = {
      id: 'id2',
      title: 'title2',
      link: 'bookmark4',
      created: new Date(),
    };
    expect(checkIfBookmarked(bookmarks, nonBookmarkedItem)).toBe(false);
  });

  it('should return false if the bookmarks array is empty', () => {
    const emptyBookmarks: TBookmark[] = [];
    expect(checkIfBookmarked(emptyBookmarks, item)).toBe(false);
  });
});
