"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimePicker = void 0;

var _builtins__ = require("@formily/antd/lib/__builtins__");

var _react = require("@formily/react");

var _antd = require("antd");

var _ReadPretty = require("./ReadPretty");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapTimeFormat = function mapTimeFormat() {
  return function (props) {
    var format = props['format'] || 'HH:mm:ss';
    var _onChange = props.onChange;
    return _objectSpread(_objectSpread({}, props), {}, {
      format: format,
      value: (0, _builtins__.momentable)(props.value, format),
      onChange: function onChange(value) {
        if (_onChange) {
          _onChange((0, _builtins__.formatMomentValue)(value, format) || null);
        }
      }
    });
  };
};

var TimePicker = (0, _react.connect)(_antd.TimePicker, (0, _react.mapProps)(mapTimeFormat()), (0, _react.mapReadPretty)(_ReadPretty.ReadPretty));
exports.TimePicker = TimePicker;
TimePicker.RangePicker = (0, _react.connect)(_antd.TimePicker.RangePicker, (0, _react.mapProps)(mapTimeFormat()), (0, _react.mapReadPretty)(_ReadPretty.ReadPretty));
var _default = TimePicker;
exports.default = _default;