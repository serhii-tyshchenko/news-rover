import { useState, useEffect } from 'react';
import { useAppSelector } from '@hooks';
import { selectLocale } from '@store/selectors';
import { TDic } from '@types';

const useLocalization = () => {
  const locale = useAppSelector(selectLocale);

  const [localization, setLocalization] = useState({});

  useEffect(() => {
    fetch(`/locales/${locale}.json`)
      .then((response) => response.json())
      .then((data) => setLocalization(data))
      .catch((error) => console.error('Error loading localization:', error));
  }, [locale]);

  return localization as TDic;
};

export default useLocalization;
