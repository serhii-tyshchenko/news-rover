import { useEffect } from 'react';
import { selectTheme } from '@store/selectors';
import { useAppSelector, useMediaQuery } from '@hooks';
import { ETheme } from '@constants';

export const useTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  let theme = useAppSelector(selectTheme);

  if (theme === ETheme.System) {
    theme = prefersDarkMode ? ETheme.Dark : ETheme.Light;
  }

  useEffect(
    () => document.documentElement.setAttribute('data-theme', theme),
    [theme],
  );
};
