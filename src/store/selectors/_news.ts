import { createSelector } from 'reselect';
import { TRootState } from '@store';

const selectRoot = (state: TRootState) => state.news;

const selectProvider = (provider: string) =>
  createSelector(selectRoot, (root) => root[provider] ?? {});

export const selectProviderData = (provider: string) =>
  createSelector(
    selectProvider(provider),
    (providerData) => providerData.data ?? []
  );

export const selectProviderIsLoading = (provider: string) =>
  createSelector(
    selectProvider(provider),
    (providerData) => providerData.isLoading ?? false
  );
