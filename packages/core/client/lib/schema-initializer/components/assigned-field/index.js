"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AssignedField = require("./AssignedField");

Object.keys(_AssignedField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AssignedField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AssignedField[key];
    }
  });
});