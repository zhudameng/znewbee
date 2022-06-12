"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'uiSchemaServerHooks',
  model: 'ServerHookModel',
  // autoGenId: false,
  timestamps: false,
  fields: [{
    type: 'belongsTo',
    name: 'uiSchema',
    target: 'uiSchemas',
    foreignKey: 'uid',
    onDelete: 'CASCADE'
  }, {
    type: 'string',
    name: 'type'
  }, {
    type: 'string',
    name: 'collection'
  }, {
    type: 'string',
    name: 'field'
  }, {
    type: 'string',
    name: 'method'
  }, {
    type: 'json',
    name: 'params'
  }]
};
exports.default = _default;