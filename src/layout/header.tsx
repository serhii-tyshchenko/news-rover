import { useNavigate, useLocation } from 'react-router';
import { IconButton, ThemeToggler, LanguageSelector } from 'components/atoms';
import { APP_NAME, ROUTES } from 'common/constants';
import { useLocalization } from 'common/hooks';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dic = useLocalization();
  const isActiveHome = location.pathname === ROUTES.HOME;
  const isActiveBookmarks = location.pathname === ROUTES.BOOKMARKS;
  const isActiveProviders = location.pathname === ROUTES.PROVIDERS;

  return (
    <header className="d-flex align-items-center justify-content-between">
      {APP_NAME}
      <nav className="d-flex">
        <IconButton
          icon="rss"
          onClick={() => navigate(ROUTES.HOME)}
          title={dic.home}
          size="big"
          toggled={isActiveHome}
          className="mr-1"
        />
        <IconButton
          icon="bookmark"
          onClick={() => navigate(ROUTES.BOOKMARKS)}
          title={dic.bookmarks}
          size="big"
          className="mr-1"
          toggled={isActiveBookmarks}
        />
        <IconButton
          icon="cog"
          onClick={() => navigate(ROUTES.PROVIDERS)}
          title={dic.providers}
          size="big"
          toggled={isActiveProviders}
          className="mr-3"
        />
        <ThemeToggler />
        <LanguageSelector />
      </nav>
    </header>
  );
}

export default Header;
