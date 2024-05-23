import { TProvider, TDic } from '@types';

export interface INewsCardProps {
  provider: TProvider;
}

export type TGetConfig = {
  dic: TDic;
  handleHideProvider: () => void;
  handleRefresh: () => void;
  showAnimation: boolean;
};
