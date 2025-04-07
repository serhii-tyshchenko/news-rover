import { TRootState } from '@store';
import { createSelector } from 'reselect';

const selectRoot = (state: TRootState) => state.addedProviders;

export const selectAddedProviders = (state: TRootState) => selectRoot(state);

export const selectProviderById = (id: string) =>
  createSelector(selectRoot, (addedProviders) =>
    addedProviders.find((provider) => provider.id === id),
  );
