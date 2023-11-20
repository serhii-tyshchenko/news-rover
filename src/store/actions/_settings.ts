import { UPDATE_SETTINGS } from '@store/action-types';

export const doUpdateSettings = (data: {
  locale?: string;
  theme?: string;
}) => ({
  type: UPDATE_SETTINGS,
  payload: data,
});
