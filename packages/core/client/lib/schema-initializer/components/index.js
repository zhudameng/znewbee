"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assignedField = require("./assigned-field");

Object.keys(_assignedField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _assignedField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _assignedField[key];
    }
  });
});