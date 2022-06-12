"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ColorSelect = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _useCompile = require("../../hooks/useCompile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var colors = {
  red: '{{t("Red")}}',
  magenta: '{{t("Magenta")}}',
  volcano: '{{t("Volcano")}}',
  orange: '{{t("Orange")}}',
  gold: '{{t("Gold")}}',
  lime: '{{t("Lime")}}',
  green: '{{t("Green")}}',
  cyan: '{{t("Cyan")}}',
  blue: '{{t("Blue")}}',
  geekblue: '{{t("Geek blue")}}',
  purple: '{{t("Purple")}}',
  default: '{{t("Default")}}'
};
var ColorSelect = (0, _react.connect)(function (props) {
  var compile = (0, _useCompile.useCompile)();
  return /*#__PURE__*/_react2.default.createElement(_antd.Select, _objectSpread({}, props), Object.keys(colors).map(function (color) {
    return /*#__PURE__*/_react2.default.createElement(_antd.Select.Option, {
      value: color
    }, /*#__PURE__*/_react2.default.createElement(_antd.Tag, {
      color: color
    }, compile(colors[color] || colors.default)));
  }));
}, (0, _react.mapProps)(function (props, field) {
  return _objectSpread(_objectSpread({}, props), {}, {
    suffix: /*#__PURE__*/_react2.default.createElement("span", null, (field === null || field === void 0 ? void 0 : field['loading']) || (field === null || field === void 0 ? void 0 : field['validating']) ? /*#__PURE__*/_react2.default.createElement(_icons.LoadingOutlined, null) : props.suffix)
  });
}), (0, _react.mapReadPretty)(function (props) {
  var compile = (0, _useCompile.useCompile)();
  var value = props.value;

  if (!colors[value]) {
    return null;
  }

  return /*#__PURE__*/_react2.default.createElement(_antd.Tag, {
    color: value
  }, compile(colors[value] || colors.default));
}));
exports.ColorSelect = ColorSelect;
var _default = ColorSelect;
exports.default = _default;