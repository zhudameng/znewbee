"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerHookModel = void 0;

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

class ServerHookModel extends _database().Model {}

exports.ServerHookModel = ServerHookModel;
