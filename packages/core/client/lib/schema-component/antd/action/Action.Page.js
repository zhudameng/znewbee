"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionPage = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _react2 = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _ = require(".");

var _templateObject;

var _excluded = ["footerNodeName"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useScope = function useScope(key) {
  var scope = (0, _react2.useContext)(_react.SchemaExpressionScopeContext);
  return scope[key];
};

var ActionPage = (0, _react.observer)(function (props) {
  var _props$footerNodeName = props.footerNodeName,
      footerNodeName = _props$footerNodeName === void 0 ? 'Action.Page.Footer' : _props$footerNodeName,
      others = _objectWithoutProperties(props, _excluded);

  var _useActionContext = (0, _.useActionContext)(),
      containerRefKey = _useActionContext.containerRefKey,
      visible = _useActionContext.visible,
      setVisible = _useActionContext.setVisible;

  var containerRef = useScope(containerRefKey);
  var schema = (0, _react.useFieldSchema)();
  var field = (0, _react.useField)();
  var footerSchema = schema.reduceProperties(function (buf, s) {
    if (s['x-component'] === footerNodeName) {
      return s;
    }

    return buf;
  });
  return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) && visible && /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react2.default.createElement("div", null, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true,
    filterProperties: function filterProperties(s) {
      return s['x-component'] !== footerNodeName;
    }
  }), footerSchema && /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                  display: flex;\n                  /* justify-content: flex-end; */\n                  /* flex-direction: row-reverse; */\n                  width: 100%;\n                  .ant-btn {\n                    margin-right: 8px;\n                  }\n                "])))
  }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true,
    filterProperties: function filterProperties(s) {
      return s['x-component'] === footerNodeName;
    }
  }))), containerRef === null || containerRef === void 0 ? void 0 : containerRef.current));
});
exports.ActionPage = ActionPage;
ActionPage.Footer = (0, _react.observer)(function () {
  var field = (0, _react.useField)();
  var schema = (0, _react.useFieldSchema)();
  return /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true
  });
});
var _default = ActionPage;
exports.default = _default;