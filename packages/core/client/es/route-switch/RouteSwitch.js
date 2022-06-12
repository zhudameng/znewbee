function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RouteContext } from './context';
import { useRouteComponent } from './hooks';
export function RouteSwitch(props) {
  var _props$routes = props.routes,
      routes = _props$routes === void 0 ? [] : _props$routes;

  if (!routes.length) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Switch, null, routes.map(function (route, index) {
    if (route.type == 'redirect') {
      return /*#__PURE__*/React.createElement(Redirect, {
        key: index,
        to: route.to,
        push: route.push,
        from: route.from,
        path: route.path,
        exact: route.exact,
        strict: route.strict
      });
    }

    if (!route.path && Array.isArray(route.routes)) {
      route.path = route.routes.map(function (r) {
        return r.path;
      });
    }

    return /*#__PURE__*/React.createElement(Route, {
      key: index,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      sensitive: route.sensitive,
      render: function render(props) {
        return /*#__PURE__*/React.createElement(RouteContext.Provider, {
          value: route
        }, /*#__PURE__*/React.createElement(ComponentRenderer, _objectSpread(_objectSpread({}, props), {}, {
          route: route
        })));
      }
    });
  }));
}

function ComponentRenderer(props) {
  var _props$route;

  var Component = useRouteComponent(props === null || props === void 0 ? void 0 : (_props$route = props.route) === null || _props$route === void 0 ? void 0 : _props$route.component);
  return /*#__PURE__*/React.createElement(Component, _objectSpread({}, props), /*#__PURE__*/React.createElement(RouteSwitch, {
    routes: props.route.routes
  }));
}