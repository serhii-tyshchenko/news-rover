import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { doGetProviders } from '@store/actions';
import { useAppDispatch, useTheme } from '@hooks';
import { ROUTES } from '@constants';
import { HomePage, BookmarksPage, ProvidersPage } from '@pages';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();

  useTheme();

  useEffect(() => {
    dispatch(doGetProviders());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.BOOKMARKS} element={<BookmarksPage />} />
      <Route path={ROUTES.PROVIDERS} element={<ProvidersPage />} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default App;
