import expect from 'expect';
import {Router} from '../../src';

describe('Router', function() {
  it('should return a public api', function() {
    expect(Router.config).toBeA(Function);
    expect(Router.match).toBeA(Function);
  });

  describe('config():', function() {
    it('should add a subscriber into the store passed.', function() {
      let store = {
        subscribe: expect.createSpy()
      };

      Router.config({store});

      expect(store.subscribe).toHaveBeenCalled();
    });

    context('when the listen subscriber added is executed', function() {
      it('should execute all the handlers of the routes matched.', function() {
        let store = {
          getState() {
            return {
              router: {
                current: {
                  uri: '/path'
                }
              }
            };
          },
          subscribe(callback) {
            callback();
          }
        };

        let routes = [{
          route: '/path',
          handler: expect.createSpy()
        }];

        Router.config({store, routes});

        expect(routes[0].handler).toHaveBeenCalledWith(store.getState().router.current);
      });
    });
  });

  describe('match():', function() {
    context('when does not match the url in the routes', function() {
      it('should return an empty array', function() {
        let routes = [{
          route: '/route/:id'
        }];

        let url = '/empty';

        expect(Router.match(url, routes)).toEqual([]);
      });
    });

    it('should return an array with matched routes', function() {
      let routes = [{
        route: '/route/:id'
      }, {
        route: '/route/:id/route2'
      }];

      let url = '/route/42/route2';

      let expectedRoute1 = routes[0];
      let expectedRoute2 = routes[1];

      expect(Router.match(url, routes)[0].route).toEqual(expectedRoute1);
      expect(Router.match(url, routes)[1].route).toEqual(expectedRoute2);
    });

    it('should return an array with matched params', function() {
      let routes = [{
        route: '/route/:id/route2/:id_route2'
      }];

      let url = '/route/42/route2/24';

      let expectedParams = {
        id: '42',
        id_route2: '24'
      };

      expect(Router.match(url, routes)[0].params).toEqual(expectedParams);
    });
  });
});