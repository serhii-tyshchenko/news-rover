import { IAction, TSettings } from '@types';
import { THEMES, LANGUAGES, EAnimation } from '@constants';
import { UPDATE_SETTINGS } from '@store/action-types';

const initialState: TSettings = {
  theme: THEMES.LIGHT,
  locale: LANGUAGES.EN,
  animation: EAnimation.On,
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
