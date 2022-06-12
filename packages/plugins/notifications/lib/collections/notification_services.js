"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _default = {
  name: 'notification_services',
  model: _models.NotificationService,
  title: '通知服务',
  fields: [{
    title: '类型',
    type: 'string',
    name: 'type'
  }, {
    title: '服务名称',
    type: 'string',
    name: 'title'
  }, {
    title: '配置信息',
    type: 'json',
    name: 'options'
  }]
};
exports.default = _default;