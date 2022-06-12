"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compose = require("./compose");

Object.keys(_compose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _compose[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _compose[key];
    }
  });
});