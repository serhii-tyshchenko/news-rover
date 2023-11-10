import { TSettings } from '@types';
import { UPDATE_SETTINGS } from '@store/action-types';

export const doUpdateSettings = (data: TSettings) => ({
  type: UPDATE_SETTINGS,
  payload: data,
});
