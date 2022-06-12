"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginErrorHandler = void 0;

function _jsonSchema() {
  const data = require("@formily/json-schema");

  _jsonSchema = function _jsonSchema() {
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

function _lodash() {
  const data = _interopRequireDefault(require("lodash"));

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _errorHandler = require("./error-handler");

var _en_US = _interopRequireDefault(require("./locale/en_US"));

var _zh_CN = _interopRequireDefault(require("./locale/zh_CN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class PluginErrorHandler extends _server().Plugin {
  constructor(...args) {
    super(...args);
    this.errorHandler = new _errorHandler.ErrorHandler();
    this.i18nNs = 'error-handler';
  }

  getName() {
    return this.getPackageName(__dirname);
  }

  beforeLoad() {
    this.registerSequelizeValidationErrorHandler();
  }

  registerSequelizeValidationErrorHandler() {
    const findFieldTitle = (instance, path, tFunc) => {
      if (!instance) {
        return path;
      }

      const model = instance.constructor;
      const collection = this.db.modelCollection.get(model);
      const field = collection.getField(path);

      const fieldOptions = _jsonSchema().Schema.compile(field.options, {
        t: tFunc
      });

      const title = _lodash().default.get(fieldOptions, 'uiSchema.title', path);

      return title;
    };

    this.errorHandler.register(err => {
      var _err$errors;

      return (err === null || err === void 0 ? void 0 : (_err$errors = err.errors) === null || _err$errors === void 0 ? void 0 : _err$errors.length) && err instanceof _sequelize().BaseError;
    }, (err, ctx) => {
      ctx.body = {
        errors: err.errors.map(err => {
          return {
            message: ctx.i18n.t(err.type, {
              ns: this.i18nNs,
              field: findFieldTitle(err.instance, err.path, ctx.i18n.t)
            })
          };
        })
      };
      ctx.status = 400;
    });
  }

  load() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.app.i18n.addResources('zh-CN', _this.i18nNs, _zh_CN.default);

      _this.app.i18n.addResources('en-US', _this.i18nNs, _en_US.default);

      _this.app.middleware.unshift(_this.errorHandler.middleware());
    })();
  }

}

exports.PluginErrorHandler = PluginErrorHandler;
