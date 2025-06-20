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
      icon: 'arrows-cw',
      title: dic.refresh,
      onClick: handleRefresh,
      className: showAnimation && isLoading ? 'animation-rotate' : '',
      disabled: isLoading,
    },
    {
      icon: getViewModeIcon(viewMode),
      title: dic.viewMode,
      onClick: onViewModeClick,
      disabled: isLoading || isEmptyData,
    },
    {
      icon: 'eye-off',
      title: dic.hideProvider,
      onClick: handleHideProvider,
      disabled: isLoading,
    },
  ] as TControlsConfig;
