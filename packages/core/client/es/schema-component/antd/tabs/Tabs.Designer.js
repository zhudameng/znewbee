function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDesignable } from '../..';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../';
export var TabsDesigner = function TabsDesigner() {
  var field = useField();
  var fieldSchema = useFieldSchema();

  var _useDesignable = useDesignable(),
      dn = _useDesignable.dn;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, {
    disableInitializer: true
  }, /*#__PURE__*/React.createElement(SchemaSettings.ModalItem, {
    title: t('Edit'),
    schema: {
      type: 'object',
      title: t('Edit tab'),
      properties: {
        title: {
          title: t('Tab name'),
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {}
        }
      }
    },
    initialValues: {
      title: field.title
    },
    onSubmit: function onSubmit(_ref) {
      var title = _ref.title;

      if (title) {
        var _schema;

        fieldSchema.title = title;
        field.title = title;
        dn.emit('patch', {
          schema: (_schema = {}, _defineProperty(_schema, 'x-uid', fieldSchema['x-uid']), _defineProperty(_schema, "title", title), _schema)
        });
        dn.refresh();
      }
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, null));
};