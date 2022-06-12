"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ExecutionResourceProvider = require("./ExecutionResourceProvider");

Object.keys(_ExecutionResourceProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ExecutionResourceProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ExecutionResourceProvider[key];
    }
  });
});

var _WorkflowLink = require("./WorkflowLink");

Object.keys(_WorkflowLink).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WorkflowLink[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WorkflowLink[key];
    }
  });
});

var _WorkflowPage = require("./WorkflowPage");

Object.keys(_WorkflowPage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WorkflowPage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WorkflowPage[key];
    }
  });
});

var _WorkflowRouteProvider = require("./WorkflowRouteProvider");

Object.keys(_WorkflowRouteProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WorkflowRouteProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WorkflowRouteProvider[key];
    }
  });
});

var _WorkflowShortcut = require("./WorkflowShortcut");

Object.keys(_WorkflowShortcut).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WorkflowShortcut[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WorkflowShortcut[key];
    }
  });
});