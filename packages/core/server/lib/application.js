"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Application = void 0;

function _actions() {
  const data = require("@znewbee/actions");

  _actions = function _actions() {
    return data;
  };

  return data;
}

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _commander() {
  const data = require("commander");

  _commander = function _commander() {
    return data;
  };

  return data;
}

function _koa() {
  const data = _interopRequireDefault(require("koa"));

  _koa = function _koa() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = require("lodash");

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

var _acl = require("./acl");

var _appManager = require("./app-manager");

var _commands = require("./commands");

var _helper = require("./helper");

var _pluginManager = require("./plugin-manager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

const packageJson = require('../package.json');

class Application extends _koa().default {
  constructor(options) {
    super();
    this.options = void 0;
    this.db = void 0;
    this.resourcer = void 0;
    this.cli = void 0;
    this.i18n = void 0;
    this.pm = void 0;
    this.acl = void 0;
    this.appManager = void 0;
    this.plugins = new Map();
    this.listenServer = void 0;
    this.options = options;
    this.acl = (0, _acl.createACL)();
    this.db = (0, _helper.createDatabase)(options);
    this.resourcer = (0, _helper.createResourcer)(options);
    this.cli = new (_commander().Command)('znewbee').usage('[command] [options]');
    this.i18n = (0, _helper.createI18n)(options);
    this.pm = new _pluginManager.PluginManager({
      app: this
    });
    this.appManager = new _appManager.AppManager(this);
    (0, _helper.registerMiddlewares)(this, options);

    if (options.registerActions !== false) {
      (0, _actions().registerActions)(this);
    }

    this.loadPluginConfig(options.plugins || []);
    (0, _commands.registerCli)(this);
  }

  getVersion() {
    return packageJson.version;
  }

  plugin(pluginClass, options) {
    return this.pm.add(pluginClass, options);
  }

  loadPluginConfig(pluginsConfigurations) {
    var _iterator = _createForOfIteratorHelper(pluginsConfigurations),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        let pluginConfiguration = _step.value;

        if (typeof pluginConfiguration == 'string') {
          pluginConfiguration = [pluginConfiguration, {}];
        }

        const plugin = _pluginManager.PluginManager.resolvePlugin(pluginConfiguration[0]);

        const pluginOptions = pluginConfiguration[1];
        this.plugin(plugin, pluginOptions);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  use(middleware, options) {
    // @ts-ignore
    return super.use(middleware);
  }

  collection(options) {
    return this.db.collection(options);
  }

  resource(options) {
    return this.resourcer.define(options);
  }

  actions(handlers, options) {
    return this.resourcer.registerActions(handlers);
  }

  command(name, desc, opts) {
    return this.cli.command(name, desc, opts).allowUnknownOption();
  }

  findCommand(name) {
    return this.cli._findCommand(name);
  }

  load() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.pm.load();
    })();
  }

  getPlugin(name) {
    return this.pm.get(name);
  }

  parse(argv = process.argv) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.load();
      return _this2.cli.parseAsync(argv);
    })();
  }

  start(options = {}) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      var _options$listen;

      // reconnect database
      if (_this3.db.closed()) {
        yield _this3.db.reconnect();
      }

      yield _this3.emitAsync('beforeStart', _this3, options);

      if (options === null || options === void 0 ? void 0 : (_options$listen = options.listen) === null || _options$listen === void 0 ? void 0 : _options$listen.port) {
        const listen = () => new Promise((resolve, reject) => {
          const Server = _this3.listen(options === null || options === void 0 ? void 0 : options.listen, () => {
            resolve(Server);
          });

          Server.on('error', err => {
            reject(err);
          });
        });

        try {
          //@ts-ignore
          _this3.listenServer = yield listen();
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      }

      yield _this3.emitAsync('afterStart', _this3, options);
    })();
  }

  listen(...args) {
    return this.appManager.listen(...args);
  }

  stop(options = {}) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      yield _this4.emitAsync('beforeStop', _this4, options);

      try {
        // close database connection
        // silent if database already closed
        yield _this4.db.close();
      } catch (e) {
        console.log(e);
      } // close http server


      if (_this4.listenServer) {
        const closeServer = () => new Promise((resolve, reject) => {
          _this4.listenServer.close(err => {
            if (err) {
              return reject(err);
            }

            _this4.listenServer = null;
            resolve(true);
          });
        });

        yield closeServer();
      }

      yield _this4.emitAsync('afterStop', _this4, options);
    })();
  }

  destroy(options = {}) {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      yield _this5.emitAsync('beforeDestroy', _this5, options);
      yield _this5.stop(options);
      yield _this5.emitAsync('afterDestroy', _this5, options);
    })();
  }

  install(options = {}) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      yield _this6.emitAsync('beforeInstall', _this6, options);

      if (options === null || options === void 0 ? void 0 : options.clean) {
        yield _this6.db.clean((0, _lodash().isBoolean)(options.clean) ? {
          drop: options.clean
        } : options.clean);
      }

      yield _this6.db.sync(options === null || options === void 0 ? void 0 : options.sync);
      yield _this6.pm.install(options);
      yield _this6.emitAsync('afterInstall', _this6, options);
    })();
  }

}

exports.Application = Application;
(0, _utils().applyMixins)(Application, [_utils().AsyncEmitter]);
var _default = Application;
exports.default = _default;
