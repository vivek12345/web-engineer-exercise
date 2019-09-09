import {
  APPS_REQUEST,
  APPS_SUCCESS,
  APPS_ERROR,
  RESET_APPS_STATE
} from '../types';

const initialState = {
  requesting: null,
  items: [],
  error: null
};

export default function apps(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case APPS_REQUEST:
      return Object.assign({}, state, { requesting: true });
    case APPS_SUCCESS:
      return Object.assign({}, state, {
        requesting: false,
        items: payload
      });
    case APPS_ERROR:
      return Object.assign({}, state, {
        requesting: false,
        error: true
      });
    case RESET_APPS_STATE:
      return initialState;
    default:
      return state;
  }
}
