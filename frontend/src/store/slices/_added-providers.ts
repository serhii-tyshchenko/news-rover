import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TAddedProvider } from '@types';

import { TRootState } from '../index';

const initialState: TAddedProvider[] = [];

export const addedProvidersSlice = createSlice({
  name: 'addedProviders',
  initialState,
  reducers: {
    doAddProvider: (state, action: PayloadAction<TAddedProvider>) => {
      state.push(action.payload);
    },
    doUpdateProvider: (state, action: PayloadAction<TAddedProvider>) =>
      state.map((provider) =>
        provider.id !== action.payload.id
          ? provider
          : { ...provider, ...action.payload },
      ),
    doRemoveProvider: (state, action: PayloadAction<string>) =>
      state.filter(({ id }) => id !== action.payload),
    doReorderProviders: (_state, action: PayloadAction<TAddedProvider[]>) => [
      ...action.payload,
    ],
  },
});

const selectRoot = (state: TRootState) => state.addedProviders;

export const {
  doAddProvider,
  doUpdateProvider,
  doRemoveProvider,
  doReorderProviders,
} = addedProvidersSlice.actions;

export default addedProvidersSlice.reducer;

export const selectAddedProviders = (state: TRootState) => selectRoot(state);

export const selectProviderById = (id: string) => (state: TRootState) =>
  selectRoot(state).find((provider) => provider.id === id);
