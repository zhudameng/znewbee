"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GeneralSchemaDesigner = require("./GeneralSchemaDesigner");

Object.keys(_GeneralSchemaDesigner).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _GeneralSchemaDesigner[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _GeneralSchemaDesigner[key];
    }
  });
});

var _SchemaSettings = require("./SchemaSettings");

Object.keys(_SchemaSettings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SchemaSettings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SchemaSettings[key];
    }
  });
});