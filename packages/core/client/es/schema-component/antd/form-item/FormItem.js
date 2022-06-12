var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { css } from '@emotion/css';
import { FormItem as Item } from '@formily/antd';
import { useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCompile, useDesignable } from '../..';
import { useCollection, useCollectionManager } from '../../../collection-manager';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
import { BlockItem } from '../block-item';
import { HTMLEncode } from '../input/shared';
export var FormItem = function FormItem(props) {
  var field = useField();
  return /*#__PURE__*/React.createElement(BlockItem, {
    className: 'nb-form-item'
  }, /*#__PURE__*/React.createElement(Item, _objectSpread(_objectSpread({
    className: "".concat(css(_templateObject || (_templateObject = _taggedTemplateLiteral(["& .ant-space{\n        flex-wrap:wrap;\n      }"]))))
  }, props), {}, {
    extra: field.description ? /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: HTMLEncode(field.description).split('\n').join('<br/>')
      }
    }) : null
  })));
};

FormItem.Designer = function () {
  var _collectionField$uiSc, _collectionField$uiSc2, _fieldSchema$xDecora, _field$componentProps, _field$componentProps2;

  var _useCollectionManager = useCollectionManager(),
      getCollectionFields = _useCollectionManager.getCollectionFields;

  var _useCollection = useCollection(),
      getField = _useCollection.getField;

  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn,
      refresh = _useDesignable.refresh;

  var compile = useCompile();
  var collectionField = getField(fieldSchema['name']);
  var originalTitle = collectionField === null || collectionField === void 0 ? void 0 : (_collectionField$uiSc = collectionField.uiSchema) === null || _collectionField$uiSc === void 0 ? void 0 : _collectionField$uiSc.title;
  var targetFields = (collectionField === null || collectionField === void 0 ? void 0 : collectionField.target) ? getCollectionFields(collectionField.target) : [];
  var initialValue = {
    title: field.title === originalTitle ? undefined : field.title
  };

  if (!field.readPretty) {
    initialValue['required'] = field.required;
  }

  var options = targetFields.filter(function (field) {
    return !(field === null || field === void 0 ? void 0 : field.target) && field.type !== 'boolean';
  }).map(function (field) {
    var _field$uiSchema;

    return {
      value: field === null || field === void 0 ? void 0 : field.name,
      label: compile(field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || (field === null || field === void 0 ? void 0 : field.name)
    };
  });
  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, null, collectionField && /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Edit field title'),
    schema: {
      type: 'object',
      title: t('Edit field title'),
      properties: {
        title: {
          title: t('Field title'),
          default: field === null || field === void 0 ? void 0 : field.title,
          description: "".concat(t('Original field title: ')).concat(collectionField === null || collectionField === void 0 ? void 0 : (_collectionField$uiSc2 = collectionField.uiSchema) === null || _collectionField$uiSc2 === void 0 ? void 0 : _collectionField$uiSc2.title),
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref) {
      var title = _ref.title;

      if (title) {
        field.title = title;
        fieldSchema.title = title;
        dn.emit('patch', {
          schema: {
            'x-uid': fieldSchema['x-uid'],
            title: fieldSchema.title
          }
        });
      }

      dn.refresh();
    }
  }), !field.readPretty && /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Edit description'),
    schema: {
      type: 'object',
      title: t('Edit description'),
      properties: {
        description: {
          // title: t('Description'),
          default: field === null || field === void 0 ? void 0 : field.description,
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref2) {
      var description = _ref2.description;
      field.description = description;
      fieldSchema.description = description;
      dn.emit('patch', {
        schema: {
          'x-uid': fieldSchema['x-uid'],
          description: fieldSchema.description
        }
      });
      dn.refresh();
    }
  }), field.readPretty && /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Edit tooltip'),
    schema: {
      type: 'object',
      title: t('Edit description'),
      properties: {
        tooltip: {
          default: fieldSchema === null || fieldSchema === void 0 ? void 0 : (_fieldSchema$xDecora = fieldSchema['x-decorator-props']) === null || _fieldSchema$xDecora === void 0 ? void 0 : _fieldSchema$xDecora.tooltip,
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-component-props': {}
        }
      }
    },
    onSubmit: function onSubmit(_ref3) {
      var tooltip = _ref3.tooltip;
      field.decoratorProps.tooltip = tooltip;
      fieldSchema['x-decorator-props'] = fieldSchema['x-decorator-props'] || {};
      fieldSchema['x-decorator-props']['tooltip'] = tooltip;
      dn.emit('patch', {
        schema: {
          'x-uid': fieldSchema['x-uid'],
          'x-decorator-props': fieldSchema['x-decorator-props']
        }
      });
      dn.refresh();
    }
  }), !field.readPretty && /*#__PURE__*/React.createElement(SchemaSettings.SwitchItem, {
    title: t('Required'),
    checked: field.required,
    onChange: function onChange(required) {
      var schema = _defineProperty({}, 'x-uid', fieldSchema['x-uid']);

      field.required = required;
      fieldSchema['required'] = required;
      schema['required'] = required;
      dn.emit('patch', {
        schema: schema
      });
      refresh();
    }
  }), (collectionField === null || collectionField === void 0 ? void 0 : collectionField.target) && /*#__PURE__*/React.createElement(SchemaSettings.SelectItem, {
    title: t('Title field'),
    options: options,
    value: field === null || field === void 0 ? void 0 : (_field$componentProps = field.componentProps) === null || _field$componentProps === void 0 ? void 0 : (_field$componentProps2 = _field$componentProps.fieldNames) === null || _field$componentProps2 === void 0 ? void 0 : _field$componentProps2.label,
    onChange: function onChange(label) {
      var schema = _defineProperty({}, 'x-uid', fieldSchema['x-uid']);

      var fieldNames = _objectSpread(_objectSpread({}, field.componentProps.fieldNames), {}, {
        label: label
      });

      fieldSchema['x-component-props'] = fieldSchema['x-component-props'] || {};
      fieldSchema['x-component-props']['fieldNames'] = fieldNames;
      field.componentProps.fieldNames = fieldNames;
      schema['x-component-props'] = {
        fieldNames: fieldNames
      };
      dn.emit('patch', {
        schema: schema
      });
      dn.refresh();
    }
  }), collectionField && /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    confirm: {
      title: t('Delete field')
    },
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};