import { Dispatch } from 'redux';
import { getNewsByProvider } from '@core/api';

import {
  GET_PROVDER_NEWS_REQUEST_STARTED,
  GET_PROVDER_NEWS_REQUEST_SUCCESS,
  GET_PROVDER_NEWS_REQUEST_FAILED,
} from '@store/action-types';

export const doGetProviderNews =
  (provider: string) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_PROVDER_NEWS_REQUEST_STARTED, payload: { provider } });

    try {
      const data = await getNewsByProvider(provider);
      dispatch({
        type: GET_PROVDER_NEWS_REQUEST_SUCCESS,
        payload: { provider, data },
      });
    } catch (error) {
      dispatch({
        type: GET_PROVDER_NEWS_REQUEST_FAILED,
        payload: { provider, error },
      });
      console.error(error);
    }
  };
