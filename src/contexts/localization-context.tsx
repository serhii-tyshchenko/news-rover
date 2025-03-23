import { useState, useEffect, createContext } from 'react';
import { useAppSelector } from '@hooks';
import { selectLocale } from '@store/selectors';
import { TDic } from '@types';

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export const LocalizationContext = createContext<TDic>({} as TDic);

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const locale = useAppSelector(selectLocale);
  const [localization, setLocalization] = useState<TDic>({} as TDic);

  useEffect(() => {
    fetch(`/locales/${locale}.json`)
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
