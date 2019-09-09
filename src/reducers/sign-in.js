import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_ERROR
} from '../types';

const initialState = {
  requesting: null,
  success: null,
  error: null
};

export default function signIn(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case AUTHENTICATION_REQUEST:
      return Object.assign({}, state, { requesting: true });
    case AUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        requesting: false,
        success: true,
        error: false
      });
    case AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        requesting: false,
        error: true,
        success: false
      });
    default:
      return state;
  }
}
