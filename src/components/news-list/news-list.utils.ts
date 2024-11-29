import { TNewsItem, TBookmark } from '@types';

export const checkIfBookmarked = (
  bookmarks: Array<TBookmark>,
  item: TNewsItem,
) => bookmarks.some((bookmark) => bookmark.link === item.link);
