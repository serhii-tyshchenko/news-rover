import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  UPDATE_BOOKMARKS_VIEW_MODE,
} from '@store/action-types';
import { EViewMode, IAction, TNewsItem } from '@types';

type TState = {
  data: Array<TNewsItem>;
  viewMode: EViewMode;
};

const initialState = {
  data: [],
  viewMode: EViewMode.TitleOnly,
} as TState;

export const bookmarksReducer = (
  state = initialState,
  action: IAction<TNewsItem> | IAction<string>,
) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        data: [...state.data, payload as TNewsItem],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        data: state.data.filter((item) => item.link !== (payload as string)),
      };
    case UPDATE_BOOKMARKS_VIEW_MODE:
      return {
        ...state,
        viewMode: payload as EViewMode,
      };
    default:
      return state;
  }
};
