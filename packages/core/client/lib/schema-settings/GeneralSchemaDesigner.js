"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneralSchemaDesigner = void 0;

var _icons = require("@ant-design/icons");

var _css = require("@emotion/css");

var _react = require("@formily/react");

var _antd = require("antd");

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _schemaComponent = require("../schema-component");

var _utils = require("../schema-initializer/utils");

var _SchemaSettings = require("./SchemaSettings");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var titleCss = (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  pointer-events: none;\n  position: absolute;\n  font-size: 12px;\n  /* background: #f18b62;\n  color: #fff; */\n  padding: 0;\n  line-height: 16px;\n  height: 16px;\n  border-bottom-right-radius: 2px;\n  border-radius: 2px;\n  top: 2px;\n  left: 2px;\n  .title-tag {\n    padding: 0 3px;\n    border-radius: 2px;\n    background: green;\n    color: #fff;\n    display: block;\n  }\n"])));

var GeneralSchemaDesigner = function GeneralSchemaDesigner(props) {
  var _ctx$renderSchemaInit, _rowCtx$cols;

  var disableInitializer = props.disableInitializer,
      title = props.title,
      template = props.template,
      _props$draggable = props.draggable,
      draggable = _props$draggable === void 0 ? true : _props$draggable;

  var _useDesignable = (0, _schemaComponent.useDesignable)(),
      dn = _useDesignable.dn,
      designable = _useDesignable.designable;

  var field = (0, _react.useField)();

  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var fieldSchema = (0, _react.useFieldSchema)();
  var compile = (0, _schemaComponent.useCompile)();
  var schemaSettingsProps = {
    dn: dn,
    field: field,
    fieldSchema: fieldSchema
  };

  if (!designable) {
    return null;
  }

  var rowCtx = (0, _schemaComponent.useGridRowContext)();
  var ctx = (0, _schemaComponent.useGridContext)();
  var templateName = ['FormItem', 'ReadPrettyFormItem'].includes(template === null || template === void 0 ? void 0 : template.componentName) ? "".concat(template === null || template === void 0 ? void 0 : template.name, " ").concat(t('(Fields only)')) : template === null || template === void 0 ? void 0 : template.name;
  return /*#__PURE__*/_react2.default.createElement("div", {
    className: 'general-schema-designer'
  }, title && /*#__PURE__*/_react2.default.createElement("div", {
    className: (0, _classnames.default)('general-schema-designer-title', titleCss)
  }, /*#__PURE__*/_react2.default.createElement(_antd.Space, {
    size: 2
  }, /*#__PURE__*/_react2.default.createElement("span", {
    className: 'title-tag'
  }, compile(title)), template && /*#__PURE__*/_react2.default.createElement("span", {
    className: 'title-tag'
  }, t('Reference template'), ": ", templateName || t('Untitled')))), /*#__PURE__*/_react2.default.createElement("div", {
    className: 'general-schema-designer-icons'
  }, /*#__PURE__*/_react2.default.createElement(_antd.Space, {
    size: 2,
    align: 'center'
  }, draggable && /*#__PURE__*/_react2.default.createElement(_schemaComponent.DragHandler, null, /*#__PURE__*/_react2.default.createElement(_icons.DragOutlined, null)), !disableInitializer && (ctx === null || ctx === void 0 ? void 0 : (_ctx$renderSchemaInit = ctx.renderSchemaInitializer) === null || _ctx$renderSchemaInit === void 0 ? void 0 : _ctx$renderSchemaInit.call(ctx, {
    insertPosition: 'afterEnd',
    wrap: (rowCtx === null || rowCtx === void 0 ? void 0 : (_rowCtx$cols = rowCtx.cols) === null || _rowCtx$cols === void 0 ? void 0 : _rowCtx$cols.length) > 1 ? undefined : _utils.gridRowColWrap,
    component: /*#__PURE__*/_react2.default.createElement(_icons.PlusOutlined, {
      style: {
        cursor: 'pointer',
        fontSize: 14
      }
    })
  })), /*#__PURE__*/_react2.default.createElement(_SchemaSettings.SchemaSettings, _objectSpread({
    title: /*#__PURE__*/_react2.default.createElement(_icons.MenuOutlined, {
      style: {
        cursor: 'pointer',
        fontSize: 12
      }
    })
  }, schemaSettingsProps), props.children))));
};

exports.GeneralSchemaDesigner = GeneralSchemaDesigner;