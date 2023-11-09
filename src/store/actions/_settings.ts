import { TDispatch, TSettings } from '@types';
import { UPDATE_SETTINGS } from '@store/action-types';

export const doUpdateSettings = (data: TSettings) => (dispatch: TDispatch) => {
  dispatch({ type: UPDATE_SETTINGS, payload: data });
};
