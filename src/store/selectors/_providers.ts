import { TRootState } from '@store';

const selectRoot = (state: TRootState) => state.providers;

export const selectProvidersData = (state: TRootState) =>
  selectRoot(state).data;

export const selectAddedProviders = (state: TRootState) =>
  selectRoot(state).added;

export const selectProvidersIsLoading = (state: TRootState) =>
  selectRoot(state).isLoading;
