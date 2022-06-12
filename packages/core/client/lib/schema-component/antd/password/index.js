"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Password = require("./Password");

Object.keys(_Password).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Password[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Password[key];
    }
  });
});