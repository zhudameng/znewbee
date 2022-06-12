"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordPicker = void 0;

var _react = require("@formily/react");

var _InputRecordPicker = require("./InputRecordPicker");

var _ReadPrettyRecordPicker = require("./ReadPrettyRecordPicker");

var RecordPicker = (0, _react.connect)(_InputRecordPicker.InputRecordPicker, // mapProps(mapSuffixProps),
(0, _react.mapReadPretty)(_ReadPrettyRecordPicker.ReadPrettyRecordPicker));
exports.RecordPicker = RecordPicker;