"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IconPicker = require("./IconPicker");

Object.keys(_IconPicker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IconPicker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IconPicker[key];
    }
  });
});