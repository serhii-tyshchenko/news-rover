import { useEffect } from 'react';

import { useAppSelector, useMediaQuery } from '@hooks';
import { selectTheme } from '@store/selectors';
import { ETheme } from '@types';

function useTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  let theme = useAppSelector(selectTheme);

  if (theme === ETheme.System) {
    theme = prefersDarkMode ? ETheme.Dark : ETheme.Light;
  }

  useEffect(
    () => document.documentElement.setAttribute('data-theme', theme),
    [theme],
  );
}

export default useTheme;
