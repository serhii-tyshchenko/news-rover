import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { doGetProviders } from '@store/actions';
import { useAppDispatch, useTheme } from '@hooks';
import { ERoute } from '@constants';
import { HomePage, BookmarksPage, ProvidersPage } from '@pages';

import './App.scss';

const queryClient = new QueryClient();

function App() {
  const dispatch = useAppDispatch();

  useTheme();

  useEffect(() => {
    dispatch(doGetProviders());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={ERoute.Home} element={<HomePage />} />
        <Route path={ERoute.Bookmarks} element={<BookmarksPage />} />
        <Route path={ERoute.Providers} element={<ProvidersPage />} />
        <Route path="*" element={<Navigate to={ERoute.Home} replace />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
