function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { LoadingOutlined } from '@ant-design/icons';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { Input as AntdInput } from 'antd';
import React from 'react';
import { ReadPretty } from './ReadPretty';
export var Input = connect(AntdInput, mapProps(function (props, field) {
  return _objectSpread(_objectSpread({}, props), {}, {
    suffix: /*#__PURE__*/React.createElement("span", null, (field === null || field === void 0 ? void 0 : field['loading']) || (field === null || field === void 0 ? void 0 : field['validating']) ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : props.suffix)
  });
}), mapReadPretty(ReadPretty.Input));
Input.TextArea = connect(AntdInput.TextArea, mapProps(function (props, field) {
  return _objectSpread({
    autoSize: {
      maxRows: 10,
      minRows: 3
    }
  }, props);
}), mapReadPretty(ReadPretty.TextArea));
Input.URL = connect(AntdInput, mapReadPretty(ReadPretty.URL));
export default Input;