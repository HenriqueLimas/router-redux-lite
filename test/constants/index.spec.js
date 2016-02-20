import expect from 'expect';
import * as constants from '../../src/constants';

describe('Constants:', function() {
  it('should has ROUTE_REQUEST', function() {
    expect(constants.ROUTE_REQUEST).toBe('ROUTE_REQUEST');
  });

  it('should has ROUTE_SUCCESS', function() {
    expect(constants.ROUTE_SUCCESS).toBe('ROUTE_SUCCESS');
  });

  it('should has ROUTE_ERROR', function() {
    expect(constants.ROUTE_ERROR).toBe('ROUTE_ERROR');
  });
});