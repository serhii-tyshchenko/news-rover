import {
  ADD_PROVIDER,
  REMOVE_PROVIDER,
  UPDATE_PROVIDER,
} from '@store/action-types';
import { EViewMode, TAddedProvider } from '@types';

export const doAddProvider = (providerId: string) => ({
  type: ADD_PROVIDER,
  payload: {
    id: providerId,
    viewMode: EViewMode.TitleOnly,
  } as TAddedProvider,
});

export const doUpdateProvider = (
  providerId: string,
  payload: Partial<TAddedProvider>,
) => ({
  type: UPDATE_PROVIDER,
  payload: {
    id: providerId,
    ...payload,
  } as TAddedProvider,
});

export const doRemoveProvider = (providerId: string) => ({
  type: REMOVE_PROVIDER,
  payload: providerId,
});
