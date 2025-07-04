import { Dispatch } from 'redux';

import { getProviders } from '@api';
import {
  GET_PROVIDERS_REQUEST_FAILED,
  GET_PROVIDERS_REQUEST_STARTED,
  GET_PROVIDERS_REQUEST_SUCCESS,
} from '@store/action-types';
import { TProvider } from '@types';

export const doGetProviders = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_PROVIDERS_REQUEST_STARTED });

  try {
    const data = await getProviders();
    dispatch({
      type: GET_PROVIDERS_REQUEST_SUCCESS,
      payload: data as Array<TProvider>,
    });
  } catch (error) {
    dispatch({
      type: GET_PROVIDERS_REQUEST_FAILED,
      payload: (error as Error)?.message || 'Unknown error',
    });
    console.error(error);
  }
};
