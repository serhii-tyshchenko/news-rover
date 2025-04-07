import { TNewsItem, TBookmark, EViewMode } from '@types';
import { TGetConfig } from './news-card.types';

// TODO : Move this to a separate file
export const checkIfBookmarked = (
  bookmarks: Array<TBookmark>,
  item: TNewsItem,
) => bookmarks.some((bookmark) => bookmark.link === item.link);

export const changeViewMode = (viewMode: EViewMode) =>
  viewMode === EViewMode.TitleOnly ? EViewMode.Full : EViewMode.TitleOnly;

const getViewModeIcon = (viewMode: EViewMode) => {
  switch (viewMode) {
    case EViewMode.TitleOnly:
      return 'th-list';
    case EViewMode.Full:
      return 'th-large';
    default:
      return 'th-list';
  }
};

export const getConfig = ({
  dic,
  handleHideProvider,
  handleRefresh,
  onViewModeClick,
  showAnimation,
  viewMode = EViewMode.TitleOnly,
}: TGetConfig) => [
  {
    icon: 'arrows-cw',
    title: dic.refresh,
    onClick: handleRefresh,
    className: showAnimation ? 'animation-rotate' : '',
    disabled: showAnimation,
  },
  {
    icon: getViewModeIcon(viewMode),
    title: dic.viewMode,
    onClick: onViewModeClick,
  },
  {
    icon: 'eye-off',
    title: dic.hideProvider,
    onClick: handleHideProvider,
  },
];
