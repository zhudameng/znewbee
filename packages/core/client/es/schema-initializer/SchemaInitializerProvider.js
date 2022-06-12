function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isPlainObj } from '@formily/shared';
import React, { createContext, useContext } from 'react';
import { SchemaComponentOptions } from '../schema-component';
import * as globals from './buttons';
import * as initializerComponents from './components';
import * as items from './items';
import { SchemaInitializer } from './SchemaInitializer';
export var SchemaInitializerContext = /*#__PURE__*/createContext({});
export var useSchemaInitializer = function useSchemaInitializer(name) {
  var initializers = useContext(SchemaInitializerContext);

  var _render = function render(component, props) {
    return component && /*#__PURE__*/React.createElement(component, props);
  };

  if (!name) {
    return {
      exists: false,
      render: function render(props) {
        return _render(null);
      }
    };
  }

  var initializer = initializers === null || initializers === void 0 ? void 0 : initializers[name];

  if (!initializer) {
    return {
      exists: false,
      render: function render(props) {
        return _render(null);
      }
    };
  }

  if (isPlainObj(initializer)) {
    return {
      exists: true,
      render: function render(props) {
        var component = initializer.component || SchemaInitializer.Button;
        return _render(component, _objectSpread(_objectSpread({}, initializer), props));
      }
    };
  }

  return {
    exists: true,
    render: function render(props) {
      return _render(initializer, props);
    }
  };
};
export var SchemaInitializerProvider = function SchemaInitializerProvider(props) {
  var initializers = props.initializers,
      components = props.components,
      children = props.children;
  return /*#__PURE__*/React.createElement(SchemaInitializerContext.Provider, {
    value: _objectSpread(_objectSpread({}, globals), initializers)
  }, /*#__PURE__*/React.createElement(SchemaComponentOptions, {
    components: _objectSpread(_objectSpread(_objectSpread({}, items), components), initializerComponents)
  }, children));
};