import { STORAGE_KEY_REDUX_STATE } from '@constants';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '@storage';

import { addedProviders, bookmarks, settings } from './slices';

export const rootReducer = combineReducers({
  settings,
  addedProviders,
  bookmarks,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(STORAGE_KEY_REDUX_STATE),
});

store.subscribe(() => {
  const { settings, addedProviders, bookmarks } = store.getState();
  saveState(STORAGE_KEY_REDUX_STATE, {
    settings,
    addedProviders,
    bookmarks,
  });
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
