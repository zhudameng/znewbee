"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIClientProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var APIClientProvider = function APIClientProvider(props) {
  var apiClient = props.apiClient,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement(_context.APIClientContext.Provider, {
    value: apiClient
  }, children);
};

exports.APIClientProvider = APIClientProvider;