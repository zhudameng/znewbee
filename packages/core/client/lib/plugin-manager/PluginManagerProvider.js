"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginManagerProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PluginManagerProvider = function PluginManagerProvider(props) {
  var components = props.components,
      children = props.children;
  return /*#__PURE__*/_react.default.createElement(_context.PluginManagerContext.Provider, {
    value: {
      components: components
    }
  }, children);
};

exports.PluginManagerProvider = PluginManagerProvider;