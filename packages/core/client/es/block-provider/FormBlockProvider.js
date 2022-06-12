function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createForm } from '@formily/core';
import { useField } from '@formily/react';
import { Spin } from 'antd';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { BlockProvider, useBlockRequestContext } from './BlockProvider';
export var FormBlockContext = /*#__PURE__*/createContext({});

var InternalFormBlockProvider = function InternalFormBlockProvider(props) {
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

  if (service.loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(FormBlockContext.Provider, {
    value: {
      action: action,
      form: form,
      field: field,
      service: service,
      resource: resource
    }
  }, props.children);
};

export var FormBlockProvider = function FormBlockProvider(props) {
  return /*#__PURE__*/React.createElement(BlockProvider, _objectSpread({}, props), /*#__PURE__*/React.createElement(InternalFormBlockProvider, _objectSpread({}, props)));
};
export var useFormBlockContext = function useFormBlockContext() {
  return useContext(FormBlockContext);
};
export var useFormBlockProps = function useFormBlockProps() {
  var ctx = useFormBlockContext();
  useEffect(function () {
    var _ctx$service, _ctx$service$data;

    ctx.form.setInitialValues((_ctx$service = ctx.service) === null || _ctx$service === void 0 ? void 0 : (_ctx$service$data = _ctx$service.data) === null || _ctx$service$data === void 0 ? void 0 : _ctx$service$data.data);
  }, []);
  return {
    form: ctx.form
  };
};