"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Space = void 0;

var _antd = require("@formily/antd");

var _antd2 = require("antd");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Space = function Space(props) {
  var _props$size;

  var split = props.split;

  if (split === '|') {
    split = /*#__PURE__*/_react.default.createElement(_antd2.Divider, {
      type: "vertical",
      style: {
        margin: '0 2px'
      }
    });
  }

  var layout = (0, _antd.useFormLayout)();
  return /*#__PURE__*/_react.default.createElement(_antd2.Space, _objectSpread(_objectSpread({
    size: (_props$size = props.size) !== null && _props$size !== void 0 ? _props$size : layout === null || layout === void 0 ? void 0 : layout.spaceGap
  }, props), {}, {
    split: split
  }));
};

exports.Space = Space;
var _default = Space;
exports.default = _default;