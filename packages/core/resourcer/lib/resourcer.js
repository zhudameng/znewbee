"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Resourcer = void 0;

function _glob() {
  const data = _interopRequireDefault(require("glob"));

  _glob = function _glob() {
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

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _pathToRegexp() {
  const data = require("path-to-regexp");

  _pathToRegexp = function _pathToRegexp() {
    return data;
  };

  return data;
}

var _resource = _interopRequireDefault(require("./resource"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

class Resourcer {
  /**
   * 全局定义的 action handlers
   */
  constructor(options = {}) {
    this.resources = new Map();
    this.handlers = new Map();
    this.actionHandlers = new Map();
    this.middlewareHandlers = new Map();
    this.middlewares = [];
    this.options = void 0;
    this.options = options;
  }
  /**
   * 载入指定目录下的 resource 配置（配置的文件驱动）
   *
   * TODO: 配置的文件驱动现在会全部初始化，大数据时可能存在性能瓶颈，后续可以加入动态加载
   *
   * @param {object}   [options]
   * @param {string}   [options.directory] 指定配置所在路径
   * @param {array}    [options.extensions = ['js', 'ts', 'json']] 文件后缀
   */


  import(options) {
    const _options$extensions = options.extensions,
          extensions = _options$extensions === void 0 ? ['js', 'ts', 'json'] : _options$extensions,
          directory = options.directory;
    const patten = `${directory}/*.{${extensions.join(',')}}`;

    const files = _glob().default.sync(patten, {
      ignore: ['**/*.d.ts']
    });

    const resources = new Map();
    files.forEach(file => {
      const options = (0, _utils.requireModule)(file);
      const table = this.define(typeof options === 'function' ? options(this) : options);
      resources.set(table.getName(), table);
    });
    return resources;
  }
  /**
   * resource 配置
   *
   * @param name
   * @param options
   */


  define(options) {
    const name = options.name;
    const resource = new _resource.default(options, this);
    this.resources.set(name, resource);
    return resource;
  }

  isDefined(name) {
    return this.resources.has(name);
  }

  registerAction(name, handler) {
    this.registerActionHandler(name, handler);
  }

  registerActions(handlers) {
    this.registerActionHandlers(handlers);
  }
  /**
   * 注册全局的 action handlers
   *
   * @param handlers
   */


  registerActionHandlers(handlers) {
    for (var _i = 0, _Object$entries = Object.entries(handlers); _i < _Object$entries.length; _i++) {
      const _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            name = _Object$entries$_i[0],
            handler = _Object$entries$_i[1];

      this.registerActionHandler(name, handler);
    }
  }

  registerActionHandler(name, handler) {
    this.actionHandlers.set(name, handler);
  }

  getRegisteredHandler(name) {
    return this.actionHandlers.get(name);
  }

  getRegisteredHandlers() {
    return this.actionHandlers;
  }

  getResource(name) {
    if (!this.resources.has(name)) {
      throw new Error(`${name} resource does not exist`);
    }

    return this.resources.get(name);
  }

  getAction(name, action) {
    // 支持注册局部 action
    if (this.actionHandlers.has(`${name}:${action}`)) {
      return this.getResource(name).getAction(`${name}:${action}`);
    }

    return this.getResource(name).getAction(action);
  }

  getMiddlewares() {
    return this.middlewares;
  }

  use(middlewares) {
    if (typeof middlewares === 'function') {
      this.middlewares.push(middlewares);
    } else if (Array.isArray(middlewares)) {
      this.middlewares.push(...middlewares);
    }
  }

  restApiMiddleware(options = {}) {
    var _this = this;

    const prefix = options.prefix,
          accessors = options.accessors;

    const restApiMiddleware = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (ctx, next) {
        ctx.resourcer = _this;
        let params = (0, _utils.parseRequest)({
          path: ctx.request.path,
          method: ctx.request.method
        }, {
          prefix: _this.options.prefix || prefix,
          accessors: _this.options.accessors || accessors
        });

        if (!params) {
          return next();
        }

        try {
          const resource = _this.getResource((0, _utils.getNameByParams)(params)); // 为关系资源时，暂时需要再执行一遍 parseRequest


          if (resource.options.type && resource.options.type !== 'single') {
            params = (0, _utils.parseRequest)({
              path: ctx.request.path,
              method: ctx.request.method,
              type: resource.options.type
            }, {
              prefix: _this.options.prefix || prefix,
              accessors: _this.options.accessors || accessors
            });

            if (!params) {
              return next();
            }
          } // action 需要 clone 之后再赋给 ctx


          ctx.action = _this.getAction((0, _utils.getNameByParams)(params), params.actionName).clone();
          ctx.action.setContext(ctx);
          ctx.action.actionName = params.actionName;
          ctx.action.resourceOf = params.associatedIndex;
          ctx.action.resourceName = params.associatedName ? `${params.associatedName}.${params.resourceName}` : params.resourceName;
          ctx.action.params.filterByTk = params.resourceIndex;
          const query = (0, _utils.parseQuery)(ctx.request.querystring);

          if ((0, _pathToRegexp().pathToRegexp)('/resourcer/{:associatedName.}?:resourceName{\\::actionName}').test(ctx.request.path)) {
            ctx.action.mergeParams(_objectSpread(_objectSpread(_objectSpread({}, query), params), ctx.request.body));
          } else {
            ctx.action.mergeParams(_objectSpread(_objectSpread(_objectSpread({}, query), params), _lodash().default.isEmpty(ctx.request.body) ? {} : {
              values: ctx.request.body
            }));
          }

          return (0, _koaCompose().default)(ctx.action.getHandlers())(ctx, next);
        } catch (error) {
          return next();
        }
      });

      return function restApiMiddleware(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    return restApiMiddleware;
  }

  middleware(options = {}) {
    return this.restApiMiddleware(options);
  }
  /**
   * 实验性 API
   *
   * @param options
   * @param context
   * @param next
   */


  execute(options, context = {}, next) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const resource = options.resource,
            action = options.action;
      context.resourcer = _this2;
      context.action = _this2.getAction(resource, action);
      return yield context.action.execute(context, next);
    })();
  }

}

exports.Resourcer = Resourcer;
var _default = Resourcer;
exports.default = _default;