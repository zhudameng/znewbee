function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { connect, mapProps, mapReadPretty } from '@formily/react';
import React from 'react';
import { Node } from 'slate';
import './index.less';
import { RichText } from './RichText';
export var Slate = function Slate() {
  return null;
};

var serialize = function serialize(nodes) {
  var _nodes$map;

  return nodes === null || nodes === void 0 ? void 0 : (_nodes$map = nodes.map) === null || _nodes$map === void 0 ? void 0 : _nodes$map.call(nodes, function (n) {
    return Node.string(n);
  }).join('');
};

var DEFAULT_VALUE = [{
  type: 'paragraph',
  children: [{
    text: ''
  }]
}];
Slate.RichText = connect(RichText, mapProps(function (props, field) {
  // const fieldValue = serialize(field.value)?.trim();
  // if (!fieldValue) {
  //   field.value = undefined;
  // }
  return _objectSpread({}, props);
}), mapReadPretty(function (props) {
  return /*#__PURE__*/React.createElement(RichText, _objectSpread(_objectSpread({}, props), {}, {
    readOnly: true
  }));
}));