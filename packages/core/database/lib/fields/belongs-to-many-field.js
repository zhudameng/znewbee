"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BelongsToManyField = void 0;

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

class BelongsToManyField extends _relationField.RelationField {
  get through() {
    return this.options.through || _sequelize().Utils.camelize([this.context.collection.model.name, this.target].map(name => name.toLowerCase()).sort().join('_'));
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

    const through = this.through;
    let Through;

    if (database.hasCollection(through)) {
      Through = database.getCollection(through);
    } else {
      Through = database.collection({
        name: through
      });
      Object.defineProperty(Through.model, 'isThrough', {
        value: true
      });
    }

    const association = collection.model.belongsToMany(Target, _objectSpread(_objectSpread({}, (0, _lodash().omit)(this.options, ['name', 'type', 'target'])), {}, {
      as: this.name,
      through: Through.model
    })); // 建立关系之后从 pending 列表中删除

    database.removePendingField(this);

    if (!this.options.foreignKey) {
      this.options.foreignKey = association.foreignKey;
    }

    if (!this.options.sourceKey) {
      this.options.sourceKey = association.sourceKey;
    }

    if (!this.options.otherKey) {
      this.options.otherKey = association.otherKey;
    }

    if (!this.options.through) {
      this.options.through = this.through;
    }

    return true;
  }

  unbind() {
    const _this$context2 = this.context,
          database = _this$context2.database,
          collection = _this$context2.collection; // 如果关系字段还没建立就删除了，也同步删除待建立关联的关系字段

    database.removePendingField(this); // 删掉 model 的关联字段

    delete collection.model.associations[this.name];
  }

}

exports.BelongsToManyField = BelongsToManyField;