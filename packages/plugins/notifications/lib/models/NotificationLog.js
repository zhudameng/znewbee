"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationLog = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

class NotificationLog extends _database().Model {}

exports.NotificationLog = NotificationLog;
