import { useAppSelector } from '@hooks';
import { useMemo } from 'react';
import { selectLocale } from '@store/selectors';
import { ELanguage } from '@constants';

import STR from '@localization';

const useLocalization = () => {
  const locale = useAppSelector(selectLocale) || ELanguage.En;

  return useMemo(() => STR[locale as keyof typeof STR], [locale]);
};

export default useLocalization;
