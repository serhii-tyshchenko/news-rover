import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { isEmpty } from 'lodash';

import { IconButton, SettingsDialog } from '@components';
import { APP_NAME } from '@constants';
import { useAppSelector, useDialogState, useLocalization } from '@hooks';
import { selectBookmarksData } from '@store/selectors';
import { EControlSize, EIcon, ERoute } from '@types';

function Header() {
  const { opened, openDialog, closeDialog } = useDialogState();
  const navigate = useNavigate();
  const location = useLocation();
  const dic = useLocalization();

  const noBookmarks = isEmpty(useAppSelector(selectBookmarksData));

  const navItemsConfig = [
    {
      icon: EIcon.Rss,
      onClick: () => navigate(ERoute.Providers),
      title: dic.providers,
      isActive: location.pathname.includes(ERoute.Providers),
    },
    {
      icon: noBookmarks ? EIcon.BookmarkEmpty : EIcon.Bookmark,
      onClick: () => navigate(ERoute.Bookmarks),
      title: dic.bookmarks,
      isActive: location.pathname.includes(ERoute.Bookmarks),
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
            key={item.icon}
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
