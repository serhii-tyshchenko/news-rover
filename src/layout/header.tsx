import { useNavigate, useLocation } from 'react-router';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { IconButton } from '@components/ui';
import { SettingsDialog } from '@components';
import { APP_NAME, ERoute, EIcon } from '@constants';
import { useLocalization, useAppSelector, useToggle } from '@hooks';
import { selectBookmarksData } from '@store/selectors';

function Header() {
  const [opened, toggle] = useToggle();
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
        <IconButton
          icon={EIcon.Settings}
          onClick={toggle}
          title={dic.settings}
          size="big"
          className="mr-2"
        />
      </nav>
      <SettingsDialog opened={opened} onClose={toggle} />
    </header>
  );
}

export default Header;
