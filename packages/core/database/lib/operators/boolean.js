"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _default = {
  $isFalsy() {
    return {
      [_sequelize().Op.or]: {
        [_sequelize().Op.is]: null,
        [_sequelize().Op.eq]: false
      }
    };
  },

  $isTruly() {
    return {
      [_sequelize().Op.eq]: true
    };
  }

};
exports.default = _default;