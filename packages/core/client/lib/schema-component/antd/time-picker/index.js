"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TimePicker = require("./TimePicker");

Object.keys(_TimePicker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TimePicker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TimePicker[key];
    }
  });
});