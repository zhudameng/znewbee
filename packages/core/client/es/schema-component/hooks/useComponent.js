import { SchemaOptionsContext } from '@formily/react';
import { get } from 'lodash';
import { useContext } from 'react';
export var useComponent = function useComponent(component, defaults) {
  if (!component) {
    return defaults;
  }

  if (typeof component !== 'string') {
    return component;
  }

  var _useContext = useContext(SchemaOptionsContext),
      components = _useContext.components;

  return get(components, component) || defaults;
};