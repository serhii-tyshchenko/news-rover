import { LANGUAGES } from '@constants';

export const prepareOptions = () =>
  Object.values(LANGUAGES).map((language) => ({
    value: language,
    label: language.toUpperCase(),
  }));
