import { Spin } from 'antd';
import React, { createContext, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useRequest } from '../api-client';
export var CurrentUserContext = /*#__PURE__*/createContext(null);
export var useCurrentUserContext = function useCurrentUserContext() {
  return useContext(CurrentUserContext);
};
export var CurrentUserProvider = function CurrentUserProvider(props) {
  var _result$data, _result$data$data;

  var location = useLocation();
  var result = useRequest({
    url: 'users:check'
  });

  if (result.loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  var pathname = location.pathname,
      search = location.search;
  var redirect = "?redirect=".concat(pathname).concat(search);

  if (!(result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$data = _result$data.data) === null || _result$data$data === void 0 ? void 0 : _result$data$data.id)) {
    return /*#__PURE__*/React.createElement(Redirect, {
      to: "/signin".concat(redirect)
    });
  }

  return /*#__PURE__*/React.createElement(CurrentUserContext.Provider, {
    value: result
  }, props.children);
};