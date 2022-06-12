"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockServer = void 0;
exports.createMockServer = createMockServer;
exports.default = void 0;
exports.mockServer = mockServer;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

function _server() {
  const data = _interopRequireDefault(require("@znewbee/server"));

  _server = function _server() {
    return data;
  };

  return data;
}

function _qs() {
  const data = _interopRequireDefault(require("qs"));

  _qs = function _qs() {
    return data;
  };

  return data;
}

function _supertest() {
  const data = _interopRequireDefault(require("supertest"));

  _supertest = function _supertest() {
    return data;
  };

  return data;
}

const _excluded = ["filterByTk", "values", "file"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class MockServer extends _server().default {
  loadAndInstall(options = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.load();
      yield _this.install(_objectSpread(_objectSpread({}, options), {}, {
        sync: {
          force: true,
          alter: {
            drop: false
          }
        }
      }));
    })();
  }

  cleanDb() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.db.sequelize.getQueryInterface().dropAllTables();
    })();
  }

  agent() {
    const agent = _supertest().default.agent(this.appManager.callback());

    const prefix = this.resourcer.options.prefix;
    const proxy = new Proxy(agent, {
      get(target, method, receiver) {
        if (method === 'resource') {
          return (name, resourceOf) => {
            const keys = name.split('.');
            const proxy = new Proxy({}, {
              get(target, method, receiver) {
                return (params = {}) => {
                  let filterByTk = params.filterByTk,
                      _params$values = params.values,
                      values = _params$values === void 0 ? {} : _params$values,
                      file = params.file,
                      restParams = _objectWithoutProperties(params, _excluded);

                  if (params.associatedIndex) {
                    resourceOf = params.associatedIndex;
                  }

                  if (params.resourceIndex) {
                    filterByTk = params.resourceIndex;
                  }

                  let url = prefix || '';

                  if (keys.length > 1) {
                    url += `/${keys[0]}/${resourceOf}/${keys[1]}`;
                  } else {
                    url += `/${name}`;
                  }

                  url += `:${method}`;

                  if (filterByTk) {
                    url += `/${filterByTk}`;
                  }

                  const queryString = _qs().default.stringify(restParams, {
                    arrayFormat: 'brackets'
                  });

                  switch (method) {
                    case 'upload':
                      return agent.post(`${url}?${queryString}`).attach('file', file).field(values);

                    case 'list':
                    case 'get':
                      return agent.get(`${url}?${queryString}`);

                    default:
                      return agent.post(`${url}?${queryString}`).send(values);
                  }
                };
              }

            });
            return proxy;
          };
        }

        return (...args) => {
          return agent[method](...args);
        };
      }

    });
    return proxy;
  }

}

exports.MockServer = MockServer;

function mockServer(options = {}) {
  let database;

  if ((options === null || options === void 0 ? void 0 : options.database) instanceof _database().Database) {
    database = options.database;
  } else {
    database = (0, _database().mockDatabase)((options === null || options === void 0 ? void 0 : options.database) || {});
  }

  return new MockServer(_objectSpread(_objectSpread({}, options), {}, {
    database
  }));
}

function createMockServer() {}

var _default = mockServer;
exports.default = _default;
