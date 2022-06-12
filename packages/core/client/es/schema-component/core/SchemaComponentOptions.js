function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { SchemaExpressionScopeContext, SchemaOptionsContext } from '@formily/react';
import React, { useContext } from 'react';
export var SchemaComponentOptions = function SchemaComponentOptions(props) {
  var inherit = props.inherit;
  var options = useContext(SchemaOptionsContext);
  var expressionScope = useContext(SchemaExpressionScopeContext);

  var scope = _objectSpread(_objectSpread(_objectSpread({}, options === null || options === void 0 ? void 0 : options.scope), expressionScope), props.scope);

  var components = _objectSpread(_objectSpread({}, options === null || options === void 0 ? void 0 : options.components), props.components);

  return /*#__PURE__*/React.createElement(SchemaOptionsContext.Provider, {
    value: {
      scope: scope,
      components: components
    }
  }, /*#__PURE__*/React.createElement(SchemaExpressionScopeContext.Provider, {
    value: scope
  }, props.children));
};