"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _upload = require("./actions/upload");

var _constants = require("./constants");

var _storages = require("./storages");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class PluginFileManager extends _server().Plugin {
  storageType() {
    return process.env.DEFAULT_STORAGE_TYPE;
  }

  install() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const defaultStorageConfig = (0, _storages.getStorageConfig)(_this.storageType());

      if (defaultStorageConfig) {
        const Storage = _this.db.getCollection('storages');

        yield Storage.repository.create({
          values: _objectSpread(_objectSpread({}, defaultStorageConfig.defaults()), {}, {
            type: _this.storageType(),
            default: true
          })
        });
      }
    })();
  }

  load() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.db.import({
        directory: (0, _path().resolve)(__dirname, 'collections')
      }); // 暂时中间件只能通过 use 加进来

      _this2.app.resourcer.use(_upload.middleware);

      _this2.app.resourcer.registerActionHandler('upload', _upload.action);

      if (process.env.APP_ENV !== 'production') {
        yield (0, _storages.getStorageConfig)(_constants.STORAGE_TYPE_LOCAL).middleware(_this2.app);
      }

      _this2.app.acl.allow('attachments', 'upload', 'loggedIn');
    })();
  }

  getName() {
    return this.getPackageName(__dirname);
  }

}

exports.default = PluginFileManager;
