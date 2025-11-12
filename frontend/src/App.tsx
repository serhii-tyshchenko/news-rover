import { Navigate, Route, Routes } from 'react-router-dom';

import { useTheme } from '@hooks';
import { BaseLayout } from '@layout';
import { BookmarksPage, HomePage, ProvidersPage } from '@pages';
import { ERoute } from '@types';

import './App.scss';
import './index.css';

function App() {
  useTheme();

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
