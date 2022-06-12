"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppManager = void 0;

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
    return data;
  };

  return data;
}

function _events() {
  const data = _interopRequireDefault(require("events"));

  _events = function _events() {
    return data;
  };

  return data;
}

function _http() {
  const data = _interopRequireDefault(require("http"));

  _http = function _http() {
    return data;
  };

  return data;
}

var _application = _interopRequireDefault(require("./application"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class AppManager extends _events().default {
  constructor(app) {
    var _this;

    super();
    _this = this;
    this.app = void 0;
    this.applications = new Map();

    this.appSelector = req => this.app;

    this.app = app;
    app.on('beforeStop', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (mainApp, options) {
        return yield Promise.all([..._this.applications.values()].map(application => application.stop(options)));
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    app.on('afterDestroy', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(function* (mainApp, options) {
        return yield Promise.all([..._this.applications.values()].map(application => application.destroy(options)));
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  }

  createApplication(name, options) {
    const application = new _application.default(options);
    this.applications.set(name, application);
    return application;
  }

  removeApplication(name) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const application = _this2.applications.get(name);

      if (!application) {
        return;
      }

      yield application.destroy();

      _this2.applications.delete(name);
    })();
  }

  setAppSelector(selector) {
    this.appSelector = selector;
  }

  listen(...args) {
    const server = _http().default.createServer(this.callback());

    return server.listen(...args);
  }

  getApplication(appName) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield _this3.emitAsync('beforeGetApplication', {
        appManager: _this3,
        name: appName
      });
      return _this3.applications.get(appName);
    })();
  }

  callback() {
    var _this4 = this;

    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (req, res) {
        let handleApp = _this4.appSelector(req) || _this4.app;

        if (typeof handleApp === 'string') {
          handleApp = yield _this4.getApplication(handleApp);

          if (!handleApp) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
              redirectTo: process.env.APP_NOT_FOUND_REDIRECT_TO,
              errors: [{
                message: 'Not Found'
              }]
            }));
          }
        }

        handleApp.callback()(req, res);
      });

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }();
  }

}

exports.AppManager = AppManager;
(0, _utils().applyMixins)(AppManager, [_utils().AsyncEmitter]);
