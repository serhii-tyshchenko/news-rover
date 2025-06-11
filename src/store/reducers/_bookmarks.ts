import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '@store/action-types';
import { IAction, TNewsItem } from '@types';

const initialState = {
  data: [] as Array<TNewsItem>,
};

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
    default:
      return state;
  }
};
