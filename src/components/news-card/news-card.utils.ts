import { EIcon } from '@types';
import { getViewModeIcon } from '@utils';

import { TControlsConfig, TGetControlsConfig } from './news-card.types';

export const getControlsConfig = ({
  dic,
  handleHideProvider,
  handleRefresh,
  onViewModeClick,
  showAnimation,
  isLoading = false,
  isEmptyData = false,
  viewMode,
}: TGetControlsConfig) =>
  [
    {
      icon: EIcon.ArrowsCW,
      title: dic.refresh,
      onClick: handleRefresh,
      className: showAnimation && isLoading ? 'animate-spin' : '',
      disabled: isLoading,
    },
    {
      icon: getViewModeIcon(viewMode),
      title: dic.viewMode,
      onClick: onViewModeClick,
      disabled: isLoading || isEmptyData,
    },
    {
      icon: EIcon.EyeOff,
      title: dic.hideProvider,
      onClick: handleHideProvider,
      disabled: isLoading,
    },
  ] as TControlsConfig;
