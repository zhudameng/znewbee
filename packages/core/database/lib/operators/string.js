"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _default = {
  $includes(value, ctx) {
    return {
      [(0, _utils.isPg)(ctx) ? _sequelize().Op.iLike : _sequelize().Op.like]: `%${value}%`
    };
  },

  $notIncludes(value, ctx) {
    return {
      [(0, _utils.isPg)(ctx) ? _sequelize().Op.notILike : _sequelize().Op.notLike]: `%${value}%`
    };
  },

  $startsWith(value, ctx) {
    return {
      [(0, _utils.isPg)(ctx) ? _sequelize().Op.iLike : _sequelize().Op.like]: `${value}%`
    };
  },

  $notStartsWith(value, ctx) {
    return {
      [(0, _utils.isPg)(ctx) ? _sequelize().Op.notILike : _sequelize().Op.notLike]: `${value}%`
    };
  },

  $endWith(value, ctx) {
    return {
      [(0, _utils.isPg)(ctx) ? _sequelize().Op.iLike : _sequelize().Op.like]: `%${value}`
    };
  },

  $notEndWith(value, ctx) {
    return {
      [(0, _utils.isPg)(ctx) ? _sequelize().Op.notILike : _sequelize().Op.notLike]: `%${value}`
    };
  }

};
exports.default = _default;