"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _useCollection = require("./useCollection");

Object.keys(_useCollection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCollection[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useCollection[key];
    }
  });
});

var _useCollectionField = require("./useCollectionField");

Object.keys(_useCollectionField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCollectionField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useCollectionField[key];
    }
  });
});

var _useCollectionManager = require("./useCollectionManager");

Object.keys(_useCollectionManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCollectionManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useCollectionManager[key];
    }
  });
});

var _useCollectionDataSource = require("./useCollectionDataSource");

Object.keys(_useCollectionDataSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCollectionDataSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useCollectionDataSource[key];
    }
  });
});