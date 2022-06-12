"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPretty = void 0;

var _builtins__ = require("@formily/antd/lib/__builtins__");

var _shared = require("@formily/shared");

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireDefault(require("react"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReadPretty = function ReadPretty() {
  return null;
};

exports.ReadPretty = ReadPretty;

ReadPretty.DatePicker = function (props) {
  if (!props.value) {
    return /*#__PURE__*/_react.default.createElement("div", null);
  }

  var prefixCls = (0, _builtins__.usePrefixCls)('description-date-picker', props);

  var getLabels = function getLabels() {
    var d = (0, _moment.default)(props.value);
    var labels = (0, _builtins__.formatMomentValue)(d.isValid() ? d : null, (0, _util.getDefaultFormat)(props), props.placeholder);
    return (0, _shared.isArr)(labels) ? labels.join('~') : labels;
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, props.className)
  }, getLabels());
};

ReadPretty.DateRangePicker = function (props) {
  var prefixCls = (0, _builtins__.usePrefixCls)('description-text', props);

  var getLabels = function getLabels() {
    var labels = (0, _builtins__.formatMomentValue)(props.value, props.format, props.placeholder);
    return (0, _shared.isArr)(labels) ? labels.join('~') : labels;
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, props.className),
    style: props.style
  }, getLabels());
};