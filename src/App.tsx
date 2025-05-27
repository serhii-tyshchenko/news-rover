import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLoader } from '@components';
import { useAppDispatch, useAppSelector, useTheme } from '@hooks';
import { BaseLayout } from '@layout';
import { BookmarksPage, HomePage, ProvidersPage } from '@pages';
import { doGetProviders } from '@store/actions';
import { selectProvidersLoading } from '@store/selectors';
import { ERoute } from '@types';

import './App.scss';

function App() {
  useTheme();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectProvidersLoading);

  useEffect(() => {
    // @ts-expect-error: dispatch supports thunk actions
    dispatch(doGetProviders());
  }, [dispatch]);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <Routes>
      <Route path={ERoute.Home} element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ERoute.Bookmarks} element={<BookmarksPage />} />
        <Route path={ERoute.Providers} element={<ProvidersPage />} />
        <Route path="*" element={<Navigate to={ERoute.Home} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
