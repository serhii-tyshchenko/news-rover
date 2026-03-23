import { useEffect } from 'react';

import { useMediaQuery } from '@hooks';
import { useAppSelector } from '@store/hooks';
import { selectTheme } from '@store/slices';
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
