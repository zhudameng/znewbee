"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAPIClient = useAPIClient;

var _react = require("react");

var _context = require("../context");

function useAPIClient() {
  return (0, _react.useContext)(_context.APIClientContext);
}