var _excluded = ["components", "scope", "schema"],
    _excluded2 = ["schema"],
    _excluded3 = ["memoized"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { RecursionField, Schema } from '@formily/react';
import React, { useMemo } from 'react';
import { SchemaComponentOptions } from './SchemaComponentOptions';

function toSchema(schema) {
  if (Schema.isSchemaInstance(schema)) {
    return schema;
  }

  if (schema.name) {
    return new Schema({
      type: 'object',
      properties: _defineProperty({}, schema.name, schema)
    });
  }

  return new Schema(schema);
}

var useMemoizedSchema = function useMemoizedSchema(schema) {
  return useMemo(function () {
    return toSchema(schema);
  }, []);
};

var RecursionSchemaComponent = function RecursionSchemaComponent(props) {
  var components = props.components,
      scope = props.scope,
      schema = props.schema,
      others = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(SchemaComponentOptions, {
    inherit: true,
    components: components,
    scope: scope
  }, /*#__PURE__*/React.createElement(RecursionField, _objectSpread(_objectSpread({}, others), {}, {
    schema: toSchema(schema)
  })));
};

var MemoizedSchemaComponent = function MemoizedSchemaComponent(props) {
  var schema = props.schema,
      others = _objectWithoutProperties(props, _excluded2);

  var s = useMemoizedSchema(schema);
  return /*#__PURE__*/React.createElement(RecursionSchemaComponent, _objectSpread(_objectSpread({}, others), {}, {
    schema: s
  }));
};

export var SchemaComponent = function SchemaComponent(props) {
  var memoized = props.memoized,
      others = _objectWithoutProperties(props, _excluded3);

  if (memoized) {
    return /*#__PURE__*/React.createElement(MemoizedSchemaComponent, _objectSpread({}, others));
  }

  return /*#__PURE__*/React.createElement(RecursionSchemaComponent, _objectSpread({}, others));
};