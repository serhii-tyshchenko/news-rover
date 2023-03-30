import { useEffect, useState } from 'react';

const themes = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

const mql = window.matchMedia('(prefers-color-scheme: dark)');

const getSystemTheme = (matches: boolean) =>
  matches ? themes.DARK : themes.LIGHT;

export const useTheme = () => {
  const [theme, setTheme] = useState(getSystemTheme(mql.matches));

  const onSystemThemeChange = (evt: { matches: boolean }) =>
    setTheme(getSystemTheme(evt.matches));

  useEffect(
    () => document.documentElement.setAttribute('data-theme', theme),
    [theme]
  );

  useEffect(() => {
    mql.addEventListener('change', onSystemThemeChange);
    return () => {
      mql.removeEventListener('change', onSystemThemeChange);
    };
  }, []);
};
