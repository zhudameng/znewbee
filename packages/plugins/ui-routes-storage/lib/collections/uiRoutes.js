"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

var _default = (0, _database().defineCollection)({
  name: 'uiRoutes',
  title: '前端路由表',
  model: 'MagicAttributeModel',
  autoGenId: false,
  sortable: {
    name: 'sort',
    scopeKey: 'parentKey'
  },
  fields: [{
    type: 'uid',
    name: 'key',
    prefix: 'r_',
    primaryKey: true
  }, {
    type: 'string',
    name: 'type'
  }, {
    type: 'hasMany',
    name: 'routes',
    target: 'uiRoutes',
    sourceKey: 'key',
    foreignKey: 'parentKey'
  }, {
    type: 'belongsTo',
    name: 'uiSchema',
    target: 'uiSchemas',
    foreignKey: 'uiSchemaUid'
  }, {
    type: 'json',
    name: 'options',
    defaultValue: {}
  }]
});

exports.default = _default;
