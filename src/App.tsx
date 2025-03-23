import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { doGetProviders } from '@store/actions';
import { selectProvidersLoading } from '@store/selectors';
import { useAppDispatch, useAppSelector, useTheme } from '@hooks';
import { ERoute } from '@constants';
import { AppLoader } from '@components';

import { HomePage, BookmarksPage, ProvidersPage } from '@pages';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectProvidersLoading);
  useTheme();

  useEffect(() => {
    dispatch(doGetProviders());
  }, [dispatch]);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <Routes>
      <Route path={ERoute.Home} element={<HomePage />} />
      <Route path={ERoute.Bookmarks} element={<BookmarksPage />} />
      <Route path={ERoute.Providers} element={<ProvidersPage />} />
      <Route path="*" element={<Navigate to={ERoute.Home} replace />} />
    </Routes>
  );
}

export default App;
