"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIClientContext = void 0;

var _react = require("react");

var _APIClient = require("./APIClient");

var APIClientContext = /*#__PURE__*/(0, _react.createContext)(new _APIClient.APIClient());
exports.APIClientContext = APIClientContext;