import { TNewsItem, TBookmark, TDic } from '@types';
import {
  isToday,
  isYesterday,
  isThisYear,
  isThisWeek,
  capitalizeFirstLetter,
} from '@utils';

export const getDateLabel = (date: Date, dic: TDic) => {
  if (isToday(date)) {
    return dic.today;
  }
  if (isYesterday(date)) {
    return dic.yesterday;
  }
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: isThisYear(date) ? undefined : 'numeric',
    month: isThisWeek(date) ? undefined : 'long',
    day: isThisWeek(date) ? undefined : 'numeric',
  };
  return capitalizeFirstLetter(date.toLocaleDateString(undefined, options));
};

export const checkIfBookmarked = (
  bookmarks: Array<TBookmark>,
  item: TNewsItem,
) => bookmarks.some((bookmark) => bookmark.link === item.link);
