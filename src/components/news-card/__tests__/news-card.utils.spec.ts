import { TBookmark, TDic } from '@types';
import { checkIfBookmarked, getDateLabel } from '../news-card.utils';

describe('(Function) checkIfBookmarked', () => {
  const bookmarks: TBookmark[] = [
    { id: 'id1', title: 'title1', link: 'bookmark1', created: 1709116577844 },
    { id: 'id2', title: 'title2', link: 'bookmark2', created: 1709116577850 },
    { id: 'id3', title: 'title3', link: 'bookmark3', created: 1709116577860 },
  ];

  const item = {
    id: 'id2',
    title: 'title2',
    link: 'bookmark2',
    created: 1709116577844,
  };

  it('should return true if the item is bookmarked', () => {
    expect(checkIfBookmarked(bookmarks, item)).toBe(true);
  });

  it('should return false if the item is not bookmarked', () => {
    const nonBookmarkedItem = {
      id: 'id2',
      title: 'title2',
      link: 'bookmark4',
      created: 1709116577864,
    };
    expect(checkIfBookmarked(bookmarks, nonBookmarkedItem)).toBe(false);
  });

  it('should return false if the bookmarks array is empty', () => {
    const emptyBookmarks: TBookmark[] = [];
    expect(checkIfBookmarked(emptyBookmarks, item)).toBe(false);
  });
});

describe('(Function) getDateLabel', () => {
  const dic = {
    today: 'Today',
    yesterday: 'Yesterday',
  } as TDic;

  it('should return the label for today', () => {
    const today = new Date();
    expect(getDateLabel(today, dic)).toBe(dic.today);
  });

  it('should return the label for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(getDateLabel(yesterday, dic)).toBe(dic.yesterday);
  });

  it('should return the formatted date if the date is not today or yesterday', () => {
    const pastDate = new Date('2022-01-01');
    expect(getDateLabel(pastDate, dic)).toBe(pastDate.toLocaleDateString());
  });
});
