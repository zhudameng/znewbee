"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nav = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireWildcard(require("react"));

var _constants = require("react-big-calendar/lib/utils/constants");

var _hooks = require("../../hooks");

var _context = require("./context");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Nav = (0, _react.observer)(function (props) {
  var _useDesignable = (0, _hooks.useDesignable)(),
      DesignableBar = _useDesignable.DesignableBar;

  var _useContext = (0, _react2.useContext)(_context.CalendarToolbarContext),
      onNavigate = _useContext.onNavigate;

  return /*#__PURE__*/_react2.default.createElement("div", {
    className: "ant-btn-group"
  }, /*#__PURE__*/_react2.default.createElement(_antd.Button, {
    icon: /*#__PURE__*/_react2.default.createElement(_icons.LeftOutlined, null),
    onClick: function onClick() {
      return onNavigate(_constants.navigate.PREVIOUS);
    }
  }), /*#__PURE__*/_react2.default.createElement(_antd.Button, {
    icon: /*#__PURE__*/_react2.default.createElement(_icons.RightOutlined, null),
    onClick: function onClick() {
      return onNavigate(_constants.navigate.NEXT);
    }
  }), /*#__PURE__*/_react2.default.createElement(DesignableBar, null));
});
exports.Nav = Nav;