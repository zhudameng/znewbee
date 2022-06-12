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
  $notIn(val, ctx) {
    return {
      [_sequelize().Op.or]: {
        [_sequelize().Op.notIn]: val,
        [_sequelize().Op.is]: null
      }
    };
  }

};
exports.default = _default;