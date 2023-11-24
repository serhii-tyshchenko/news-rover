import { IAction, TNewsItem } from '@types';
import {
  GET_PROVDER_NEWS_REQUEST_STARTED,
  GET_PROVDER_NEWS_REQUEST_SUCCESS,
  GET_PROVDER_NEWS_REQUEST_FAILED,
} from '@store/action-types';

const initialState: {
  [key: string]: {
    isLoading: boolean;
    data: Array<TNewsItem>;
  };
} = {};

export const newsReducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROVDER_NEWS_REQUEST_STARTED:
      return {
        ...state,
        [payload?.provider]: {
          ...state[payload?.provider],
          isLoading: true,
        },
      };
    case GET_PROVDER_NEWS_REQUEST_SUCCESS:
      return {
        ...state,
        [payload?.provider]: {
          ...state[payload?.provider],
          isLoading: false,
          data: payload.data,
        },
      };
    case GET_PROVDER_NEWS_REQUEST_FAILED:
      return {
        ...state,
        [payload?.provider]: {
          ...state[payload?.provider],
          isLoading: false,
        },
      };

    default:
      return state;
  }
};
