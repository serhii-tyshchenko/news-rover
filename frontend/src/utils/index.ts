export * from './api';

export * from './date-helpers';
export * from './get-class-name';
export * from './system-preferences';
export * from './view-mode';

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
