"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'rolesResources',
  model: 'RoleResourceModel',
  indexes: [{
    unique: true,
    fields: ['roleName', 'name']
  }],
  fields: [{
    type: 'belongsTo',
    name: 'role'
  }, {
    type: 'string',
    name: 'name'
  }, {
    type: 'boolean',
    name: 'usingActionsConfig'
  }, {
    type: 'hasMany',
    name: 'actions',
    target: 'rolesResourcesActions'
  }]
};
exports.default = _default;