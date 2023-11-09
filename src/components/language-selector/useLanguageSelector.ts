import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { doUpdateSettings } from '@store/actions';
import { selectLocale } from '@store/selectors';

const useLanguageSelector = () => {
  const dispatch = useAppDispatch();
  const currLanguage = useAppSelector(selectLocale);

  const onLanguageChange = useCallback(
    (evt: { target: { value: any } }) =>
      dispatch(doUpdateSettings({ locale: evt.target.value })),
    [dispatch]
  );

  return {
    currLanguage,
    onLanguageChange,
  };
};

export default useLanguageSelector;
