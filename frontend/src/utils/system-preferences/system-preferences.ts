import { ELocale } from '@types';

/**
 * Checks if the user has set a preference for reduced motion in their system settings.
 * This is useful for improving accessibility by reducing animations and motion effects for users who may experience discomfort or motion sickness.
 * @returns {boolean} - Returns true if the user prefers reduced motion, otherwise false.
 */
export const shouldReduceMotion = (): boolean =>
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Retrieves the user's system locale and checks if it matches one of the supported locales defined in the `ELocale` enum.
 * If a match is found, it returns the system locale; otherwise, it defaults to 'en-US'.
 * @returns {ELocale} - The initial locale to be used in the application, based on the user's system settings.
 */
export const getInitialLocale = (): ELocale => {
  const systemLocale = navigator.language as ELocale | undefined;

  if (systemLocale && Object.values(ELocale).includes(systemLocale)) {
    return systemLocale;
  }

  return ELocale.EnUS;
};
