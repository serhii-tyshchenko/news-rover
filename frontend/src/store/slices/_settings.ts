import { DEFAULT_AUTOREFERSH_INTERVAL } from '@constants';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ETheme, TSettings } from '@types';
import { getInitialLocale, shouldReduceMotion } from '@utils';

import { TRootState } from '../index';

const initialState: TSettings = {
  animation: !shouldReduceMotion(),
  autorefresh: false,
  autorefreshInterval: DEFAULT_AUTOREFERSH_INTERVAL,
  fullscreenToggle: false,
  locale: getInitialLocale(),
  refreshOnFocus: false,
  theme: ETheme.System,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    doUpdateSettings: (state, action: PayloadAction<Partial<TSettings>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

const selectRoot = (state: TRootState) => state.settings;

export const { doUpdateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectTheme = (state: TRootState) => selectRoot(state).theme;

export const selectLocale = (state: TRootState) => selectRoot(state).locale;

export const selectSettingsData = (state: TRootState) => selectRoot(state);
