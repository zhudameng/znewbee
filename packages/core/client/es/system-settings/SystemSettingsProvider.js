import { Spin } from 'antd';
import React, { createContext, useContext } from 'react';
import { useRequest } from '..';
export var SystemSettingsContext = /*#__PURE__*/createContext(null);
export var useSystemSettings = function useSystemSettings() {
  return useContext(SystemSettingsContext);
};
export var SystemSettingsProvider = function SystemSettingsProvider(props) {
  var result = useRequest({
    url: 'systemSettings:get/1?appends=logo'
  });

  if (result.loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(SystemSettingsContext.Provider, {
    value: result
  }, props.children);
};