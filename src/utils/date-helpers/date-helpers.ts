import { groupBy } from 'lodash';
import { TNewsItem, TDic } from '@types';
import { capitalizeFirstLetter } from '@utils';
import { ONE_MINUTE_IN_MILLISECONDS } from '@constants';

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

export const isThisWeek = (someDate: Date) => {
  const today = new Date();
  const diff = today.getDate() - someDate.getDate();
  return (
    isThisYear(someDate) &&
    today.getMonth() === someDate.getMonth() &&
    diff <= 7
  );
};

export const groupDataByDay = (data: TNewsItem[]) =>
  groupBy(
    data.toSorted((a, b) => b.created - a.created),
    (item: TNewsItem) => new Date(item.created).toLocaleDateString(),
  );

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
