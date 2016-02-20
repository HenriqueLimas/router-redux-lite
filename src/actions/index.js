import {ROUTE_REQUEST, ROUTE_SUCCESS, ROUTE_ERROR} from '../constants';

export function requestRoute(uri) {
    return {
        type: ROUTE_REQUEST,
        uri: uri
    }
}

export function successRoute(uri) {
    return {
        type: ROUTE_SUCCESS,
        uri: uri
    }
}

export function errorRoute(uri) {
    return {
        type: ROUTE_ERROR,
        uri: uri
    };
}

// function navigate(dispatch, getState) {
//     dispatchRequest();
//     getCurrentRoute();

//     if currentRouteExists {
//         runOnEnter();

//         if resolve
//         return resolveAndDispatchSuccess(); // (Promise)
//         else
//             return dispatchSuccess(); // (Promise)
//     } else {
//         return dispatchError(); // Error 404 (Promise)
//     }
// }