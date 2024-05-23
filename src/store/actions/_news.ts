import { Dispatch } from 'redux';
import { getNewsByProvider } from '@core/api';

import {
  GET_PROVIDER_NEWS_REQUEST_STARTED,
  GET_PROVIDER_NEWS_REQUEST_SUCCESS,
  GET_PROVIDER_NEWS_REQUEST_FAILED,
} from '@store/action-types';

export const doGetProviderNews =
  (provider: string, limit?: number) => async (dispatch: Dispatch) => {
    dispatch({
      type: GET_PROVIDER_NEWS_REQUEST_STARTED,
      payload: { provider },
    });

    try {
      const data = await getNewsByProvider(provider, limit);
      dispatch({
        type: GET_PROVIDER_NEWS_REQUEST_SUCCESS,
        payload: { provider, data },
      });
    } catch (error) {
      dispatch({
        type: GET_PROVIDER_NEWS_REQUEST_FAILED,
        payload: { provider, error },
      });
      console.error(error);
    }
  };
