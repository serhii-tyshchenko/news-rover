import { TRootState } from '@store';

const selectRoot = (state: TRootState) => state.bookmarks;

export const selectBookmarksData = (state: TRootState) =>
  selectRoot(state).data;
