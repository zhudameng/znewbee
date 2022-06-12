var _templateObject;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { DragOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useField, useFieldSchema } from '@formily/react';
import { Space } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DragHandler, useCompile, useDesignable, useGridContext, useGridRowContext } from '../schema-component';
import { gridRowColWrap } from '../schema-initializer/utils';
import { SchemaSettings } from './SchemaSettings';
var titleCss = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  pointer-events: none;\n  position: absolute;\n  font-size: 12px;\n  /* background: #f18b62;\n  color: #fff; */\n  padding: 0;\n  line-height: 16px;\n  height: 16px;\n  border-bottom-right-radius: 2px;\n  border-radius: 2px;\n  top: 2px;\n  left: 2px;\n  .title-tag {\n    padding: 0 3px;\n    border-radius: 2px;\n    background: green;\n    color: #fff;\n    display: block;\n  }\n"])));
export var GeneralSchemaDesigner = function GeneralSchemaDesigner(props) {
  var _ctx$renderSchemaInit, _rowCtx$cols;

  var disableInitializer = props.disableInitializer,
      title = props.title,
      template = props.template,
      _props$draggable = props.draggable,
      draggable = _props$draggable === void 0 ? true : _props$draggable;

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn,
      designable = _useDesignable.designable;

  var field = useField();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var fieldSchema = useFieldSchema();
  var compile = useCompile();
  var schemaSettingsProps = {
    dn: dn,
    field: field,
    fieldSchema: fieldSchema
  };

  if (!designable) {
    return null;
  }

  var rowCtx = useGridRowContext();
  var ctx = useGridContext();
  var templateName = ['FormItem', 'ReadPrettyFormItem'].includes(template === null || template === void 0 ? void 0 : template.componentName) ? "".concat(template === null || template === void 0 ? void 0 : template.name, " ").concat(t('(Fields only)')) : template === null || template === void 0 ? void 0 : template.name;
  return /*#__PURE__*/React.createElement("div", {
    className: 'general-schema-designer'
  }, title && /*#__PURE__*/React.createElement("div", {
    className: classNames('general-schema-designer-title', titleCss)
  }, /*#__PURE__*/React.createElement(Space, {
    size: 2
  }, /*#__PURE__*/React.createElement("span", {
    className: 'title-tag'
  }, compile(title)), template && /*#__PURE__*/React.createElement("span", {
    className: 'title-tag'
  }, t('Reference template'), ": ", templateName || t('Untitled')))), /*#__PURE__*/React.createElement("div", {
    className: 'general-schema-designer-icons'
  }, /*#__PURE__*/React.createElement(Space, {
    size: 2,
    align: 'center'
  }, draggable && /*#__PURE__*/React.createElement(DragHandler, null, /*#__PURE__*/React.createElement(DragOutlined, null)), !disableInitializer && (ctx === null || ctx === void 0 ? void 0 : (_ctx$renderSchemaInit = ctx.renderSchemaInitializer) === null || _ctx$renderSchemaInit === void 0 ? void 0 : _ctx$renderSchemaInit.call(ctx, {
    insertPosition: 'afterEnd',
    wrap: (rowCtx === null || rowCtx === void 0 ? void 0 : (_rowCtx$cols = rowCtx.cols) === null || _rowCtx$cols === void 0 ? void 0 : _rowCtx$cols.length) > 1 ? undefined : gridRowColWrap,
    component: /*#__PURE__*/React.createElement(PlusOutlined, {
      style: {
        cursor: 'pointer',
        fontSize: 14
      }
    })
  })), /*#__PURE__*/React.createElement(SchemaSettings, _objectSpread({
    title: /*#__PURE__*/React.createElement(MenuOutlined, {
      style: {
        cursor: 'pointer',
        fontSize: 12
      }
    })
  }, schemaSettingsProps), props.children))));
};