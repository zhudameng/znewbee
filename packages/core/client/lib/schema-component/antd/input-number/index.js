"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InputNumber = require("./InputNumber");

Object.keys(_InputNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InputNumber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InputNumber[key];
    }
  });
});