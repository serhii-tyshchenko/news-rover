import { EIcon, ERoute, TDic } from '@types';

type IArgs = {
  dic: TDic;
  navigate: (route: ERoute) => void;
  noBookmarks: boolean;
  openDialog: () => void;
  location: {
    pathname: string;
  };
  onFullscreen: () => void;
  isFullscreenEnabled: boolean;
  isFullscreen: boolean;
};

type TNavItem = {
  icon: EIcon;
  onClick: () => void;
  title: string;
  active?: boolean;
};

export const getNavConfig = ({
  dic,
  navigate,
  noBookmarks,
  openDialog,
  location,
  onFullscreen,
  isFullscreen,
  isFullscreenEnabled,
}: IArgs): TNavItem[] => [
  {
    icon: EIcon.Rss,
    onClick: () => navigate(ERoute.Providers),
    title: dic.providers,
    active: location.pathname.includes(ERoute.Providers),
  },
  {
    icon: noBookmarks ? EIcon.BookmarkEmpty : EIcon.Bookmark,
    onClick: () => navigate(ERoute.Bookmarks),
    title: dic.bookmarks,
    active: location.pathname.includes(ERoute.Bookmarks),
  },
  {
    icon: EIcon.Settings,
    onClick: openDialog,
    title: dic.settings,
  },
  {
    ...(isFullscreenEnabled
      ? {
          icon: isFullscreen ? EIcon.ResizeSmall : EIcon.ResizeFull,
          onClick: onFullscreen,
          title: isFullscreen ? dic.exitFullscreen : dic.fullscreen,
        }
      : ({} as TNavItem)),
  },
];
