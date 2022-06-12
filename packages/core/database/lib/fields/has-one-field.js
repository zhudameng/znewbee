"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasOneField = void 0;

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

class HasOneField extends _relationField.RelationField {
  get target() {
    const _this$options = this.options,
          target = _this$options.target,
          name = _this$options.name;
    return target || _sequelize().Utils.pluralize(name);
  }

  get foreignKey() {
    if (this.options.foreignKey) {
      return this.options.foreignKey;
    }

    const model = this.context.collection.model;
    return _sequelize().Utils.camelize([model.options.name.singular, model.primaryKeyAttribute].join('_'));
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

    const association = collection.model.hasOne(Target, _objectSpread({
      as: this.name,
      foreignKey: this.foreignKey
    }, (0, _lodash().omit)(this.options, ['name', 'type', 'target']))); // 建立关系之后从 pending 列表中删除

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
          collection = _this$context2.collection; // 如果关系字段还没建立就删除了，也同步删除待建立关联的关系字段

    database.removePendingField(this); // 如果关系表内没有显式的创建外键字段，删除关系时，外键也删除掉

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
    } // 删掉 model 的关联字段


    delete collection.model.associations[this.name]; // @ts-ignore

    collection.model.refreshAttributes();
  }

}

exports.HasOneField = HasOneField;