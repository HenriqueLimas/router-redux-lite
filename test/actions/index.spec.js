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
});