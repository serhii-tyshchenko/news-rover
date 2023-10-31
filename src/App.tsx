import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { doGetProviders } from 'store/actions';
import { selectProvidersData } from 'store/selectors';
import { isEmpty } from 'lodash';

import { useAppDispatch, useAppSelector, useTheme } from 'common/hooks';
import { ROUTES } from 'common/constants';

import { HomePage, BookmarksPage, ProvidersPage } from 'pages';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const providers = useAppSelector(selectProvidersData);

  useTheme();

  useEffect(() => {
    if (isEmpty(providers)) {
      dispatch(doGetProviders());
    }
  }, [dispatch, providers]);

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
