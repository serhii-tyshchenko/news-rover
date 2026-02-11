import { UPDATE_SETTINGS } from '@store/action-types';
import { TSettings } from '@types';

export const doUpdateSettings = (payload: Partial<TSettings>) => ({
  type: UPDATE_SETTINGS,
  payload,
});
