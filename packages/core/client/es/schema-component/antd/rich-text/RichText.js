function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { connect, mapReadPretty } from '@formily/react';
import React from 'react';
import ReactQuill from 'react-quill';
import { ReadPretty as InputReadPretty } from '../input';
import './style.less';
export var RichText = connect(function (props) {
  var modules = {
    toolbar: [['bold', 'italic', 'underline', 'link'], [{
      list: 'ordered'
    }, {
      list: 'bullet'
    }], ['clean']]
  };
  var formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];
  var value = props.value,
      onChange = props.onChange;
  return /*#__PURE__*/React.createElement(ReactQuill, {
    modules: modules,
    formats: formats,
    value: typeof value === 'string' ? value : '',
    onChange: onChange
  });
}, mapReadPretty(function (props) {
  return /*#__PURE__*/React.createElement(InputReadPretty.Html, _objectSpread({}, props));
}));