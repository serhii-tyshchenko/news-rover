import { TNewsItem, TBookmark } from '@types';
import { TGetConfig } from './news-card.types';

export const checkIfBookmarked = (
  bookmarks: Array<TBookmark>,
  item: TNewsItem,
) => bookmarks.some((bookmark) => bookmark.link === item.link);

export const getConfig = ({
  dic,
  handleHideProvider,
  handleRefresh,
  showAnimation,
}: TGetConfig) => [
  {
    icon: 'eye-off',
    title: dic.hideProvider,
    onClick: handleHideProvider,
  },
  {
    icon: 'arrows-cw',
    title: dic.refresh,
    onClick: handleRefresh,
    className: showAnimation ? 'animation-rotate' : '',
    disabled: showAnimation,
  },
];
