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
  name: 'applications',
  model: 'ApplicationModel',
  autoGenId: false,
  title: '{{t("Applications")}}',
  sortable: 'sort',
  filterTargetKey: 'name',
  fields: [{
    type: 'uid',
    name: 'name',
    primaryKey: true,
    prefix: 'a',
    interface: 'input',
    uiSchema: {
      type: 'string',
      title: '{{t("Application name")}}',
      'x-component': 'Input',
      'x-read-pretty': true
    }
  }, {
    type: 'string',
    name: 'status',
    interface: 'radioGroup',
    defaultValue: 'pending',
    uiSchema: {
      type: 'string',
      title: '{{t("Application status")}}',
      'x-component': 'Radio.Group',
      enum: [{
        label: '创建中',
        value: 'pending'
      }, {
        label: '运行中',
        value: 'running'
      }]
    }
  }, {
    type: 'json',
    name: 'options'
  }]
});

exports.default = _default;
