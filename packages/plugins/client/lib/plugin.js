"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientPlugin = void 0;

function _server() {
  const data = require("@znewbee/server");

  _server = function _server() {
    return data;
  };

  return data;
}

function _koaSend() {
  const data = _interopRequireDefault(require("koa-send"));

  _koaSend = function _koaSend() {
    return data;
  };

  return data;
}

function _koaStatic() {
  const data = _interopRequireDefault(require("koa-static"));

  _koaStatic = function _koaStatic() {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ClientPlugin extends _server().Plugin {
  beforeLoad() {
    var _this = this;

    return _asyncToGenerator(function* () {
      // const cmd = this.app.findCommand('install');
      // if (cmd) {
      //   cmd.option('--import-demo');
      // }
      _this.app.on('afterInstall', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (app, options) {
          const _ref2 = (options === null || options === void 0 ? void 0 : options.cliArgs) || [{}],
                _ref3 = _slicedToArray(_ref2, 1),
                opts = _ref3[0];

          if (opts === null || opts === void 0 ? void 0 : opts.importDemo) {//
          }
        });

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.app.acl.allow('app', 'getLang');

      _this2.app.acl.allow('plugins', 'getPinned', 'loggedIn');

      _this2.app.resource({
        name: 'app',
        actions: {
          getInfo(ctx, next) {
            var _this3 = this;

            return _asyncToGenerator(function* () {
              const SystemSetting = ctx.db.getRepository('systemSettings');
              const systemSetting = yield SystemSetting.findOne();
              const currentUser = ctx.state.currentUser;
              ctx.body = {
                version: _this3.app.getVersion(),
                lang: (currentUser === null || currentUser === void 0 ? void 0 : currentUser.appLang) || (systemSetting === null || systemSetting === void 0 ? void 0 : systemSetting.appLang) || process.env.APP_LANG || 'en-US'
              };
              yield next();
            })();
          },

          getLang(ctx, next) {
            return _asyncToGenerator(function* () {
              const SystemSetting = ctx.db.getRepository('systemSettings');
              const systemSetting = yield SystemSetting.findOne();
              const currentUser = ctx.state.currentUser;
              ctx.body = {
                lang: (currentUser === null || currentUser === void 0 ? void 0 : currentUser.appLang) || (systemSetting === null || systemSetting === void 0 ? void 0 : systemSetting.appLang) || process.env.APP_LANG || 'en-US'
              };
              yield next();
            })();
          }

        }
      });

      _this2.app.resource({
        name: 'plugins',
        actions: {
          // TODO: 临时
          getPinned(ctx, next) {
            return _asyncToGenerator(function* () {
              ctx.body = [{
                component: 'DesignableSwitch',
                pin: true
              }, {
                component: 'CollectionManagerShortcut',
                pin: true
              }, {
                component: 'ACLShortcut'
              }, {
                component: 'WorkflowShortcut'
              }, {
                component: 'SchemaTemplateShortcut'
              }, {
                component: 'SystemSettingsShortcut'
              }, {
                component: 'FileStorageShortcut'
              }];
              yield next();
            })();
          }

        }
      });

      let root = _this2.options.dist || `./packages/app/client/dist`;

      if (!(0, _path().isAbsolute)(root)) {
        root = (0, _path().resolve)(process.cwd(), root);
      }

      _this2.app.middleware.unshift( /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(function* (ctx, next) {
          if (process.env.APP_ENV === 'production') {
            return next();
          }

          if (!root) {
            return next();
          }

          if (ctx.path.startsWith(_this2.app.resourcer.options.prefix)) {
            return next();
          }

          yield (0, _koaStatic().default)(root)(ctx, next); // console.log('koa-send', root, ctx.status);

          if (ctx.status == 404) {
            return (0, _koaSend().default)(ctx, 'index.html', {
              root
            });
          }
        });

        return function (_x3, _x4) {
          return _ref4.apply(this, arguments);
        };
      }());
    })();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.ClientPlugin = ClientPlugin;
var _default = ClientPlugin;
exports.default = _default;
