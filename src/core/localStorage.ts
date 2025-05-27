import { APP_NAME } from '@constants';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(APP_NAME);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

export const saveState = (state: Record<string, unknown>) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(APP_NAME, serializedState);
  } catch {
    throw new Error('Unable to save to Local Storage');
  }
};

export const clearState = () => {
  localStorage.removeItem(APP_NAME);
};
