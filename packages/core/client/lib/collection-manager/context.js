"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionManagerContext = exports.CollectionFieldContext = exports.CollectionContext = void 0;

var _react = require("react");

var CollectionManagerContext = /*#__PURE__*/(0, _react.createContext)({
  collections: [],
  interfaces: {}
});
exports.CollectionManagerContext = CollectionManagerContext;
var CollectionContext = /*#__PURE__*/(0, _react.createContext)({});
exports.CollectionContext = CollectionContext;
var CollectionFieldContext = /*#__PURE__*/(0, _react.createContext)({});
exports.CollectionFieldContext = CollectionFieldContext;