var _excluded = ["children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { createForm } from '@formily/core';
import { FormProvider as FormilyFormProvider, SchemaExpressionScopeContext, SchemaOptionsContext } from '@formily/react';
import React, { useContext, useMemo } from 'react';
import { SchemaComponentOptions } from './SchemaComponentOptions';
export var FormProvider = function FormProvider(props) {
  var children = props.children,
      others = _objectWithoutProperties(props, _excluded);

  var options = useContext(SchemaOptionsContext);
  var expressionScope = useContext(SchemaExpressionScopeContext);

  var scope = _objectSpread(_objectSpread({}, options === null || options === void 0 ? void 0 : options.scope), expressionScope);

  var components = _objectSpread({}, options === null || options === void 0 ? void 0 : options.components);

  var form = useMemo(function () {
    return props.form || createForm();
  }, []);
  return /*#__PURE__*/React.createElement(FormilyFormProvider, _objectSpread(_objectSpread({}, others), {}, {
    form: form
  }), /*#__PURE__*/React.createElement(SchemaComponentOptions, {
    components: components,
    scope: scope
  }, children));
};