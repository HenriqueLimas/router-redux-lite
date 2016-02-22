import {ROUTE_REQUEST, ROUTE_SUCCESS, ROUTE_ERROR} from './constants';

function currentRoute(state, action) {
    return {
        isChanging: action.type === ROUTE_REQUEST,
        didInvalidate: action.type === ROUTE_ERROR,
        uri: action.uri,
        params: {}
    };
}

export default function reducer(state, action) {
    state = state || {
        current: {}
    };
    switch(action.type) {
        case ROUTE_REQUEST:
            return {
                current: currentRoute(state, action)
            };
        case ROUTE_SUCCESS:
            return {
                current: currentRoute(state, action)
            };
        case ROUTE_ERROR:
            return {
                current: currentRoute(state, action)
            };
        default:
            return state;
    }
}