import expect from 'expect';
import jsdom from 'jsdom';
import {History} from '../../src';

describe('History', function() {
  it('should return a public API.', function() {
    expect(History.navigate).toBeA(Function);
    expect(History.listen).toBeA(Function);
    expect(History.config).toBeA(Function);
  });

  describe('navigate()', function() {
    let historyMock;

    beforeEach(function() {
      historyMock = {
        pushState: expect.createSpy()
      };

      History.config({
        history: historyMock
      });
    });

    it('should call the pushState method.', function() {
      History.navigate('/');
      expect(historyMock.pushState).toHaveBeenCalledWith(null, null, '/');
    });
  });
});