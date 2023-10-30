import { ADD_BOOKMARK, REMOVE_BOOKMARK } from 'store/action-types';

const initialState = {
  data: [],
};

export const bookmarksReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        data: [...state.data, payload],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        data: state.data.filter((item) => item.link !== payload),
      };
    default:
      return state;
  }
};
