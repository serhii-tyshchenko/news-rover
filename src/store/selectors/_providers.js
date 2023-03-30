const selectRoot = (state) => state.providers;

export const selectData = (state) => selectRoot(state).data;
export const selectIsLoading = (state) => selectRoot(state).isLoading;
