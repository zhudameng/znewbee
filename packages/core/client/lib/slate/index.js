"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Slate = require("./Slate");

Object.keys(_Slate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Slate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Slate[key];
    }
  });
});