"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Select = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _ReadPretty = require("./ReadPretty");

var _shared2 = require("./shared");

var _excluded = ["value", "options", "onChange", "fieldNames", "mode"],
    _excluded2 = ["objectValue"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var isEmptyObject = function isEmptyObject(val) {
  return !(0, _shared.isValid)(val) || _typeof(val) === 'object' && Object.keys(val).length === 0;
};

var ObjectSelect = function ObjectSelect(props) {
  var value = props.value,
      options = props.options,
      _onChange = props.onChange,
      fieldNames = props.fieldNames,
      mode = props.mode,
      others = _objectWithoutProperties(props, _excluded);

  var toValue = function toValue(v) {
    var _getCurrentOptions;

    if (isEmptyObject(v)) {
      return;
    }

    var values = (0, _shared.toArr)(v).filter(function (item) {
      return item;
    }).map(function (val) {
      return _typeof(val) === 'object' ? val[fieldNames.value] : val;
    });
    var current = (_getCurrentOptions = (0, _shared2.getCurrentOptions)(values, options, fieldNames)) === null || _getCurrentOptions === void 0 ? void 0 : _getCurrentOptions.map(function (val) {
      return {
        label: val[fieldNames.label],
        value: val[fieldNames.value]
      };
    });

    if (['tags', 'multiple'].includes(mode)) {
      return current;
    }

    return current.shift();
  };

  return /*#__PURE__*/_react2.default.createElement(_antd.Select, _objectSpread({
    value: toValue(value),
    allowClear: true,
    labelInValue: true,
    options: options,
    fieldNames: fieldNames,
    onChange: function onChange(changed) {
      var current = (0, _shared2.getCurrentOptions)((0, _shared.toArr)(changed).map(function (v) {
        return v.value;
      }), options, fieldNames);

      if (['tags', 'multiple'].includes(mode)) {
        _onChange(current);
      } else {
        _onChange(current.shift());
      }
    },
    mode: mode
  }, others));
};

var Select = (0, _react.connect)(function (props) {
  var objectValue = props.objectValue,
      others = _objectWithoutProperties(props, _excluded2);

  if (objectValue) {
    return /*#__PURE__*/_react2.default.createElement(ObjectSelect, _objectSpread({}, others));
  }

  return /*#__PURE__*/_react2.default.createElement(_antd.Select, _objectSpread(_objectSpread({}, others), {}, {
    value: others.value || undefined
  }));
}, (0, _react.mapProps)({
  dataSource: 'options',
  loading: true
}, function (props, field) {
  return _objectSpread(_objectSpread({}, props), {}, {
    fieldNames: _objectSpread(_objectSpread({}, _shared2.defaultFieldNames), props.fieldNames),
    suffixIcon: (field === null || field === void 0 ? void 0 : field['loading']) || (field === null || field === void 0 ? void 0 : field['validating']) ? /*#__PURE__*/_react2.default.createElement(_icons.LoadingOutlined, null) : props.suffixIcon
  });
}), (0, _react.mapReadPretty)(_ReadPretty.ReadPretty));
exports.Select = Select;
var _default = Select;
exports.default = _default;