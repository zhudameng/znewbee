import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../SchemaInitializer';
import { gridRowColWrap, useFormItemInitializerFields } from '../utils'; // 表单里配置字段

export var FormItemInitializers = function FormItemInitializers(props) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var insertPosition = props.insertPosition,
      component = props.component;
  return /*#__PURE__*/React.createElement(SchemaInitializer.Button, {
    wrap: gridRowColWrap,
    icon: 'SettingOutlined',
    items: [{
      type: 'itemGroup',
      title: t('Display fields'),
      children: useFormItemInitializerFields()
    }, {
      type: 'divider'
    }, {
      type: 'item',
      title: t('Add text'),
      component: 'BlockInitializer',
      schema: {
        type: 'void',
        'x-editable': false,
        'x-decorator': 'FormItem',
        'x-designer': 'Markdown.Void.Designer',
        'x-component': 'Markdown.Void',
        'x-component-props': {
          content: t('This is a demo text, **supports Markdown syntax**.')
        }
      }
    }],
    insertPosition: insertPosition,
    component: component,
    title: component ? null : t('Configure fields')
  });
};