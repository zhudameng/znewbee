function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { connect, useField, useFieldSchema } from '@formily/react';
import { merge } from '@formily/shared';
import React, { useEffect } from 'react';
import { useCompile, useComponent, useFormBlockContext } from '..';
import { CollectionFieldProvider } from './CollectionFieldProvider';
import { useCollectionField } from './hooks'; // TODO: 初步适配

var InternalField = function InternalField(props) {
  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useCollectionField = useCollectionField(),
      name = _useCollectionField.name,
      interfaceType = _useCollectionField.interface,
      uiSchema = _useCollectionField.uiSchema;

  var component = useComponent(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema['x-component']);
  var compile = useCompile();

  var setFieldProps = function setFieldProps(key, value) {
    field[key] = typeof field[key] === 'undefined' ? value : field[key];
  };

  var setRequired = function setRequired() {
    if (typeof fieldSchema['required'] === 'undefined') {
      field.required = !!uiSchema['required'];
    }
  };

  var ctx = useFormBlockContext();
  useEffect(function () {
    if (ctx === null || ctx === void 0 ? void 0 : ctx.field) {
      ctx.field.added = ctx.field.added || new Set();
      ctx.field.added.add(fieldSchema.name);
    }
  }); // TODO: 初步适配

  useEffect(function () {
    if (!uiSchema) {
      return;
    }

    setFieldProps('content', uiSchema['x-content']);
    setFieldProps('title', uiSchema.title);
    setFieldProps('description', uiSchema.description);
    setFieldProps('initialValue', uiSchema.default);

    if (!field.validator && uiSchema['x-validator']) {
      field.validator = uiSchema['x-validator'];
    }

    field.readPretty = uiSchema['x-read-pretty'];
    setRequired(); // @ts-ignore

    field.dataSource = uiSchema.enum;
    var originalProps = compile(uiSchema['x-component-props']) || {};
    var componentProps = merge(originalProps, field.componentProps || {});
    field.component = [component, componentProps]; // if (interfaceType === 'input') {
    //   field.componentProps.ellipsis = true;
    // } else if (interfaceType === 'textarea') {
    //   field.componentProps.ellipsis = true;
    // } else if (interfaceType === 'markdown') {
    //   field.componentProps.ellipsis = true;
    // } else if (interfaceType === 'attachment') {
    //   field.componentProps.size = 'small';
    // }
  }, [JSON.stringify(uiSchema)]);

  if (!uiSchema) {
    return null;
  }

  return /*#__PURE__*/React.createElement(component, props, props.children);
};

export var CollectionField = connect(function (props) {
  var fieldSchema = useFieldSchema();
  return /*#__PURE__*/React.createElement(CollectionFieldProvider, {
    name: fieldSchema.name
  }, /*#__PURE__*/React.createElement(InternalField, _objectSpread({}, props)));
});
export default CollectionField;