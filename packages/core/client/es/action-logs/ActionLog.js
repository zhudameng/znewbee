function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useCollection } from '..';
import { SchemaComponent } from '../schema-component';
import { ActionLogDesigner } from './ActionLog.Designer';
import { createSchema } from './utils';
export var ActionLog = function ActionLog() {
  var schema = createSchema();
  return /*#__PURE__*/React.createElement(SchemaComponent, {
    schema: schema,
    name: schema.name
  });
};
ActionLog.Designer = ActionLogDesigner;
ActionLog.Field = observer(function (props) {
  var _value$uiSchema;

  var value = props.value;
  return /*#__PURE__*/React.createElement("div", null, (value === null || value === void 0 ? void 0 : (_value$uiSchema = value.uiSchema) === null || _value$uiSchema === void 0 ? void 0 : _value$uiSchema.title) || (value === null || value === void 0 ? void 0 : value.name));
});
ActionLog.FieldValue = observer(function (props) {
  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useCollection = useCollection(),
      getField = _useCollection.getField;

  var collectionField = getField(fieldSchema.name);

  if (!collectionField.uiSchema) {
    if (!field.value) {
      return /*#__PURE__*/React.createElement("div", null);
    }

    if (typeof field.value === 'boolean') {
      return /*#__PURE__*/React.createElement("div", null, field.value ? 'true' : 'false');
    }

    if (typeof field.value === 'string' || typeof field.value === 'number') {
      return /*#__PURE__*/React.createElement("div", null, field.value);
    }

    return /*#__PURE__*/React.createElement("pre", null, JSON.stringify(field.value, null, 2));
  }

  return /*#__PURE__*/React.createElement(RecursionField, {
    name: "actionLogFieldValue",
    schema: {
      type: 'void',
      properties: _defineProperty({}, collectionField.name, _objectSpread(_objectSpread({}, collectionField.uiSchema), {}, {
        default: field.value,
        'x-decorator': null,
        'x-read-pretty': true
      }))
    }
  });
});