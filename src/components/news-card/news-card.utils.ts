import { EViewMode } from '@types';
import { getViewModeIcon } from '@utils';

import { TGetConfig } from './news-card.types';

export const getControlsConfig = ({
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
