const _excluded = ["authClass", "storageClass"],
      _excluded2 = ["values", "filter"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import axios from 'axios';
import qs from 'qs';
export class Auth {
  constructor(api) {
    this.api = void 0;
    this.options = {
      token: null,
      locale: null,
      role: null
    };
    this.api = api;
    this.locale = this.getLocale();
    this.role = this.getRole();
    this.token = this.getToken();
    this.api.axios.interceptors.request.use(this.middleware.bind(this));
  }

  get locale() {
    return this.getLocale();
  }

  get role() {
    return this.getRole();
  }

  get token() {
    return this.getToken();
  }

  set locale(value) {
    this.setLocale(value);
  }

  set role(value) {
    this.setRole(value);
  }

  set token(value) {
    this.setToken(value);
  }

  middleware(config) {
    if (this.locale) {
      config.headers['X-Locale'] = this.locale;
    }

    if (this.role) {
      config.headers['X-Role'] = this.role;
    }

    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }

    return config;
  }

  getLocale() {
    return this.api.storage.getItem('ZNEWNEE_LOCALE');
  }

  setLocale(locale) {
    this.options.locale = locale;
    this.api.storage.setItem('ZNEWNEE_LOCALE', locale || '');
  }

  getToken() {
    return this.api.storage.getItem('ZNEWNEE_TOKEN');
  }

  setToken(token) {
    this.options.token = token;
    this.api.storage.setItem('ZNEWNEE_TOKEN', token || '');

    if (!token) {
      this.setRole(null);
      this.setLocale(null);
    }
  }

  getRole() {
    return this.api.storage.getItem('ZNEWNEE_ROLE');
  }

  setRole(role) {
    this.options.role = role;
    this.api.storage.setItem('ZNEWNEE_ROLE', role || '');
  }

  signIn(values) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var _response$data;

      const response = yield _this.api.request({
        method: 'post',
        url: 'users:signin',
        data: values
      });
      const data = response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data;

      _this.setToken(data === null || data === void 0 ? void 0 : data.token);

      return response;
    })();
  }

  signOut() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.api.request({
        method: 'post',
        url: 'users:signout'
      });

      _this2.setToken(null);
    })();
  }

}
export class Storage {}
export class MemoryStorage extends Storage {
  constructor(...args) {
    super(...args);
    this.items = new Map();
  }

  clear() {
    this.items.clear();
  }

  getItem(key) {
    return this.items.get(key);
  }

  setItem(key, value) {
    return this.items.set(key, value);
  }

  removeItem(key) {
    return this.items.delete(key);
  }

}
export class APIClient {
  constructor(instance) {
    this.axios = void 0;
    this.auth = void 0;
    this.storage = void 0;

    if (typeof instance === 'function') {
      this.axios = instance;
    } else {
      const _ref = instance || {},
            authClass = _ref.authClass,
            storageClass = _ref.storageClass,
            others = _objectWithoutProperties(_ref, _excluded);

      this.axios = axios.create(others);
      this.initStorage(storageClass);

      if (authClass) {
        this.auth = new authClass(this);
      }
    }

    if (!this.storage) {
      this.initStorage();
    }

    if (!this.auth) {
      this.auth = new Auth(this);
    }

    this.paramsSerializer();
  }

  initStorage(storage) {
    if (storage) {
      this.storage = new storage(this);
    } else if (localStorage) {
      this.storage = localStorage;
    } else {
      this.storage = new MemoryStorage();
    }
  }

  paramsSerializer() {
    this.axios.interceptors.request.use(config => {
      config.paramsSerializer = params => {
        return qs.stringify(params, {
          strictNullHandling: true,
          arrayFormat: 'brackets'
        });
      };

      return config;
    });
  }

  request(config) {
    const resource = config.resource,
          resourceOf = config.resourceOf,
          action = config.action,
          params = config.params;

    if (resource) {
      return this.resource(resource, resourceOf)[action](params);
    }

    return this.axios.request(config);
  }

  resource(name, of) {
    var _this3 = this;

    const target = {};
    const handler = {
      get: (_, actionName) => {
        let url = name.split('.').join(`/${of || '_'}/`);
        url += `:${actionName}`;
        const config = {
          url
        };

        if (['get', 'list'].includes(actionName)) {
          config['method'] = 'get';
        } else {
          config['method'] = 'post';
        }

        return /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator(function* (params) {
            const _ref3 = params || {},
                  values = _ref3.values,
                  filter = _ref3.filter,
                  others = _objectWithoutProperties(_ref3, _excluded2);

            config['params'] = others;

            if (filter) {
              if (typeof filter === 'string') {
                config['params']['filter'] = filter;
              } else {
                config['params']['filter'] = JSON.stringify(filter);
              }
            }

            if (config.method !== 'get') {
              config['data'] = values || {};
            }

            return yield _this3.request(config);
          });

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }();
      }
    };
    return new Proxy(target, handler);
  }

}
