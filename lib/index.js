'use strict';

var _router = require('./router');

var Router = _interopRequireWildcard(_router);

var _history = require('./history');

var History = _interopRequireWildcard(_history);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function config(_ref) {
  var state = _ref.state;
  var routes = _ref.routes;
  var history = _ref.history;

  Router.config({ state: state, routes: routes });

  History.config({
    store: store,
    history: history
  });

  History.listen();
}

module.exports = {
  config: config,
  reducer: _reducers2.default,
  actions: actions,
  History: History,
  Router: Router
};