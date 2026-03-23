import { createContext, useEffect, useState } from 'react';

import { useAppSelector } from '@store/hooks';
import { selectLocale } from '@store/slices';
import { TDic } from '@types';

interface IProps {
  children: React.ReactNode;
}

export const LocalizationContext = createContext<TDic>({} as TDic);

export const LocalizationProvider: React.FC<IProps> = ({ children }) => {
  const locale = useAppSelector(selectLocale);
  const [localization, setLocalization] = useState<TDic>({} as TDic);

  useEffect(() => {
    fetch(`/locales/${locale.toLowerCase()}.json`)
      .then((response) => response.json())
      .then(setLocalization)
      .catch((error) => console.error('Error loading localization:', error));
  }, [locale]);

  return (
    <LocalizationContext.Provider value={localization}>
      {children}
    </LocalizationContext.Provider>
  );
};
