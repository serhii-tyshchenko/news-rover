import { IAction, TNewsItem } from '@types';
import {
  GET_PROVIDER_NEWS_REQUEST_STARTED,
  GET_PROVIDER_NEWS_REQUEST_SUCCESS,
  GET_PROVIDER_NEWS_REQUEST_FAILED,
} from '@store/action-types';

const initialState: {
  [key: string]: {
    isLoading: boolean;
    data: Array<TNewsItem>;
    error: string;
  };
} = {};

export const newsReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROVIDER_NEWS_REQUEST_STARTED:
      return {
        ...state,
        [payload?.provider]: {
          ...state[payload?.provider],
          isLoading: true,
          error: '',
        },
      };
    case GET_PROVIDER_NEWS_REQUEST_SUCCESS:
      return {
        ...state,
        [payload?.provider]: {
          ...state[payload?.provider],
          isLoading: false,
          data: payload.data,
          error: '',
        },
      };
    case GET_PROVIDER_NEWS_REQUEST_FAILED:
      return {
        ...state,
        [payload?.provider]: {
          ...state[payload?.provider],
          isLoading: false,
          error: 'Something went wrong',
        },
      };

    default:
      return state;
  }
};
