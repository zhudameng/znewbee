"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collectionRepository = require("./collection-repository");

Object.keys(_collectionRepository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _collectionRepository[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collectionRepository[key];
    }
  });
});