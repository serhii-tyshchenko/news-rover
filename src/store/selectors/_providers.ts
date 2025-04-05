import { createSelector } from 'reselect';
import { TRootState } from '@store';
import { TProvider } from 'types';

const selectRoot = (state: TRootState) => state.providers;

export const selectProvidersData = (state: TRootState) =>
  selectRoot(state).data;

export const selectAddedProviders = (state: TRootState) =>
  selectRoot(state).added;

export const selectAddedProvidersData = createSelector(
  selectProvidersData,
  selectAddedProviders,
  (providersData, addedProviders) =>
    providersData?.filter((provider: TProvider) =>
      addedProviders.includes(provider.id),
    ),
);

export const selectProvidersLoading = (state: TRootState) =>
  selectRoot(state).isLoading;

export const selectProvidersError = (state: TRootState) =>
  selectRoot(state).error;
