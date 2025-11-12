import { DEFAULT_AUTOREFERSH_INTERVAL } from '@constants';
import { UPDATE_SETTINGS } from '@store/action-types';
import { ETheme, IAction, TSettings } from '@types';
import { getSystemLocale, shouldReduceMotion } from '@utils';

const initialState: TSettings = {
  theme: ETheme.System,
  locale: getSystemLocale(),
  animation: !shouldReduceMotion(),
  autorefresh: false,
  autorefreshInterval: DEFAULT_AUTOREFERSH_INTERVAL,
};

export const settingsReducer = (
  state = initialState,
  action: IAction<Partial<TSettings>>,
) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_SETTINGS:
      return { ...state, ...(payload as TSettings) };
    default:
      return state;
  }
};
