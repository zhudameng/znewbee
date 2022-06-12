"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Checkbox = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _antd = require("antd");

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Checkbox = (0, _react.connect)(_antd.Checkbox, (0, _react.mapProps)({
  value: 'checked',
  onInput: 'onChange'
}, function (props, field) {
  // console.log({ props, field });
  return _objectSpread({}, props);
}), (0, _react.mapReadPretty)(function (props) {
  if (!(0, _shared.isValid)(props.value)) {
    return /*#__PURE__*/_react2.default.createElement("div", null);
  }

  return props.value ? /*#__PURE__*/_react2.default.createElement(_icons.CheckOutlined, {
    style: {
      color: '#52c41a'
    }
  }) : null;
}));
exports.Checkbox = Checkbox;
Checkbox.__ANT_CHECKBOX = true;
Checkbox.Group = (0, _react.connect)(_antd.Checkbox.Group, (0, _react.mapProps)({
  dataSource: 'options'
}), (0, _react.mapReadPretty)(function (props) {
  if (!(0, _shared.isValid)(props.value)) {
    return /*#__PURE__*/_react2.default.createElement("div", null);
  }

  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options;
  var field = (0, _react.useField)();
  var dataSource = field.dataSource || [];
  var value = (0, _uniq.default)(field.value ? field.value : []);
  return /*#__PURE__*/_react2.default.createElement("div", null, dataSource.filter(function (option) {
    return value.includes(option.value);
  }).map(function (option, key) {
    return /*#__PURE__*/_react2.default.createElement(_antd.Tag, {
      key: key,
      color: option.color
    }, option.label);
  }));
}));
var _default = Checkbox;
exports.default = _default;