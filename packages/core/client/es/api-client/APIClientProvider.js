import React from 'react';
import { APIClientContext } from './context';
export var APIClientProvider = function APIClientProvider(props) {
  var apiClient = props.apiClient,
      children = props.children;
  return /*#__PURE__*/React.createElement(APIClientContext.Provider, {
    value: apiClient
  }, children);
};