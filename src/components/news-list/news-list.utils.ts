import { TNewsItem } from '@types';

export const checkIfBookmarked = (
  bookmarks: Array<TNewsItem>,
  item: TNewsItem,
) => bookmarks?.some((bookmark) => bookmark.link === item.link);
