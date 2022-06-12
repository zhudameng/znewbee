"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Upload = require("./Upload");

Object.keys(_Upload).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Upload[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Upload[key];
    }
  });
});