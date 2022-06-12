function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { observer, useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useRequest } from '../../../api-client';
import { useProps } from '../../hooks/useProps';
import { FilterContext } from './context';
import { FilterActionDesigner } from './Filter.Action.Designer';
import { FilterAction } from './FilterAction';
import { FilterGroup } from './FilterGroup';
import { SaveDefaultValue } from './SaveDefaultValue';

var useDef = function useDef(options) {
  var field = useField();
  return useRequest(function () {
    return Promise.resolve({
      data: field.dataSource
    });
  }, options);
};

export var Filter = observer(function (props) {
  var _props$useDataSource = props.useDataSource,
      useDataSource = _props$useDataSource === void 0 ? useDef : _props$useDataSource;

  var _useProps = useProps(props),
      options = _useProps.options,
      dynamicComponent = _useProps.dynamicComponent,
      className = _useProps.className;

  var field = useField();
  var fieldSchema = useFieldSchema();
  useDataSource({
    onSuccess: function onSuccess(data) {
      field.dataSource = (data === null || data === void 0 ? void 0 : data.data) || [];
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement(FilterContext.Provider, {
    value: {
      field: field,
      fieldSchema: fieldSchema,
      dynamicComponent: dynamicComponent,
      options: options || field.dataSource || []
    }
  }, /*#__PURE__*/React.createElement(FilterGroup, _objectSpread(_objectSpread({}, props), {}, {
    bordered: false
  }))));
});
Filter.SaveDefaultValue = SaveDefaultValue;
Filter.Action = FilterAction;
Filter.Action.Designer = FilterActionDesigner;