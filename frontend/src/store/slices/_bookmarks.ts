import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { EViewMode, TNewsItem } from '@types';

import { TRootState } from '../index';

type TBookmarksState = {
  data: TNewsItem[];
  viewMode: EViewMode;
};

const initialState: TBookmarksState = {
  data: [],
  viewMode: EViewMode.TitleOnly,
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,

  reducers: {
    doAddBookmark: (state, action: PayloadAction<TNewsItem>) => {
      state.data.push(action.payload);
    },
    doRemoveBookmark: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.link !== action.payload);
    },
    doUpdateBookmarksViewMode: (state, action: PayloadAction<EViewMode>) => {
      state.viewMode = action.payload;
    },
  },
});

const selectRoot = (state: TRootState) => state.bookmarks;

export const { doAddBookmark, doRemoveBookmark, doUpdateBookmarksViewMode } =
  bookmarksSlice.actions;

export default bookmarksSlice.reducer;

export const selectBookmarksData = (state: TRootState) =>
  selectRoot(state).data;

export const selectBookmarksViewMode = (state: TRootState) =>
  selectRoot(state).viewMode;
