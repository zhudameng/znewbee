"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _afterCreate = require("./after-create");

Object.keys(_afterCreate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _afterCreate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _afterCreate[key];
    }
  });
});

var _afterUpdate = require("./after-update");

Object.keys(_afterUpdate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _afterUpdate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _afterUpdate[key];
    }
  });
});

var _afterDestroy = require("./after-destroy");

Object.keys(_afterDestroy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _afterDestroy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _afterDestroy[key];
    }
  });
});