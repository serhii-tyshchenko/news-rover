import { decode } from 'html-entities';
import { DEFAULT_POST_LIMIT } from './constants.ts';

type TransformInputItem = {
  title?: string;
  link?: string;
  created?: string | number;
  enclosures?: unknown[];
  description?: string;
};

export const transformData = (
  items: TransformInputItem[] = [],
  limit: number | string = DEFAULT_POST_LIMIT,
) => {
  const safeLimit = Number(limit) || DEFAULT_POST_LIMIT;

  return items
    .slice(0, safeLimit)
    .map(({ title, link, created, enclosures, description }) => ({
      title: decode(String(title ?? '')).trim(),
      link,
      created,
      enclosures,
      description: decode(String(description ?? ''))
        .trim()
        .replaceAll('\n', ''),
    }));
};

export const normalizeTitle = (text: string) => text.normalize('NFKD').trim();

export const normalizeDescription = (description: string) => {
  const MAX_LENGTH = 250;
  const strippedDescription = description.replace(/<[^>]*>/g, '').trim();

  if (strippedDescription.length <= MAX_LENGTH) return strippedDescription;

  const truncatedDescription = strippedDescription.slice(0, MAX_LENGTH);
  return truncatedDescription.endsWith('...')
    ? truncatedDescription
    : `${truncatedDescription}...`;
};

export const normalizeDate = (date: string) => {
  const daysMap: Record<string, string> = {
    пн: 'Mon',
    вт: 'Tue',
    ср: 'Wed',
    чт: 'Thu',
    пт: 'Fri',
    сб: 'Sat',
    нв: 'Sun',
  };
  const monthsMap: Record<string, string> = {
    січ: 'Jan',
    янв: 'Jan',
    лют: 'Feb',
    фев: 'Feb',
    бер: 'Mar',
    мар: 'Mar',
    кві: 'Apr',
    апр: 'Apr',
    тра: 'May',
    май: 'May',
    чер: 'Jun',
    июн: 'Jun',
    лип: 'Jul',
    июл: 'Jul',
    сер: 'Aug',
    авг: 'Aug',
    вер: 'Sep',
    сен: 'Sep',
    жов: 'Oct',
    окт: 'Oct',
    лис: 'Nov',
    ноя: 'Nov',
    гру: 'Dec',
    дек: 'Dec',
  };

  const arrayToRegex = (arr: Record<string, string>) =>
    new RegExp(Object.keys(arr).join('|'), 'gi');

  const regexDays = arrayToRegex(daysMap);
  const regexMonths = arrayToRegex(monthsMap);

  const newDate = date
    .replace(regexDays, (match) => daysMap[match])
    .replace(regexMonths, (match) => monthsMap[match]);
  return newDate;
};
