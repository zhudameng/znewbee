"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TreeSelect = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _ReadPretty = require("./ReadPretty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TreeSelect = (0, _react.connect)(_antd.TreeSelect, (0, _react.mapProps)({
  dataSource: 'treeData'
}, function (props, field) {
  return _objectSpread(_objectSpread({}, props), {}, {
    suffixIcon: (field === null || field === void 0 ? void 0 : field['loading']) || (field === null || field === void 0 ? void 0 : field['validating']) ? /*#__PURE__*/_react2.default.createElement(_icons.LoadingOutlined, null) : props.suffixIcon
  });
}), (0, _react.mapReadPretty)(_ReadPretty.ReadPretty));
exports.TreeSelect = TreeSelect;
var _default = TreeSelect;
exports.default = _default;