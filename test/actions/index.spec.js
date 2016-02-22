import expect from 'expect';
import * as actions from '../../src/actions';
import {ROUTE_REQUEST, ROUTE_SUCCESS, ROUTE_ERROR} from '../../src/constants';

describe('Actions', function() {
  describe('requestRoute():', function() {
    it('should return the type ROUTE_REQUEST', function() {
      expect(actions.requestRoute().type).toBe(ROUTE_REQUEST);
    });

    it('should return the uri passed', function() {
      expect(actions.requestRoute('/path').uri).toBe('/path');
    });
  });

  describe('successRoute():', function() {
    it('should return the type ROUTE_SUCCESS', function() {
      expect(actions.successRoute().type).toBe(ROUTE_SUCCESS);
    });

    it('should return the uri passed', function() {
      expect(actions.requestRoute('/path').uri).toBe('/path');
    });
  });

  describe('errorRoute():', function() {
    it('should return the type ROUTE_ERROR', function() {
      expect(actions.errorRoute().type).toBe(ROUTE_ERROR);
    });

    it('should return the uri passed', function() {
      expect(actions.errorRoute('/path').uri).toBe('/path');
    });
  });

  describe('navigate():', function() {
    it('should return a function', function() {
      expect(actions.navigate()).toBeA(Function);
    });

    describe('the returned function', function() {
      let dispatch;
      let uri;
      let navigationAction;

      beforeEach(function() {
        dispatch = expect.createSpy();
        uri = '/path';

        navigationAction = actions.navigate(uri);
      });

      it('should dispatch an requestRoute action.', function() {
        navigationAction({dispatch});

        expect(dispatch).toHaveBeenCalledWith(actions.requestRoute(uri));
      });

      it('should dispatch an successRoute action.', function() {
        navigationAction({dispatch});

        expect(dispatch).toHaveBeenCalledWith(actions.successRoute(uri));
      });
    });
  });
});