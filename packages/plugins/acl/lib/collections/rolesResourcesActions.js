"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'rolesResourcesActions',
  model: 'RoleResourceActionModel',
  fields: [{
    type: 'belongsTo',
    name: 'resource',
    foreignKey: 'rolesResourceId',
    target: 'rolesResources'
  }, {
    type: 'string',
    name: 'name'
  }, {
    type: 'array',
    name: 'fields',
    defaultValue: []
  }, {
    type: 'belongsTo',
    name: 'scope',
    target: 'rolesResourcesScopes'
  }]
};
exports.default = _default;