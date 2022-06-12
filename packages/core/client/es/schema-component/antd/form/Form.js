var _excluded = ["form", "children"],
    _excluded2 = ["form", "children"],
    _excluded3 = ["request", "effects", "initialValue", "useValues"];

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { FormLayout } from '@formily/antd';
import { createForm } from '@formily/core';
import { FieldContext, FormContext, observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import { Spin } from 'antd';
import React, { createContext, useContext, useMemo } from 'react';
import { useAttach, useComponent } from '../..';
import { useRequest } from '../../../api-client';
import { useCollection } from '../../../collection-manager';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
import { useSchemaTemplate } from '../../../schema-templates';

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

var useRequestProps = function useRequestProps(props) {
  var request = props.request,
      initialValue = props.initialValue;

  if (request) {
    return request;
  }

  return function () {
    return Promise.resolve({
      data: initialValue
    });
  };
};

var useDef = function useDef() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return useRequest(useRequestProps(props), opts);
};

var FormBlockContext = /*#__PURE__*/createContext(null);
export var Form = observer(function (props) {
  var request = props.request,
      effects = props.effects,
      initialValue = props.initialValue,
      _props$useValues = props.useValues,
      useValues = _props$useValues === void 0 ? useDef : _props$useValues,
      others = _objectWithoutProperties(props, _excluded3);

  var fieldSchema = useFieldSchema();
  var field = useField();
  var form = useMemo(function () {
    return createForm({
      effects: effects
    });
  }, []);
  var result = useValues({
    uid: fieldSchema['x-uid'],
    onSuccess: function onSuccess(data) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return form.reset();

              case 2:
                form.setValues(data === null || data === void 0 ? void 0 : data.data);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }, props);
  var parent = useContext(FormBlockContext);
  return /*#__PURE__*/React.createElement(FormBlockContext.Provider, {
    value: {
      parent: parent,
      form: form,
      result: result,
      field: field,
      fieldSchema: fieldSchema
    }
  }, /*#__PURE__*/React.createElement(Spin, {
    spinning: (result === null || result === void 0 ? void 0 : result.loading) || false
  }, fieldSchema['x-decorator'] === 'Form' ? /*#__PURE__*/React.createElement(FormDecorator, _objectSpread({
    form: form
  }, others)) : /*#__PURE__*/React.createElement(FormComponent, _objectSpread({
    form: form
  }, others))));
});

Form.Designer = function () {
  var _useCollection = useCollection(),
      name = _useCollection.name,
      title = _useCollection.title;

  var template = useSchemaTemplate();
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, {
    template: template,
    title: title || name
  }, /*#__PURE__*/React.createElement(SchemaSettings.Template, {
    componentName: 'Form',
    collectionName: name
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};