"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _afterCreateForReverseField = require("./afterCreateForReverseField");

Object.keys(_afterCreateForReverseField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _afterCreateForReverseField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _afterCreateForReverseField[key];
    }
  });
});

var _beforeCreateForChildrenCollection = require("./beforeCreateForChildrenCollection");

Object.keys(_beforeCreateForChildrenCollection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _beforeCreateForChildrenCollection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _beforeCreateForChildrenCollection[key];
    }
  });
});

var _beforeCreateForReverseField = require("./beforeCreateForReverseField");

Object.keys(_beforeCreateForReverseField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _beforeCreateForReverseField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _beforeCreateForReverseField[key];
    }
  });
});

var _beforeInitOptions = require("./beforeInitOptions");

Object.keys(_beforeInitOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _beforeInitOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _beforeInitOptions[key];
    }
  });
});