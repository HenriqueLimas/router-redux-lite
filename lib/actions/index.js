'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestRoute = requestRoute;
exports.successRoute = successRoute;
exports.errorRoute = errorRoute;
exports.navigate = navigate;

var _constants = require('../constants');

function requestRoute(uri) {
    return {
        type: _constants.ROUTE_REQUEST,
        uri: uri
    };
}

function successRoute(uri) {
    return {
        type: _constants.ROUTE_SUCCESS,
        uri: uri
    };
}

function errorRoute(uri) {
    return {
        type: _constants.ROUTE_ERROR,
        uri: uri
    };
}

function navigate(uri) {
    return function (_ref) {
        var dispatch = _ref.dispatch;
        var getState = _ref.getState;

        dispatch(requestRoute(uri));
        dispatch(successRoute(uri));
    };
}