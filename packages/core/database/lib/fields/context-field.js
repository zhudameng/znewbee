"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextField = void 0;

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

var _field = require("./field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ContextField extends _field.Field {
  get dataType() {
    const type = this.options.dataType || 'string';
    return _sequelize().DataTypes[type.toUpperCase()] || _sequelize().DataTypes.STRING;
  }

  init() {
    const _this$options = this.options,
          name = _this$options.name,
          dataIndex = _this$options.dataIndex;

    this.listener = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (model, options) {
        const context = options.context;
        model.set(name, _lodash().default.get(context, dataIndex));
        model.changed(name, true);
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  bind() {
    super.bind();
    const createOnly = this.options.createOnly;
    this.on('beforeCreate', this.listener);

    if (!createOnly) {
      this.on('beforeUpdate', this.listener);
    }
  }

  unbind() {
    super.unbind();
    const createOnly = this.options.createOnly;
    this.off('beforeCreate', this.listener);

    if (!createOnly) {
      this.off('beforeUpdate', this.listener);
    }
  }

}

exports.ContextField = ContextField;