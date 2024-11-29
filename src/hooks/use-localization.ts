import { useAppSelector } from '@hooks';
import { useMemo } from 'react';
import { selectLocale } from '@store/selectors';
import { LANGUAGES } from '@constants';

import STR from '@localization';

const useLocalization = () => {
  const LOCALE = useAppSelector(selectLocale) || LANGUAGES.EN;

  return useMemo(() => STR[LOCALE as keyof typeof STR], [LOCALE]);
};

export default useLocalization;
