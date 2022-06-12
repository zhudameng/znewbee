function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCollection, useResourceActionContext } from '../collection-manager';
import { useCollectionFilterOptions } from '../collection-manager/action-hooks';
import { useDesignable } from '../schema-component/hooks';
import { GeneralSchemaDesigner, SchemaSettings } from '../schema-settings';
export var ActionLogDesigner = function ActionLogDesigner() {
  var _fieldSchema$xDecora, _fieldSchema$xDecora$, _fieldSchema$xDecora$2, _field$decoratorProps;

  var _useCollection = useCollection(),
      name = _useCollection.name,
      title = _useCollection.title;

  var field = useField();
  var fieldSchema = useFieldSchema();
  var dataSource = useCollectionFilterOptions(name);
  var ctx = useResourceActionContext();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

  var defaultFilter = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora === void 0 ? void 0 : (_fieldSchema$xDecora$ = _fieldSchema$xDecora.request) === null || _fieldSchema$xDecora$ === void 0 ? void 0 : (_fieldSchema$xDecora$2 = _fieldSchema$xDecora$.params) === null || _fieldSchema$xDecora$2 === void 0 ? void 0 : _fieldSchema$xDecora$2.filter) || {};
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, {
    title: title || name
  }, /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: '设置数据范围',
    schema: {
      type: 'object',
      title: '设置数据范围',
      properties: {
        filter: {
          default: defaultFilter,
          title: '数据范围',
          enum: dataSource,
          'x-component': 'Filter',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var _ctx$params, _schema;

      var filter = _ref.filter;
      var params = field.decoratorProps.request.params || {};
      params.filter = filter;
      field.decoratorProps.request.params = params;
      fieldSchema['x-decorator-props']['request']['params'] = params;
      ctx.run(_objectSpread(_objectSpread({}, (_ctx$params = ctx.params) === null || _ctx$params === void 0 ? void 0 : _ctx$params[0]), {}, {
        filter: filter
      }));
      dn.emit('patch', {
        schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema)
      });
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.SelectItem, {
    title: '每页显示',
    value: ((_field$decoratorProps = field.decoratorProps.request.params) === null || _field$decoratorProps === void 0 ? void 0 : _field$decoratorProps.pageSize) || 20,
    options: [{
      label: '10',
      value: 10
    }, {
      label: '20',
      value: 20
    }, {
      label: '50',
      value: 50
    }, {
      label: '100',
      value: 100
    }, {
      label: '200',
      value: 200
    }],
    onChange: function onChange(pageSize) {
      var _ctx$params2, _schema2;

      var params = field.decoratorProps.request.params || {};
      params.pageSize = pageSize;
      field.decoratorProps.request.params = params;
      fieldSchema['x-decorator-props']['request']['params'] = params;
      ctx.run(_objectSpread(_objectSpread({}, (_ctx$params2 = ctx.params) === null || _ctx$params2 === void 0 ? void 0 : _ctx$params2[0]), {}, {
        pageSize: pageSize
      }));
      dn.emit('patch', {
        schema: (_schema2 = {}, _defineProperty(_schema2, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema2, 'x-decorator-props', fieldSchema['x-decorator-props']), _schema2)
      });
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};