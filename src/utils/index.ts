export * from './get-class-name';
export * from './date-helpers';

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
