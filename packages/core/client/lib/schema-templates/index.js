"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BlockTemplateDetails = require("./BlockTemplateDetails");

Object.keys(_BlockTemplateDetails).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BlockTemplateDetails[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BlockTemplateDetails[key];
    }
  });
});

var _BlockTemplatePage = require("./BlockTemplatePage");

Object.keys(_BlockTemplatePage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BlockTemplatePage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BlockTemplatePage[key];
    }
  });
});

var _SchemaTemplateManagerProvider = require("./SchemaTemplateManagerProvider");

Object.keys(_SchemaTemplateManagerProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SchemaTemplateManagerProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SchemaTemplateManagerProvider[key];
    }
  });
});

var _SchemaTemplateShortcut = require("./SchemaTemplateShortcut");

Object.keys(_SchemaTemplateShortcut).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SchemaTemplateShortcut[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SchemaTemplateShortcut[key];
    }
  });
});