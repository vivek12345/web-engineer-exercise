import { utils } from '../helpers';

import {
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_ERROR,
  RESET_USER_STATE
} from '../types';
import { BACKEND_URL } from '../constants';

function usersRequesting() {
  return { type: USERS_REQUEST };
}

function usersSuccess(payload) {
  return { type: USERS_SUCCESS, payload };
}

function usersError() {
  return { type: USERS_ERROR };
}

function resetUserState() {
  return { type: RESET_USER_STATE };
}

export function fetchUsers(appId, params) {
  return async function(dispatch, getState, { api }) {
    dispatch(resetUserState());
    dispatch(usersRequesting());

    let url = new URL(`${BACKEND_URL}/apps/${appId}/users`);

    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );

    const [err, resp] = await utils.to(api.request(url, { dispatch }));
    if (err) {
      return Promise.reject(err);
    }
    if (resp) {
      if (!resp.ok) return dispatch(usersError());

      const { users } = await resp.json();

      return dispatch(usersSuccess(users));
    }
  };
}
