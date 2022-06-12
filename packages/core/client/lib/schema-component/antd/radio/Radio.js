"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Radio = void 0;

var _react = require("@formily/react");

var _shared = require("@formily/shared");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = (0, _react.connect)(_antd.Radio, (0, _react.mapProps)({
  value: 'checked',
  onInput: 'onChange'
}));
exports.Radio = Radio;
Radio.__ANT_RADIO = true;
Radio.Group = (0, _react.connect)(_antd.Radio.Group, (0, _react.mapProps)({
  dataSource: 'options'
}), (0, _react.mapReadPretty)(function (props) {
  if (!(0, _shared.isValid)(props.value)) {
    return /*#__PURE__*/_react2.default.createElement("div", null);
  }

  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      value = props.value;
  var field = (0, _react.useField)();
  var dataSource = field.dataSource || [];
  return /*#__PURE__*/_react2.default.createElement("div", null, dataSource.filter(function (option) {
    return option.value === value;
  }).map(function (option, key) {
    return /*#__PURE__*/_react2.default.createElement(_antd.Tag, {
      key: key,
      color: option.color
    }, option.label);
  }));
}));
var _default = Radio;
exports.default = _default;