"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionModal = void 0;

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _ = require(".");

var _templateObject, _templateObject2;

var _excluded = ["footerNodeName"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ActionModal = (0, _react.observer)(function (props) {
  var _props$footerNodeName = props.footerNodeName,
      footerNodeName = _props$footerNodeName === void 0 ? 'Action.Modal.Footer' : _props$footerNodeName,
      others = _objectWithoutProperties(props, _excluded);

  var _useActionContext = (0, _.useActionContext)(),
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
  }, /*#__PURE__*/_react2.default.createElement(_antd.Modal, _objectSpread(_objectSpread({
    width: '80%',
    title: field.title
  }, others), {}, {
    destroyOnClose: true,
    visible: visible,
    onCancel: function onCancel() {
      return setVisible(false, true);
    },
    className: (0, _classnames.default)(others.className, (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                &.nb-action-popup {\n                  .ant-modal-body {\n                    background: #f0f2f5;\n                  }\n                }\n              "])))),
    footer: footerSchema ? /*#__PURE__*/_react2.default.createElement("div", {
      className: (0, _css.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n                    display: flex;\n                    justify-content: flex-end;\n                    width: 100%;\n                    .ant-btn {\n                      margin-right: 8px;\n                    }\n                  "])))
    }, /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
      basePath: field.address,
      schema: schema,
      onlyRenderProperties: true,
      filterProperties: function filterProperties(s) {
        return s['x-component'] === footerNodeName;
      }
    })) : false
  }), /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true,
    filterProperties: function filterProperties(s) {
      return s['x-component'] !== footerNodeName;
    }
  }))), document.body));
});
exports.ActionModal = ActionModal;
ActionModal.Footer = (0, _react.observer)(function () {
  var field = (0, _react.useField)();
  var schema = (0, _react.useFieldSchema)();
  return /*#__PURE__*/_react2.default.createElement(_react.RecursionField, {
    basePath: field.address,
    schema: schema,
    onlyRenderProperties: true
  });
});
var _default = ActionModal;
exports.default = _default;