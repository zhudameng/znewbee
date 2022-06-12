"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SystemSettingsProvider = require("./SystemSettingsProvider");

Object.keys(_SystemSettingsProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SystemSettingsProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SystemSettingsProvider[key];
    }
  });
});

var _SystemSettingsShortcut = require("./SystemSettingsShortcut");

Object.keys(_SystemSettingsShortcut).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SystemSettingsShortcut[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SystemSettingsShortcut[key];
    }
  });
});