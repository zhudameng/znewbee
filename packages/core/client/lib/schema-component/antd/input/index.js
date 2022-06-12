"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Input = require("./Input");

Object.keys(_Input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Input[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Input[key];
    }
  });
});

var _ReadPretty = require("./ReadPretty");

Object.keys(_ReadPretty).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ReadPretty[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ReadPretty[key];
    }
  });
});