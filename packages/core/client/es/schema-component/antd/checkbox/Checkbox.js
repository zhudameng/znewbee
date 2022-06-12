function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { CheckOutlined } from '@ant-design/icons';
import { connect, mapProps, mapReadPretty, useField } from '@formily/react';
import { isValid } from '@formily/shared';
import { Checkbox as AntdCheckbox, Tag } from 'antd';
import uniq from 'lodash/uniq';
import React from 'react';
export var Checkbox = connect(AntdCheckbox, mapProps({
  value: 'checked',
  onInput: 'onChange'
}, function (props, field) {
  // console.log({ props, field });
  return _objectSpread({}, props);
}), mapReadPretty(function (props) {
  if (!isValid(props.value)) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  return props.value ? /*#__PURE__*/React.createElement(CheckOutlined, {
    style: {
      color: '#52c41a'
    }
  }) : null;
}));
Checkbox.__ANT_CHECKBOX = true;
Checkbox.Group = connect(AntdCheckbox.Group, mapProps({
  dataSource: 'options'
}), mapReadPretty(function (props) {
  if (!isValid(props.value)) {
    return /*#__PURE__*/React.createElement("div", null);
  }

  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options;
  var field = useField();
  var dataSource = field.dataSource || [];
  var value = uniq(field.value ? field.value : []);
  return /*#__PURE__*/React.createElement("div", null, dataSource.filter(function (option) {
    return value.includes(option.value);
  }).map(function (option, key) {
    return /*#__PURE__*/React.createElement(Tag, {
      key: key,
      color: option.color
    }, option.label);
  }));
}));
export default Checkbox;