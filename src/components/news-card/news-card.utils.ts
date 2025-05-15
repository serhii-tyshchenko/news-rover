import { EViewMode } from '@types';

import { TGetConfig } from './news-card.types';

export const changeViewMode = (viewMode: EViewMode) => {
  switch (viewMode) {
    case EViewMode.TitleOnly:
      return EViewMode.TitleWithDescription;
    case EViewMode.TitleWithDescription:
      return EViewMode.TitleWithThumbnail;
    case EViewMode.TitleWithThumbnail:
      return EViewMode.Full;
    case EViewMode.Full:
      return EViewMode.TitleOnly;
    default:
      return EViewMode.TitleOnly;
  }
};

const getViewModeIcon = (viewMode: EViewMode) => {
  switch (viewMode) {
    case EViewMode.TitleOnly:
    case EViewMode.TitleWithDescription:
      return 'th-list';
    case EViewMode.TitleWithThumbnail:
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
