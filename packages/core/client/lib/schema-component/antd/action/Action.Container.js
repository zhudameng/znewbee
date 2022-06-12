"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionContainer = void 0;

var _react = require("@formily/react");

var _react2 = _interopRequireDefault(require("react"));

var _ = require(".");

var _Action = require("./Action.Drawer");

var _Action2 = require("./Action.Modal");

var _Action3 = require("./Action.Page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ActionContainer = (0, _react.observer)(function (props) {
  var _useActionContext = (0, _.useActionContext)(),
      openMode = _useActionContext.openMode;

  if (openMode === 'drawer') {
    return /*#__PURE__*/_react2.default.createElement(_Action.ActionDrawer, _objectSpread({
      footerNodeName: 'Action.Container.Footer'
    }, props));
  }

  if (openMode === 'modal') {
    return /*#__PURE__*/_react2.default.createElement(_Action2.ActionModal, _objectSpread({
      footerNodeName: 'Action.Container.Footer'
    }, props));
  }

  return /*#__PURE__*/_react2.default.createElement(_Action3.ActionPage, _objectSpread({
    footerNodeName: 'Action.Container.Footer'
  }, props));
});
exports.ActionContainer = ActionContainer;
ActionContainer.Footer = (0, _react.observer)(function () {
  var field = (0, _react.useField)();
  var schema = (0, _react.useFieldSchema)();
  return /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true
  });
});
var _default = ActionContainer;
exports.default = _default;