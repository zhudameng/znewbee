"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Markdown = require("./Markdown");

Object.keys(_Markdown).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Markdown[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Markdown[key];
    }
  });
});