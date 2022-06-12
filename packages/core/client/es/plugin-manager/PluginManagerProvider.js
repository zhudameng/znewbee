import React from 'react';
import { PluginManagerContext } from './context';
export var PluginManagerProvider = function PluginManagerProvider(props) {
  var components = props.components,
      children = props.children;
  return /*#__PURE__*/React.createElement(PluginManagerContext.Provider, {
    value: {
      components: components
    }
  }, children);
};