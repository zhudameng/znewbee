"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useAPIClient = require("./useAPIClient");

Object.keys(_useAPIClient).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useAPIClient[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useAPIClient[key];
    }
  });
});

var _useRequest = require("./useRequest");

Object.keys(_useRequest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useRequest[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useRequest[key];
    }
  });
});

var _useResource = require("./useResource");

Object.keys(_useResource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useResource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useResource[key];
    }
  });
});