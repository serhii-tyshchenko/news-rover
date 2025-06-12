import { EViewMode, TDic } from '@types';
import { getViewModeIcon } from '@utils';

export type TGetControlsConfig = {
  dic: TDic;
  onViewModeClick: () => void;
  viewMode: EViewMode;
};

export const getControlsConfig = ({
  dic,
  onViewModeClick,
  viewMode = EViewMode.TitleOnly,
}: TGetControlsConfig) => [
  {
    icon: getViewModeIcon(viewMode),
    title: dic.viewMode,
    onClick: onViewModeClick,
  },
];
