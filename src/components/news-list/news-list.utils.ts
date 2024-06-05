import { TNewsItem, TBookmark, TDic } from '@types';
import { isToday, isYesterday } from '@utils';

export const getDateLabel = (date: Date, dic: TDic) => {
  if (isToday(date)) {
    return dic.today;
  }
  if (isYesterday(date)) {
    return dic.yesterday;
  }
  return date.toLocaleDateString();
};

export const checkIfBookmarked = (
  bookmarks: Array<TBookmark>,
  item: TNewsItem,
) => bookmarks.some((bookmark) => bookmark.link === item.link);
