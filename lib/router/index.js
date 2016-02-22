'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.match = match;

var _history = require('../history');

var PARAMETER_REGEXP = /([:*])(\w+)/g;
var WILDCARD_REGEXP = /\*/g;
var REPLACE_VARIABLE_REGEXP = '([^\/]+)';
var REPLACE_WILDCARD = '(?:.*)';
var FOLLOWED_BY_SLASH_REGEXP = '(?:\/|$)';

var _routes = [];

function config(_ref) {
  var store = _ref.store;
  var routes = _ref.routes;

  _routes = routes;

  addSubscriberInto(store);
}

/**
 * Function that returns all the routes that an url matched,
 * with his parms resolved.
 * 
 * @param  {[type]} url    [description]
 * @param  {[type]} routes [description]
 * @return {[type]}        [description]
 */
function match(url, routes) {
  return routes.map(function (route) {
    var obj = replaceDynamicURLParts(route.route);
    var regexp = obj.regexp;
    var paramNames = obj.paramNames;
    var match = url.match(regexp);
    var params = regExpResultToParams(match, paramNames);

    return match ? { route: route, params: params } : false;
  }).filter(function (m) {
    return m;
  });
}

function addSubscriberInto(store) {
  var lastUri = undefined;

  store.subscribe(function () {
    var currentRoute = store.getState().router.current;

    if (currentRoute && !currentRoute.isChanging && !currentRoute.didInvalidade) {
      if (lastUri === currentRoute.uri) {
        return;
      }

      lastUri = currentRoute.uri;

      var matchedRoutes = match(currentRoute.uri, _routes);

      matchedRoutes.forEach(function (match) {
        return match.route.handler(currentRoute);
      });

      if (matchedRoutes.length) {
        (0, _history.navigate)(currentRoute.uri);
      }
    }
  });
}

/**
 * Function that return the regexp and paramsNames of the route.
 * @param  {[type]} route [description]
 * @return {[type]}       [description]
 */
function replaceDynamicURLParts(route) {
  var regexp = undefined;
  var paramNames = [];

  regexp = new RegExp(clean(route).replace(PARAMETER_REGEXP, function (full, dots, name) {
    paramNames.push(name);
    return REPLACE_VARIABLE_REGEXP;
  }).replace(WILDCARD_REGEXP, REPLACE_WILDCARD) + FOLLOWED_BY_SLASH_REGEXP);

  return { regexp: regexp, paramNames: paramNames };

  function clean(s) {
    return s.replace(/\/+$/, '').replace(/^\/+/, '/');
  }
}

/**
 * Function that return an object with key value where the key
 * is the params name and the value is the value from the list of matched strings. 
 * @param  {[type]} match [description]
 * @param  {[type]} names [description]
 * @return {[type]}       [description]
 */
function regExpResultToParams(match, names) {
  if (names.length === 0) return null;
  if (!match) return null;
  return match.slice(1, match.length).reduce(function (params, value, index) {
    params[names[index]] = value;
    return params;
  }, {});
}