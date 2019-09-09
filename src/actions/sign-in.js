/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { utils } from '../helpers';
import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_ERROR,
  RESET_ERROR
} from '../types';
import { BACKEND_URL } from '../constants';

function authenticationRequesting() {
  return { type: AUTHENTICATION_REQUEST };
}

function authenticationSuccess() {
  return { type: AUTHENTICATION_SUCCESS };
}

function authenticationError() {
  return { type: AUTHENTICATION_ERROR };
}

export async function isValidToken() {
  const token = getAccessToken();

  if (!token) return false;

  const validTokenRequest = await fetch(
    'https://guarded-thicket-22918.herokuapp.com/',
    {
      headers: { Authorization: token }
    }
  );
  const { error } = await response.json();

  return !error;
}

export function authenticate(email, password) {
  return async function(dispatch, getState, { api }) {
    dispatch(authenticationRequesting());
    const url = `${BACKEND_URL}/login`;
    const [err, response] = await utils.to(
      api.request(url, {
        method: 'post',
        headers: {
          Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
    );

    if (err) {
      return Promise.reject(err);
    }
    if (!response.ok) return dispatch(authenticationError());

    const { accessToken } = await response.json();
    api.setAuthorizationToken(accessToken);
    dispatch({
      type: RESET_ERROR
    });
    dispatch(authenticationSuccess());
  };
}
