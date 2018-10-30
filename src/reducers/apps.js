import {
    APPS_REQUEST,
    APPS_SUCCESS,
    APPS_ERROR
} from '../actions/apps';

const initialState = {
    requesting: null,
    items: [],
    error: null
};

export default function apps (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case APPS_REQUEST: 
            return Object.assign({}, state, { requesting: true });
        case APPS_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    requesting: false,
                    items: payload
                }
            );
        case APPS_ERROR: 
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