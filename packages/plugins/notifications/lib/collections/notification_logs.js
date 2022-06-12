"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _default = {
  name: 'notification_logs',
  model: _models.NotificationLog,
  title: '通知日志',
  fields: [{
    title: '接收人',
    type: 'json',
    name: 'receiver'
  }, {
    title: '状态',
    type: 'string',
    name: 'state'
  }, {
    title: '详情',
    type: 'json',
    name: 'response'
  }]
};
exports.default = _default;