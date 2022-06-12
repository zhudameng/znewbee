function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createForm } from '@formily/core';
import { useField } from '@formily/react';
import { Spin } from 'antd';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { RecordProvider } from '../record-provider';
import { BlockProvider, useBlockRequestContext } from './BlockProvider';
export var DetailsBlockContext = /*#__PURE__*/createContext({});

var InternalDetailsBlockProvider = function InternalDetailsBlockProvider(props) {
  var _service$data, _service$data$data;

  var action = props.action,
      readPretty = props.readPretty;
  var field = useField();
  var form = useMemo(function () {
    return createForm({
      readPretty: readPretty
    });
  }, []);

  var _useBlockRequestConte = useBlockRequestContext(),
      resource = _useBlockRequestConte.resource,
      service = _useBlockRequestConte.service;

  if (service.loading && !field.loaded) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  field.loaded = true;
  return /*#__PURE__*/React.createElement(DetailsBlockContext.Provider, {
    value: {
      action: action,
      form: form,
      field: field,
      service: service,
      resource: resource
    }
  }, /*#__PURE__*/React.createElement(RecordProvider, {
    record: (service === null || service === void 0 ? void 0 : (_service$data = service.data) === null || _service$data === void 0 ? void 0 : (_service$data$data = _service$data.data) === null || _service$data$data === void 0 ? void 0 : _service$data$data[0]) || {}
  }, props.children));
};

export var DetailsBlockProvider = function DetailsBlockProvider(props) {
  return /*#__PURE__*/React.createElement(BlockProvider, _objectSpread({}, props), /*#__PURE__*/React.createElement(InternalDetailsBlockProvider, _objectSpread({}, props)));
};
export var useDetailsBlockContext = function useDetailsBlockContext() {
  return useContext(DetailsBlockContext);
};
export var useDetailsBlockProps = function useDetailsBlockProps() {
  var ctx = useDetailsBlockContext();
  useEffect(function () {
    if (!ctx.service.loading) {
      var _ctx$service, _ctx$service$data, _ctx$service$data$dat;

      ctx.form.setValues(((_ctx$service = ctx.service) === null || _ctx$service === void 0 ? void 0 : (_ctx$service$data = _ctx$service.data) === null || _ctx$service$data === void 0 ? void 0 : (_ctx$service$data$dat = _ctx$service$data.data) === null || _ctx$service$data$dat === void 0 ? void 0 : _ctx$service$data$dat[0]) || {});
    }
  }, [ctx.service.loading]);
  return {
    form: ctx.form
  };
};