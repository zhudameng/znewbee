"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPretty = void 0;

var _shared = require("@formily/shared");

var _MiniDecimal = require("rc-input-number/lib/utils/MiniDecimal");

var _numberUtil = require("rc-input-number/lib/utils/numberUtil");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReadPretty = function ReadPretty(props) {
  var step = props.step,
      value = props.value,
      addonBefore = props.addonBefore,
      addonAfter = props.addonAfter;

  if (!(0, _shared.isValid)(props.value)) {
    return /*#__PURE__*/_react.default.createElement("div", null);
  }

  var precision = Math.max((0, _numberUtil.getNumberPrecision)(String(value)), (0, _numberUtil.getNumberPrecision)(step));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'nb-read-pretty-input-number'
  }, addonBefore, (0, _MiniDecimal.toFixed)(String(value), '.', precision), addonAfter);
};

exports.ReadPretty = ReadPretty;