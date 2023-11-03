import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { IconButton, ThemeToggler, LanguageSelector } from 'components/atoms';
import { APP_NAME, ROUTES } from 'common/constants';
import { useLocalization } from 'common/hooks';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dic = useLocalization();
  const isActiveBookmarks = location.pathname === ROUTES.BOOKMARKS;
  const isActiveProviders = location.pathname === ROUTES.PROVIDERS;

  return (
    <header className="d-flex align-items-center justify-content-between">
      <Link to={ROUTES.HOME}>{APP_NAME}</Link>
      <nav className="d-flex">
        <IconButton
          icon="bookmark"
          onClick={() => navigate(ROUTES.BOOKMARKS)}
          title={dic.bookmarks}
          size="big"
          className="mr-2"
          toggled={isActiveBookmarks}
        />
        <IconButton
          icon="rss"
          onClick={() => navigate(ROUTES.PROVIDERS)}
          title={dic.providers}
          size="big"
          toggled={isActiveProviders}
          className="mr-2"
        />
        <ThemeToggler />
        <LanguageSelector />
      </nav>
    </header>
  );
}

export default Header;
