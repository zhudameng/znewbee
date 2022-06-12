"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'collections',
  title: '数据表配置',
  sortable: 'sort',
  autoGenId: false,
  model: 'CollectionModel',
  repository: 'CollectionRepository',
  timestamps: false,
  filterTargetKey: 'name',
  fields: [{
    type: 'uid',
    name: 'key',
    primaryKey: true
  }, {
    type: 'uid',
    name: 'name',
    unique: true,
    prefix: 't_'
  }, {
    type: 'string',
    name: 'title',
    required: true
  }, {
    type: 'boolean',
    name: 'inherit',
    defaultValue: false
  }, {
    type: 'json',
    name: 'options',
    defaultValue: {}
  }, {
    type: 'hasMany',
    name: 'fields',
    target: 'fields',
    sourceKey: 'name',
    targetKey: 'name',
    foreignKey: 'collectionName',
    sortBy: 'sort'
  }]
};
exports.default = _default;