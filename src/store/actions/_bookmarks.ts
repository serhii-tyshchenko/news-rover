import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '@store/action-types';
import { TNewsItem } from '@types';

export const doAddBookmark = (data: TNewsItem) => ({
  type: ADD_BOOKMARK,
  payload: data as TNewsItem,
});

export const doRemoveBookmark = (bookmarkUrl: string) => ({
  type: REMOVE_BOOKMARK,
  payload: bookmarkUrl as string,
});
