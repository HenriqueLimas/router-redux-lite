import * as Router from './router';
import * as History from './history';
import reducer from './reducers';
import * as actions from './actions';

function config({store, routes, history}) {
  Router.config({
    store,
    routes
  });

  History.config({
    store,
    history
  });

  History.listen();
}

module.exports = {
  config,
  reducer,
  actions,
  History,
  Router
};