"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'uiSchemas',
  title: '字段配置',
  autoGenId: false,
  timestamps: false,
  repository: 'UiSchemaRepository',
  model: 'UiSchemaModel',
  magicAttribute: 'schema',
  fields: [{
    type: 'uid',
    name: 'x-uid',
    primaryKey: true
  }, {
    type: 'string',
    name: 'name'
  }, {
    type: 'hasMany',
    name: 'serverHooks',
    target: 'uiSchemaServerHooks',
    foreignKey: 'uid'
  }, {
    type: 'json',
    name: 'schema',
    defaultValue: {}
  }]
};
exports.default = _default;