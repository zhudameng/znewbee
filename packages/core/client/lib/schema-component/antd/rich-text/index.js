"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RichText = require("./RichText");

Object.keys(_RichText).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RichText[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _RichText[key];
    }
  });
});