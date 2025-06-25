import {
  ADD_PROVIDER,
  REMOVE_PROVIDER,
  REORDER_PROVIDERS,
  UPDATE_PROVIDER,
} from '@store/action-types';
import { IAction, TAddedProvider } from '@types';

const initialState = [] as TAddedProvider[];

export const addedProvidersReducer = (
  state = initialState,
  action: IAction<TAddedProvider | string | TAddedProvider[]>,
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

    case REORDER_PROVIDERS:
      return [...(payload as unknown as TAddedProvider[])];

    default:
      return state;
  }
};
