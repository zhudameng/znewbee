function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isArrayField } from '@formily/core';
import { observer, useField } from '@formily/react';
import { isValid } from '@formily/shared';
import { Tag } from 'antd';
import React from 'react';
import { defaultFieldNames, getCurrentOptions } from './shared';
export var ReadPretty = observer(function (props) {
  var _field$value;

  var fieldNames = _objectSpread(_objectSpread({}, defaultFieldNames), props.fieldNames);

  var field = useField();

  if (!isValid(props.value)) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  if (isArrayField(field) && (field === null || field === void 0 ? void 0 : (_field$value = field.value) === null || _field$value === void 0 ? void 0 : _field$value.length) === 0) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  var dataSource = field.dataSource || props.options || [];
  var options = getCurrentOptions(field.value, dataSource, fieldNames);
  return /*#__PURE__*/React.createElement("div", null, options.map(function (option, key) {
    return /*#__PURE__*/React.createElement(Tag, {
      key: key,
      color: option[fieldNames.color]
    }, option[fieldNames.label]);
  }));
});