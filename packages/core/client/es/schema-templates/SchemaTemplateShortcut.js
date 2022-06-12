import { LayoutOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { PluginManager } from '../plugin-manager';
export var SchemaTemplateShortcut = function SchemaTemplateShortcut() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var history = useHistory();
  return /*#__PURE__*/React.createElement(PluginManager.Toolbar.Item, {
    icon: /*#__PURE__*/React.createElement(LayoutOutlined, null),
    title: t('Block templates'),
    onClick: function onClick() {
      history.push('/admin/plugins/block-templates');
    }
  });
};