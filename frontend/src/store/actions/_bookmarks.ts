import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  UPDATE_BOOKMARKS_VIEW_MODE,
} from '@store/action-types';
import { EViewMode, TNewsItem } from '@types';

export const doAddBookmark = (data: TNewsItem) => ({
  type: ADD_BOOKMARK,
  payload: data as TNewsItem,
});

export const doRemoveBookmark = (bookmarkUrl: string) => ({
  type: REMOVE_BOOKMARK,
  payload: bookmarkUrl as string,
});

export const doUpdateBookmarksViewMode = (viewMode: EViewMode) => ({
  type: UPDATE_BOOKMARKS_VIEW_MODE,
  payload: viewMode as EViewMode,
});
