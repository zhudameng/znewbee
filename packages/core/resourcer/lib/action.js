"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Action = void 0;

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _koaCompose() {
  const data = _interopRequireDefault(require("koa-compose"));

  _koaCompose = function _koaCompose() {
    return data;
  };

  return data;
}

var _utils = require("./utils");

var _middleware = _interopRequireDefault(require("./middleware"));

var _assign = require("./assign");

const _excluded = ["middleware", "middlewares", "handler"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

class Action {
  constructor(options) {
    this.handler = void 0;
    this.resource = void 0;
    this.name = void 0;
    this.options = void 0;
    this.context = {};
    this.params = {};
    this.actionName = void 0;
    this.resourceName = void 0;
    this.resourceOf = void 0;
    this.middlewares = [];
    options = (0, _utils.requireModule)(options);

    if (typeof options === 'function') {
      options = {
        handler: options
      };
    }

    const _options = options,
          middleware = _options.middleware,
          _options$middlewares = _options.middlewares,
          middlewares = _options$middlewares === void 0 ? [] : _options$middlewares,
          handler = _options.handler,
          params = _objectWithoutProperties(_options, _excluded);

    this.middlewares = _middleware.default.toInstanceArray(middleware || middlewares);
    this.handler = handler;
    this.options = options;
    this.mergeParams(params);
  }

  clone() {
    const options = _lodash().default.cloneDeep(this.options);

    delete options.middleware;
    delete options.middlewares;
    const action = new Action(options);
    action.setName(this.name);
    action.setResource(this.resource);
    action.middlewares.push(...this.middlewares);
    return action;
  }

  setContext(context) {
    this.context = context;
  }

  mergeParams(params, strategies = {}) {
    (0, _assign.assign)(this.params, params, _objectSpread({
      filter: 'andMerge',
      fields: 'intersect',
      appends: 'union',
      except: 'union',
      whitelist: 'intersect',
      blacklist: 'intersect',
      sort: 'overwrite'
    }, strategies));
  }

  setResource(resource) {
    this.resource = resource;
    return this;
  }

  getResource() {
    return this.resource;
  }

  getOptions() {
    return this.options;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getName() {
    return this.name;
  }

  getMiddlewareHandlers() {
    return this.middlewares.filter(middleware => middleware.canAccess(this.name)).map(middleware => middleware.getHandler());
  }

  getHandler() {
    const handler = (0, _utils.requireModule)(this.handler || this.resource.resourcer.getRegisteredHandler(this.name));

    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function!');
    }

    return handler;
  }

  getHandlers() {
    return [...this.resource.resourcer.getMiddlewares(), ...this.getMiddlewareHandlers(), this.getHandler()].filter(Boolean);
  }

  execute(context, next) {
    var _this = this;

    return _asyncToGenerator(function* () {
      return yield (0, _koaCompose().default)(_this.getHandlers())(context, next);
    })();
  }

  static toInstanceMap(actions, resource) {
    return new Map(Object.entries(actions).map(([key, options]) => {
      let action;

      if (options instanceof Action) {
        action = options;
      } else {
        action = new Action(options);
      }

      action.setName(key);
      action.setResource(resource);
      resource && action.middlewares.unshift(...resource.middlewares);
      return [key, action];
    }));
  }

}

exports.Action = Action;
var _default = Action;
exports.default = _default;