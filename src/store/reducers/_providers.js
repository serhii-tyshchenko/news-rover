import {
  GET_PROVDERS_REQUEST_STARTED,
  GET_PROVDERS_REQUEST_SUCCESS,
  GET_PROVDERS_REQUEST_FAILED,
} from 'store/action-types';

const initialState = {
  data: [],
  isLoading: false,
};

export const providersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROVDERS_REQUEST_STARTED:
      return { ...state, isLoading: true };
    case GET_PROVDERS_REQUEST_SUCCESS:
      return { ...state, data: payload, isLoading: false };
    case GET_PROVDERS_REQUEST_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
