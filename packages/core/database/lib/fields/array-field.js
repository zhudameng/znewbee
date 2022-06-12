"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayField = void 0;

var _field = require("./field");

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

class ArrayField extends _field.Field {
  get dataType() {
    if (this.database.sequelize.getDialect() === 'postgres') {
      return _sequelize().DataTypes.JSONB;
    }

    return _sequelize().DataTypes.JSON;
  }

  sortValue(model) {
    const oldValue = model.get(this.options.name);

    if (oldValue) {
      const newValue = oldValue.sort();
      model.set(this.options.name, newValue);
    }
  }

  bind() {
    super.bind();
    this.on('beforeSave', this.sortValue.bind(this));
  }

  unbind() {
    super.unbind();
    this.off('beforeSave', this.sortValue.bind(this));
  }

}

exports.ArrayField = ArrayField;