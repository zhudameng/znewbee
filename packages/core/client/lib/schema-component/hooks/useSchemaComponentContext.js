"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSchemaComponentContext = useSchemaComponentContext;

var _react = require("react");

var _context = require("../context");

function useSchemaComponentContext() {
  return (0, _react.useContext)(_context.SchemaComponentContext);
}