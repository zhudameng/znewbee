"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringField = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _field = require("./field");

class StringField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.STRING;
  }

}

exports.StringField = StringField;