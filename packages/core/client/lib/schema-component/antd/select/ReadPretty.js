"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPretty = void 0;

var _core = require("@formily/core");

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _shared2 = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ReadPretty = (0, _react.observer)(function (props) {
  var _field$value;

  var fieldNames = _objectSpread(_objectSpread({}, _shared2.defaultFieldNames), props.fieldNames);

  var field = (0, _react.useField)();

  if (!(0, _shared.isValid)(props.value)) {
    return /*#__PURE__*/_react2.default.createElement("div", null);
  }

  if ((0, _core.isArrayField)(field) && (field === null || field === void 0 ? void 0 : (_field$value = field.value) === null || _field$value === void 0 ? void 0 : _field$value.length) === 0) {
    return /*#__PURE__*/_react2.default.createElement("div", null);
  }

  var dataSource = field.dataSource || props.options || [];
  var options = (0, _shared2.getCurrentOptions)(field.value, dataSource, fieldNames);
  return /*#__PURE__*/_react2.default.createElement("div", null, options.map(function (option, key) {
    return /*#__PURE__*/_react2.default.createElement(_antd.Tag, {
      key: key,
      color: option[fieldNames.color]
    }, option[fieldNames.label]);
  }));
});
exports.ReadPretty = ReadPretty;