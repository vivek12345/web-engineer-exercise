import { SET_ERROR, RESET_ERROR } from '../types';

const initialState = {
  globalError: null
};

export default function errors(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR:
      return Object.assign({}, state, { globalError: payload });
    case RESET_ERROR:
      return Object.assign({}, state, {
        globalError: null
      });
    default:
      return state;
  }
}
