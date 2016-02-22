import expect from 'expect';
import reducer from '../src/reducers';
import {ROUTE_REQUEST, ROUTE_SUCCESS, ROUTE_ERROR} from '../src/constants';

describe('Reducer', function() {
  context('when is an unknown action', function() {
    it('should return the same state.', function() {
      let action = {
        type: 'UNKNOWN'
      };

      let currentState = {};

      expect(reducer(currentState, action)).toBe(currentState);
    });
  });

  it('should define a default state.', function() {
    let action = {
      type: 'UNKNOWN'
    };

    let expectedState = {
      current: {}
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });

  context('ROUTE_REQUEST', function() {
    let action;

    beforeEach(function() {
      action = {
        type: ROUTE_REQUEST,
        uri: '/path'
      }
    });

    it('should return the current state with a request state.', function() {
      let currentState = {};
      let expectedState = {
        current: {
          isChanging: true,
          didInvalidate: false,
          uri: '/path',
          params: {}
        }
      };

      expect(reducer(currentState, action)).toEqual(expectedState);
    });
  });

  context('ROUTE_SUCCESS', function() {
    let action;

    beforeEach(function() {
      action = {
        type: ROUTE_SUCCESS,
        uri: '/path'
      }
    });

    it('should return the current state with a success state.', function() {
      let currentState = {};
      let expectedState = {
        current: {
          isChanging: false,
          didInvalidate: false,
          uri: '/path',
          params: {}
        }
      };

      expect(reducer(currentState, action)).toEqual(expectedState);
    });
  });

  context('ROUTE_ERROR', function() {
    let action;

    beforeEach(function() {
      action = {
        type: ROUTE_ERROR,
        uri: '/path'
      }
    });

    it('should return the current state with an error state.', function() {
      let currentState = {};
      let expectedState = {
        current: {
          isChanging: false,
          didInvalidate: true,
          uri: '/path',
          params: {}
        }
      };

      expect(reducer(currentState, action)).toEqual(expectedState);
    });
  });
});