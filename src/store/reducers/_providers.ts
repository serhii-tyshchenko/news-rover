import { IAction, TProvider } from '@types';
import {
  GET_PROVIDERS_REQUEST_STARTED,
  GET_PROVIDERS_REQUEST_SUCCESS,
  GET_PROVIDERS_REQUEST_FAILED,
} from '@store/action-types';

const initialState = {
  data: [] as Array<TProvider>,
  isLoading: false,
  error: null,
};

export const providersReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROVIDERS_REQUEST_STARTED:
      return { ...state, isLoading: true, error: null };

    case GET_PROVIDERS_REQUEST_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false,
        error: null,
      };

    case GET_PROVIDERS_REQUEST_FAILED:
      return { ...state, isLoading: false, error: payload };

    default:
      return state;
  }
};
