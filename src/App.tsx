import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLoader } from '@components';
import { useAnimation, useAppDispatch, useAppSelector, useTheme } from '@hooks';
import { BaseLayout } from '@layout';
import { BookmarksPage, HomePage, ProvidersPage } from '@pages';
import { doGetProviders } from '@store/actions';
import { selectProvidersLoading } from '@store/selectors';
import { ERoute } from '@types';

import './App.scss';
import './index.css';

function App() {
  useTheme();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectProvidersLoading);
  const isAnimationEnabled = useAnimation();

  useEffect(() => {
    // @ts-expect-error: dispatch supports thunk actions
    dispatch(doGetProviders());
  }, [dispatch]);

  if (isLoading) {
    return <AppLoader animated={isAnimationEnabled} />;
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
