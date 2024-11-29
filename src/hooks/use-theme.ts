import { useEffect } from 'react';
import { selectTheme } from '@store/selectors';
import { useAppSelector, useMediaQuery } from '@hooks';
import { THEMES } from '@constants';

export const useTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  let theme = useAppSelector(selectTheme);

  if (theme === THEMES.SYSTEM) {
    theme = prefersDarkMode ? THEMES.DARK : THEMES.LIGHT;
  }

  useEffect(
    () => document.documentElement.setAttribute('data-theme', theme),
    [theme],
  );
};
