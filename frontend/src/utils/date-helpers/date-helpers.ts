import { groupBy } from 'lodash-es';

import { ONE_MINUTE_IN_MILLISECONDS } from '@constants';
import { TDic, TNewsItem } from '@types';
import { capitalizeFirstLetter } from '@utils';

export const formatTime = (dateRaw: number) => {
  const date = new Date(dateRaw);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const isWithinLastHour = (dateRaw: number) => {
  const someDate = new Date(dateRaw);
  const now = new Date();
  return now.getTime() - someDate.getTime() < 60 * ONE_MINUTE_IN_MILLISECONDS;
};

export const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export const isYesterday = (someDate: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() === yesterday.getMonth() &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
};

export const isThisYear = (someDate: Date) => {
  return someDate.getFullYear() === new Date().getFullYear();
};

export const isThisWeek = (date: Date): boolean => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
};

export const groupDataByDay = (data: TNewsItem[]) =>
  groupBy(
    data.toSorted((a, b) => b.created - a.created),
    (item: TNewsItem) => new Date(item.created).toLocaleDateString(),
  );

export const getDateLabel = (
  date: Date,
  dic: TDic,
  locale: Intl.LocalesArgument,
) => {
  console.log('getDateLabel called with date:', date);
  const isTodayDate = isToday(date);
  const isYesterdayDate = isYesterday(date);
  const isThisWeekDate = isThisWeek(date);
  const isThisYearDate = !isThisYear(date);

  if (isTodayDate) {
    return dic.today;
  }
  if (isYesterdayDate) {
    return dic.yesterday;
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: isThisWeekDate ? 'long' : undefined,
    year: isThisYearDate ? 'numeric' : undefined,
    month: isThisWeekDate ? undefined : 'long',
    day: isThisWeekDate ? undefined : 'numeric',
  };
  return capitalizeFirstLetter(date.toLocaleDateString(locale, options));
};
