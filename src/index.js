import * as Router from './router';
import * as History from './history';
import reducer from './reducers';
import * as actions from './actions';

function config({state, routes, history}) {
  Router.config({state, routes});

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