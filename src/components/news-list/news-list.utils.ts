import { TNewsItem, TBookmark } from '@types';

// TODO move to utils
export const checkIfBookmarked = (
  bookmarks: Array<TBookmark>,
  item: TNewsItem,
) => bookmarks.some((bookmark) => bookmark.link === item.link);
