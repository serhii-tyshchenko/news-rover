import { UPDATE_SETTINGS } from 'store/action-types';

export const doUpdateSettings = (data) => (dispatch) => {
  dispatch({ type: UPDATE_SETTINGS, payload: data });
};
