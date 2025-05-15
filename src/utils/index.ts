export * from './api';

export * from './get-class-name';
export * from './date-helpers';
export * from './system-preferences';

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const prepareOptions = (
  arr: { [key: string]: string },
  dic: { [key: string]: string },
) =>
  Object.values(arr).map((item) => ({
    value: item,
    label: dic?.[item] || item,
  }));
