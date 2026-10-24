import { ROUTE } from '#constants';
import type { TDic } from '#types';
import { EIcon } from '#types';

type IArgs = {
  dic: TDic;
  navigate: (route: (typeof ROUTE)[keyof typeof ROUTE]) => void;
  noBookmarks: boolean;
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
  location,
  onFullscreen,
  isFullscreen,
  isFullscreenEnabled,
}: IArgs): Array<TNavItem> =>
  [
    {
      icon: EIcon.Rss,
      onClick: () => navigate(ROUTE.PROVIDERS),
      title: dic.providers,
      active: location.pathname.includes(ROUTE.PROVIDERS),
    },
    {
      icon: noBookmarks ? EIcon.BookmarkEmpty : EIcon.Bookmark,
      onClick: () => navigate(ROUTE.BOOKMARKS),
      title: dic.bookmarks,
      active: location.pathname.includes(ROUTE.BOOKMARKS),
    },
    ...(isFullscreenEnabled
      ? [
          {
            icon: isFullscreen ? EIcon.ResizeSmall : EIcon.ResizeFull,
            onClick: onFullscreen,
            title: isFullscreen ? dic.exitFullscreen : dic.fullscreen,
          },
        ]
      : []),
    {
      icon: EIcon.Settings,
      onClick: () => navigate(ROUTE.SETTINGS),
      title: dic.settings,
      active: location.pathname.includes(ROUTE.SETTINGS),
    },
  ].filter(Boolean);
