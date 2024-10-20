import { groupBy } from 'lodash';
import { TNewsItem } from '@types';

export const formatTime = (dateRaw: number) => {
  const rawDate = new Date(dateRaw);
  const hours = rawDate.getHours().toString().padStart(2, '0');
  const minutes = rawDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
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
