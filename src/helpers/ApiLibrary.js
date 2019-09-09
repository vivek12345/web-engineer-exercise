import { utils } from './utils';
import { history } from '../Routes';
import { tokenService } from './TokenService';
import { SET_ERROR } from '../types';
import { ERROR_MESSAGES } from '../constants';

class ApiLibrary {
  constructor() {
    this.token = tokenService.getToken();
  }
  setAuthorizationToken(token) {
    token ? tokenService.setToken(token) : tokenService.removeToken();
    this.token = token;
  }
  async request(url, params = {}) {
    const baseHeaders = {
      Authorization: this.token,
      'Content-Type': 'application/json'
    };
    const { headers, dispatch, ...rest } = params;
    const finalParams = {
      headers: {
        ...baseHeaders,
        ...headers
      },
      ...rest
    };
    const [err, resp] = await utils.to(fetch(url, finalParams));
    if (resp) {
      if (resp.status === 401) {
        this.setAuthorizationToken(null);
        if (dispatch) {
          dispatch({
            type: SET_ERROR,
            payload: ERROR_MESSAGES.SESSION_EXPIRED
          });
        }
        history.push('/');
      }
      return resp;
    } else {
      return Promise.reject(err);
    }
  }
}

const api = new ApiLibrary();
export { api };
