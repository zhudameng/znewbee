import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../..';
import { gridRowColWrap } from '../utils';
export var CreateFormBlockInitializers = function CreateFormBlockInitializers(props) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var insertPosition = props.insertPosition,
      component = props.component;
  return /*#__PURE__*/React.createElement(SchemaInitializer.Button, {
    wrap: gridRowColWrap,
    title: component ? null : t('Add block'),
    icon: 'PlusOutlined',
    insertPosition: insertPosition,
    component: component,
    items: [{
      type: 'itemGroup',
      title: '{{t("Data blocks")}}',
      children: [{
        type: 'item',
        title: '{{t("Form")}}',
        component: 'CreateFormBlockInitializer'
      }]
    }, {
      type: 'itemGroup',
      title: '{{t("Media")}}',
      children: [{
        type: 'item',
        title: '{{t("Markdown")}}',
        component: 'MarkdownBlockInitializer'
      }]
    }]
  });
};