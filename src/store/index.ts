import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import { loadState, saveState } from 'core/localStorage';
import thunk from 'redux-thunk';

import { settings } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const rootReducer = combineReducers({
  settings,
});

const persistedState = loadState();
const composeTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  persistedState,
  composeTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const { settings } = store.getState();
  saveState({
    settings,
  });
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
