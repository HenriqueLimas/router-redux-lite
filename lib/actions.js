'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestRoute = requestRoute;
exports.successRoute = successRoute;
exports.errorRoute = errorRoute;
exports.navigate = navigate;

var _constants = require('./constants');

function requestRoute(uri, params) {
    return {
        type: _constants.ROUTE_REQUEST,
        uri: uri,
        params: params
    };
}

function successRoute(uri, params) {
    return {
        type: _constants.ROUTE_SUCCESS,
        uri: uri,
        params: params
    };
}

function errorRoute(uri) {
    return {
        type: _constants.ROUTE_ERROR,
        uri: uri
    };
}

function navigate(uri, params) {
    return function (_ref) {
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;

        dispatch(requestRoute(uri, params));
        dispatch(successRoute(uri, params));
    };
}