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
  $ne(val, ctx) {
    return {
      [_sequelize().Op.or]: {
        [_sequelize().Op.ne]: val,
        [_sequelize().Op.is]: null
      }
    };
  }

};
exports.default = _default;