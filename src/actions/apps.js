import { utils } from '../helpers';
import {
  APPS_REQUEST,
  APPS_SUCCESS,
  APPS_ERROR,
  RESET_APPS_STATE
} from '../types';
import { BACKEND_URL } from '../constants';

function appsRequesting() {
  return { type: APPS_REQUEST };
}

function appsSuccess(payload) {
  return { type: APPS_SUCCESS, payload };
}

function appsError() {
  return { type: APPS_ERROR };
}

function resetAppsState() {
  return { type: RESET_APPS_STATE };
}

export function fetchApps() {
  return async function(dispatch, getState, { api }) {
    dispatch(resetAppsState());
    dispatch(appsRequesting());

    const url = `${BACKEND_URL}/apps`;

    const [err, response] = await utils.to(
      api.request(url, {
        dispatch
      })
    );

    if (err) {
      return Promise.reject(err);
    }
    if (response) {
      if (!response.ok) return dispatch(appsError());

      const { apps } = await response.json();

      return dispatch(appsSuccess(apps));
    }
  };
}
