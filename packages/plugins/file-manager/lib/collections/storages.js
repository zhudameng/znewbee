"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'storages',
  title: '存储引擎',
  fields: [{
    title: '存储引擎名称',
    comment: '存储引擎名称',
    type: 'string',
    name: 'title'
  }, {
    title: '英文标识',
    // comment: '英文标识，用于代码层面配置',
    type: 'string',
    name: 'name',
    unique: true
  }, {
    comment: '类型标识，如 local/ali-oss 等',
    type: 'string',
    name: 'type'
  }, {
    comment: '配置项',
    type: 'jsonb',
    name: 'options',
    defaultValue: {}
  }, {
    comment: '文件规则',
    type: 'jsonb',
    name: 'rules',
    defaultValue: {}
  }, {
    comment: '存储相对路径模板',
    type: 'string',
    name: 'path',
    defaultValue: ''
  }, {
    comment: '访问地址前缀',
    type: 'string',
    name: 'baseUrl',
    defaultValue: ''
  }, // TODO(feature): 需要使用一个实现了可设置默认值的字段
  {
    comment: '默认引擎',
    type: 'radio',
    name: 'default',
    defaultValue: false
  }, {
    type: 'hasMany',
    name: 'attachments'
  }]
};
exports.default = _default;