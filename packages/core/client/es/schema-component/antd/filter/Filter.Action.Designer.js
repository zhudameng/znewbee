function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDesignable } from '../..';
import { useCollection, useCollectionManager } from '../../../collection-manager';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
import { useCompile } from '../../hooks';
export var useFilterableFields = function useFilterableFields(collectionName) {
  var _fields$filter;

  var _useCollectionManager = useCollectionManager(),
      getCollectionFields = _useCollectionManager.getCollectionFields,
      getInterface = _useCollectionManager.getInterface;

  var fields = getCollectionFields(collectionName);
  return fields === null || fields === void 0 ? void 0 : (_fields$filter = fields.filter) === null || _fields$filter === void 0 ? void 0 : _fields$filter.call(fields, function (field) {
    if (!field.interface) {
      return false;
    }

    var fieldInterface = getInterface(field.interface);

    if (!fieldInterface.filterable) {
      return false;
    }

    return true;
  });
};
export var FilterActionDesigner = function FilterActionDesigner(props) {
  var _fieldSchema$xCompon, _fieldSchema$xCompon3;

  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

  var _useCollection = useCollection(),
      name = _useCollection.name;

  var fields = useFilterableFields(name);
  var compile = useCompile();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var nonfilterable = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon === void 0 ? void 0 : _fieldSchema$xCompon.nonfilterable) || [];
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, _objectSpread(_objectSpread({}, props), {}, {
    disableInitializer: true
  }), /*#__PURE__*/React.createElement(SchemaSettings.ItemGroup, {
    title: t('Filterable fields')
  }, fields.map(function (field) {
    var _field$uiSchema;

    var checked = !nonfilterable.includes(field.name);
    return /*#__PURE__*/React.createElement(SchemaSettings.SwitchItem, {
      checked: checked,
      title: compile(field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title),
      onChange: function onChange(value) {
        var _fieldSchema$xCompon2, _schema;

        fieldSchema['x-component-props'] = (fieldSchema === null || fieldSchema === void 0 ? void 0 : fieldSchema['x-component-props']) || {};
        var nonfilterable = (fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon2 = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon2 === void 0 ? void 0 : _fieldSchema$xCompon2.nonfilterable) || [];

        if (!value) {
          nonfilterable.push(field.name);
        } else {
          var index = nonfilterable.indexOf(field.name);
          nonfilterable.splice(index, 1);
        }

        fieldSchema['x-component-props'].nonfilterable = nonfilterable;
        dn.emit('patch', {
          schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, 'x-component-props', _objectSpread({}, fieldSchema['x-component-props'])), _schema)
        });
        dn.refresh();
      }
    });
  })), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Edit button'),
    schema: {
      type: 'object',
      title: t('Edit button'),
      properties: {
        title: {
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          title: t('Button title'),
          default: fieldSchema.title,
          'x-component-props': {}
        },
        icon: {
          'x-decorator': 'FormItem',
          'x-component': 'IconPicker',
          title: t('Button icon'),
          default: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xCompon3 = fieldSchema['x-component-props']) === null || _fieldSchema$xCompon3 === void 0 ? void 0 : _fieldSchema$xCompon3.icon,
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var title = _ref.title,
          icon = _ref.icon;

      if (title) {
        var _schema2;

        fieldSchema.title = title;
        field.title = title;
        field.componentProps.icon = icon;
        fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
        fieldSchema['x-component-props'].icon = icon;
        dn.emit('patch', {
          schema: (_schema2 = {}, _defineProperty(_schema2, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema2, "title", title), _defineProperty(_schema2, 'x-component-props', _objectSpread({}, fieldSchema['x-component-props'])), _schema2)
        });
        dn.refresh();
      }
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: function breakRemoveOn(s) {
      return s['x-component'] === 'Space' || s['x-component'] === 'ActionBar';
    }
  }));
};