import { useNavigate, useLocation } from 'react-router';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { IconButton } from '@components/ui';
import { ThemeToggler, LanguageSelector } from '@components';
import { APP_NAME, ERoute, EIcon } from '@constants';
import { useLocalization, useAppSelector } from '@hooks';
import { selectBookmarksData } from '@store/selectors';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dic = useLocalization();
  const areBookmarks = !isEmpty(useAppSelector(selectBookmarksData));

  const isActiveBookmarks = location.pathname === ERoute.Bookmarks;
  const isActiveProviders = location.pathname === ERoute.Providers;

  return (
    <header className="d-flex align-items-center justify-content-between">
      <Link to={ERoute.Home}>{APP_NAME}</Link>
      <nav className="d-flex">
        <IconButton
          icon={areBookmarks ? EIcon.Bookmark : EIcon.BookmarkEmpty}
          onClick={() => navigate(ERoute.Bookmarks)}
          title={dic.bookmarks}
          size="big"
          className="mr-2"
          toggled={isActiveBookmarks}
        />
        <IconButton
          icon={EIcon.Rss}
          onClick={() => navigate(ERoute.Providers)}
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
