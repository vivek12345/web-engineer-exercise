import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_ERROR
} from '../actions/users';

const initialState = {
    requesting: null,
    items: [],
    error: null
};

export default function apps (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USERS_REQUEST: 
            return Object.assign({}, state, { requesting: true });
        case USERS_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    requesting: false,
                    items: payload
                }
            );
        case USERS_ERROR: 
            return Object.assign(
                {},
                state,
                {
                    requesting: false,
                    error: true
                }
            );
        default:
            return state;
    }
}