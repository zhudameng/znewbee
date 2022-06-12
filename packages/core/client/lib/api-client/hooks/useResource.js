"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResource = useResource;

var _react = require("react");

var _context = require("../context");

function useResource(name, of) {
  var apiClient = (0, _react.useContext)(_context.APIClientContext);
  return apiClient.resource(name, of);
}