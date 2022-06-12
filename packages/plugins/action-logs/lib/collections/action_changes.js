"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'action_changes',
  title: '变动值',
  createdBy: false,
  updatedBy: false,
  createdAt: false,
  updatedAt: false,
  fields: [{
    type: 'belongsTo',
    name: 'log',
    target: 'action_logs',
    foreignKey: 'actionLogId'
  }, {
    type: 'json',
    name: 'field'
  }, {
    type: 'json',
    name: 'before'
  }, {
    type: 'json',
    name: 'after'
  }]
};
exports.default = _default;