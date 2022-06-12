function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createForm, onFieldValueChange } from '@formily/core';
import { FieldContext, FormContext } from '@formily/react';
import { merge } from '@formily/shared';
import React, { useContext, useMemo } from 'react';
import { SchemaComponent } from '../../core';
import { useComponent } from '../../hooks';
import { FilterContext } from './context';
export var DynamicComponent = function DynamicComponent(props) {
  var _useContext = useContext(FilterContext),
      dynamicComponent = _useContext.dynamicComponent;

  var component = useComponent(dynamicComponent);
  var form = useMemo(function () {
    return createForm({
      values: {
        value: props.value
      },
      effects: function effects() {
        onFieldValueChange('value', function (field) {
          var _props$onChange;

          props === null || props === void 0 ? void 0 : (_props$onChange = props.onChange) === null || _props$onChange === void 0 ? void 0 : _props$onChange.call(props, field.value);
        });
      }
    });
  }, [JSON.stringify(props.schema), JSON.stringify(props.value)]);

  var renderSchemaComponent = function renderSchemaComponent() {
    var _props$schema;

    return /*#__PURE__*/React.createElement(FieldContext.Provider, {
      value: null
    }, /*#__PURE__*/React.createElement(SchemaComponent, {
      schema: _objectSpread(_objectSpread({
        'x-component': 'Input'
      }, props.schema), {}, {
        'x-component-props': merge((props === null || props === void 0 ? void 0 : (_props$schema = props.schema) === null || _props$schema === void 0 ? void 0 : _props$schema['x-component-props']) || {}, {
          style: {
            minWidth: 150
          }
        }),
        name: 'value',
        'x-read-pretty': false,
        'x-validator': undefined,
        'x-decorator': undefined
      })
    }));
  };

  return /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: form
  }, component ? /*#__PURE__*/React.createElement(component, {
    value: props.value,
    onChange: props === null || props === void 0 ? void 0 : props.onChange,
    renderSchemaComponent: renderSchemaComponent
  }) : renderSchemaComponent());
};