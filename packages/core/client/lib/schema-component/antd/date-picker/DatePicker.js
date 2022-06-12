"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DatePicker = void 0;

var _antd = require("antd");

var _react = require("@formily/react");

var _ReadPretty = require("./ReadPretty");

var _util = require("./util");

var DatePicker = (0, _react.connect)(_antd.DatePicker, (0, _react.mapProps)((0, _util.mapDateFormat)()), (0, _react.mapReadPretty)(_ReadPretty.ReadPretty.DatePicker));
exports.DatePicker = DatePicker;
DatePicker.RangePicker = (0, _react.connect)(_antd.DatePicker.RangePicker, (0, _react.mapProps)((0, _util.mapDateFormat)()), (0, _react.mapReadPretty)(_ReadPretty.ReadPretty.DateRangePicker));
var _default = DatePicker;
exports.default = _default;