import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { IconButton } from 'components/atoms';
import { APP_NAME, ROUTES } from 'common/constants';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActiveBookmarks = location.pathname === ROUTES.BOOKMARKS;
  const isActiveProviders = location.pathname === ROUTES.PROVIDERS;

  return (
    <header className="d-flex align-items-center justify-content-between">
      <Link to={ROUTES.HOME}>{APP_NAME}</Link>
      <nav>
        <IconButton
          icon="bookmark"
          onClick={() => navigate(ROUTES.BOOKMARKS)}
          title="Manage Bookmarks"
          size="big"
          className="mr-2"
          toggled={isActiveBookmarks}
        />
        <IconButton
          icon="rss"
          onClick={() => navigate(ROUTES.PROVIDERS)}
          title="Manage Providers"
          size="big"
          toggled={isActiveProviders}
        />
      </nav>
    </header>
  );
}

export default Header;
