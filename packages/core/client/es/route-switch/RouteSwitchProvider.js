function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Spin } from 'antd';
import React from 'react';
import { useRequest } from '../api-client';
import { RouteSwitchContext } from './context';
export function RouteSwitchProvider(props) {
  var children = props.children,
      components = props.components,
      routes = props.routes;
  return /*#__PURE__*/React.createElement(RouteSwitchContext.Provider, {
    value: {
      routes: routes,
      components: components
    }
  }, children);
}
export function RemoteRouteSwitchProvider(props) {
  var _useRequest = useRequest({
    url: 'uiRoutes:getAccessible'
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  if (loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(RouteSwitchProvider, _objectSpread(_objectSpread({}, props), {}, {
    routes: (data === null || data === void 0 ? void 0 : data.data) || []
  }));
}