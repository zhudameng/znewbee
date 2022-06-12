"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteRouteSwitchProvider = RemoteRouteSwitchProvider;
exports.RouteSwitchProvider = RouteSwitchProvider;

var _antd = require("antd");

var _react = _interopRequireDefault(require("react"));

var _apiClient = require("../api-client");

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function RouteSwitchProvider(props) {
  var children = props.children,
      components = props.components,
      routes = props.routes;
  return /*#__PURE__*/_react.default.createElement(_context.RouteSwitchContext.Provider, {
    value: {
      routes: routes,
      components: components
    }
  }, children);
}

function RemoteRouteSwitchProvider(props) {
  var _useRequest = (0, _apiClient.useRequest)({
    url: 'uiRoutes:getAccessible'
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  if (loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  return /*#__PURE__*/_react.default.createElement(RouteSwitchProvider, _objectSpread(_objectSpread({}, props), {}, {
    routes: (data === null || data === void 0 ? void 0 : data.data) || []
  }));
}