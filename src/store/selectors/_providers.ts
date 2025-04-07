import { TRootState } from '@store';

const selectRoot = (state: TRootState) => state.providers;

export const selectProvidersData = (state: TRootState) =>
  selectRoot(state).data;

export const selectProvidersLoading = (state: TRootState) =>
  selectRoot(state).isLoading;

export const selectProvidersError = (state: TRootState) =>
  selectRoot(state).error;
