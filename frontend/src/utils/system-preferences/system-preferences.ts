import { ELocale } from '@types';

export const shouldReduceMotion = () =>
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getInitialLocale = () => {
  const systemLocale = navigator.language as ELocale | undefined;

  if (systemLocale && Object.values(ELocale).includes(systemLocale)) {
    return systemLocale;
  }

  return ELocale.EnUS;
};
