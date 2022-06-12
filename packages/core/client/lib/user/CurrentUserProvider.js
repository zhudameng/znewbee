"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentUserContext = exports.CurrentUserProvider = exports.CurrentUserContext = void 0;

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _apiClient = require("../api-client");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var CurrentUserContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.CurrentUserContext = CurrentUserContext;

var useCurrentUserContext = function useCurrentUserContext() {
  return (0, _react.useContext)(CurrentUserContext);
};

exports.useCurrentUserContext = useCurrentUserContext;

var CurrentUserProvider = function CurrentUserProvider(props) {
  var _result$data, _result$data$data;

  var location = (0, _reactRouterDom.useLocation)();
  var result = (0, _apiClient.useRequest)({
    url: 'users:check'
  });

  if (result.loading) {
    return /*#__PURE__*/_react.default.createElement(_antd.Spin, null);
  }

  var pathname = location.pathname,
      search = location.search;
  var redirect = "?redirect=".concat(pathname).concat(search);

  if (!(result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$data = _result$data.data) === null || _result$data$data === void 0 ? void 0 : _result$data$data.id)) {
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Redirect, {
      to: "/signin".concat(redirect)
    });
  }

  return /*#__PURE__*/_react.default.createElement(CurrentUserContext.Provider, {
    value: result
  }, props.children);
};

exports.CurrentUserProvider = CurrentUserProvider;