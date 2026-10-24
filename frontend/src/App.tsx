import { Navigate, Route, Routes } from 'react-router';

import { ROUTE } from '#constants';
import { useTheme } from '#hooks';
import { BaseLayout } from '#layout';
import { BookmarksPage, HomePage, ProvidersPage, SettingsPage } from '#pages';

import './App.scss';
import './index.css';

function App() {
  useTheme();

  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<BaseLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTE.BOOKMARKS} element={<BookmarksPage />} />
        <Route path={ROUTE.PROVIDERS} element={<ProvidersPage />} />
        <Route path={ROUTE.SETTINGS} element={<SettingsPage />} />
        <Route path="*" element={<Navigate to={ROUTE.HOME} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
