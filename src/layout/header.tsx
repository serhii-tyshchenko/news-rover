import { useNavigate, useLocation } from 'react-router';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { IconButton } from '@components/ui';
import { SettingsDialog } from '@components';
import { APP_NAME, ERoute, EIcon } from '@constants';
import { useLocalization, useAppSelector, useDialogState } from '@hooks';
import { selectBookmarksData } from '@store/selectors';
import { EControlSize } from '@types';

function Header() {
  const { opened, openDialog, closeDialog } = useDialogState();
  const navigate = useNavigate();
  const location = useLocation();
  const dic = useLocalization();
  const noBookmarks = isEmpty(useAppSelector(selectBookmarksData));

  const isActiveBookmarks = location.pathname === ERoute.Bookmarks;
  const isActiveProviders = location.pathname === ERoute.Providers;

  return (
    <header className="flex items-center justify-between">
      <Link to={ERoute.Home} className="color-primary">
        {APP_NAME}
      </Link>
      <nav className="flex">
        <IconButton
          icon={noBookmarks ? EIcon.BookmarkEmpty : EIcon.Bookmark}
          onClick={() => navigate(ERoute.Bookmarks)}
          title={dic.bookmarks}
          size={EControlSize.Big}
          className="mr-2"
          toggled={isActiveBookmarks}
        />
        <IconButton
          icon={EIcon.Rss}
          onClick={() => navigate(ERoute.Providers)}
          title={dic.providers}
          size={EControlSize.Big}
          toggled={isActiveProviders}
          className="mr-2"
        />
        <IconButton
          icon={EIcon.Settings}
          onClick={openDialog}
          title={dic.settings}
          size={EControlSize.Big}
          className="mr-2"
        />
      </nav>
      <SettingsDialog opened={opened} onClose={closeDialog} />
    </header>
  );
}

export default Header;
