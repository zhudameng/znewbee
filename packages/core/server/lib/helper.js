"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDatabase = createDatabase;
exports.createI18n = createI18n;
exports.createResourcer = createResourcer;
exports.registerMiddlewares = registerMiddlewares;

function _cors() {
  const data = _interopRequireDefault(require("@koa/cors"));

  _cors = function _cors() {
    return data;
  };

  return data;
}

function _database() {
  const data = _interopRequireDefault(require("@znewbee/database"));

  _database = function _database() {
    return data;
  };

  return data;
}

function _resourcer() {
  const data = _interopRequireDefault(require("@znewbee/resourcer"));

  _resourcer = function _resourcer() {
    return data;
  };

  return data;
}

function _i18next() {
  const data = _interopRequireDefault(require("i18next"));

  _i18next = function _i18next() {
    return data;
  };

  return data;
}

function _koaBodyparser() {
  const data = _interopRequireDefault(require("koa-bodyparser"));

  _koaBodyparser = function _koaBodyparser() {
    return data;
  };

  return data;
}

var _dataWrapping = require("./middlewares/data-wrapping");

var _table2resource = require("./middlewares/table2resource");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createI18n(options) {
  const instance = _i18next().default.createInstance();

  instance.init(_objectSpread({
    lng: 'en-US',
    resources: {}
  }, options.i18n));
  return instance;
}

function createDatabase(options) {
  if (options.database instanceof _database().default) {
    return options.database;
  } else {
    return new (_database().default)(options.database);
  }
}

function createResourcer(options) {
  return new (_resourcer().default)(_objectSpread({}, options.resourcer));
}

function registerMiddlewares(app, options) {
  if (options.bodyParser !== false) {
    app.use((0, _koaBodyparser().default)(_objectSpread({}, options.bodyParser)));
  }

  app.use((0, _cors().default)(_objectSpread({
    exposeHeaders: ['content-disposition']
  }, options.cors)));
  app.use( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (ctx, next) {
      ctx.getBearerToken = () => {
        return ctx.get('Authorization').replace(/^Bearer\s+/gi, '');
      };

      ctx.db = app.db;
      ctx.resourcer = app.resourcer;
      const i18n = app.i18n.cloneInstance({
        initImmediate: false
      });
      ctx.i18n = i18n;
      ctx.t = i18n.t.bind(i18n);
      const lng = ctx.get('X-Locale') || ctx.request.query.locale || ctx.acceptsLanguages().shift() || 'en-US';

      if (lng !== '*' && lng) {
        i18n.changeLanguage(lng);
      }

      yield next();
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  if (options.dataWrapping !== false) {
    app.use((0, _dataWrapping.dataWrapping)());
  }

  app.use((0, _table2resource.table2resource)());
  app.use(app.resourcer.restApiMiddleware());
}
