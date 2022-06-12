"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  mockDatabase: true
};
Object.defineProperty(exports, "mockDatabase", {
  enumerable: true,
  get: function get() {
    return _database().mockDatabase;
  }
});

function _database() {
  const data = require("@znewbee/database");

  _database = function _database() {
    return data;
  };

  return data;
}

var _mockServer = require("./mockServer");

Object.keys(_mockServer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mockServer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mockServer[key];
    }
  });
});
