import { TProvider, TDic } from '@types';

export type TWidgetProps = {
  provider: TProvider;
};

export type TGetConfig = {
  dic: TDic;
  handleHideProvider: () => void;
  handleRefresh: () => void;
  showAnimation: boolean;
};
