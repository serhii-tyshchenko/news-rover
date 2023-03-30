const selectRoot = (state) => state.providers;

export const selectProvidersData = (state) => selectRoot(state).data;
export const selectAddedProviders = (state) => selectRoot(state).added;
export const selectProvidersIsLoading = (state) => selectRoot(state).isLoading;
