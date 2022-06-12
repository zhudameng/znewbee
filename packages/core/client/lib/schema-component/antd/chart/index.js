"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Chart = require("./Chart");

Object.keys(_Chart).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Chart[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Chart[key];
    }
  });
});