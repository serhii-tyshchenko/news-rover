import { ADD_BOOKMARK, REMOVE_BOOKMARK } from 'store/action-types';
import { TDispatch, TBookmark } from 'common/types';

export const doAddBookmark = (data: TBookmark) => (dispatch: TDispatch) => {
  dispatch({ type: ADD_BOOKMARK, payload: data });
};

export const doRemoveBookmark =
  (bookmarkUrl: string) => (dispatch: TDispatch) => {
    dispatch({ type: REMOVE_BOOKMARK, payload: bookmarkUrl });
  };
