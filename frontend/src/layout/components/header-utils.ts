import { EIcon, ERoute, TDic } from '@types';

interface IGetNavConfig {
  dic: TDic;
  navigate: (route: ERoute) => void;
  noBookmarks: boolean;
  openDialog: () => void;
  location: {
    pathname: string;
  };
}

export const getNavConfig = ({
  dic,
  navigate,
  noBookmarks,
  openDialog,
  location,
}: IGetNavConfig) => [
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
];
