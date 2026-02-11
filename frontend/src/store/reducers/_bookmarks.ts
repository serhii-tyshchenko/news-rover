import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  UPDATE_BOOKMARKS_VIEW_MODE,
} from '@store/action-types';
import { EViewMode, IAction, TNewsItem } from '@types';

type TState = {
  data: TNewsItem[];
  viewMode: EViewMode;
};

const initialState: TState = {
  data: [],
  viewMode: EViewMode.TitleOnly,
};

export const bookmarksReducer = (
  state = initialState,
  action: IAction<TNewsItem | EViewMode | string>,
) => {
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
    case UPDATE_BOOKMARKS_VIEW_MODE:
      return {
        ...state,
        viewMode: payload,
      };
    default:
      return state;
  }
};
