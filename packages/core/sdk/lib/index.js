"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _APIClient = require("./APIClient");

Object.keys(_APIClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _APIClient[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _APIClient[key];
    }
  });
});