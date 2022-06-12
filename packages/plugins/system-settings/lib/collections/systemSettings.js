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
  name: 'systemSettings',
  fields: [{
    type: 'string',
    name: 'title'
  }, {
    type: 'boolean',
    name: 'showLogoOnly'
  }, {
    type: 'boolean',
    name: 'allowSignUp',
    defaultValue: true
  }, {
    type: 'belongsTo',
    name: 'logo',
    target: 'attachments'
  }, {
    type: 'string',
    name: 'appLang'
  }]
});

exports.default = _default;
