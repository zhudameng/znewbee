"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ACLProvider = require("./ACLProvider");

Object.keys(_ACLProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ACLProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ACLProvider[key];
    }
  });
});

var _ACLShortcut = require("./ACLShortcut");

Object.keys(_ACLShortcut).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ACLShortcut[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ACLShortcut[key];
    }
  });
});