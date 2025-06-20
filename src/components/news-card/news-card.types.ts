import { EViewMode, TDic, TProvider } from '@types';

export interface INewsCardProps {
  provider: TProvider;
}

export type TGetControlsConfig = {
  dic: TDic;
  handleHideProvider: () => void;
  handleRefresh: () => void;
  onViewModeClick: () => void;
  showAnimation: boolean;
  viewMode: EViewMode;
  isLoading?: boolean;
  isEmptyData?: boolean;
};

export type TControlsConfig = {
  icon: string;
  title: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}[];
