import { first } from 'lodash';

import { ELanguage } from '@types';

export const shouldReduceMotion = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getSystemLocale = () => {
  const systemLocale = first(navigator.language.split('-'));

  if (
    systemLocale &&
    Object.values(ELanguage).includes(systemLocale as ELanguage)
  ) {
    return systemLocale as ELanguage;
  }

  return ELanguage.En;
};
