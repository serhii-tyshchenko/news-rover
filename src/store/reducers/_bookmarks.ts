import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '@store/action-types';
import { IAction, TNewsItem } from '@types';

const initialState = {
  data: [] as Array<TNewsItem>,
};

export const bookmarksReducer = (state = initialState, action: IAction) => {
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
