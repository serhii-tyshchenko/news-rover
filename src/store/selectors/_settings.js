const selectRoot = (state) => state.settings;

export const selectTheme = (state) => selectRoot(state).theme;
export const selectLocale = (state) => selectRoot(state).locale;
