"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadPretty = void 0;

var _builtins__ = require("@formily/antd/lib/__builtins__");

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _ = require("../..");

var _EllipsisWithTooltip = require("./EllipsisWithTooltip");

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReadPretty = function ReadPretty() {
  return null;
};

exports.ReadPretty = ReadPretty;

ReadPretty.Input = function (props) {
  var prefixCls = (0, _builtins__.usePrefixCls)('description-input', props);
  var compile = (0, _.useCompile)();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, /*#__PURE__*/_react.default.createElement(_EllipsisWithTooltip.EllipsisWithTooltip, {
    ellipsis: props.ellipsis
  }, compile(props.value)), props.suffix, props.addonAfter);
};

ReadPretty.TextArea = function (props) {
  var _props$value;

  var prefixCls = (0, _builtins__.usePrefixCls)('description-textarea', props);
  var compile = (0, _.useCompile)();
  var value = compile((_props$value = props.value) !== null && _props$value !== void 0 ? _props$value : '');
  var _props$autop = props.autop,
      autop = _props$autop === void 0 ? true : _props$autop,
      ellipsis = props.ellipsis,
      text = props.text;

  var html = /*#__PURE__*/_react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: (0, _shared.HTMLEncode)(value).split('\n').join('<br/>')
    }
  });

  console.log('value', value);

  var content = /*#__PURE__*/_react.default.createElement(_EllipsisWithTooltip.EllipsisWithTooltip, {
    ellipsis: ellipsis,
    popoverContent: autop ? html : value
  }, ellipsis ? text || value : html);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, content, props.suffix, props.addonAfter);
};

function convertToText(html) {
  var temp = document.createElement('div');
  temp.innerHTML = html;
  var text = temp.innerText;
  temp = null;
  return text.replace(/[\n\r]/g, '');
}

ReadPretty.Html = function (props) {
  var _props$value2;

  var prefixCls = (0, _builtins__.usePrefixCls)('description-textarea', props);
  var compile = (0, _.useCompile)();
  var value = compile((_props$value2 = props.value) !== null && _props$value2 !== void 0 ? _props$value2 : '');
  var _props$autop2 = props.autop,
      autop = _props$autop2 === void 0 ? true : _props$autop2,
      ellipsis = props.ellipsis;

  var html = /*#__PURE__*/_react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: value
    }
  });

  var text = convertToText(value);

  var content = /*#__PURE__*/_react.default.createElement(_EllipsisWithTooltip.EllipsisWithTooltip, {
    ellipsis: ellipsis,
    popoverContent: autop ? html : value
  }, ellipsis ? text : html);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, content, props.suffix, props.addonAfter);
};

ReadPretty.URL = function (props) {
  var prefixCls = (0, _builtins__.usePrefixCls)('description-url', props);

  var content = props.value && /*#__PURE__*/_react.default.createElement("a", {
    target: '_blank',
    href: props.value
  }, props.value);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, props.className),
    style: props.style
  }, props.addonBefore, props.prefix, content, props.suffix, props.addonAfter);
};