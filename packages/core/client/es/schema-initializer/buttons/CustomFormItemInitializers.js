import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../SchemaInitializer';
import { gridRowColWrap, useCustomFormItemInitializerFields } from '../utils'; // 表单里配置字段

export var CustomFormItemInitializers = function CustomFormItemInitializers(props) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var insertPosition = props.insertPosition,
      component = props.component;
  return /*#__PURE__*/React.createElement(SchemaInitializer.Button, {
    wrap: gridRowColWrap,
    icon: 'SettingOutlined',
    items: [{
      type: 'itemGroup',
      title: t('Configure fields'),
      children: useCustomFormItemInitializerFields()
    }],
    insertPosition: insertPosition,
    component: component,
    title: component ? null : t('Configure fields')
  });
};