"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRoute = useRoute;
exports.useRouteComponent = useRouteComponent;
exports.useRoutes = useRoutes;

var _get = _interopRequireDefault(require("lodash/get"));

var _react = require("react");

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useRouteComponent(name) {
  if (!name) {
    return function () {
      return null;
    };
  }

  if (typeof name !== 'string') {
    return name;
  }

  var _useContext = (0, _react.useContext)(_context.RouteSwitchContext),
      components = _useContext.components;

  return (0, _get.default)(components, name) || function () {
    return null;
  };
}

function useRoute() {
  return (0, _react.useContext)(_context.RouteContext);
}

function useRoutes() {
  var _useContext2 = (0, _react.useContext)(_context.RouteSwitchContext),
      routes = _useContext2.routes;

  return routes || [];
}