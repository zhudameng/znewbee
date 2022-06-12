"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichText = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _reactQuill = _interopRequireDefault(require("react-quill"));

var _input = require("../input");

require("./style.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RichText = (0, _react.connect)(function (props) {
  var modules = {
    toolbar: [['bold', 'italic', 'underline', 'link'], [{
      list: 'ordered'
    }, {
      list: 'bullet'
    }], ['clean']]
  };
  var formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];
  var value = props.value,
      onChange = props.onChange;
  return /*#__PURE__*/_react2.default.createElement(_reactQuill.default, {
    modules: modules,
    formats: formats,
    value: typeof value === 'string' ? value : '',
    onChange: onChange
  });
}, (0, _react.mapReadPretty)(function (props) {
  return /*#__PURE__*/_react2.default.createElement(_input.ReadPretty.Html, _objectSpread({}, props));
}));
exports.RichText = RichText;