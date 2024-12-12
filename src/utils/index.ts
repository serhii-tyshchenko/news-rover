export * from './api';

export * from './get-class-name';
export * from './date-helpers';
export * from './system-preferences';

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
