function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createForm } from '@formily/core';
import { Spin } from 'antd';
import React, { useMemo } from 'react';
import { useRequest } from '../../api-client';
import { useSchemaComponentContext } from '../hooks';
import { FormProvider } from './FormProvider';
import { SchemaComponent } from './SchemaComponent';

var defaultTransform = function defaultTransform(s) {
  return s;
};

var RequestSchemaComponent = function RequestSchemaComponent(props) {
  var noForm = props.noForm,
      onlyRenderProperties = props.onlyRenderProperties,
      hidden = props.hidden,
      scope = props.scope,
      uid = props.uid,
      components = props.components,
      _onSuccess = props.onSuccess,
      _props$schemaTransfor = props.schemaTransform,
      schemaTransform = _props$schemaTransfor === void 0 ? defaultTransform : _props$schemaTransfor;

  var _useSchemaComponentCo = useSchemaComponentContext(),
      reset = _useSchemaComponentCo.reset;

  var conf = {
    url: "/uiSchemas:".concat(onlyRenderProperties ? 'getProperties' : 'getJsonSchema', "/").concat(uid)
  };
  var form = useMemo(function () {
    return createForm();
  }, [uid]);

  var _useRequest = useRequest(conf, {
    refreshDeps: [uid],
    onSuccess: function onSuccess(data) {
      _onSuccess && _onSuccess(data);
      reset && reset();
    }
  }),
      data = _useRequest.data,
      loading = _useRequest.loading;

  if (loading) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  if (hidden) {
    return /*#__PURE__*/React.createElement(Spin, null);
  }

  return noForm ? /*#__PURE__*/React.createElement(SchemaComponent, {
    memoized: true,
    components: components,
    scope: scope,
    schema: schemaTransform((data === null || data === void 0 ? void 0 : data.data) || {})
  }) : /*#__PURE__*/React.createElement(FormProvider, {
    form: form
  }, /*#__PURE__*/React.createElement(SchemaComponent, {
    memoized: true,
    components: components,
    scope: scope,
    schema: schemaTransform((data === null || data === void 0 ? void 0 : data.data) || {})
  }));
};

export var RemoteSchemaComponent = function RemoteSchemaComponent(props) {
  return props.uid ? /*#__PURE__*/React.createElement(RequestSchemaComponent, _objectSpread({}, props)) : null;
};