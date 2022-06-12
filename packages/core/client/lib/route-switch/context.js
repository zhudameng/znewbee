"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteSwitchContext = exports.RouteContext = void 0;

var _react = require("react");

var RouteSwitchContext = /*#__PURE__*/(0, _react.createContext)({
  components: {},
  routes: []
});
exports.RouteSwitchContext = RouteSwitchContext;
var RouteContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.RouteContext = RouteContext;