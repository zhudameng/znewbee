"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasManyField = void 0;

function _lodash() {
  const data = require("lodash");

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

function _sequelize() {
  const data = require("sequelize");

  _sequelize = function _sequelize() {
    return data;
  };

  return data;
}

var _relationField = require("./relation-field");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class HasManyField extends _relationField.RelationField {
  get foreignKey() {
    if (this.options.foreignKey) {
      return this.options.foreignKey;
    }

    const model = this.context.collection.model;
    return _sequelize().Utils.camelize([model.options.name.singular, this.sourceKey || model.primaryKeyAttribute].join('_'));
  }

  bind() {
    const _this$context = this.context,
          database = _this$context.database,
          collection = _this$context.collection;
    const Target = this.TargetModel;

    if (!Target) {
      database.addPendingField(this);
      return false;
    }

    if (collection.model.associations[this.name]) {
      delete collection.model.associations[this.name];
    }

    const association = collection.model.hasMany(Target, _objectSpread({
      as: this.name,
      foreignKey: this.foreignKey
    }, (0, _lodash().omit)(this.options, ['name', 'type', 'target']))); // inverse relation
    // this.TargetModel.belongsTo(collection.model);
    // ????????????????????? pending ???????????????

    database.removePendingField(this);

    if (!this.options.foreignKey) {
      this.options.foreignKey = association.foreignKey;
    }

    if (!this.options.sourceKey) {
      // @ts-ignore
      this.options.sourceKey = association.sourceKey;
    }

    return true;
  }

  unbind() {
    const _this$context2 = this.context,
          database = _this$context2.database,
          collection = _this$context2.collection; // ??????????????????????????????????????????????????????????????????????????????????????????

    database.removePendingField(this); // ??????????????????????????????????????????????????????????????????????????????????????????

    const tcoll = database.collections.get(this.target);
    const foreignKey = this.options.foreignKey;
    const field = tcoll.findField(field => {
      if (field.name === foreignKey) {
        return true;
      }

      return field.type === 'belongsTo' && field.foreignKey === foreignKey;
    });

    if (!field) {
      tcoll.model.removeAttribute(foreignKey);
    } // ?????? model ???????????????


    delete collection.model.associations[this.name]; // @ts-ignore

    collection.model.refreshAttributes();
  }

}

exports.HasManyField = HasManyField;