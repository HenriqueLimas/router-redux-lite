import {navigate} from './history';

const PARAMETER_REGEXP = /([:*])(\w+)/g;
const WILDCARD_REGEXP = /\*/g;
const REPLACE_VARIABLE_REGEXP = '([^\/]+)';
const REPLACE_WILDCARD = '(?:.*)';
const FOLLOWED_BY_SLASH_REGEXP = '(?:\/|$)';

let _routes = [];

export function config({store, routes}) {
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
export function match(url, routes) {
  return routes
    .map((route) => {
      var obj = replaceDynamicURLParts(route.route);
      var regexp = obj.regexp;
      var paramNames = obj.paramNames;
      var match = url.match(regexp);
      var params = regExpResultToParams(match, paramNames);

      return match ? { route, params } : false;
    })
    .filter((m) => m);
}

function addSubscriberInto(store) {
  let lastUri;

  store.subscribe(function() {
    let currentRoute = store.getState().router.current;

    if (currentRoute && !currentRoute.isChanging && !currentRoute.didInvalidade) {
      if (lastUri === currentRoute.uri) {
        return;
      }

      lastUri = currentRoute.uri;

      let matchedRoutes = match(currentRoute.uri, _routes);

      matchedRoutes.forEach((match) => match.route.handler(currentRoute));

      if (matchedRoutes.length) {
        navigate(currentRoute.uri);
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
  let regexp;
  let paramNames = [];

  regexp = new RegExp(
    clean(route)
    .replace(PARAMETER_REGEXP, (full, dots, name) => {
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
