function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useField } from '@formily/react';
import { Spin } from 'antd';
import React, { createContext, useContext, useEffect } from 'react';
import { BlockProvider, useBlockRequestContext } from './BlockProvider';
export var CalendarBlockContext = /*#__PURE__*/createContext({});

var InternalCalendarBlockProvider = function InternalCalendarBlockProvider(props) {
  var fieldNames = props.fieldNames;
  var field = useField();

  var _useBlockRequestConte = useBlockRequestContext(),
      resource = _useBlockRequestConte.resource,
      service = _useBlockRequestConte.service;

  if (service.loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return /*#__PURE__*/React.createElement(CalendarBlockContext.Provider, {
    value: {
      field: field,
      service: service,
      resource: resource,
      fieldNames: fieldNames
    }
  }, props.children);
};

export var CalendarBlockProvider = function CalendarBlockProvider(props) {
  return /*#__PURE__*/React.createElement(BlockProvider, _objectSpread(_objectSpread({}, props), {}, {
    params: _objectSpread(_objectSpread({}, props.params), {}, {
      paginate: false
    })
  }), /*#__PURE__*/React.createElement(InternalCalendarBlockProvider, _objectSpread({}, props)));
};
export var useCalendarBlockContext = function useCalendarBlockContext() {
  return useContext(CalendarBlockContext);
};
export var useCalendarBlockProps = function useCalendarBlockProps() {
  var _ctx$service3;

  var ctx = useCalendarBlockContext();
  var field = useField();
  useEffect(function () {
    var _ctx$service;

    if (!(ctx === null || ctx === void 0 ? void 0 : (_ctx$service = ctx.service) === null || _ctx$service === void 0 ? void 0 : _ctx$service.loading)) {
      var _ctx$service2, _ctx$service2$data;

      field.componentProps.dataSource = ctx === null || ctx === void 0 ? void 0 : (_ctx$service2 = ctx.service) === null || _ctx$service2 === void 0 ? void 0 : (_ctx$service2$data = _ctx$service2.data) === null || _ctx$service2$data === void 0 ? void 0 : _ctx$service2$data.data;
    }
  }, [ctx === null || ctx === void 0 ? void 0 : (_ctx$service3 = ctx.service) === null || _ctx$service3 === void 0 ? void 0 : _ctx$service3.loading]);
  return {
    fieldNames: ctx.fieldNames
  };
};