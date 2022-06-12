var _excluded = ["form", "children"],
    _excluded2 = ["form", "children"],
    _excluded3 = ["form"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { FormLayout } from '@formily/antd';
import { createForm, onFormInputChange } from '@formily/core';
import { FieldContext, FormContext, observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import { uid } from '@znewbee/utils';
import { Spin } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useActionContext } from '..';
import { useAttach, useComponent } from '../..';
import { useProps } from '../../hooks/useProps';

var FormComponent = function FormComponent(props) {
  var form = props.form,
      children = props.children,
      others = _objectWithoutProperties(props, _excluded);

  var field = useField();
  var fieldSchema = useFieldSchema(); // TODO: component 里 useField 会与当前 field 存在偏差

  var f = useAttach(form.createVoidField(_objectSpread(_objectSpread({}, field.props), {}, {
    basePath: ''
  })));
  return /*#__PURE__*/React.createElement(FieldContext.Provider, {
    value: undefined
  }, /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: form
  }, /*#__PURE__*/React.createElement(FormLayout, _objectSpread({
    layout: 'vertical'
  }, others), /*#__PURE__*/React.createElement(RecursionField, {
    basePath: f.address,
    schema: fieldSchema,
    onlyRenderProperties: true
  }))));
};

var Def = function Def(props) {
  return props.children;
};

var FormDecorator = function FormDecorator(props) {
  var form = props.form,
      children = props.children,
      others = _objectWithoutProperties(props, _excluded2);

  var field = useField();
  var fieldSchema = useFieldSchema(); // TODO: component 里 useField 会与当前 field 存在偏差

  var f = useAttach(form.createVoidField(_objectSpread(_objectSpread({}, field.props), {}, {
    basePath: ''
  })));
  var Component = useComponent(fieldSchema['x-component'], Def);
  return /*#__PURE__*/React.createElement(FieldContext.Provider, {
    value: undefined
  }, /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: form
  }, /*#__PURE__*/React.createElement(FormLayout, _objectSpread({
    layout: 'vertical'
  }, others), /*#__PURE__*/React.createElement(FieldContext.Provider, {
    value: f
  }, /*#__PURE__*/React.createElement(Component, _objectSpread({}, field.componentProps), /*#__PURE__*/React.createElement(RecursionField, {
    basePath: f.address,
    schema: fieldSchema,
    onlyRenderProperties: true
  }))))));
};

var WithForm = function WithForm(props) {
  var form = props.form;
  var fieldSchema = useFieldSchema();

  var _useActionContext = useActionContext(),
      setFormValueChanged = _useActionContext.setFormValueChanged;

  useEffect(function () {
    var id = uid();
    form.addEffects(id, function () {
      onFormInputChange(function (form) {
        setFormValueChanged === null || setFormValueChanged === void 0 ? void 0 : setFormValueChanged(true);
      });
    });
    return function () {
      form.removeEffects(id);
    };
  }, []);
  return fieldSchema['x-decorator'] === 'Form' ? /*#__PURE__*/React.createElement(FormDecorator, _objectSpread({}, props)) : /*#__PURE__*/React.createElement(FormComponent, _objectSpread({}, props));
};

var WithoutForm = function WithoutForm(props) {
  var fieldSchema = useFieldSchema();

  var _useActionContext2 = useActionContext(),
      setFormValueChanged = _useActionContext2.setFormValueChanged;

  var form = useMemo(function () {
    return createForm({
      effects: function effects() {
        onFormInputChange(function (form) {
          setFormValueChanged(true);
        });
      }
    });
  }, []);
  return fieldSchema['x-decorator'] === 'Form' ? /*#__PURE__*/React.createElement(FormDecorator, _objectSpread({
    form: form
  }, props)) : /*#__PURE__*/React.createElement(FormComponent, _objectSpread({
    form: form
  }, props));
};

export var Form = observer(function (props) {
  var field = useField();

  var _useProps = useProps(props),
      form = _useProps.form,
      others = _objectWithoutProperties(_useProps, _excluded3);

  return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement(Spin, {
    spinning: field.loading || false
  }, form ? /*#__PURE__*/React.createElement(WithForm, _objectSpread({
    form: form
  }, others)) : /*#__PURE__*/React.createElement(WithoutForm, _objectSpread({}, others))));
});
