/**
 * API router
 */
Router.config([routes]); // Define routes
Router.match(href); // Return a route matched.
RouteMatched: {
    uri,
    handler(),
    params: {}
}


Router.addSubscriberInto(store);
store.subscribe(function() {
    var route = store.getState().route.present;

    Router.subscriber(route);
});

Router.subscriber = function(currentRoute) {
    var routeToHandler = Router.match(currentRoute);

    if (routeToHandler) {
        routeToHandler.handler(routeToHandler);
    }
}

/**
 * Utils
 */
const PARAMETER_REGEXP = /([:*])(\w+)/g;
const WILDCARD_REGEXP = /\*/g;
const REPLACE_VARIABLE_REGEXP = '([^\/]+)';
const REPLACE_WILDCARD = '(?:.*)';
const FOLLOWED_BY_SLASH_REGEXP = '(?:\/|$)';

/**
 * Function that return the regexp and paramsNames of the route.
 * Test case:
 *   - should return a regexp
 *   when exist params in the route
 *     - should return a array of the params names.
 *   when does not exist params in the route
 *     - should return an empty array of the params names.
 *   should not consider last "/"
 * @param  {[type]} route [description]
 * @return {[type]}       [description]
 */
function replaceDynamicURLParts(route) {
  'use strict';

  var regexp;
  var paramNames = [];

  regexp = new RegExp(
    clean(route)
    .replace(PARAMETER_REGEXP, function(full, dots, name) {
      paramNames.push(name);
      return REPLACE_VARIABLE_REGEXP;
    })
    .replace(WILDCARD_REGEXP, REPLACE_WILDCARD) + FOLLOWED_BY_SLASH_REGEXP
  );
  
  return { regexp, paramNames };

  function clean(s) {
    return s.replace(/\/+$/, '').replace(/^\/+/, '/');
  }
}

/**
 * Function that return an object with key value where the key
 * is the params name and the value is the value from the list of matched strings.
 * - when the list of names is empty
 *    should return null
 * - when does not exist match
 *    should return null
 * should not consider the first matched element.
 * should return an object with the matched elements with his name.
 * 
 * @param  {[type]} match [description]
 * @param  {[type]} names [description]
 * @return {[type]}       [description]
 */
function regExpResultToParams(match, names) {
  if (names.length === 0) return null;
  if (!match) return null;
  return match
    .slice(1, match.length)
    .reduce((params, value, index) => {
      params[names[index]] = value;
      return params;
    }, {});
}

/**
 * Function that returns all the routes that an url matched,
 * with his parms resolved.
 * when does not match the url in the routes
 *   should return an empty array
 * should return an array with matched params.
 * should return the route matched
 * should return the object with the params resolved
 * 
 * @param  {[type]} url    [description]
 * @param  {[type]} routes [description]
 * @return {[type]}        [description]
 */
function findMatchedRoutes(url, routes) {
  return routes
    .map(function(route) {
      var obj = replaceDynamicURLParts(route.route);
      var regexp = obj.regexp;
      var paramNames = obj.paramNames;
      var match = url.match(regexp);
      var params = regExpResultToParams(match, paramNames);

      return match ? { match, route, params } : false;
    })
    .filter(function(m) {
      return m });
}