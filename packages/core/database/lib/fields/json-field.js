"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonbField = exports.JsonField = void 0;

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _field = require("./field");

class JsonField extends _field.Field {
  get dataType() {
    return _sequelize().DataTypes.JSON;
  }

}

exports.JsonField = JsonField;

class JsonbField extends _field.Field {
  get dataType() {
    const dialect = this.context.database.sequelize.getDialect();

    if (dialect === 'postgres') {
      return _sequelize().DataTypes.JSONB;
    }

    return _sequelize().DataTypes.JSON;
  }

}

exports.JsonbField = JsonbField;