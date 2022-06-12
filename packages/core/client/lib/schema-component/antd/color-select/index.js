"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ColorSelect = require("./ColorSelect");

Object.keys(_ColorSelect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ColorSelect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ColorSelect[key];
    }
  });
});