import { TProvider, TDic, EViewMode } from '@types';

export interface INewsCardProps {
  provider: TProvider;
}

export type TGetConfig = {
  dic: TDic;
  handleHideProvider: () => void;
  handleRefresh: () => void;
  onViewModeClick: () => void;
  showAnimation: boolean;
  viewMode: EViewMode;
};
