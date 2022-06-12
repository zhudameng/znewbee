import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer } from '../..';
import { gridRowColWrap } from '../utils';
export var RecordFormBlockInitializers = function RecordFormBlockInitializers(props) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(SchemaInitializer.Button, {
    wrap: gridRowColWrap,
    title: t('Add block'),
    icon: 'PlusOutlined',
    items: [{
      type: 'itemGroup',
      title: '{{ t("Data blocks") }}',
      children: [{
        type: 'item',
        title: '{{ t("Form") }}',
        component: 'RecordFormBlockInitializer'
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