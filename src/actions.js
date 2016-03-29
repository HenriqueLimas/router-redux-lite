import {ROUTE_REQUEST, ROUTE_SUCCESS, ROUTE_ERROR} from './constants';

export function requestRoute(uri, params) {
    return {
        type: ROUTE_REQUEST,
        uri: uri,
        params: params
    }
}

export function successRoute(uri, params) {
    return {
        type: ROUTE_SUCCESS,
        uri: uri,
        params: params
    }
}

export function errorRoute(uri) {
    return {
        type: ROUTE_ERROR,
        uri: uri
    };
}

export function navigate(uri, params) {
    return function({dispatch, getState}) {
        dispatch(requestRoute(uri, params));
        dispatch(successRoute(uri, params));
    };
}