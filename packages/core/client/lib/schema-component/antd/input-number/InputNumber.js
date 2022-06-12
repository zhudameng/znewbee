"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InputNumber = void 0;

var _react = require("@formily/react");

var _antd = require("antd");

var _ReadPretty = require("./ReadPretty");

var InputNumber = (0, _react.connect)(_antd.InputNumber, (0, _react.mapReadPretty)(_ReadPretty.ReadPretty));
exports.InputNumber = InputNumber;
var _default = InputNumber;
exports.default = _default;