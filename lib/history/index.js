'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = listen;
exports.navigate = navigate;
exports.config = config;

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _history = null;
var _store = null;

function listen() {
  window.addEventListener('popstate', function () {
    _store.dispatch(actions.navigate(window.location.pathname));
  });
}

function navigate(uri) {
  _history.pushState(null, null, uri);
}

function config(_ref) {
  var history = _ref.history;
  var store = _ref.store;

  _history = history;
  _store = store;
}