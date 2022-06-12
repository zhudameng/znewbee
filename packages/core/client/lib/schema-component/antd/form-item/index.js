"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _FormItem = require("./FormItem");

Object.keys(_FormItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FormItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FormItem[key];
    }
  });
});