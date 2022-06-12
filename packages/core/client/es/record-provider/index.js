function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createContext, useContext } from 'react';
import { useCurrentUserContext } from '../user';
export var RecordContext = /*#__PURE__*/createContext({});
export var RecordIndexContext = /*#__PURE__*/createContext(null);
export var RecordProvider = function RecordProvider(props) {
  var record = props.record,
      children = props.children;

  var __parent = useContext(RecordContext);

  return /*#__PURE__*/React.createElement(RecordContext.Provider, {
    value: _objectSpread(_objectSpread({}, record), {}, {
      __parent: __parent
    })
  }, children);
};
export var RecordIndexProvider = function RecordIndexProvider(props) {
  var index = props.index,
      children = props.children;
  return /*#__PURE__*/React.createElement(RecordIndexContext.Provider, {
    value: index
  }, children);
};
export function useRecord() {
  return useContext(RecordContext);
}
export function useRecordIndex() {
  return useContext(RecordIndexContext);
}
export var useRecordIsOwn = function useRecordIsOwn() {
  var _ctx$data, _ctx$data$data;

  var record = useRecord();
  var ctx = useCurrentUserContext();

  if (!(record === null || record === void 0 ? void 0 : record.createdById)) {
    return false;
  }

  return (record === null || record === void 0 ? void 0 : record.createdById) === (ctx === null || ctx === void 0 ? void 0 : (_ctx$data = ctx.data) === null || _ctx$data === void 0 ? void 0 : (_ctx$data$data = _ctx$data.data) === null || _ctx$data$data === void 0 ? void 0 : _ctx$data$data.id);
};