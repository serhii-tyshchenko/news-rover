import { IAction, TAddedProvider } from '@types';
import {
  ADD_PROVIDER,
  UPDATE_PROVIDER,
  REMOVE_PROVIDER,
} from '@store/action-types';

const initialState = [] as TAddedProvider[];

export const addedProvidersReducer = (
  state = initialState,
  action: IAction,
) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_PROVIDER:
      return [...state, payload];

    case UPDATE_PROVIDER:
      return state.map((provider) =>
        provider.id !== payload.id ? provider : { ...provider, ...payload },
      );

    case REMOVE_PROVIDER:
      return state.filter(({ id }) => id !== payload);

    default:
      return state;
  }
};
