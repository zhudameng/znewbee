"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCompile = void 0;

var _react = require("@formily/react");

var _react2 = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useCompile = function useCompile() {
  var options = (0, _react2.useContext)(_react.SchemaOptionsContext);
  var scope = (0, _react2.useContext)(_react.SchemaExpressionScopeContext);
  return function (source, ext) {
    if (!source) {
      return source;
    }

    return _react.Schema.compile(source, _objectSpread(_objectSpread(_objectSpread({}, options.scope), scope), ext));
  };
};

exports.useCompile = useCompile;