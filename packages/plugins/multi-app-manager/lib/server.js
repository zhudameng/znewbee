"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginMultiAppManager = void 0;

function _server() {
  const data = require("@znewbee/server");

  _server = function _server() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

var _application = require("./models/application");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class PluginMultiAppManager extends _server().Plugin {
  getName() {
    return this.getPackageName(__dirname);
  }

  install(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const repo = _this.db.getRepository('collections');

      if (repo) {
        yield repo.db2cm('applications');
      }
    })();
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.db.registerModels({
        ApplicationModel: _application.ApplicationModel
      });

      yield _this2.db.import({
        directory: (0, _path().resolve)(__dirname, 'collections')
      });

      _this2.db.on('applications.afterCreateWithAssociations', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (model, options) {
          const transaction = options.transaction;
          yield model.registerToMainApp(_this2.app, {
            transaction
          });
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      _this2.db.on('applications.afterDestroy', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (model) {
          yield _this2.app.appManager.removeApplication(model.get('name'));
        });

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }());

      _this2.app.appManager.on('beforeGetApplication', /*#__PURE__*/function () {
        var _lazyLoadApplication = _asyncToGenerator(function* ({
          appManager,
          name
        }) {
          if (!appManager.applications.has(name)) {
            const existsApplication = yield this.app.db.getRepository('applications').findOne({
              filter: {
                name
              }
            });

            if (existsApplication) {
              yield existsApplication.registerToMainApp(this.app, {
                skipInstall: true
              });
            }
          }
        });

        function lazyLoadApplication(_x4) {
          return _lazyLoadApplication.apply(this, arguments);
        }

        return lazyLoadApplication;
      }());
    })();
  }

}

exports.PluginMultiAppManager = PluginMultiAppManager;
