"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SettingsForm = require("./SettingsForm");

Object.keys(_SettingsForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SettingsForm[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SettingsForm[key];
    }
  });
});