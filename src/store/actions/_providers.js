import { getProviders } from 'core/api';

import {
  GET_PROVDERS_REQUEST_STARTED,
  GET_PROVDERS_REQUEST_SUCCESS,
  GET_PROVDERS_REQUEST_FAILED,
  ADD_PROVIDER,
  REMOVE_PROVIDER,
} from 'store/action-types';

export const doGetProviders = () => async (dispatch) => {
  dispatch({ type: GET_PROVDERS_REQUEST_STARTED });

  try {
    const data = await getProviders();
    dispatch({ type: GET_PROVDERS_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROVDERS_REQUEST_FAILED });
    console.log(error);
  }
};

export const doAddProvider = (provider) => (dispatch) => {
  dispatch({ type: ADD_PROVIDER, payload: provider });
};

export const doRemoveProvider = (provider) => (dispatch) => {
  dispatch({ type: REMOVE_PROVIDER, payload: provider });
};
