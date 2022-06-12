"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSchemaModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

class UiSchemaModel extends _database().MagicAttributeModel {
  getServerHooksByType(type) {
    const hooks = this.get('x-server-hooks') || [];
    return hooks.filter(hook => hook.type === type);
  }

}

exports.UiSchemaModel = UiSchemaModel;
