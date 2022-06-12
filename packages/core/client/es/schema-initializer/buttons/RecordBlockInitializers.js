import React from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaInitializer, useCollection } from '../..';
import { gridRowColWrap } from '../utils';

var useRelationFields = function useRelationFields() {
  var _useCollection = useCollection(),
      fields = _useCollection.fields;

  return fields.filter(function (field) {
    return ['linkTo', 'subTable'].includes(field.interface);
  }).map(function (field) {
    var _field$uiSchema;

    return {
      key: field.name,
      type: 'item',
      field: field,
      title: (field === null || field === void 0 ? void 0 : (_field$uiSchema = field.uiSchema) === null || _field$uiSchema === void 0 ? void 0 : _field$uiSchema.title) || field.name,
      component: 'RecordAssociationBlockInitializer'
    };
  });
};

export var RecordBlockInitializers = function RecordBlockInitializers(props) {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var insertPosition = props.insertPosition,
      component = props.component;
  return /*#__PURE__*/React.createElement(SchemaInitializer.Button, {
    wrap: gridRowColWrap,
    insertPosition: insertPosition,
    component: component,
    title: component ? null : t('Add block'),
    icon: 'PlusOutlined',
    items: [{
      type: 'itemGroup',
      title: '{{t("Current record blocks")}}',
      children: [{
        key: 'details',
        type: 'item',
        title: '{{t("Details")}}',
        component: 'RecordReadPrettyFormBlockInitializer'
      }, {
        key: 'form',
        type: 'item',
        title: '{{t("Form")}}',
        component: 'RecordFormBlockInitializer'
      }]
    }, {
      type: 'itemGroup',
      title: '{{t("Relationship blocks")}}',
      children: useRelationFields()
    }, {
      type: 'itemGroup',
      title: '{{t("Media")}}',
      children: [{
        key: 'markdown',
        type: 'item',
        title: '{{t("Markdown")}}',
        component: 'MarkdownBlockInitializer'
      }]
    }]
  });
};