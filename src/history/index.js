import * as actions from '../actions';

let _history = null;
let _store = null;

export function listen() {
  window.addEventListener('popstate', () => {
    _store.dispatch(actions.navigate(window.location.pathname));
  });
}

export function navigate(uri) {
  _history.pushState(null, null, uri);
}

export function config({history, store}) {
  _history = history;
  _store = store;
}