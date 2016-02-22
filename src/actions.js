import {ROUTE_REQUEST, ROUTE_SUCCESS, ROUTE_ERROR} from './constants';

export function requestRoute(uri) {
    return {
        type: ROUTE_REQUEST,
        uri: uri
    }
}

export function successRoute(uri) {
    return {
        type: ROUTE_SUCCESS,
        uri: uri
    }
}

export function errorRoute(uri) {
    return {
        type: ROUTE_ERROR,
        uri: uri
    };
}

export function navigate(uri) {
    return function({dispatch, getState}) {
        dispatch(requestRoute(uri));
        dispatch(successRoute(uri));
    };
}