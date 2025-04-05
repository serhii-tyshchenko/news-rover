import { IAction, TSettings } from '@types';
import { ETheme, DEFAULT_AUTOREFERSH_INTERVAL } from '@constants';
import { UPDATE_SETTINGS } from '@store/action-types';
import { shouldReduceMotion, getSystemLocale } from '@utils';

const initialState: TSettings = {
  theme: ETheme.System,
  locale: getSystemLocale(),
  animation: !shouldReduceMotion(),
  thumbnail: false,
  autorefresh: false,
  autorefreshInterval: DEFAULT_AUTOREFERSH_INTERVAL,
  showDescription: false,
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
