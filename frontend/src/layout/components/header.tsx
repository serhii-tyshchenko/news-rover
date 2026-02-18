import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { isEmpty } from 'lodash-es';

import { SettingsDialog } from '@components';
import { APP_NAME } from '@constants';
import {
  useAppSelector,
  useDialogState,
  useFullscreen,
  useLocalization,
} from '@hooks';
import { selectBookmarksData } from '@store/selectors';
import { ERoute } from '@types';

import HeaderNav from './header-nav';
import { getNavConfig } from './header.utils';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { opened, openDialog, closeDialog } = useDialogState();

  const { isFullscreenEnabled, isFullscreen, toggleFullscreen } =
    useFullscreen();

  const dic = useLocalization();

  const noBookmarks = isEmpty(useAppSelector(selectBookmarksData));

  const navConfig = useMemo(
    () =>
      getNavConfig({
        dic,
        navigate,
        noBookmarks,
        openDialog,
        location,
        isFullscreen,
        isFullscreenEnabled,
        onFullscreen: toggleFullscreen,
      }),
    [
      dic,
      navigate,
      noBookmarks,
      openDialog,
      location,
      isFullscreen,
      isFullscreenEnabled,
      toggleFullscreen,
    ],
  );

  return (
    <header className="header flex items-center justify-between text-2xl p-2 sm:p-4">
      <Link to={ERoute.Home} className="text-primary hover:text-accent">
        {APP_NAME}
      </Link>
      <HeaderNav items={navConfig} />
      <SettingsDialog opened={opened} onClose={closeDialog} />
    </header>
  );
}

export default Header;
