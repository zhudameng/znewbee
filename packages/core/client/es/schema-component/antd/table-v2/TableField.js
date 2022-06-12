function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { observer, useField, useFieldSchema, useForm } from '@formily/react';
import React, { useEffect } from 'react';
import { useCollection } from '../../../collection-manager';
import { useCompile } from '../../hooks';
import { ActionBar } from '../action';
export var TableField = observer(function (props) {
  var fieldSchema = useFieldSchema();

  var _useCollection = useCollection(),
      getField = _useCollection.getField;

  var field = useField();
  var collectionField = getField(fieldSchema.name);
  var compile = useCompile();
  useEffect(function () {
    if (!field.title) {
      var _collectionField$uiSc;

      field.title = compile(collectionField === null || collectionField === void 0 ? void 0 : (_collectionField$uiSc = collectionField.uiSchema) === null || _collectionField$uiSc === void 0 ? void 0 : _collectionField$uiSc.title);
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", null, props.children);
});
TableField.ActionBar = observer(function (props) {
  var form = useForm();

  if (form.readPretty) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8,
      marginTop: -32
    }
  }, /*#__PURE__*/React.createElement(ActionBar, _objectSpread({}, props)));
});