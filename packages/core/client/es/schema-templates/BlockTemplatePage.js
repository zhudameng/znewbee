import { PageHeader as AntdPageHeader } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CollectionManagerProvider } from '../collection-manager';
import { SchemaComponent } from '../schema-component';
import { uiSchemaTemplatesCollection } from './collections/uiSchemaTemplates';
import { uiSchemaTemplatesSchema } from './schemas/uiSchemaTemplates';
export var BlockTemplatePage = function BlockTemplatePage() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AntdPageHeader, {
    ghost: false,
    title: t('Block templates')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: 24
    }
  }, /*#__PURE__*/React.createElement(CollectionManagerProvider, {
    collections: [uiSchemaTemplatesCollection]
  }, /*#__PURE__*/React.createElement(SchemaComponent, {
    schema: uiSchemaTemplatesSchema
  }))));
};