import { UPDATE_SETTINGS } from '@store/action-types';
import { TSettings } from '@types';

export const doUpdateSettings = (data: {
  locale?: string;
  theme?: string;
}) => ({
  type: UPDATE_SETTINGS,
  payload: data as Partial<TSettings>,
});
