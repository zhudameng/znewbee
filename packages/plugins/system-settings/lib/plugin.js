"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SystemSettingsPlugin = void 0;

function _acl() {
  const data = require("@znewbee/acl");

  _acl = function _acl() {
    return data;
  };

  return data;
}

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class SystemSettingsPlugin extends _server().Plugin {
  getInitAppLang(options) {
    var _options$cliArgs, _options$cliArgs$, _options$cliArgs$$opt;

    return (options === null || options === void 0 ? void 0 : (_options$cliArgs = options.cliArgs) === null || _options$cliArgs === void 0 ? void 0 : (_options$cliArgs$ = _options$cliArgs[0]) === null || _options$cliArgs$ === void 0 ? void 0 : (_options$cliArgs$$opt = _options$cliArgs$.opts) === null || _options$cliArgs$$opt === void 0 ? void 0 : _options$cliArgs$$opt.lang) || process.env.INIT_APP_LANG || 'en-US';
  }

  install(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.db.getRepository('systemSettings').create({
        values: {
          title: 'znewbee',
          appLang: _this.getInitAppLang(options),
          logo: {
            title: 'znewbee-logo',
            filename: '682e5ad037dd02a0fe4800a3e91c283b.png',
            extname: '.png',
            mimetype: 'image/png',
            url: 'https://znewbee.oss-cn-beijing.aliyuncs.com/682e5ad037dd02a0fe4800a3e91c283b.png'
          }
        }
      });
    })();
  }

  beforeLoad() {
    const cmd = this.app.findCommand('install');

    if (cmd) {
      cmd.option('-l, --lang [lang]');
    }
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.app.db.import({
        directory: (0, _path().resolve)(__dirname, 'collections')
      });

      _this2.app.acl.use((0, _acl().skip)({
        resourceName: 'systemSettings',
        actionName: 'get'
      }));
    })();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.SystemSettingsPlugin = SystemSettingsPlugin;
var _default = SystemSettingsPlugin;
exports.default = _default;
