"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adminLayout = require("./admin-layout");

Object.keys(_adminLayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _adminLayout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _adminLayout[key];
    }
  });
});

var _authLayout = require("./auth-layout");

Object.keys(_authLayout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _authLayout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _authLayout[key];
    }
  });
});

var _routeSchemaComponent = require("./route-schema-component");

Object.keys(_routeSchemaComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _routeSchemaComponent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _routeSchemaComponent[key];
    }
  });
});