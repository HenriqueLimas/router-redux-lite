'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reducer;

var _constants = require('./constants');

function currentRoute(state, action) {
    return {
        isChanging: action.type === _constants.ROUTE_REQUEST,
        didInvalidate: action.type === _constants.ROUTE_ERROR,
        uri: action.uri,
        params: action.params
    };
}

function reducer(state, action) {
    state = state || {
        current: {}
    };
    switch (action.type) {
        case _constants.ROUTE_REQUEST:
            return {
                current: currentRoute(state, action)
            };
        case _constants.ROUTE_SUCCESS:
            return {
                current: currentRoute(state, action)
            };
        case _constants.ROUTE_ERROR:
            return {
                current: currentRoute(state, action)
            };
        default:
            return state;
    }
}