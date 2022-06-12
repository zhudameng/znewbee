function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useContext } from 'react';
import { SchemaInitializerContext, SchemaInitializerProvider } from '../schema-initializer';
var actionLogsItemGroup = {
  type: 'itemGroup',
  title: '{{t("Others")}}',
  children: [{
    type: 'item',
    title: '{{t("Action logs")}}',
    component: 'ActionLogBlockInitializer'
  }]
};
export var ActionLogProvider = function ActionLogProvider(props) {
  var initializes = useContext(SchemaInitializerContext);
  initializes.BlockInitializers.items.push(_objectSpread({}, actionLogsItemGroup));
  return /*#__PURE__*/React.createElement(SchemaInitializerProvider, {
    initializers: initializes
  }, props.children);
};