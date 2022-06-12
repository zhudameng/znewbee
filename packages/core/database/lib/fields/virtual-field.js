"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualField = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _field = require("./field");

class VirtualField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.VIRTUAL;
  }

}

exports.VirtualField = VirtualField;