import { ADD_BOOKMARK, REMOVE_BOOKMARK } from 'store/action-types';

export const doAddBookmark = (data) => (dispatch) => {
  dispatch({ type: ADD_BOOKMARK, payload: data });
};

export const doRemoveBookmark = (bookmarkUrl) => (dispatch) => {
  dispatch({ type: REMOVE_BOOKMARK, payload: bookmarkUrl });
};
