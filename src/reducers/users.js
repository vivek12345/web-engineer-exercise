import {
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_ERROR,
  RESET_USER_STATE
} from '../types';

const initialState = {
  requesting: true,
  items: [],
  error: null
};

export default function apps(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USERS_REQUEST:
      return Object.assign({}, state, { requesting: true });
    case USERS_SUCCESS:
      return Object.assign({}, state, {
        requesting: false,
        items: payload,
        error: false
      });
    case USERS_ERROR:
      return Object.assign({}, state, {
        requesting: false,
        error: true
      });
    case RESET_USER_STATE:
      return initialState;
    default:
      return state;
  }
}
