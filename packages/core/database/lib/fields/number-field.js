"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RealField = exports.IntegerField = exports.FloatField = exports.DoubleField = exports.DecimalField = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _field = require("./field");

class IntegerField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.INTEGER;
  }

}

exports.IntegerField = IntegerField;

class FloatField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.FLOAT;
  }

}

exports.FloatField = FloatField;

class DoubleField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.DOUBLE;
  }

}

exports.DoubleField = DoubleField;

class RealField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.REAL;
  }

}

exports.RealField = RealField;

class DecimalField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.DECIMAL;
  }

}

exports.DecimalField = DecimalField;