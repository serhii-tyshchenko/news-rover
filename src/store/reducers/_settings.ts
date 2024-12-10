import { IAction, TSettings } from '@types';
import {
  ETheme,
  ELanguage,
  EAnimation,
  EThumbnail,
  EAutoRefresh,
} from '@constants';
import { UPDATE_SETTINGS } from '@store/action-types';

const initialState: TSettings = {
  theme: ETheme.Light,
  locale: ELanguage.En,
  animation: EAnimation.On,
  thumbnail: EThumbnail.On,
  autorefresh: EAutoRefresh.Off,
};

export const settings = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SETTINGS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
