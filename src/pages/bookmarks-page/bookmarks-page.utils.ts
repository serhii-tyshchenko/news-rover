import { EViewMode, TDic } from '@types';
import { getViewModeIcon } from '@utils';

type TGetControlsConfig = {
  dic: TDic;
  onViewModeClick: () => void;
  viewMode: EViewMode;
  isEmptyData: boolean;
};

export const getControlsConfig = ({
  dic,
  onViewModeClick,
  viewMode,
  isEmptyData,
}: TGetControlsConfig) => [
  {
    icon: getViewModeIcon(viewMode),
    title: dic.viewMode,
    onClick: onViewModeClick,
    disabled: isEmptyData,
  },
];
