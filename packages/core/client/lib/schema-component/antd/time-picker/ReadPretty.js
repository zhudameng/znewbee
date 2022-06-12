"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPretty = void 0;

var _builtins__ = require("@formily/antd/lib/__builtins__");

var _shared = require("@formily/shared");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReadPretty = function ReadPretty(props) {
  var placeholder = props.placeholder;
  var prefixCls = (0, _builtins__.usePrefixCls)('description-text', props);

  var getLabels = function getLabels() {
    var labels = (0, _builtins__.formatMomentValue)(props.value, props.format, placeholder);
    return (0, _shared.isArr)(labels) ? labels.join('~') : labels;
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, props.className),
    style: props.style
  }, getLabels());
};

exports.ReadPretty = ReadPretty;