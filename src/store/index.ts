import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import thunk from 'redux-thunk';

import { loadState, saveState } from '@core/localStorage';

import {
  addedProvidersReducer as addedProviders,
  bookmarksReducer as bookmarks,
  providersReducer as providers,
  settings,
} from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const rootReducer = combineReducers({
  settings,
  providers,
  addedProviders,
  bookmarks,
});

const persistedState = loadState();
const composeTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  persistedState,
  composeTools(applyMiddleware(thunk)),
);

store.subscribe(() => {
  const { settings, addedProviders, bookmarks } = store.getState();
  saveState({
    settings,
    addedProviders,
    bookmarks,
  });
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
