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

module.exports = {
  History: History,
  Router: Router,
  reducer: _reducers2.default,
  actions: actions
};