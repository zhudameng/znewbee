"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDateFormat = exports.getDefaultFormat = void 0;

var _builtins__ = require("@formily/antd/lib/__builtins__");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getDefaultFormat = function getDefaultFormat(props) {
  if (props.format) {
    return props.format;
  }

  if (props.dateFormat) {
    if (props['showTime']) {
      return "".concat(props.dateFormat, " ").concat(props.timeFormat || 'HH:mm:ss');
    }

    return props.dateFormat;
  }

  if (props['picker'] === 'month') {
    return 'YYYY-MM';
  } else if (props['picker'] === 'quarter') {
    return 'YYYY-\\QQ';
  } else if (props['picker'] === 'year') {
    return 'YYYY';
  } else if (props['picker'] === 'week') {
    return 'YYYY-wo';
  }

  return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
};

exports.getDefaultFormat = getDefaultFormat;

var mapDateFormat = function mapDateFormat() {
  return function (props) {
    var format = getDefaultFormat(props);
    var _onChange = props.onChange;
    return _objectSpread(_objectSpread({}, props), {}, {
      format: format,
      value: (0, _builtins__.momentable)(props.value, format === 'YYYY-wo' ? 'YYYY-w' : format),
      onChange: function onChange(value) {
        if (_onChange) {
          _onChange((0, _builtins__.formatMomentValue)(value, format));
        }
      }
    });
  };
};

exports.mapDateFormat = mapDateFormat;