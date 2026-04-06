import { groupBy } from 'lodash-es';

import { ONE_MINUTE_IN_MILLISECONDS } from '@constants';
import { ELocale, TDic, TNewsItem } from '@types';
import { capitalizeFirstLetter } from '@utils';

/**
 * Formats a given timestamp into a time string in the format of "HH:MM".
 * @param {number} dateRaw - The raw timestamp to be formatted.
 * @returns {string} - A formatted time string representing the hours and minutes.
 */
export const formatTime = (dateRaw: number): string => {
  const date = new Date(dateRaw);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Checks if a given timestamp is within the last hour from the current time.
 * This can be useful for determining if a news item is recent or not.
 * @param {number} dateRaw - The raw timestamp to be checked.
 * @return {boolean} - Returns true if the timestamp is within the last hour, otherwise false.
 */
export const isWithinLastHour = (dateRaw: number): boolean => {
  const someDate = new Date(dateRaw);
  const now = new Date();
  return now.getTime() - someDate.getTime() < 60 * ONE_MINUTE_IN_MILLISECONDS;
};

/**
 * Checks if a given timestamp is in the future compared to the current time.
 * This can be useful for filtering out news items that are not yet published or scheduled for a future release.
 * @param {number} someDate - The raw timestamp to be checked.
 * @return {boolean} - Returns true if the timestamp is in the future, otherwise false.
 */
export const isToday = (someDate: Date): boolean => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Checks if a given date is yesterday compared to the current date.
 * This can be useful for categorizing news items based on their publication date.
 * @param {Date} someDate - The date to be checked.
 * @return {boolean} - Returns true if the date is yesterday, otherwise false.
 */
export const isYesterday = (someDate: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    someDate.getDate() === yesterday.getDate() &&
    someDate.getMonth() === yesterday.getMonth() &&
    someDate.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Checks if a given date is within the current year.
 * This can be useful for categorizing news items based on their publication year.
 * @param {Date} someDate - The date to be checked.
 * @return {boolean} - Returns true if the date is within the current year, otherwise false.
 */
export const isThisYear = (someDate: Date): boolean => {
  return someDate.getFullYear() === new Date().getFullYear();
};

/**
 * Checks if a given date falls within the current week.
 * This can be useful for categorizing news items based on their publication week.
 * @param {Date} someDate - The date to be checked.
 * @return {boolean} - Returns true if the date is within the current week, otherwise false.
 */
export const isThisWeek = (someDate: Date): boolean => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return someDate >= startOfWeek && someDate <= endOfWeek;
};

/**
 * Generates a label for a given date based on its relation to the current date.
 * - If the date is today, it returns "Today".
 * - If the date is yesterday, it returns "Yesterday".
 * - If the date is within the current week, it returns the weekday name (e.g., "Monday").
 * - If the date is within the current year but not this week, it returns the month and day (e.g., "March 5").
 * - If the date is from a different year, it returns the full date (e.g., "March 5, 2023").
 * This function helps in categorizing news items based on their publication date and providing a user-friendly label for each category.
 * @param {Date} date - The date for which to generate the label.
 * @param {TDic} dic - A dictionary object containing localized strings for "today" and "yesterday".
 * @param {ELocale} locale - The locale to be used for formatting the date string.
 * @returns {string} - A label representing the date category (e.g., "Today", "Yesterday", "Monday", "March 5").
 */
export const getDateLabel = (
  date: Date,
  dic: TDic,
  locale: ELocale,
): string => {
  const isTodayDate = isToday(date);
  const isYesterdayDate = isYesterday(date);
  const isThisWeekDate = isThisWeek(date);
  const isThisYearDate = isThisYear(date);

  if (isTodayDate) {
    return dic.today;
  }
  if (isYesterdayDate) {
    return dic.yesterday;
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: isThisWeekDate ? 'long' : undefined,
    year: isThisYearDate ? undefined : 'numeric',
    month: isThisWeekDate ? undefined : 'long',
    day: isThisWeekDate ? undefined : 'numeric',
  };
  return capitalizeFirstLetter(date.toLocaleDateString(locale, options));
};

/**
 * Groups an array of news items by their creation date, categorizing them into labels such as "Today", "Yesterday", or specific dates.
 * The function uses the `getDateLabel` helper to generate appropriate labels based on the creation date of each news item.
 * This is useful for organizing news items in the UI, allowing users to easily see which items are recent and which are older.
 * @param {TNewsItem[]} data - An array of news items to be grouped.
 * @param {TDic} dic - A dictionary object containing localized strings for "today" and "yesterday".
 * @param {ELocale} locale - The locale to be used for formatting the date labels.
 * @returns {Record<string, TNewsItem[]>} - An object where the keys are date labels and the values are arrays of news items that fall under each label.
 */
export const groupDataByDay = (
  data: TNewsItem[],
  dic: TDic,
  locale: ELocale,
): Record<string, TNewsItem[]> =>
  groupBy(
    data.toSorted((a, b) => b.created - a.created),
    (item: TNewsItem) => getDateLabel(new Date(item.created), dic, locale),
  );
