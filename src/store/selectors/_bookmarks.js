const selectRoot = (state) => state.bookmarks;

export const selectBookmarksData = (state) => selectRoot(state).data;
