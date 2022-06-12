"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slate = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _slate = require("slate");

require("./index.less");

var _RichText = require("./RichText");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Slate = function Slate() {
  return null;
};

exports.Slate = Slate;

var serialize = function serialize(nodes) {
  var _nodes$map;

  return nodes === null || nodes === void 0 ? void 0 : (_nodes$map = nodes.map) === null || _nodes$map === void 0 ? void 0 : _nodes$map.call(nodes, function (n) {
    return _slate.Node.string(n);
  }).join('');
};

var DEFAULT_VALUE = [{
  type: 'paragraph',
  children: [{
    text: ''
  }]
}];
Slate.RichText = (0, _react.connect)(_RichText.RichText, (0, _react.mapProps)(function (props, field) {
  // const fieldValue = serialize(field.value)?.trim();
  // if (!fieldValue) {
  //   field.value = undefined;
  // }
  return _objectSpread({}, props);
}), (0, _react.mapReadPretty)(function (props) {
  return /*#__PURE__*/_react2.default.createElement(_RichText.RichText, _objectSpread(_objectSpread({}, props), {}, {
    readOnly: true
  }));
}));