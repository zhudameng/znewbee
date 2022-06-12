"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionDrawer = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactI18next = require("react-i18next");

var _hooks = require("./hooks");

var _templateObject, _templateObject2;

var _excluded = ["footerNodeName"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ActionDrawer = (0, _react.observer)(function (props) {
  var _props$footerNodeName = props.footerNodeName,
      footerNodeName = _props$footerNodeName === void 0 ? 'Action.Drawer.Footer' : _props$footerNodeName,
      others = _objectWithoutProperties(props, _excluded);

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var _useActionContext = (0, _hooks.useActionContext)(),
      visible = _useActionContext.visible,
      setVisible = _useActionContext.setVisible;

  var schema = (0, _react.useFieldSchema)();
  var field = (0, _react.useField)();
  var footerSchema = schema.reduceProperties(function (buf, s) {
    if (s['x-component'] === footerNodeName) {
      return s;
    }

    return buf;
  });
  return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react2.default.createElement("div", {
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, /*#__PURE__*/_react2.default.createElement(_antd.Drawer, _objectSpread(_objectSpread({
    width: '70%',
    title: field.title
  }, others), {}, {
    destroyOnClose: true,
    visible: visible,
    onClose: function onClose() {
      return setVisible(false, true);
    },
    className: (0, _classnames.default)(others.className, (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                &.nb-action-popup {\n                  .ant-drawer-content {\n                    background: #f0f2f5;\n                  }\n                }\n                &.nb-record-picker-selector {\n                  .nb-block-item {\n                    margin-bottom: 24px;\n                    .general-schema-designer {\n                      top: -8px;\n                      bottom: -8px;\n                      left: -8px;\n                      right: -8px;\n                    }\n                  }\n                }\n              "])))),
    footer: footerSchema && /*#__PURE__*/_react2.default.createElement("div", {
      className: (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n                    display: flex;\n                    justify-content: flex-end;\n                    width: 100%;\n                    .ant-btn {\n                      margin-right: 8px;\n                    }\n                  "])))
    }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
      basePath: field.address,
      schema: schema,
      onlyRenderProperties: true,
      filterProperties: function filterProperties(s) {
        return s['x-component'] === footerNodeName;
      }
    }))
  }), /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true,
    filterProperties: function filterProperties(s) {
      return s['x-component'] !== footerNodeName;
    }
  }))), document.body));
});
exports.ActionDrawer = ActionDrawer;
ActionDrawer.Footer = (0, _react.observer)(function () {
  var field = (0, _react.useField)();
  var schema = (0, _react.useFieldSchema)();
  return /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true
  });
});
var _default = ActionDrawer;
exports.default = _default;