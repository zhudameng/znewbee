"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FileStorageShortcut = require("./FileStorageShortcut");

Object.keys(_FileStorageShortcut).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FileStorageShortcut[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FileStorageShortcut[key];
    }
  });
});