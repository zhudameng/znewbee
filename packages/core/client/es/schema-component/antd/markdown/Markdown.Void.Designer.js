import { useField } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralSchemaDesigner, SchemaSettings } from '../../../schema-settings';
export var MarkdownVoidDesigner = function MarkdownVoidDesigner() {
  var field = useField();

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(GeneralSchemaDesigner, null, /*#__PURE__*/React.createElement(SchemaSettings.Item, {
    title: t('Edit markdown'),
    onClick: function onClick() {
      field.editable = true;
    }
  }), /*#__PURE__*/React.createElement(SchemaSettings.Divider, null), /*#__PURE__*/React.createElement(SchemaSettings.Remove, {
    removeParentsIfNoChildren: true,
    breakRemoveOn: {
      'x-component': 'Grid'
    }
  }));
};