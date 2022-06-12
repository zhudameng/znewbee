"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioField = void 0;

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

/**
 * 暂时只支持全局，不支持批量
 */
class RadioField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.BOOLEAN;
  }

  init() {
    var _this = this;

    const name = this.options.name;

    this.listener = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (model, {
        transaction
      }) {
        if (!model.changed(name)) {
          return;
        }

        const value = model.get(name);

        if (value) {
          const M = _this.collection.model;
          yield M.update({
            [name]: false
          }, {
            where: {
              [name]: true
            },
            transaction,
            hooks: false
          });
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  bind() {
    super.bind();
    this.on('beforeCreate', this.listener.bind(this));
    this.on('beforeUpdate', this.listener.bind(this));
  }

  unbind() {
    super.unbind();
    this.off('beforeCreate', this.listener.bind(this));
    this.off('beforeUpdate', this.listener.bind(this));
  }

}

exports.RadioField = RadioField;