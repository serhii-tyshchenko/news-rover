import { TRootState } from '@store';

const selectRoot = (state: TRootState) => state.settings;

export const selectTheme = (state: TRootState) => selectRoot(state).theme;
export const selectLocale = (state: TRootState) => selectRoot(state).locale;
