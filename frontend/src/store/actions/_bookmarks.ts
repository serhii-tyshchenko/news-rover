import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  UPDATE_BOOKMARKS_VIEW_MODE,
} from '@store/action-types';
import { EViewMode, TNewsItem } from '@types';

export const doAddBookmark = (payload: TNewsItem) => ({
  type: ADD_BOOKMARK,
  payload,
});

export const doRemoveBookmark = (payload: string) => ({
  type: REMOVE_BOOKMARK,
  payload,
});

export const doUpdateBookmarksViewMode = (payload: EViewMode) => ({
  type: UPDATE_BOOKMARKS_VIEW_MODE,
  payload,
});
