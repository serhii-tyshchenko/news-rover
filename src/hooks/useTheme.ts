import { useEffect } from 'react';
import { selectTheme } from '@store/selectors';
import { useAppSelector } from '@hooks';

export const useTheme = () => {
  const theme = useAppSelector(selectTheme);

  useEffect(
    () => document.documentElement.setAttribute('data-theme', theme),
    [theme]
  );
};