"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UidField = void 0;

function _utils() {
  const data = require("@znewbee/utils");

  _utils = function _utils() {
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

var _field = require("./field");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class UidField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.STRING;
  }

  init() {
    const _this$options = this.options,
          name = _this$options.name,
          _this$options$prefix = _this$options.prefix,
          prefix = _this$options$prefix === void 0 ? '' : _this$options$prefix;
    const model = this.context.collection.model;
    model.beforeCreate( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (instance) {
        if (!instance.get(name)) {
          instance.set(name, `${prefix}${(0, _utils().uid)()}`);
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

}

exports.UidField = UidField;
