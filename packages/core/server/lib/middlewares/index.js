"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table2resource = require("./table2resource");

Object.keys(_table2resource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _table2resource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _table2resource[key];
    }
  });
});

var _dataWrapping = require("./data-wrapping");

Object.keys(_dataWrapping).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dataWrapping[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dataWrapping[key];
    }
  });
});