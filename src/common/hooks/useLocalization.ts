import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { selectLocale } from 'store/selectors';
import { LANGUAGES } from 'common/constants';

import STR from 'localization';

const useLocalization = () => {
  const LOCALE = useSelector(selectLocale) || LANGUAGES.EN;

  return useMemo(() => STR[LOCALE as keyof typeof STR], [LOCALE]);
};

export default useLocalization;
