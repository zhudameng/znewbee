var _excluded = ["layout", "style"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { observer, RecursionField, useFieldSchema } from '@formily/react';
import { Space } from 'antd';
import React from 'react';
import { useSchemaInitializer } from '../../../schema-initializer';
import { DndContext } from '../../common';
export var ActionBar = observer(function (props) {
  var _props$layout = props.layout,
      layout = _props$layout === void 0 ? 'tow-columns' : _props$layout,
      style = props.style,
      others = _objectWithoutProperties(props, _excluded);

  var fieldSchema = useFieldSchema();

  var _useSchemaInitializer = useSchemaInitializer(fieldSchema['x-initializer']),
      render = _useSchemaInitializer.render;

  if (layout === 'one-column') {
    return /*#__PURE__*/React.createElement("div", _objectSpread({
      style: _objectSpread({
        display: 'flex'
      }, style)
    }, others), props.children && /*#__PURE__*/React.createElement("div", {
      style: {
        marginRight: 8
      }
    }, /*#__PURE__*/React.createElement(Space, null, fieldSchema.mapProperties(function (schema, key) {
      return /*#__PURE__*/React.createElement(RecursionField, {
        key: key,
        name: key,
        schema: schema
      });
    }))), render());
  }

  return /*#__PURE__*/React.createElement("div", _objectSpread({
    style: _objectSpread({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }, style)
  }, others), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(DndContext, null, /*#__PURE__*/React.createElement(Space, null, fieldSchema.mapProperties(function (schema, key) {
    if (schema['x-align'] !== 'left') {
      return null;
    }

    return /*#__PURE__*/React.createElement(RecursionField, {
      key: key,
      name: key,
      schema: schema
    });
  })), /*#__PURE__*/React.createElement(Space, null, fieldSchema.mapProperties(function (schema, key) {
    if (schema['x-align'] === 'left') {
      return null;
    }

    return /*#__PURE__*/React.createElement(RecursionField, {
      key: key,
      name: key,
      schema: schema
    });
  })))), render());
});