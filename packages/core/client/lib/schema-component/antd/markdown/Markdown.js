"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Markdown = void 0;

var _icons = require("@ant-design/icons");

var _react = require("@formily/react");

var _antd = require("antd");

var _react2 = _interopRequireDefault(require("react"));

var _input = require("../input");

var _Markdown = require("./Markdown.Void");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Markdown = (0, _react.connect)(_antd.Input.TextArea, (0, _react.mapProps)(function (props, field) {
  return _objectSpread(_objectSpread({
    autoSize: {
      maxRows: 10,
      minRows: 3
    }
  }, props), {}, {
    suffix: /*#__PURE__*/_react2.default.createElement("span", null, (field === null || field === void 0 ? void 0 : field['loading']) || (field === null || field === void 0 ? void 0 : field['validating']) ? /*#__PURE__*/_react2.default.createElement(_icons.LoadingOutlined, null) : props.suffix)
  });
}), (0, _react.mapReadPretty)(function (props) {
  var text = (0, _util.convertToText)(props.value);

  var value = /*#__PURE__*/_react2.default.createElement("div", {
    className: 'nb-markdown',
    dangerouslySetInnerHTML: {
      __html: (0, _util.markdown)(text)
    }
  });

  return /*#__PURE__*/_react2.default.createElement(_input.ReadPretty.TextArea, _objectSpread(_objectSpread({}, props), {}, {
    text: text,
    value: value
  }));
}));
exports.Markdown = Markdown;
Markdown.Void = _Markdown.MarkdownVoid;
var _default = Markdown;
exports.default = _default;