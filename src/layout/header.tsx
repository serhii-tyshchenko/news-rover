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

  const navItemsConfig = [
    {
      icon: noBookmarks ? EIcon.BookmarkEmpty : EIcon.Bookmark,
      onClick: () => navigate(ERoute.Bookmarks),
      title: dic.bookmarks,
      isActive: location.pathname === ERoute.Bookmarks,
    },
    {
      icon: EIcon.Rss,
      onClick: () => navigate(ERoute.Providers),
      title: dic.providers,
      isActive: location.pathname === ERoute.Providers,
    },
    {
      icon: EIcon.Settings,
      onClick: openDialog,
      title: dic.settings,
    },
  ];

  return (
    <header className="flex items-center justify-between">
      <Link to={ERoute.Home} className="color-primary">
        {APP_NAME}
      </Link>
      <nav className="flex gap-2">
        {navItemsConfig.map((item) => (
          <IconButton
            key={item.title}
            icon={item.icon}
            onClick={item.onClick}
            title={item.title}
            size={EControlSize.Big}
            toggled={item.isActive}
          />
        ))}
      </nav>
      <SettingsDialog opened={opened} onClose={closeDialog} />
    </header>
  );
}

export default Header;
