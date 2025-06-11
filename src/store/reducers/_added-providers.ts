import {
  ADD_PROVIDER,
  REMOVE_PROVIDER,
  UPDATE_PROVIDER,
} from '@store/action-types';
import { IAction, TAddedProvider } from '@types';

const initialState = [] as TAddedProvider[];

export const addedProvidersReducer = (
  state = initialState,
  action: IAction<TAddedProvider> | IAction<string>,
) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_PROVIDER:
      return [...state, payload as TAddedProvider];

    case UPDATE_PROVIDER:
      return state.map((provider) =>
        provider.id !== (payload as TAddedProvider).id
          ? provider
          : { ...provider, ...(payload as TAddedProvider) },
      );

    case REMOVE_PROVIDER:
      return state.filter(({ id }) => id !== (payload as string));

    default:
      return state;
  }
};
