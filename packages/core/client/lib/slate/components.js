"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = exports.Portal = exports.Menu = exports.Instruction = exports.Icon = exports.EditorValue = exports.Button = void 0;

var _css = require("@emotion/css");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

var _excluded = ["className", "active", "reversed"],
    _excluded2 = ["className", "value"],
    _excluded3 = ["className"],
    _excluded4 = ["className"],
    _excluded5 = ["className"],
    _excluded6 = ["className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Button = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      active = _ref.active,
      reversed = _ref.reversed,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement("span", _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    className: (0, _css.cx)(className, (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          cursor: pointer;\n          color: ", ";\n        "])), reversed ? active ? 'white' : '#aaa' : active ? 'black' : '#ccc'))
  }));
});

exports.Button = Button;

var EditorValue = /*#__PURE__*/_react.default.forwardRef(function (_ref2, ref) {
  var className = _ref2.className,
      value = _ref2.value,
      props = _objectWithoutProperties(_ref2, _excluded2);

  var textLines = value.document.nodes.map(function (node) {
    return node.text;
  }).toArray().join('\n');
  return /*#__PURE__*/_react.default.createElement("div", _objectSpread(_objectSpread({
    ref: ref
  }, props), {}, {
    className: (0, _css.cx)(className, (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n            margin: 30px -20px 0;\n          "]))))
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            font-size: 14px;\n            padding: 5px 20px;\n            color: #404040;\n            border-top: 2px solid #eeeeee;\n            background: green;\n          "])))
  }, "Slate's value as text"), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _css.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n            color: #ffffff;\n            font: 12px monospace;\n            white-space: pre-wrap;\n            padding: 10px 20px;\n            div {\n              margin: 0 0 0.5em;\n            }\n          "])))
  }, textLines));
});

exports.EditorValue = EditorValue;

var Icon = /*#__PURE__*/_react.default.forwardRef(function (_ref3, ref) {
  var className = _ref3.className,
      props = _objectWithoutProperties(_ref3, _excluded3);

  return /*#__PURE__*/_react.default.createElement("span", _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    className: (0, _css.cx)('material-icons', className, (0, _css.css)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n          font-size: 18px;\n          vertical-align: text-bottom;\n        "]))))
  }));
});

exports.Icon = Icon;

var Instruction = /*#__PURE__*/_react.default.forwardRef(function (_ref4, ref) {
  var className = _ref4.className,
      props = _objectWithoutProperties(_ref4, _excluded4);

  return /*#__PURE__*/_react.default.createElement("div", _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    className: (0, _css.cx)(className, (0, _css.css)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n          white-space: pre-wrap;\n          margin: 0 -20px 10px;\n          padding: 10px 20px;\n          font-size: 14px;\n          background: #f8f8e8;\n        "]))))
  }));
});

exports.Instruction = Instruction;

var Menu = /*#__PURE__*/_react.default.forwardRef(function (_ref5, ref) {
  var className = _ref5.className,
      props = _objectWithoutProperties(_ref5, _excluded5);

  return /*#__PURE__*/_react.default.createElement("div", _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    className: (0, _css.cx)(className, (0, _css.css)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n          & > * {\n            display: inline-block;\n          }\n          & > * + * {\n            margin-left: 15px;\n          }\n        "]))))
  }));
});

exports.Menu = Menu;

var Portal = function Portal(_ref6) {
  var children = _ref6.children;
  return (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' ? /*#__PURE__*/_reactDom.default.createPortal(children, document.body) : null;
};

exports.Portal = Portal;

var Toolbar = /*#__PURE__*/_react.default.forwardRef(function (_ref7, ref) {
  var className = _ref7.className,
      props = _objectWithoutProperties(_ref7, _excluded6);

  return /*#__PURE__*/_react.default.createElement(Menu, _objectSpread(_objectSpread({}, props), {}, {
    ref: ref,
    className: (0, _css.cx)(className, (0, _css.css)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n          position: relative;\n          padding: 5px 11px;\n          background-color: green;\n        "]))))
  }));
});

exports.Toolbar = Toolbar;