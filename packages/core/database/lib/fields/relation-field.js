"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelationField = void 0;

var _field = require("./field");

class RelationField extends _field.Field {
  /**
   * target relation name
   */
  get target() {
    const _this$options = this.options,
          target = _this$options.target,
          name = _this$options.name;
    return target || name;
  }

  get foreignKey() {
    return this.options.foreignKey;
  }

  get sourceKey() {
    return this.options.sourceKey || this.collection.model.primaryKeyAttribute;
  }

  get targetKey() {
    return this.options.targetKey || this.TargetModel.primaryKeyAttribute;
  }
  /**
   * get target model from database by it's name
   * @constructor
   */


  get TargetModel() {
    return this.context.database.sequelize.models[this.target];
  }

}

exports.RelationField = RelationField;